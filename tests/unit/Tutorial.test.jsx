import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tutorial from '../../components/Tutorial';

describe('Tutorial', () => {
    const onClose = jest.fn();

    it('renders the tutorial dialog correctly', () => {
        const { getByText } = render(<Tutorial onClose={onClose} />);
        expect(getByText('Chess Game Tutorial')).toBeInTheDocument();
        expect(getByText('Welcome to the Chess Game!')).toBeInTheDocument();
        expect(getByText('Here are the basic rules and controls:')).toBeInTheDocument();
        expect(getByText('Click on a piece to select it.')).toBeInTheDocument();
        expect(getByText('Possible moves will be highlighted.')).toBeInTheDocument();
        expect(getByText('Click on a highlighted square to move the piece.')).toBeInTheDocument();
        expect(getByText('The game ends in checkmate, stalemate, or draw.')).toBeInTheDocument();
        expect(getByText('Use the buttons to reset, save, or load the game.')).toBeInTheDocument();
    });

    it('calls onClose when the Start Game button is clicked', () => {
        const { getByText } = render(<Tutorial onClose={onClose} />);
        fireEvent.click(getByText('Start Game'));
        expect(onClose).toHaveBeenCalled();
    });
});
