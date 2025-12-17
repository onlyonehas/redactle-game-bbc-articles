import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the async article functions
vi.mock('./data/articles', async (importOriginal) => {
    const mod = await importOriginal<typeof import('./data/articles')>();

    const mockArticle = {
        index: 1,
        headline: 'Test Article Headline',
        category: 'Test',
        date: '2023-01-01',
        content: ['This is test content for the article.'],
        avgGuesses: 10
    };

    return {
        ...mod,
        getDailyArticle: vi.fn(() => Promise.resolve(mockArticle)),
        getArticleByID: vi.fn(() => Promise.resolve(mockArticle)),
        getEmptyArticle: () => ({
            index: -1,
            headline: '',
            category: '',
            date: '',
            content: [],
            avgGuesses: 0
        }),
        getRandomArticle: vi.fn(() => Promise.resolve({ ...mockArticle, index: 2 }))
    };
});

describe('App Integration', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('registers a user guess', async () => {
        render(<App />);

        // Wait for article to load
        await waitFor(() => screen.getByText('#1'));

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
        await waitFor(() => screen.getByText('#1'));

        const input = screen.getByPlaceholderText('Type a guess...');
        const button = screen.getByRole('button', { name: /GUESS/ });

        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(button);

        expect(button).toHaveTextContent('GUESS (0)');
    });
});
