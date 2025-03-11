import FormInput from '../../Elements/FormInput/FormInput';
import { SourceOptionsProps } from './types';

export const SourceOptions = ({ sources, onChange, selectedSource }: SourceOptionsProps) => {
  return (
    <div className="space-y-2" data-testid="source-options">
      {sources.map(source => (
        <div key={source.id} className="flex items-center">
          <FormInput
            type="checkbox"
            name="source"
            value={selectedSource.includes(source.id)}
            onChange={() => onChange(source.id)}
            label={source.name}
            className="ml-2"
            parentClassName="flex flex-row-rewerse items-center"
          />
        </div>
      ))}
    </div>
  );
};
