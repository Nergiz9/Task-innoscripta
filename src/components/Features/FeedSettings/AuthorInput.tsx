import { ChangeEvent } from 'react';
import FormInput from '../../Elements/FormInput/FormInput';
import { AuthorInputProps } from './types';

export const AuthorInput = ({
  authorInput,
  onInputChange,
  onAddAuthor,
  selectedAuthors,
  onRemoveAuthor,
}: AuthorInputProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
      Preferred Authors
    </h3>
    <div className="flex">
      <FormInput
        type="text"
        value={authorInput}
        name="author"
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
          onInputChange(e.target.value)
        }
        placeholder="Add author name"
        className="w-full flex-grow p-2 border border-gray-300 rounded-l rounded-tr-none rounded-br-none text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600"
      />
      <button
        onClick={onAddAuthor}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r"
      >
        Add
      </button>
    </div>

    {selectedAuthors.length > 0 ? (
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedAuthors.map(author => (
          <div
            key={author}
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center"
          >
            <span>{author}</span>
            <button
              onClick={() => onRemoveAuthor(author)}
              className="ml-2 text-blue-600 dark:text-blue-400 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    ) : (
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        No preferred authors added yet. Add authors to see more content from them.
      </p>
    )}
  </div>
);
