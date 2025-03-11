import { useAppDispatch, useAppSelector } from '../store';
import { ArticleList } from '../components/Modules/ArticleList/ArticleList';
import { SearchBar, FilterBar } from '../components/Modules/SearchFilters';
import { fetchArticlesAsync } from '../store/slices/articleSlice';
import { useEffect } from 'react';
import { Heading } from '../components/Elements/Heading/Heading';

export const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useAppSelector(state => state.articles);
  useEffect(() => {
    dispatch(fetchArticlesAsync('general'));
  }, [dispatch]);

  return (
    <>
      <Heading
        title="Search Articles"
        subtitle="Search for news articles across multiple sources"
      />
      <SearchBar />
      <FilterBar />
      <ArticleList articles={articles} isLoading={isLoading} error={error} />
    </>
  );
};
