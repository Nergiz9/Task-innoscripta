import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTopHeadlines, searchArticles } from '../../api/newsApi.ts';
import { ArticleProps } from '../../components/Elements/ArticleCard/types.ts';
import { SearchFiltersProps } from '../../components/Modules/SearchFilters/types.ts';

type ArticleState = {
  articles: ArticleProps[];
  isLoading: boolean;
  error: string | null;
  currentFilters: SearchFiltersProps;
}

const initialState: ArticleState = {
  articles: [],
  isLoading: false,
  error: null,
  currentFilters: {
    query: '',
  },
};

export const fetchArticlesAsync = createAsyncThunk(
  'articles/fetchArticles',
  async (category?: string) => {
    const response = await fetchTopHeadlines(category);
    return response;
  }
);

export const searchArticlesAsync = createAsyncThunk(
  'articles/searchArticles',
  async (filters: SearchFiltersProps) => {
    const response = await searchArticles(filters);
    return response;
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<SearchFiltersProps>>) => {
      state.currentFilters = { ...state.currentFilters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticlesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticlesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      })
      .addCase(searchArticlesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchArticlesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(searchArticlesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to search articles';
      });
  },
});

export const { setFilters } = articleSlice.actions;
export default articleSlice.reducer;