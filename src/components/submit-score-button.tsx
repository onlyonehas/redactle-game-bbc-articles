import { useState } from 'react';
import { submitScore } from '../utils/submit-score';

/**
 * Button component to submit a score using submitScore function.
 * Props:
 *   - score: number
 *   - game: string
 *   - date?: string
 */
export function SubmitScoreButton({ score, game, username, date, style, className }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await submitScore({ score, game, username, date });
      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', ...style }} className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || username === '' || !username}
        style={{
          width: '100%',
          padding: '0.8rem 1.5rem',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          color: '#bb1919',
          fontSize: '1rem',
          cursor: 'pointer',
          ...(loading || !username ? { opacity: 0.5, cursor: 'not-allowed' } : {})
        }}
      >
        {loading ? 'Submitting...' : 'Submit Score'}
      </button>
      {error && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', fontSize: '0.8rem', marginTop: '0.25rem' }}>Score submitted!</div>}
    </div>
  );
}