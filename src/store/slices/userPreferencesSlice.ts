import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserPreferences = {
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors: string[];
}

const defaultPreferences: UserPreferences = {
  preferredSources: ['newsapi', 'guardian', 'nytimes'],
  preferredCategories: ['health', 'technology', 'business'],
  preferredAuthors: [],
};

const loadSavedPreferences = (): Partial<UserPreferences> => {
  try {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {};
  } catch (error) {
    console.error('Failed to load user preferences:', error);
    return {};
  }
};

const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save user preferences:', error);
  }
};

const initialState: UserPreferences = {
  ...defaultPreferences,
  ...loadSavedPreferences(),
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setPreferredSources: (state, action: PayloadAction<string[]>) => {
      state.preferredSources = action.payload;
      savePreferences({...state});
    },
    setPreferredCategories: (state, action: PayloadAction<string[]>) => {
      state.preferredCategories = action.payload;
      savePreferences({...state});
    },
    setPreferredAuthors: (state, action: PayloadAction<string[]>) => {
      state.preferredAuthors = action.payload;
      savePreferences({...state});
    },
    resetPreferences: (state) => {
      Object.assign(state, defaultPreferences);
      savePreferences({...state});
    },
  },
});

export const {
  setPreferredSources,
  setPreferredCategories,
  setPreferredAuthors,
  resetPreferences,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;