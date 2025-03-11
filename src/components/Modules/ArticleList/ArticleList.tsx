import { ArticleCard } from '../../Elements/ArticleCard/ArticleCard';
import { LoadingSpinner } from '../../Elements/LoadingSpinner';
import { ArticleListProps } from './types';

export const ArticleList = ({ articles, isLoading, error }: ArticleListProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400">
          No articles found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard key={article.publishedAt} article={article} />
      ))}
    </div>
  );
};
