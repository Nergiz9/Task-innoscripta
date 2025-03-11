import { useState, useCallback } from 'react';

export const useArraySelection = <T extends string>(initialSelection: T[] = []) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelection);

  const toggleSelection = useCallback((item: T) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  }, []);

  const setSelection = useCallback((items: T[]) => {
    setSelectedItems(items);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  return {
    selectedItems,
    toggleSelection,
    setSelection,
    clearSelection,
    isSelected: (item: T) => selectedItems.includes(item),
  };
};
