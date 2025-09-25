// src/components/QuantityInput.tsx

import React from 'react';

interface QuantityInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  'aria-label': string;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange, disabled, ...props }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      disabled={disabled}
      min="0"
      className="w-full h-full p-1 text-center border-0 focus:ring-0 disabled:bg-gray-100"
      aria-label={props['aria-label']}
    />
  );
};

export default QuantityInput;
