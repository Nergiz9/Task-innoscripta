import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchArticlesAsync } from '../store/slices/articleSlice';
import { ArticleList } from '../components/Modules/ArticleList/ArticleList';
import CategorySelector from '../components/Modules/CategorySelector/CategorySelector';
import { Heading } from '../components/Elements/Heading/Heading';

const Home = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useAppSelector(state => state.articles);
  const { preferredCategories, preferredAuthors } = useAppSelector(state => state.userPreferences);

  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  useEffect(() => {
    const category =
      selectedCategory || (preferredCategories.length > 0 ? preferredCategories[0] : 'general');

    dispatch(fetchArticlesAsync(category));
  }, [dispatch, selectedCategory, preferredCategories]);

  const filteredArticles =
    preferredAuthors.length > 0
      ? articles.filter(
          article =>
            article.author &&
            preferredAuthors.some(author =>
              article.author?.toLowerCase().includes(author.toLowerCase())
            )
        )
      : articles;

  return (
    <>
      <Heading
        title="Your Personalized News Feed"
        subtitle="Top headlines customized based on your preferences"
      />

      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        preferredCategories={preferredCategories.length > 0 ? preferredCategories : undefined}
      />

      <ArticleList articles={filteredArticles} isLoading={isLoading} error={error} />
    </>
  );
};

export default Home;
