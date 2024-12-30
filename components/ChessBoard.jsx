import React, { useEffect } from 'react';
import { ChessPiece } from './ChessPiece';

const ChessBoard = ({
    position,
    onMove,
    selectedSquare,
    possibleMoves,
    checkSquare,
    theme,
    pieceDesign,
    showPossibleMoves,
    lastMove,
    floatingCapture,
    showNotation
}) => {
    const handleSquareClick = (square) => {
        onMove(square);
    };

    useEffect(() => {
        const handleGyroscopeMove = (event) => {
            const { beta, gamma } = event;
            document.querySelector('.chess-board').style.transform = `perspective(500px) rotateX(${beta * 0.1}deg) rotateY(${gamma * 0.1}deg)`;
        };

        window.addEventListener('deviceorientation', handleGyroscopeMove);

        return () => {
            window.removeEventListener('deviceorientation', handleGyroscopeMove);
        };
    }, []);

    return (
        <div className={`chess-board ${theme}`}>
            {position.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((piece, colIndex) => {
                        const square = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
                        const isSelected = selectedSquare === square;
                        const isPossibleMove = showPossibleMoves && possibleMoves.includes(square);
                        const isCheckSquare = checkSquare === square;
                        const isLastMove = lastMove?.to === square || lastMove?.from === square;
                        const isFloatingCapture = floatingCapture && square === floatingCapture.from;
                        return (
                            <div
                                key={colIndex}
                                className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}
                                 ${isSelected ? 'selected' : ''} ${isPossibleMove ? 'possible-move' : ''}
                                 ${isCheckSquare ? 'check' : ''} ${isLastMove ? 'last-move' : ''}`}
                                onClick={() => handleSquareClick(square)}
                                style={{ transition: 'all 0.3s ease' }}
                            >
                                <ChessPiece piece={piece} design={pieceDesign} isMoving={isLastMove || isFloatingCapture} 
                                            showNotation={showNotation} />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
export { ChessBoard };