import { useState, FormEvent, ChangeEvent } from 'react';
import FormInput from '../../../Elements/FormInput/FormInput';
import { useFilters } from '../../../../hooks/useFilters';

export const SearchBar = () => {
  const { currentFilters, applyFilters } = useFilters();
  const [query, setQuery] = useState(currentFilters.query || '');

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: FormEvent): void => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    applyFilters({ query: trimmedQuery });
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full mb-6" data-testid="search-form">
      <FormInput
        type="text"
        value={query}
        name="query"
        onChange={handleQueryChange}
        data-testid="search-input"
        placeholder="Search for news articles..."
        className="w-full flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-r-md"
        disabled={!query.trim()}
      >
        Search
      </button>
    </form>
  );
};
