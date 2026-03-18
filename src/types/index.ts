export interface Quote {
  id: number;
  author: string;
  body: string;
  tags: string[];
}

export interface QuoteApiResponse {
  quotes: Quote[];
}
