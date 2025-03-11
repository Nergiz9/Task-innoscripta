export type PreferenceInputProps<T> ={
    label: string;
    items: T[];
    selectedItems: T[];
    onToggle: (item: T) => void;
    renderItem?: (item: T) => React.ReactNode;
  }

  export type AuthorInputProps = {
    authorInput: string;
    onInputChange: (value: string) => void;
    onAddAuthor: () => void;
    selectedAuthors: string[];
    onRemoveAuthor: (author: string) => void;
  }