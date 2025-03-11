import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleSwitch } from './ToggleSwitch';
import { ToggleSwitchProps } from './types';

const props: ToggleSwitchProps = {
  toggleSearchMode: jest.fn(),
  searchMode: 'advanced',
};

describe('ToggleSwitch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when searchMode is advanced', () => {
    render(<ToggleSwitch {...props} />);

    expect(screen.getByText('Category')).toBeInTheDocument();

    const backgroundElement = screen.queryByTestId('toggle-background');
    expect(backgroundElement).toBeInTheDocument();

    const toggleHandle = screen.queryByTestId('toggle-handle');
    expect(toggleHandle).not.toHaveClass('translate-x-7');
  });

  it('renders correctly when searchMode is category', () => {
    const categoryProps: ToggleSwitchProps = {
      ...props,
      searchMode: 'category',
    };

    render(<ToggleSwitch {...categoryProps} />);

    const backgroundElement = screen.queryByTestId('toggle-background');
    expect(backgroundElement).toBeInTheDocument();

    const toggleHandle = screen.queryByTestId('toggle-handle');
    expect(toggleHandle).toHaveClass('translate-x-7');

    const label = screen.getByText('Category');
    expect(label.className).toContain('text-gray-900');
  });

  it('calls toggleSearchMode when clicked via toggle container', () => {
    render(<ToggleSwitch {...props} />);

    const toggleContainer = screen.queryByTestId('toggle-container');
    expect(toggleContainer).toBeInTheDocument();

    if (toggleContainer) {
      fireEvent.click(toggleContainer);
    }

    expect(props.toggleSearchMode).toHaveBeenCalledTimes(1);
  });

  it('calls toggleSearchMode when clicked via toggle switch', () => {
    render(<ToggleSwitch {...props} />);

    const toggleSwitch = screen.getByTestId('toggle-switch');
    expect(toggleSwitch).toBeInTheDocument();

    if (toggleSwitch) {
      fireEvent.click(toggleSwitch);
    }

    expect(props.toggleSearchMode).toHaveBeenCalledTimes(1);
  });
});
