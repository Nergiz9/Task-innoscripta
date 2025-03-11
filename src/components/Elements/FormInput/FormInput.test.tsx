import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import FormInput from './FormInput';
import { FormInputProps } from './types';

describe('<FormInput />', () => {
  const baseProps: FormInputProps = {
    type: 'text',
    label: 'Test Label',
    name: 'testInput',
    value: '',
    onChange: jest.fn(),
    options: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label when provided', () => {
    render(<FormInput {...baseProps} />);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('block text-sm mb-0 font-medium text-gray-700 dark:text-gray-300');
  });

  it('does not render label when not provided', () => {
    const propsWithoutLabel = { ...baseProps, label: undefined };
    render(<FormInput {...propsWithoutLabel} />);

    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('renders text input correctly', () => {
    render(<FormInput {...baseProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'testInput');
  });

  it('renders checkbox input correctly', () => {
    const checkboxProps: FormInputProps = {
      ...baseProps,
      type: 'checkbox',
      value: false,
      options: [],
    };
    render(<FormInput {...checkboxProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('name', 'testInput');
  });

  it('renders select input correctly', () => {
    const selectProps: FormInputProps = {
      ...baseProps,
      type: 'select',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      value: '',
    };
    render(<FormInput {...selectProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'testInput');

    const defaultOption = screen.getByText('Select an option');
    expect(defaultOption).toBeInTheDocument();

    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('calls onChange handler', () => {
    render(<FormInput {...baseProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const propsWithClassName: FormInputProps = {
      ...baseProps,
      className: 'custom-class',
    };
    render(<FormInput {...propsWithClassName} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('applies custom parentClassName', () => {
    const propsWithParentClassName: FormInputProps = {
      ...baseProps,
      parentClassName: 'custom-parent-class',
    };
    render(<FormInput {...propsWithParentClassName} />);

    const parentDiv = screen.getByTestId('form-input');
    expect(parentDiv).toHaveClass('custom-parent-class');
  });

  it('handles placeholder for text input', () => {
    const propsWithPlaceholder: FormInputProps = {
      ...baseProps,
      placeholder: 'Enter text',
    };
    render(<FormInput {...propsWithPlaceholder} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('handles placeholder for select input', () => {
    const selectProps: FormInputProps = {
      ...baseProps,
      type: 'select',
      options: [{ value: 'option1', label: 'Option 1' }],
      placeholder: 'Choose an option',
      value: '',
    };
    render(<FormInput {...selectProps} />);

    const defaultOption = screen.getByText('Choose an option');
    expect(defaultOption).toBeInTheDocument();
  });
});
