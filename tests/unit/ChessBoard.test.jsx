import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChessBoard from '../../components/ChessBoard';

describe('ChessBoard', () => {
    const position = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
    ];
    const onMove = jest.fn();
    const selectedSquare = 'e4';
    const possibleMoves = ['e5', 'd4', 'f4'];
    const checkSquare = 'e8';
    const theme = 'default';
    const pieceDesign = 'traditional';
    const showPossibleMoves = true;
    const lastMove = { from: 'e2', to: 'e4' };
    const floatingCapture = null;
    const showNotation = false;

    it('renders the chess board correctly', () => {
        const { container } = render(
            <ChessBoard
                position={position}
                onMove={onMove}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
                checkSquare={checkSquare}
                theme={theme}
                pieceDesign={pieceDesign}
                showPossibleMoves={showPossibleMoves}
                lastMove={lastMove}
                floatingCapture={floatingCapture}
                showNotation={showNotation}
            />
        );
        expect(container.querySelector('.chess-board')).toBeInTheDocument();
    });

    it('highlights the selected square', () => {
        const { container } = render(
            <ChessBoard
                position={position}
                onMove={onMove}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
                checkSquare={checkSquare}
                theme={theme}
                pieceDesign={pieceDesign}
                showPossibleMoves={showPossibleMoves}
                lastMove={lastMove}
                floatingCapture={floatingCapture}
                showNotation={showNotation}
            />
        );
        expect(container.querySelector('.square.selected')).toHaveClass('selected');
    });

    it('highlights possible moves', () => {
        const { container } = render(
            <ChessBoard
                position={position}
                onMove={onMove}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
                checkSquare={checkSquare}
                theme={theme}
                pieceDesign={pieceDesign}
                showPossibleMoves={showPossibleMoves}
                lastMove={lastMove}
                floatingCapture={floatingCapture}
                showNotation={showNotation}
            />
        );
        expect(container.querySelectorAll('.square.possible-move').length).toBe(possibleMoves.length);
    });

    it('highlights the check square', () => {
        const { container } = render(
            <ChessBoard
                position={position}
                onMove={onMove}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
                checkSquare={checkSquare}
                theme={theme}
                pieceDesign={pieceDesign}
                showPossibleMoves={showPossibleMoves}
                lastMove={lastMove}
                floatingCapture={floatingCapture}
                showNotation={showNotation}
            />
        );
        expect(container.querySelector('.square.check')).toHaveClass('check');
    });

    it('calls onMove when a square is clicked', () => {
        const { container } = render(
            <ChessBoard
                position={position}
                onMove={onMove}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
                checkSquare={checkSquare}
                theme={theme}
                pieceDesign={pieceDesign}
                showPossibleMoves={showPossibleMoves}
                lastMove={lastMove}
                floatingCapture={floatingCapture}
                showNotation={showNotation}
            />
        );
        fireEvent.click(container.querySelector('.square'));
        expect(onMove).toHaveBeenCalled();
    });
});
