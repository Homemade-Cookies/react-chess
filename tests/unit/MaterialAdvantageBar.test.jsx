import React from 'react';
import { render } from '@testing-library/react';
import MaterialAdvantageBar from '../../components/MaterialAdvantageBar';

describe('MaterialAdvantageBar', () => {
    it('renders the bar with correct width and color for positive advantage', () => {
        const { container } = render(<MaterialAdvantageBar advantage={5} />);
        const bar = container.querySelector('.bg-blue-500');
        expect(bar).toBeInTheDocument();
        expect(bar.style.width).toBe('25%');
    });

    it('renders the bar with correct width and color for negative advantage', () => {
        const { container } = render(<MaterialAdvantageBar advantage={-3} />);
        const bar = container.querySelector('.bg-red-500');
        expect(bar).toBeInTheDocument();
        expect(bar.style.width).toBe('15%');
    });

    it('renders the bar with maximum width for large advantage', () => {
        const { container } = render(<MaterialAdvantageBar advantage={30} />);
        const bar = container.querySelector('.bg-blue-500');
        expect(bar).toBeInTheDocument();
        expect(bar.style.width).toBe('100%');
    });
});
