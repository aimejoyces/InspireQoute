export interface Quote {
  id: number;
  author: string;
  body: string;
  tags: string[];
}

export interface QuoteApiResponse {
  quotes: Quote[];
}

export interface QuoteItem {
  id: string;
  body: string;
  author: string;
  isFavorite?: boolean;
  isUserAdded?: boolean;
}
