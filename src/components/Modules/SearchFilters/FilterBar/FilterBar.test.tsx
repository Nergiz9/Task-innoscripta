import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterBar } from './FilterBar';
import { useFilters } from '../../../../hooks/useFilters';
import { categories, sources } from '../../../../constants/newsConstants';

jest.mock('../../../../hooks/useFilters', () => ({
  useFilters: jest.fn(),
}));

jest.mock('../../../../hooks/useArraySelection', () => ({
  useArraySelection: jest.fn(() => ({
    selectedItems: [],
    toggleSelection: jest.fn(),
    setSelection: jest.fn(),
  })),
}));

const mockApplyFilters = jest.fn();
const mockResetFilters = jest.fn();

const props = {};

describe('FilterBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFilters as jest.Mock).mockReturnValue({
      currentFilters: {},
      applyFilters: mockApplyFilters,
      resetFilters: mockResetFilters,
    });
  });

  it('renders filter bar with default view', () => {
    render(<FilterBar {...props} />);

    expect(screen.getByText('Filter Articles')).toBeInTheDocument();

    const toggleSwitch = screen.getByTestId('toggle-switch');
    expect(toggleSwitch).toBeInTheDocument();
  });

  it('switches to category mode when toggle is clicked', () => {
    render(<FilterBar {...props} />);

    const fromDateLabel = screen.getByText('From Date');
    expect(fromDateLabel).toBeInTheDocument();

    const toDateLabel = screen.getByText('To Date');
    expect(toDateLabel).toBeInTheDocument();

    const toggleSwitch = screen.getByTestId('toggle-switch');
    fireEvent.click(toggleSwitch);

    const categoryLabel = screen.getByText('News Category');
    expect(categoryLabel).toBeInTheDocument();
  });

  it('renders sources in advanced mode', () => {
    render(<FilterBar {...props} />);

    expect(screen.getByText('Sources')).toBeInTheDocument();

    sources.forEach(source => {
      expect(screen.getByText(source.name)).toBeInTheDocument();
    });
  });

  it('renders categories in category mode', () => {
    render(<FilterBar {...props} />);

    const toggleSwitch = screen.getByTestId('toggle-switch');
    fireEvent.click(toggleSwitch);

    categories.forEach(category => {
      const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      expect(screen.getByText(capitalizedCategory)).toBeInTheDocument();
    });
  });

  it('calls reset filters when reset button is clicked', () => {
    render(<FilterBar {...props} />);

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });

  it('calls apply filters when apply button is clicked', () => {
    render(<FilterBar {...props} />);

    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);

    expect(mockApplyFilters).toHaveBeenCalledTimes(1);
  });
});
