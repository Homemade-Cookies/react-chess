import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        const { getByText } = render(
            <ErrorBoundary>
                <div>Test Child</div>
            </ErrorBoundary>
        );
        expect(getByText('Test Child')).toBeInTheDocument();
    });

    it('renders error message when there is an error', () => {
        const ErrorComponent = () => {
            throw new Error('Test Error');
        };

        const { getByText } = render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );
        expect(getByText('Something went wrong.')).toBeInTheDocument();
    });
});
