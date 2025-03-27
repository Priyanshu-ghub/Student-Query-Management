const API_URL = 'http://localhost:5000/api/queries';

export const fetchQueries = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const submitQuery = async (queryData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(queryData)
  });
  if (!response.ok) throw new Error('Submission failed');
  return response.json();
};