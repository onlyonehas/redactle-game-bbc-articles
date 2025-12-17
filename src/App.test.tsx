import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

// Mock getDailyArticle to always return the first article (ID 1)
vi.mock('./data/articles', async (importOriginal) => {
    const mod = await importOriginal<typeof import('./data/articles')>();
    return {
        ...mod,
        getDailyArticle: () => mod.ARTICLES[0],
    };
});

describe('App Integration', () => {
    it('registers a user guess', async () => {
        render(<App />);

        // Wait for article to load (daily article index is 1)
        await screen.findByText('#1');

        const input = screen.getByPlaceholderText('Type a guess...');
        const button = screen.getByRole('button', { name: /GUESS/ });

        // Initial state
        expect(button).toHaveTextContent('GUESS (0)');

        // Type a guess
        fireEvent.change(input, { target: { value: 'world' } });
        fireEvent.click(button);

        // Expect input to be cleared
        expect(input).toHaveValue('');

        // Expect guess count to increment
        expect(button).toHaveTextContent('GUESS (1)');
    });

    it('ignores empty input', async () => {
        render(<App />);

        // Wait for article to load
        await screen.findByText('#1');

        const input = screen.getByPlaceholderText('Type a guess...');
        const button = screen.getByRole('button', { name: /GUESS/ });

        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(button);

        expect(button).toHaveTextContent('GUESS (0)');
    });
});
