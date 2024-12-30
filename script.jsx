import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import { createRoot } from 'react-dom/client';
import {
    Button,
    Card,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
import { ChessBoard } from './components/ChessBoard';

// Error logging function with more details
const logError = (error, source, lineno, colno) => {
    console.error(`Runtime Error: ${error.message} at ${source}:${lineno}:${colno}`, error);
};

// Warning logging function with more details
const logWarning = (warning, source, lineno, colno) => {
    console.warn(`Runtime Warning: ${warning.message} at ${source}:${lineno}:${colno}`, warning);
};

function App() {
    const [game, setGame] = useState(new Chess());
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [gameStatus, setGameStatus] = useState('In Progress');
    const [checkSquare, setCheckSquare] = useState(null);
    const [savedGame, setSavedGame] = useState(null);
    const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
    const [showTutorial, setShowTutorial] = useState(true);
    const [boardTheme, setBoardTheme] = useState('default');
    const [pieceDesign, setPieceDesign] = useState('traditional');
    const [showPossibleMoves, setShowPossibleMoves] = useState(true);
    const [font, setFont] = useState('sans-serif');
    const [lastMove, setLastMove] = useState(null); // State to store the last move
    const [floatingCapture, setFloatingCapture] = useState(null); // State for floating capture animation
    const [showNotation, setShowNotation] = useState(false);
    const [materialAdvantage, setMaterialAdvantage] = useState(0); // State for material advantage
    const [anchorEl, setAnchorEl] = useState(null);

    const getBoardPosition = useCallback(() => {
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
    }, [game]);

    const handleMove = useCallback((square) => {
        if (selectedSquare) {
            try {
                const move = game.move({ from: selectedSquare, to: square });
                setSelectedSquare(null);
                setPossibleMoves([]);
                setLastMove(move);
                setGame(new Chess(game.fen()));

                if (move.captured) {
                    setFloatingCapture({ from: move.to, to: move.to });
                    setTimeout(() => setFloatingCapture(null), 500);

                    setCapturedPieces(prev => {
                        const color = move.color === 'w' ? 'black' : 'white';
                        return {
                            ...prev,
                            [color]: [...prev[color], move.captured]
                        };
                    });

                    const captured = document.querySelector('.captured-pieces');
                    captured.classList.add('animate-captured');
                    setTimeout(() => captured.classList.remove('animate-captured'), 500);
                }
            } catch (e) {
                logWarning(e);
                setSelectedSquare(square);
                setPossibleMoves(game.moves({ square, verbose: true }).map(move => move.to));
            }
        } else {
            setSelectedSquare(square);
            setPossibleMoves(game.moves({ square, verbose: true }).map(move => move.to));
        }
    }, [selectedSquare, game]);

    useEffect(() => {
        try {
            if (game.isGameOver()) {
                if (game.isCheckmate()) setGameStatus('Checkmate');
                else if (game.isDraw()) setGameStatus('Draw');
                else if (game.isStalemate()) setGameStatus('Stalemate');
            } else if (game.inCheck()) {
                setGameStatus('Check');
                const kingSquare = Object.keys(game.board()).find(square => {
                    const piece = game.get(square);
                    return piece && piece.type === 'k' && piece.color === game.turn();
                });
                setCheckSquare(kingSquare);
            } else {
                setGameStatus('In Progress');
                setCheckSquare(null);
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

            setMaterialAdvantage(whiteAdvantage - blackAdvantage);
        } catch (e) {
            logError(e);
        }
    }, [game]);

    const resetGame = () => {
        try {
            setGame(new Chess());
            setSelectedSquare(null);
            setPossibleMoves([]);
            setGameStatus('In Progress');
            setCheckSquare(null);
            setCapturedPieces({ white: [], black: [] });
            setLastMove(null);
        } catch (e) {
            logError(e);
        }
    };

    const saveGame = () => {
        try {
            setSavedGame({ fen: game.fen(), captured: capturedPieces });
        } catch (e) {
            logError(e);
        }
    };

    const loadGame = () => {
        try {
            if (savedGame) {
                setGame(new Chess(savedGame.fen));
                setSelectedSquare(null);
                setPossibleMoves([]);
                setGameStatus('In Progress');
                setCheckSquare(null);
                setCapturedPieces(savedGame.captured);
                setLastMove(null);
            }
        } catch (e) {
            logError(e);
        }
    };

    const handleThemeChange = (event) => {
        try {
            setBoardTheme(event.target.value);
        } catch (e) {
            logError(e);
        }
    };

    const handleDesignChange = (event) => {
        try {
            setPieceDesign(event.target.value);
        } catch (e) {
            logError(e);
        }
    };

    const handleShowPossibleMovesChange = () => {
        try {
            setShowPossibleMoves(!showPossibleMoves);
        } catch (e) {
            logError(e);
        }
    };

    const handleFontChange = (event) => {
        try {
            setFont(event.target.value);
        } catch (e) {
            logError(e);
        }
    };

    const handleShowNotationChange = () => {
        try {
            setShowNotation(!showNotation);
        } catch (e) {
            logError(e);
        }
    };

    const closeTutorial = () => {
        try {
            setShowTutorial(false);
        } catch (e) {
            logError(e);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container className={`font-${font}`} maxWidth="md">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 text-center w-full">♜ Chess ♜</h1>
                <div className="mt-4">
                    <label htmlFor="theme-select">Board Theme:</label>
                    <Select id="theme-select" value={boardTheme} onChange={handleThemeChange}>
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="blue">Blue</MenuItem>
                        <MenuItem value="green">Green</MenuItem>
                        <MenuItem value="red">Red</MenuItem>
                    </Select>
                </div>
                <div className="mt-4">
                    <label htmlFor="design-select">Piece Design:</label>
                    <Select id="design-select" value={pieceDesign} onChange={handleDesignChange}>
                        <MenuItem value="traditional">Traditional</MenuItem>
                        <MenuItem value="modern">Modern</MenuItem>
                    </Select>
                </div>
                <div className="mt-8">
                    <label htmlFor="font-select">Font:</label>
                    <Select id="font-select" value={font} onChange={handleFontChange}>
                        <MenuItem value="sans-serif">Sans-serif</MenuItem>
                        <MenuItem value="serif">Serif</MenuItem>
                        <MenuItem value="monospace">Monospace</MenuItem>
                    </Select>
                </div>
                <IconButton onClick={handleMenuOpen}>
                    <GearSix />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <DropdownMenuItem onClick={resetGame}>
                        <Button startIcon={<ArrowClockwise />} variant="contained">Reset Game</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={saveGame}>
                        <Button startIcon={<FloppyDisk />} variant="contained">Save Game</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={loadGame}>
                        <Button startIcon={<DownloadSimple />} variant="contained">Load Game</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FormControlLabel
                            control={<Switch checked={showPossibleMoves} onChange={handleShowPossibleMovesChange} />}
                            label="Show Possible Moves"
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FormControlLabel
                            control={<Switch checked={showNotation} onChange={handleShowNotationChange} />}
                            label="Show Piece Notation"
                        />
                    </DropdownMenuItem>
                </Menu>
            </div>
            {showTutorial && <Tutorial onClose={closeTutorial} />}
            <div className="flex flex-col gap-4">
                <GameStatus currentPlayer={game.turn()} gameStatus={gameStatus} />
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <ChessBoard
                        position={getBoardPosition()}
                        onMove={handleMove}
                        selectedSquare={selectedSquare}
                        possibleMoves={possibleMoves}
                        checkSquare={checkSquare}
                        theme={boardTheme}
                        pieceDesign={pieceDesign}
                        showPossibleMoves={showPossibleMoves}
                        lastMove={lastMove} // Pass last move prop
                        floatingCapture={floatingCapture} // Pass floating capture prop
                        showNotation={showNotation}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <MaterialAdvantageBar advantage={materialAdvantage} />
                    <CapturedPieces captured={capturedPieces} pieceDesign={pieceDesign} />
                </div>
            </div>
        </Container>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Global error handler
window.onerror = (message, source, lineno, colno, error) => {
    logError({ message, source, lineno, colno, error });
};

// Global warning handler
window.onwarning = (message, source, lineno, colno, warning) => {
    logWarning({ message, source, lineno, colno, warning });
};