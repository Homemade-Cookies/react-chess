import React from 'react';
import { Card } from '@mui/material';
import ChessPiece from './ChessPiece';

const CapturedPieces = ({ captured, pieceDesign }) => (
    <Card className={`text-fg contrast p-2 rounded-lg shadow-lg`}>
        <div className="captured-pieces">
            <div>
                <h3>White Captures</h3>
                <div className="captured-stack">
                    {captured.white.map((piece, index) => (
                        <ChessPiece key={index} piece={{ type: piece, color: 'w' }} design={pieceDesign} />
                    ))}
                </div>
            </div>
            <div>
                <h3>Black Captures</h3>
                <div className="captured-stack">
                    {captured.black.map((piece, index) => (
                        <ChessPiece key={index} piece={{ type: piece, color: 'b' }} design={pieceDesign} />
                    ))}
                </div>
            </div>
        </div>
    </Card>
);

export default CapturedPieces;
