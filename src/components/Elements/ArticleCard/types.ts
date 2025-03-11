
 export type ArticleProps = {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage?: string;
  imageUrl?: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author?: string;
  category: string;
}

export type ArticleCardProps = {
  article: ArticleProps;
}

