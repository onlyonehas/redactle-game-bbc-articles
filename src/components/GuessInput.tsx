import React, { useState } from 'react';

interface GuessInputProps {
    onGuess: (word: string) => void;
    guessCount: number;
    onToggleHint: () => void;
    isHintMode: boolean;
}

export const GuessInput: React.FC<GuessInputProps> = ({ onGuess, guessCount, onToggleHint, isHintMode }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onGuess(input.trim());
            setInput('');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            borderTop: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            zIndex: 50
        }}>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                width: '100%',
                maxWidth: '600px',
                gap: '0.5rem'
            }}>
                <button
                    type="button"
                    onClick={onToggleHint}
                    style={{
                        padding: '0 1rem',
                        backgroundColor: isHintMode ? '#ffd700' : '#e0e0e0',
                        color: isHintMode ? 'black' : '#333',
                        border: '1px solid #ccc',
                        fontWeight: isHintMode ? 'bold' : 'normal',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Click, then click a word to reveal it"
                >
                    Hint
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a guess..."
                    style={{
                        flex: 1,
                        padding: '0.8rem',
                        fontSize: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '0'
                    }}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />
                <button type="submit">GUESS ({guessCount})</button>
            </form>
        </div>
    );
};
