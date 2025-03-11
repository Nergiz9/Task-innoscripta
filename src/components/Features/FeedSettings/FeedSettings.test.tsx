import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeedSettings } from './FeedSettings';
import { useAppDispatch, useAppSelector } from '../../../store';
import { categories } from '../../../constants/newsConstants';

jest.mock('../../../store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../../hooks/useArraySelection', () => ({
  useArraySelection: jest.fn(() => ({
    selectedItems: [],
    toggleSelection: jest.fn(),
    setSelection: jest.fn(),
  })),
}));

const mockDispatch = jest.fn();

describe('FeedSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      preferredSources: [],
      preferredCategories: [],
      preferredAuthors: [],
    });
  });

  it('renders main sections', () => {
    render(<FeedSettings />);

    expect(screen.getByText('Personalize Your News Feed')).toBeInTheDocument();

    expect(screen.getByText('Preferred News Sources')).toBeInTheDocument();
    expect(screen.getByText('Preferred Categories')).toBeInTheDocument();
    expect(screen.getByText('Preferred Authors')).toBeInTheDocument();
  });

  it('renders all categories', () => {
    render(<FeedSettings />);

    categories.forEach(category => {
      const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      expect(screen.getByText(capitalizedCategory)).toBeInTheDocument();
    });
  });

  it('allows adding an author', () => {
    render(<FeedSettings />);

    const authorInput = screen.getByPlaceholderText('Add author name');
    const addButton = screen.getByText('Add');

    fireEvent.change(authorInput, { target: { value: 'News' } });
    fireEvent.click(addButton);

    expect(authorInput).toHaveValue('');
  });

  it('shows message when no authors are added', () => {
    render(<FeedSettings />);

    expect(
      screen.getByText('No preferred authors added yet. Add authors to see more content from them.')
    ).toBeInTheDocument();
  });

  it('saves preferences when save button is clicked', () => {
    render(<FeedSettings />);

    const saveButton = screen.getByText('Save Preferences');
    fireEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });

  it('shows save message after saving preferences', () => {
    render(<FeedSettings />);

    const saveButton = screen.getByText('Save Preferences');
    fireEvent.click(saveButton);

    const saveMessage = screen.getByText('Your preferences have been saved!');
    expect(saveMessage).toBeInTheDocument();
  });

  it('initializes with stored preferences', () => {
    const storedPreferences = {
      preferredSources: ['bbs', 'cnn'],
      preferredCategories: ['technology'],
      preferredAuthors: ['News'],
    };

    (useAppSelector as jest.Mock).mockReturnValue(storedPreferences);

    render(<FeedSettings />);
  });
});
