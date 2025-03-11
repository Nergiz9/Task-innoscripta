import React, { useState, ChangeEvent, useEffect } from 'react';
import { useFilters } from '../../../../hooks/useFilters';
import { categories, sources } from '../../../../constants/newsConstants';
import FormInput from '../../../Elements/FormInput/FormInput';
import { SourceOptions } from '../../SourceOptions/SourceOptions';
import { useArraySelection } from '../../../../hooks/useArraySelection';
import { ToggleSwitch } from '../../ToggleSwitch/ToggleSwitch';

/**
 * FilterBar component allows users to filter articles based on selected criteria.
 *
 * This component supports two search modes: 'category' and 'advanced'.
 * - In 'category' mode, users can filter articles by selecting a news category.
 * - In 'advanced' mode, users can filter articles by date range and sources.
 * Because https://newsapi.org/v2/everything endpoint does not support filtering by category.
 * The 'category' mode is limited to filtering by category only and uses the https://newsapi.org/v2/top-headlines endpoint.
 * The component uses the `useFilters` hook to manage the current filters, apply new filters, and reset filters.
 * It also uses the `useArraySelection` hook to manage the selection of sources.
 *
 * The `toggleSearchMode` function is used to switch between 'category' and 'advanced' search modes.
 */

export const FilterBar: React.FC = () => {
  const { currentFilters, applyFilters, resetFilters } = useFilters();

  const [searchMode, setSearchMode] = useState<'category' | 'advanced'>(
    currentFilters.category ? 'category' : 'advanced'
  );

  const {
    selectedItems: selectedSource,
    toggleSelection: toggleSource,
    setSelection: setSources,
  } = useArraySelection<string>(currentFilters.source ? [currentFilters.source] : []);

  const [dateRange, setDateRange] = useState({
    fromDate: currentFilters.fromDate || '',
    toDate: currentFilters.toDate || '',
  });

  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '');

  useEffect(() => {
    if (searchMode === 'category') {
      setSources([]);
      setDateRange({ fromDate: '', toDate: '' });
    } else {
      setSelectedCategory('');
    }
  }, [searchMode]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleApplyFilters = async () => {
    const filters = prepareFilters();
    applyFilters(filters);
  };

  const prepareFilters = () => {
    if (searchMode === 'category') {
      return {
        query: currentFilters.query || '',
        category: selectedCategory || undefined,
        fromDate: undefined,
        toDate: undefined,
        source: undefined,
      };
    } else {
      const sourcesParam = selectedSource.join(',');

      return {
        query: currentFilters.query || (selectedSource.length === 0 ? 'news' : ''),
        fromDate: dateRange.fromDate || undefined,
        toDate: dateRange.toDate || undefined,
        source: sourcesParam || undefined,
        category: undefined,
      };
    }
  };

  const handleResetFilters = () => {
    setDateRange({ fromDate: '', toDate: '' });
    setSelectedCategory('');
    setSources([]);
    resetFilters();
  };

  const toggleSearchMode = () => {
    setSearchMode(prev => (prev === 'category' ? 'advanced' : 'category'));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filter Articles</h2>
        <ToggleSwitch toggleSearchMode={toggleSearchMode} searchMode={searchMode} />
      </div>

      {searchMode === 'category' ? (
        <div className="mb-4">
          <FormInput
            type="select"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            data-testid="category-select"
            options={[
              ...categories.map(category => ({
                value: category,
                label: category.charAt(0).toUpperCase() + category.slice(1),
              })),
            ]}
            label="News Category"
            className="w-full p-2 mt-2 border border-gray-300 rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="From Date"
              type="date"
              name="fromDate"
              value={dateRange.fromDate}
              onChange={handleDateChange}
              data-testid="from-date-input"
              className="w-full p-2 mt-2 border border-gray-300 rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600"
            />

            <FormInput
              label="To Date"
              type="date"
              name="toDate"
              value={dateRange.toDate}
              data-testid="to-date-input"
              onChange={handleDateChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sources</h5>
            <SourceOptions
              sources={sources}
              selectedSource={selectedSource}
              onChange={toggleSource}
            />
          </div>
        </>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleResetFilters}
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilters}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
