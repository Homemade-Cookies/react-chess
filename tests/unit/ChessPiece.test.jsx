import React from 'react';
import { render } from '@testing-library/react';
import ChessPiece from '../../components/ChessPiece';

describe('ChessPiece', () => {
    const piece = { type: 'p', color: 'w' };
    const design = 'traditional';
    const isMoving = false;
    const showNotation = false;

    it('renders the chess piece correctly', () => {
        const { getByText } = render(<ChessPiece piece={piece} design={design} isMoving={isMoving} showNotation={showNotation} />);
        expect(getByText('♟')).toBeInTheDocument();
    });

    it('applies the correct class for the piece color', () => {
        const { container } = render(<ChessPiece piece={piece} design={design} isMoving={isMoving} showNotation={showNotation} />);
        expect(container.querySelector('.piece.w')).toBeInTheDocument();
    });

    it('applies the moving class when isMoving is true', () => {
        const { container } = render(<ChessPiece piece={piece} design={design} isMoving={true} showNotation={showNotation} />);
        expect(container.querySelector('.piece.moving')).toBeInTheDocument();
    });

    it('displays the notation when showNotation is true', () => {
        const { getByText } = render(<ChessPiece piece={piece} design={design} isMoving={isMoving} showNotation={true} />);
        expect(getByText('♟ (wp)')).toBeInTheDocument();
    });
});
