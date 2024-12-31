import './style.css';
import React, { Component, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Menu,
    MenuItem as DropdownMenuItem,
    IconButton
} from '@mui/material';
import { Chess } from 'chess.js';
import { GearSix, FloppyDisk, ArrowClockwise, DownloadSimple } from '@phosphor-icons/react';
import ErrorBoundary from './components/ErrorBoundary';

// Define logError function
const logError = (error) => {
    console.error('An error occurred:', error);
};

// Lazy load components with error boundaries
const Tutorial = lazy(() => import('./components/Tutorial').catch(logError));
const GameStatus = lazy(() => import('./components/GameStatus').catch(logError));
const MaterialAdvantageBar = lazy(() => import('./components/MaterialAdvantageBar').catch(logError));
const CapturedPieces = lazy(() => import('./components/CapturedPieces').catch(logError));
const ChessBoard = lazy(() => import('./components/ChessBoard').catch(logError));

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: new Chess(),
            selectedSquare: null,
            possibleMoves: [],
            gameStatus: 'In Progress',
            checkSquare: null,
            savedGame: null,
            capturedPieces: { white: [], black: [] },
            lastMove: null,
            floatingCapture: null,
            materialAdvantage: 0,
            showTutorial: true,
            boardTheme: 'default',
            pieceDesign: 'traditional',
            showPossibleMoves: true,
            font: 'sans-serif',
            showNotation: false,
            anchorEl: null
        };
    }

    getBoardPosition = () => {
        const { game } = this.state;
        const position = [];
        for (let i = 8; i > 0; i--) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                const square = String.fromCharCode(97 + j) + i;
                row.push(game.get(square));
            }
            position.push(row);
        }
        return position;
    };

    handleMove = (square) => {
        const { selectedSquare, game, capturedPieces } = this.state;
        if (selectedSquare) {
            try {
                const move = game.move({ from: selectedSquare, to: square });
                this.setState({
                    selectedSquare: null,
                    possibleMoves: [],
                    lastMove: move,
                    game: new Chess(game.fen())
                });

                if (move.captured) {
                    this.setState({
                        floatingCapture: { from: move.to, to: move.to },
                        capturedPieces: {
                            ...capturedPieces,
                            [move.color === 'w' ? 'black' : 'white']: [
                                ...capturedPieces[move.color === 'w' ? 'black' : 'white'],
                                move.captured
                            ]
                        }
                    });
                    setTimeout(() => this.setState({ floatingCapture: null }), 500);
                }
            } catch (e) {
                logError(e);
                this.setState({
                    selectedSquare: square,
                    possibleMoves: game.moves({ square, verbose: true }).map(move => move.to)
                });
            }
        } else {
            this.setState({
                selectedSquare: square,
                possibleMoves: game.moves({ square, verbose: true }).map(move => move.to)
            });
        }
    };

    componentDidUpdate(_, prevState) {
        const { game } = this.state;
        if (prevState.game !== game) {
            try {
                if (game.isGameOver()) {
                    if (game.isCheckmate()) this.setState({ gameStatus: 'Checkmate' });
                    else if (game.isDraw()) this.setState({ gameStatus: 'Draw' });
                    else if (game.isStalemate()) this.setState({ gameStatus: 'Stalemate' });
                } else if (game.inCheck()) {
                    this.setState({ gameStatus: 'Check' });
                    const kingSquare = Object.keys(game.board()).find(square => {
                        const piece = game.get(square);
                        return piece && piece.type === 'k' && piece.color === game.turn();
                    });
                    this.setState({ checkSquare: kingSquare });
                } else {
                    this.setState({ gameStatus: 'In Progress', checkSquare: null });
                }

                const pieceValues = { p: 1, r: 5, n: 3, b: 3, q: 9, k: 0 };
                let whiteAdvantage = 0;
                let blackAdvantage = 0;

                game.board().forEach(row => {
                    row.forEach(piece => {
                        if (piece) {
                            if (piece.color === 'w') whiteAdvantage += pieceValues[piece.type];
                            else blackAdvantage += pieceValues[piece.type];
                        }
                    });
                });

                this.setState({ materialAdvantage: whiteAdvantage - blackAdvantage });
            } catch (e) {
                logError(e);
            }
        }
    }

    resetGame = () => {
        try {
            this.setState({
                game: new Chess(),
                selectedSquare: null,
                possibleMoves: [],
                gameStatus: 'In Progress',
                checkSquare: null,
                capturedPieces: { white: [], black: [] },
                lastMove: null
            });
        } catch (e) {
            logError(e);
        }
    };

    saveGame = () => {
        try {
            const { game, capturedPieces } = this.state;
            this.setState({ savedGame: { fen: game.fen(), captured: capturedPieces } });
        } catch (e) {
            logError(e);
        }
    };

    loadGame = () => {
        try {
            const { savedGame } = this.state;
            if (savedGame) {
                this.setState({
                    game: new Chess(savedGame.fen),
                    selectedSquare: null,
                    possibleMoves: [],
                    gameStatus: 'In Progress',
                    checkSquare: null,
                    capturedPieces: savedGame.captured,
                    lastMove: null
                });
            }
        } catch (e) {
            logError(e);
        }
    };

    handleThemeChange = (event) => {
        try {
            this.setState({ boardTheme: event.target.value });
        } catch (e) {
            logError(e);
        }
    };

    handleDesignChange = (event) => {
        try {
            this.setState({ pieceDesign: event.target.value });
        } catch (e) {
            logError(e);
        }
    };

    handleShowPossibleMovesChange = () => {
        try {
            this.setState(prevState => ({ showPossibleMoves: !prevState.showPossibleMoves }));
        } catch (e) {
            logError(e);
        }
    };

    handleFontChange = (event) => {
        try {
            this.setState({ font: event.target.value });
        } catch (e) {
            logError(e);
        }
    };

    handleShowNotationChange = () => {
        try {
            this.setState(prevState => ({ showNotation: !prevState.showNotation }));
        } catch (e) {
            logError(e);
        }
    };

    closeTutorial = () => {
        try {
            this.setState({ showTutorial: false });
        } catch (e) {
            logError(e);
        }
    };

    handleMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {
            game,
            selectedSquare,
            possibleMoves,
            gameStatus,
            checkSquare,
            capturedPieces,
            lastMove,
            floatingCapture,
            materialAdvantage,
            showTutorial,
            boardTheme,
            pieceDesign,
            showPossibleMoves,
            font,
            showNotation,
            anchorEl
        } = this.state;

        return (
            <ErrorBoundary>
                <Container className={`font-${font}`} maxWidth="md" style={{ height: '100vh' }}>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 text-center w-full">♜ Chess ♜</h1>
                        <div className="mt-4">
                            <label htmlFor="theme-select">Board Theme:</label>
                            <Select id="theme-select" value={boardTheme} onChange={this.handleThemeChange}>
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="green">Green</MenuItem>
                                <MenuItem value="red">Red</MenuItem>
                            </Select>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="design-select">Piece Design:</label>
                            <Select id="design-select" value={pieceDesign} onChange={this.handleDesignChange}>
                                <MenuItem value="traditional">Traditional</MenuItem>
                                <MenuItem value="modern">Modern</MenuItem>
                            </Select>
                        </div>
                        <div className="mt-8">
                            <label htmlFor="font-select">Font:</label>
                            <Select id="font-select" value={font} onChange={this.handleFontChange}>
                                <MenuItem value="sans-serif">Sans-serif</MenuItem>
                                <MenuItem value="serif">Serif</MenuItem>
                                <MenuItem value="monospace">Monospace</MenuItem>
                            </Select>
                        </div>
                        <IconButton onClick={this.handleMenuOpen}>
                            <GearSix />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleMenuClose}
                        >
                            <DropdownMenuItem onClick={this.resetGame}>
                                <Button startIcon={<ArrowClockwise />} variant="contained">Reset Game</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={this.saveGame}>
                                <Button startIcon={<FloppyDisk />} variant="contained">Save Game</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={this.loadGame}>
                                <Button startIcon={<DownloadSimple />} variant="contained">Load Game</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FormControlLabel
                                    control={<Switch checked={showPossibleMoves} onChange={this.handleShowPossibleMovesChange} />}
                                    label="Show Possible Moves"
                                />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FormControlLabel
                                    control={<Switch checked={showNotation} onChange={this.handleShowNotationChange} />}
                                    label="Show Piece Notation"
                                />
                            </DropdownMenuItem>
                        </Menu>
                    </div>
                    {showTutorial && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <ErrorBoundary>
                                <Tutorial onClose={this.closeTutorial} />
                            </ErrorBoundary>
                        </Suspense>
                    )}
                    <div className="flex flex-col gap-4" style={{ height: 'calc(100% - 64px)' }}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ErrorBoundary>
                                <GameStatus currentPlayer={game.turn()} gameStatus={gameStatus} />
                            </ErrorBoundary>
                        </Suspense>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center" style={{ height: '100%' }}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ErrorBoundary>
                                    <ChessBoard
                                        position={this.getBoardPosition()}
                                        onMove={this.handleMove}
                                        selectedSquare={selectedSquare}
                                        possibleMoves={possibleMoves}
                                        checkSquare={checkSquare}
                                        theme={boardTheme}
                                        pieceDesign={pieceDesign}
                                        showPossibleMoves={showPossibleMoves}
                                        lastMove={lastMove}
                                        floatingCapture={floatingCapture}
                                        showNotation={showNotation}
                                        style={{ height: '100%' }}
                                    />
                                </ErrorBoundary>
                            </Suspense>
                        </div>
                        <div className="flex flex-col gap-4" style={{ height: '100%' }}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ErrorBoundary>
                                    <MaterialAdvantageBar advantage={materialAdvantage} />
                                </ErrorBoundary>
                            </Suspense>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ErrorBoundary>
                                    <CapturedPieces captured={capturedPieces} pieceDesign={pieceDesign} />
                                </ErrorBoundary>
                            </Suspense>
                        </div>
                    </div>
                </Container>
            </ErrorBoundary>
        );
    }
}

App.propTypes = {
    game: PropTypes.object,
    selectedSquare: PropTypes.string,
    possibleMoves: PropTypes.array,
    gameStatus: PropTypes.string,
    checkSquare: PropTypes.string,
    savedGame: PropTypes.object,
    capturedPieces: PropTypes.object,
    lastMove: PropTypes.object,
    floatingCapture: PropTypes.object,
    materialAdvantage: PropTypes.number,
    getBoardPosition: PropTypes.func,
    handleMove: PropTypes.func,
    resetGame: PropTypes.func,
    saveGame: PropTypes.func,
    loadGame: PropTypes.func
};

ReactDOM.render(<App />, document.getElementById('root'));