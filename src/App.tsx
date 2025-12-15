import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ArticleView } from './components/ArticleView';
import { GuessInput } from './components/GuessInput';
import { getDailyArticle, getEmptyArticle, ARTICLES } from './data/articles'; // In real app, use getDailyArticle
import { cleanWord, isRedacted, tokenize } from './utils/gameLogic';
import { usePersistence } from './hooks/usePersistence';

function App() {
  const [article, setArticle] = useState(getEmptyArticle);
  // Store guesses as array in persistence, convert to Set for internal logic
  const [guessList, setGuessList] = usePersistence<string[]>(`guesses-${article.id}`, []);

  console.log('App rendering, Article ID:', article.id);

  const guesses = useMemo(() => new Set(guessList), [guessList]);
  getDailyArticle().then((article)=>setArticle(article));

  // Handle a new guess
  const handleGuess = (word: string) => {
    const cleaned = cleanWord(word);
    if (!cleaned) return;
    if (guesses.has(cleaned)) return;

    setGuessList(prev => [...prev, cleaned]);
  };

  // Check win condition
  const headlineTokens = useMemo(() => tokenize(article.headline), [article]);
  const isHeadlineSolved = headlineTokens
    .filter(t => t.isWord)
    .every(t => !isRedacted(t.text, guesses));

  // Trigger win effect if newly won
  // (Could add confetti or modal here)

  return (
    <div className="App">
      <Header articleId={article.id} headlineRevealed={isHeadlineSolved} />

      <main>
        <ArticleView article={article} guesses={guesses} />
      </main>

      <GuessInput onGuess={handleGuess} guessCount={guesses.size} />

      {isHeadlineSolved && (
        <div style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--bbc-white)',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 100,
          border: '1px solid #ccc',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Solved!</h2>
          <p>You solved it in {guesses.size} guesses.</p>
          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{article.headline}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1.5rem' }}
          >
            Play Again (Demo)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
