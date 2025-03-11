import { ChangeEvent } from "react";

export type FormInputProps = {
  type: 'text' | 'date' | 'select' | 'checkbox';
  label?: string;
  name: string;
  value: string | boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: Array<{value: string, label: string}>;
  placeholder?: string;
  className?: string;
  parentClassName?: string;
}