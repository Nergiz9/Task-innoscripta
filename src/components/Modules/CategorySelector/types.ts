export type CategorySelectorProps = {
    selectedCategory: string | null;
    onSelectCategory: (category: string ) => void;
    preferredCategories?: string[];
  }