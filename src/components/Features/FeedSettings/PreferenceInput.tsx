import FormInput from '../../Elements/FormInput/FormInput';
import { PreferenceInputProps } from './types';

export const PreferenceInput = <T extends string>({
  label,
  items,
  selectedItems,
  onToggle,
  renderItem,
}: PreferenceInputProps<T>) => {
  const defaultRenderer = (item: T) => (
    <FormInput
      type="checkbox"
      name={`pref-${label.toLowerCase()}`}
      value={selectedItems.includes(item)}
      onChange={() => onToggle(item)}
      label={item.charAt(0).toUpperCase() + item.slice(1)}
      className="mr-2 h-4 w-4"
      parentClassName="flex flex-row-reverse items-center justify-end"
    />
  );

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {items.map(item => (
          <div key={item}>{renderItem ? renderItem(item) : defaultRenderer(item)}</div>
        ))}
      </div>
    </div>
  );
};
