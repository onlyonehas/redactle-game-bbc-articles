import React from 'react';
import { tokenize, isRedacted } from '../utils/gameLogic';
import type { Article, WordToken } from '../utils/gameLogic';

interface ArticleViewProps {
    article: Article;
    guesses: Set<string>;
}

const Token: React.FC<{ token: WordToken, guesses: Set<string> }> = ({ token, guesses }) => {
    if (!token.isWord) {
        return <span>{token.text}</span>;
    }

    const hidden = isRedacted(token.text, guesses);
    const classes = hidden ? "redacted" : "revealed";

    // If hidden, preserve length but hide text. 
    // Actually, traditionally Redactle shows xxxx or block of same length.
    // CSS .redacted handles background color and transparent text.

    return (
        <span className={classes}>
            {token.text}
        </span>
    );
};

export const ArticleView: React.FC<ArticleViewProps> = ({ article, guesses }) => {
    const headlineTokens = tokenize(article.headline);
    const contentParagraphs = article.content.map(p => tokenize(p));

    const isHeadlineSolved = headlineTokens
        .filter(t => t.isWord)
        .every(t => !isRedacted(t.text, guesses));

    const [categoryRevealed, setCategoryRevealed] = React.useState(false);

    // Auto-reveal category on win
    React.useEffect(() => {
        if (isHeadlineSolved) setCategoryRevealed(true);
    }, [isHeadlineSolved]);

    return (
        <article className="container" style={{ paddingBottom: '100px', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>
                {headlineTokens.map((t, i) => <Token key={i} token={t} guesses={guesses} />)}
            </h1>

            <div style={{
                borderTop: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
                padding: '0.8rem 0',
                marginBottom: '2rem',
                color: '#4a4a4a',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                <span style={{ fontWeight: 700, color: '#333' }}>{article.date}</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700 }}>Category:</span>
                    {categoryRevealed ? (
                        <span style={{
                            backgroundColor: 'var(--bbc-red)',
                            color: 'white',
                            padding: '0.1rem 0.5rem',
                            fontWeight: 700
                        }}>
                            {article.category.toUpperCase()}
                        </span>
                    ) : (
                        <button
                            onClick={() => setCategoryRevealed(true)}
                            style={{
                                fontSize: '0.8rem',
                                padding: '0.2rem 0.6rem',
                                backgroundColor: '#f0f0f0',
                                color: '#333',
                                border: '1px solid #ccc'
                            }}
                            title="Click to reveal category (Hint)"
                        >
                            Reveal Hint
                        </button>
                    )}
                </div>
            </div>

            <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                {contentParagraphs.map((paragraph, i) => (
                    <p key={i} style={{ marginBottom: '1.5rem' }}>
                        {paragraph.map((t, j) => <Token key={j} token={t} guesses={guesses} />)}
                    </p>
                ))}
            </div>
        </article>
    );
};
