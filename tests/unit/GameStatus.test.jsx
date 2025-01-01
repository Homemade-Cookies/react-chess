import React from 'react';
import { render } from '@testing-library/react';
import GameStatus from '../../components/GameStatus';

describe('GameStatus', () => {
    it('displays the correct game status', () => {
        const { getByText } = render(<GameStatus currentPlayer="w" gameStatus="Check" />);
        expect(getByText('Check')).toBeInTheDocument();
    });

    it('displays the correct current player', () => {
        const { getByText } = render(<GameStatus currentPlayer="w" gameStatus="In Progress" />);
        expect(getByText('Current Player: White')).toBeInTheDocument();
    });

    it('applies the correct class for Check status', () => {
        const { container } = render(<GameStatus currentPlayer="w" gameStatus="Check" />);
        expect(container.querySelector('.game-status')).toHaveClass('bg-yellow-500');
    });

    it('applies the correct class for Checkmate status', () => {
        const { container } = render(<GameStatus currentPlayer="w" gameStatus="Checkmate" />);
        expect(container.querySelector('.game-status')).toHaveClass('bg-red-500');
    });

    it('applies the correct class for Draw status', () => {
        const { container } = render(<GameStatus currentPlayer="w" gameStatus="Draw" />);
        expect(container.querySelector('.game-status')).toHaveClass('bg-blue-500');
    });

    it('applies the correct class for Stalemate status', () => {
        const { container } = render(<GameStatus currentPlayer="w" gameStatus="Stalemate" />);
        expect(container.querySelector('.game-status')).toHaveClass('bg-blue-500');
    });

    it('applies the correct class for In Progress status', () => {
        const { container } = render(<GameStatus currentPlayer="w" gameStatus="In Progress" />);
        expect(container.querySelector('.game-status')).toHaveClass('bg-neutral-5');
    });
});
