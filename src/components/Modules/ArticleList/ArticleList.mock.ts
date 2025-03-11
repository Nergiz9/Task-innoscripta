import { ArticleProps } from "../../Elements/ArticleCard/types";

export const mockArticles: ArticleProps[] = [
  {
    id: '1',
    title: 'Test Article 1',
    description: 'Description 1',
    url: 'https://example.com/article1',
    urlToImage: 'https://example.com/image1.jpg',
    publishedAt: '2023-01-01T00:00:00Z',
    source: { id: 'test-source', name: 'Test Source' },
    content: 'Article content 1',
    category: 'general',
  },
  {
    id: '2',
    title: 'Test Article 2',
    description: 'Description 2',
    url: 'https://example.com/article2',
    urlToImage: 'https://example.com/image2.jpg',
    publishedAt: '2023-01-02T00:00:00Z',
    source: { id: 'test-source', name: 'Test Source' },
    content: 'Article content 2',
    category: 'technology',
  },
];