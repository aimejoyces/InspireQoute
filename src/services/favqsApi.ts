import { QuoteApiResponse } from '../types';

const API_URL = 'https://favqs.com/api/quotes';

export const fetchQuotes = async (query?: string): Promise<QuoteApiResponse> => {
  const url = query 
    ? `${API_URL}/?filter=${encodeURIComponent(query)}`
    : API_URL;

  const response = await fetch(url, {
    headers: {
      Authorization: 'Token token="a7d485179a251251b9706276f9cc77cc"',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }

  return response.json();
};
