import React from 'react';

const ChessPiece = ({ piece, design, isMoving, showNotation }) => {
    if (!piece) return null;
    const pieceSymbols = {
        traditional: {
            p: '♟',
            r: '♜',
            n: '♞',
            b: '♝',
            q: '♛',
            k: '♚',
            P: '♙',
            R: '♖',
            N: '♘',
            B: '♗',
            Q: '♕',
            K: '♔'
        },
        modern: {
            p: '🅟',
            r: '🅡',
            n: '🅝',
            b: '🅑',
            q: '🅠',
            k: '🅚',
            P: '🅟',
            R: '🅡',
            N: '🅝',
            B: '🅑',
            Q: '🅠',
            K: '🅚'
        }
    };

    return (
        <span className={`piece ${piece.color} ${isMoving ? 'moving' : ''}`}
            style={{ textShadow: '5px -2px 5px #000' }}>
            {pieceSymbols[design][piece.type]}
            {showNotation && ` (${piece.color}${piece.type})`}
        </span>
    );
};

export default ChessPiece;
