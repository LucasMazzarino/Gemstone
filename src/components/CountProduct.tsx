'use client'

import { useState } from "react";

interface CountProductProps {
  count: number;
  onCountChange: (newCount: number) => void;
}

const CountProduct = ({ count, onCountChange }: CountProductProps) => {
  const [inputCount, setInputCount] = useState<number>(count);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value);
    setInputCount(newCount);
    onCountChange(newCount);
  };

  return (
    <input
      id="cantInput"
      className='w-10 h-6 ml-2 bg-gray-700 text-white text-center'
      type="number"
      value={inputCount}
      min="1"
      max="100"
      onChange={handleChange}
    />
  );
};

export default CountProduct;