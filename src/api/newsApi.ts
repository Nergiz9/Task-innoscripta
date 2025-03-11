import axios from 'axios';
import { ArticleProps } from '../components/Elements/ArticleCard/types';

type SearchFiltersProps = {
  query?: string;
  fromDate?: string;
  toDate?: string;
  source?: string;
  category?: string;
}

type NewsApiArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const DEFAULT_COUNTRY = 'us';

export const searchArticles = async (filters: SearchFiltersProps): Promise<ArticleProps[]> => {
  try {    
    if (isCategorySearch(filters)) {
      return await searchTopHeadlines(filters.category!, filters.query);
    } else {
      return await searchEverything(filters);
    }
  } catch (error) {
    handleApiError('searchArticles', error as string);
    return [];
  }
};

const isCategorySearch = (filters: SearchFiltersProps): boolean => {
  return Boolean(filters.category && filters.category !== '');
};

const searchTopHeadlines = async (category: string, query?: string): Promise<ArticleProps[]> => {
  try {
    const url = buildTopHeadlinesUrl(category, query);    
    const response = await axios.get(url);
    return transformNewsApiResponse(response.data.articles, category);
  } catch (error) {
    handleApiError('searchTopHeadlines', error as string);
    return [];
  }
};

const searchEverything = async (filters: SearchFiltersProps): Promise<ArticleProps[]> => {
  try {
    const url = buildEverythingUrl(filters);
    
    const response = await axios.get(url);
    return transformNewsApiResponse(response.data.articles);
  } catch (error) {
    handleApiError('searchEverything', error as string);
    return [];
  }
};

const buildTopHeadlinesUrl = (category: string, query?: string): string => {
  const params = new URLSearchParams();
  
  params.append('category', category);
  params.append('country', DEFAULT_COUNTRY);
  
  if (query && query.trim() !== '') {
    params.append('q', query);
  }
  
  params.append('apiKey', NEWS_API_KEY);
  
  return `${NEWS_API_BASE_URL}/top-headlines?${params.toString()}`;
};

const buildEverythingUrl = (filters: SearchFiltersProps): string => {
  const params = new URLSearchParams();
  
  params.append('q', filters.query || '*');
  
  if (filters.fromDate) {
    params.append('from', filters.fromDate);
  }
  
  if (filters.toDate) {
    params.append('to', filters.toDate);
  }
  
  if (filters.source) {
    params.append('sources', filters.source);
  }
  
  if (!filters.query || filters.query === '*') {
    params.append('sortBy', 'publishedAt');
  }
  
  params.append('apiKey', NEWS_API_KEY);
  
  return `${NEWS_API_BASE_URL}/everything?${params.toString()}`;
};

const transformNewsApiResponse = (articles: NewsApiArticle[], category?: string): ArticleProps[] => {
  if (!articles || !Array.isArray(articles)) {
    return [];
  }
  
  return articles.map((article, index) => ({
    id: `newsapi-${index}-${Date.now()}`,
    title: article.title || 'No title',
    description: article.description || '',
    content: article.content || '',
    url: article.url || '',
    imageUrl: article.urlToImage || '',
    publishedAt: article.publishedAt || new Date().toISOString(),
    source: {
      id: article.source?.id || '',
      name: article.source?.name || 'Unknown Source',
    },
    author: article.author || 'Unknown Author',
    category: category || 'general',
  }));
};
const handleApiError = (functionName: string, error: string): void => {
  console.error(`Error in ${functionName}:`, error);
  
  if (axios.isAxiosError(error) && error.response) {
    console.error('API Error Response:', error.response.data);
  }
};

export const fetchTopHeadlines = async (category?: string): Promise<ArticleProps[]> => {
  return searchTopHeadlines(category || 'general');
};