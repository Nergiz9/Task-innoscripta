import { ArticleProps } from "../../Elements/ArticleCard/types";

export type ArticleListProps = {
    articles: ArticleProps[];
    isLoading: boolean;
    error: string | null;
}