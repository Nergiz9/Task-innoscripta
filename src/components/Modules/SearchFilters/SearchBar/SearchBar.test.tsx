import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './SearchBar';
import { useFilters } from '../../../../hooks/useFilters';

jest.mock('../../../../hooks/useFilters', () => ({
  useFilters: jest.fn(),
}));

const mockApplyFilters = jest.fn();

const props = {};

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFilters as jest.Mock).mockReturnValue({
      currentFilters: {},
      applyFilters: mockApplyFilters,
    });
  });

  it('renders search input and button', () => {
    render(<SearchBar {...props} />);

    const searchInput = screen.getByPlaceholderText('Search for news articles...');
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });

  it('allows typing in the search input', () => {
    render(<SearchBar {...props} />);

    const searchInput = screen.getByPlaceholderText('Search for news articles...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(searchInput).toHaveValue('test query');
  });

  it('disables search button when input is empty', () => {
    render(<SearchBar {...props} />);

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeDisabled();
  });

  it('enables search button when input is not empty', () => {
    render(<SearchBar {...props} />);

    const searchInput = screen.getByPlaceholderText('Search for news articles...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    const searchButton = screen.getByText('Search');
    expect(searchButton).not.toBeDisabled();
  });

  it('uses current filters query as initial value', () => {
    (useFilters as jest.Mock).mockReturnValue({
      currentFilters: { query: 'existing query' },
      applyFilters: mockApplyFilters,
    });

    render(<SearchBar {...props} />);

    const searchInput = screen.getByPlaceholderText('Search for news articles...');
    expect(searchInput).toHaveValue('existing query');
  });
});
