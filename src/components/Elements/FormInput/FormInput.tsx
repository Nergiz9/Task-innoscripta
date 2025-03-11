import { FormInputProps } from './types';

const FormInput = ({
  type,
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = '',
  className = '',
  parentClassName = '',
}: FormInputProps) => {
  return (
    <div className={`w-full ${parentClassName}`} data-testid="form-input">
      {label && (
        <label className="block text-sm mb-0 font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      {type === 'select' ? (
        <select name={name} value={value as string} onChange={onChange} className={className}>
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={type === 'checkbox' ? undefined : (value as string)}
          checked={type === 'checkbox' ? (value as boolean) : undefined}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
};

export default FormInput;
