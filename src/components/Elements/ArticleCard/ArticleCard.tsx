import { ArticleCardProps } from './types';

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const PLACEHOLDER_IMAGE =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  const imageUrl = article.urlToImage || article.imageUrl;

  return (
    <div
      className="bg-white dark:bg-gray-800 mb-4 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      data-testid="article-card"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageUrl || PLACEHOLDER_IMAGE}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            (e.target as HTMLImageElement).classList.add('bg-gray-200', 'dark:bg-gray-600');
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded">
            {article.source.name}
          </span>
        </div>

        <h4 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {article.title}
        </h4>
      </div>
    </div>
  );
};
