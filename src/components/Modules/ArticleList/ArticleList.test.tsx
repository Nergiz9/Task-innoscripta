import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArticleList } from './ArticleList';
import { ArticleListProps } from './types';
import { mockArticles } from './ArticleList.mock';

const props: ArticleListProps = {
  articles: mockArticles,
  isLoading: false,
  error: null,
};

describe('ArticleList', () => {
  it('renders articles correctly', () => {
    render(<ArticleList {...props} />);

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  it('renders loading spinner when isLoading is true', () => {
    const loadingProps: ArticleListProps = {
      ...props,
      articles: [],
      isLoading: true,
    };

    render(<ArticleList {...loadingProps} />);

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders error message when error is present', () => {
    const errorProps: ArticleListProps = {
      ...props,
      articles: [],
      error: 'Test error message',
    };

    render(<ArticleList {...errorProps} />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders no articles message when articles array is empty', () => {
    const emptyProps: ArticleListProps = {
      ...props,
      articles: [],
    };

    render(<ArticleList {...emptyProps} />);

    expect(
      screen.getByText('No articles found. Try adjusting your search criteria.')
    ).toBeInTheDocument();
  });

  it('renders correct number of article cards', () => {
    render(<ArticleList {...props} />);

    const articleCards = screen.getAllByTestId('article-card');
    expect(articleCards).toHaveLength(2);
  });
});
