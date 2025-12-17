/**
 * Submits a score to the remote API with validation.
 * @param {Object} params
 * @param {number} params.score - The score to submit.
 * @param {string} [params.username] - The username (alphanumeric, optional).
 * @param {string} params.game - The game name (alphanumeric).
 * @param {string} [params.date] - The date in YYYY-MM-DD format (optional).
 * @returns {Promise<Response>} The fetch response.
 */
export async function submitScore({ score, username, game, date }: any) {
  // Retrieve username from localStorage if not provided
  let finalUsername = username;
  if (!finalUsername) {
    throw new Error('No username found. Please log in.');
  }

  // Validate username and game (alphanumeric only)
  const alphanumeric = /^[a-zA-Z0-9]+$/;
  if (!alphanumeric.test(finalUsername)) {
    throw new Error('Username must be alphanumeric');
  }

  // Validate or set date
  let finalDate = date;
  if (!finalDate) {
    const today = new Date();
    finalDate = today.toISOString().slice(0, 10); // YYYY-MM-DD
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(finalDate)) {
    throw new Error('Date must be in YYYY-MM-DD format');
  }

  const body = {
    username: finalUsername,
    score,
    game,
    date: finalDate
  };

  const response = await fetch('https://faa9gwlric.execute-api.eu-west-1.amazonaws.com/prod/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response;
}