import { QuoteApiResponse } from '../types';

const API_URL = 'https://favqs.com/api/quotes';

export const fetchQuotes = async (query?: string, type?: 'all' | 'body' | 'author'): Promise<QuoteApiResponse> => {
  let url = API_URL;
  
  if (query) {
    const encodedQuery = encodeURIComponent(query);
    url = `${API_URL}?filter=${encodedQuery}`;
    
    // FavQs API: type can be 'author', 'tag', 'user', or 'public'.
    // If the user selects 'author', we use type=author to fetch quotes by that author.
    // If the user selects 'body' (Quotes), we fetch all and filter body client-side
    // as FavQs doesn't have a direct 'body' type filter.
    if (type === 'author') {
      url += '&type=author';
    }
  }

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
