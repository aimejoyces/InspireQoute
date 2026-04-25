const API_KEY = 'ztmb0gjv4kd2tuhqjd8vd2h8tcdk5kqkx0iu7n6btculj88mk';
const BASE_URL = 'https://api.wordnik.com/v4/word.json';

export const fetchWordDefinition = async (word: string): Promise<{ word: string; definition: string }> => {
  if (!word.trim()) {
    throw new Error('Word is required');
  }

  try {
    const url = `${BASE_URL}/${word.toLowerCase()}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return {
          word,
          definition: "Sorry, we couldn't find a definition for that word."
        };
      }
      throw new Error('Failed to fetch definition');
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      return {
        word,
        definition: "No definition available for this word."
      };
    }

    // Wordnik returns an array of definition objects
    const definition = data[0].text || "No definition text available.";

    return {
      word: data[0].word || word,
      definition: stripHtmlTags(definition)
    };
  } catch (error) {
    console.error('Wordnik API error:', error);
    return {
      word,
      definition: "The dictionary service is currently unavailable. Please check your connection."
    };
  }
};

/**
 * Utility to strip HTML tags that Wordnik sometimes includes in definitions
 */
const stripHtmlTags = (str: string): string => {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, '');
};
