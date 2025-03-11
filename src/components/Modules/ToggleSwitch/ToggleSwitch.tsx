import FormInput from '../../Elements/FormInput/FormInput';
import { ToggleSwitchProps } from './types';

export const ToggleSwitch = ({ toggleSearchMode, searchMode }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center">
      <div
        className="relative inline-flex items-center cursor-pointer"
        onClick={toggleSearchMode}
        data-testid="toggle-container"
        aria-label="Toggle search mode"
        role="button"
      >
        <FormInput
          type="checkbox"
          name="searchMode"
          value={searchMode === 'category'}
          onChange={toggleSearchMode}
          className="sr-only"
          parentClassName="relative"
        />
        <div
          className="w-14 h-7 rounded-full transition-colors duration-200 ease-in-out"
          data-testid="toggle-switch"
        >
          <div
            className={`absolute inset-0 rounded-full ${
              searchMode === 'category' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            data-testid="toggle-background"
          ></div>
          <div
            data-testid="toggle-handle"
            className={`absolute top-1 left-1 bg-white dark:bg-gray-200 w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
              searchMode === 'category' ? 'transform translate-x-7' : ''
            }`}
          ></div>
        </div>
      </div>
      <span
        className={`ml-2 text-sm font-medium ${searchMode === 'category' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
      >
        Category
      </span>
    </div>
  );
};
