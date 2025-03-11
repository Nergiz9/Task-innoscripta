import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SourceOptions } from './SourceOptions';

const props = {
  sources: [
    { id: 'bbc', name: 'BBC' },
    { id: 'cnn', name: 'CNN' },
    { id: 'reuters', name: 'Reuters' },
  ],
  selectedSource: [],
  onChange: jest.fn(),
};

describe('SourceOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all sources correctly', () => {
    render(<SourceOptions {...props} />);

    expect(screen.getByText('BBC')).toBeInTheDocument();
    expect(screen.getByText('CNN')).toBeInTheDocument();
    expect(screen.getByText('Reuters')).toBeInTheDocument();
  });

  it('shows selected sources as checked', () => {
    const selectedProps = {
      ...props,
      selectedSource: ['bbc', 'reuters'],
    };

    render(<SourceOptions {...selectedProps} />);

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes).toHaveLength(3);

    const bbcCheckbox = checkboxes.find(checkbox =>
      checkbox.closest('div')?.textContent?.includes('BBC')
    ) as HTMLInputElement;
    const cnnCheckbox = checkboxes.find(checkbox =>
      checkbox.closest('div')?.textContent?.includes('CNN')
    ) as HTMLInputElement;
    const reutersCheckbox = checkboxes.find(checkbox =>
      checkbox.closest('div')?.textContent?.includes('Reuters')
    ) as HTMLInputElement;

    expect(bbcCheckbox).toBeChecked();
    expect(cnnCheckbox).not.toBeChecked();
    expect(reutersCheckbox).toBeChecked();
  });

  it('calls onChange with correct source id when a source is clicked', () => {
    render(<SourceOptions {...props} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const cnnCheckbox = checkboxes.find(checkbox =>
      checkbox.closest('div')?.textContent?.includes('CNN')
    );

    if (cnnCheckbox) {
      fireEvent.click(cnnCheckbox);
    }

    expect(props.onChange).toHaveBeenCalledWith('cnn');
  });

  it('renders the correct number of sources', () => {
    render(<SourceOptions {...props} />);

    const sourceItems = screen.getAllByRole('checkbox');
    expect(sourceItems).toHaveLength(3);
  });

  it('renders correctly with empty sources array', () => {
    const emptyProps = {
      ...props,
      sources: [],
    };

    render(<SourceOptions {...emptyProps} />);

    const container = screen.getByTestId('source-options');
    expect(container).toBeInTheDocument();
    expect(container?.children.length).toBe(0);
  });
});
