import { HeadingProps } from './types';

export const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
  );
};
