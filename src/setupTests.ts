import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';

// Mock scrollTo since it's not implemented in jsdom
Object.defineProperty(window, 'scrollTo', { value: () => { }, writable: true });

// Clear storage after each test to ensure isolation
afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
});

// Mock fetch using vi.stubGlobal
const mockFetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            id: '999',
            headline: 'Test Headline',
            category: 'Test Category',
            date: '2023-01-01',
            content: ['Test content']
        }),
    })
);

vi.stubGlobal('fetch', mockFetch);
