import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  setPreferredAuthors,
  setPreferredCategories,
  setPreferredSources,
} from '../../../store/slices/userPreferencesSlice';
import { categories, sources } from '../../../constants/newsConstants';
import { SourceOptions } from '../../Modules/SourceOptions/SourceOptions';
import { useArraySelection } from '../../../hooks/useArraySelection';
import { PreferenceInput } from './PreferenceInput';
import { AuthorInput } from './AuthorInput';

export const FeedSettings = () => {
  const dispatch = useAppDispatch();
  const storedPreferences = useAppSelector(state => state.userPreferences);

  const {
    selectedItems: selectedSources,
    toggleSelection: toggleSource,
    setSelection: setSources,
  } = useArraySelection<string>();

  const {
    selectedItems: selectedCategories,
    toggleSelection: toggleCategory,
    setSelection: setCategories,
  } = useArraySelection<string>();

  const {
    selectedItems: selectedAuthors,
    toggleSelection: toggleAuthor,
    setSelection: setAuthors,
  } = useArraySelection<string>();

  const [authorInput, setAuthorInput] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const initializePreferences = () => {
      setSources(storedPreferences.preferredSources);
      setCategories(storedPreferences.preferredCategories);
      setAuthors(storedPreferences.preferredAuthors);
    };

    initializePreferences();
  }, [storedPreferences, setSources, setCategories, setAuthors]);

  const handleAddAuthor = () => {
    if (authorInput && !selectedAuthors.includes(authorInput)) {
      toggleAuthor(authorInput);
      setAuthorInput('');
    }
  };

  const savePreferences = () => {
    dispatch(setPreferredSources(selectedSources));
    dispatch(setPreferredCategories(selectedCategories));
    dispatch(setPreferredAuthors(selectedAuthors));

    setSaveMessage('Your preferences have been saved!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Personalize Your News Feed
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Preferred News Sources
        </h3>
        <SourceOptions sources={sources} selectedSource={selectedSources} onChange={toggleSource} />
      </div>

      <PreferenceInput
        label="Preferred Categories"
        items={categories}
        selectedItems={selectedCategories}
        onToggle={toggleCategory}
      />

      <AuthorInput
        authorInput={authorInput}
        onInputChange={setAuthorInput}
        onAddAuthor={handleAddAuthor}
        selectedAuthors={selectedAuthors}
        onRemoveAuthor={toggleAuthor}
      />

      <div className="mt-6">
        <button
          onClick={savePreferences}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
        >
          Save Preferences
        </button>

        {saveMessage && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-center">
            {saveMessage}
          </div>
        )}
      </div>
    </div>
  );
};
