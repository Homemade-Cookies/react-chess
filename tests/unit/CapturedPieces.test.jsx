import React from 'react';
import { render } from '@testing-library/react';
import CapturedPieces from '../../components/CapturedPieces';

describe('CapturedPieces', () => {
    const captured = {
        white: ['p', 'r', 'n'],
        black: ['q', 'b', 'k']
    };
    const pieceDesign = 'traditional';

    it('renders white captures correctly', () => {
        const { getByText } = render(<CapturedPieces captured={captured} pieceDesign={pieceDesign} />);
        expect(getByText('White Captures')).toBeInTheDocument();
        expect(getByText('♟')).toBeInTheDocument();
        expect(getByText('♜')).toBeInTheDocument();
        expect(getByText('♞')).toBeInTheDocument();
    });

    it('renders black captures correctly', () => {
        const { getByText } = render(<CapturedPieces captured={captured} pieceDesign={pieceDesign} />);
        expect(getByText('Black Captures')).toBeInTheDocument();
        expect(getByText('♛')).toBeInTheDocument();
        expect(getByText('♝')).toBeInTheDocument();
        expect(getByText('♚')).toBeInTheDocument();
    });
});
