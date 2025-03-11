import { useCallback } from 'react';
import { SearchFiltersProps } from '../components/Modules/SearchFilters/types';
import { useAppDispatch, useAppSelector } from '../store';
import { searchArticlesAsync, setFilters } from '../store/slices/articleSlice';

export const useFilters = () => {
  const dispatch = useAppDispatch();
  const currentFilters = useAppSelector(state => state.articles.currentFilters);

  const applyFilters = useCallback(
    (newFilters: Partial<SearchFiltersProps>) => {
      const updatedFilters = { ...currentFilters, ...newFilters };
      dispatch(setFilters(updatedFilters));
      dispatch(searchArticlesAsync(updatedFilters));
    },
    [dispatch, currentFilters]
  );

  const resetFilters = useCallback(
    (defaultQuery = 'news') => {
      const resetFilters = {
        query: currentFilters.query || defaultQuery,
        fromDate: undefined,
        toDate: undefined,
        category: undefined,
        source: undefined,
      };

      dispatch(setFilters(resetFilters));
      dispatch(searchArticlesAsync(resetFilters));
    },
    [dispatch, currentFilters]
  );

  return {
    currentFilters,
    applyFilters,
    resetFilters,
  };
};
