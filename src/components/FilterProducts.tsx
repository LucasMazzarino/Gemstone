'use client'
import React from 'react'
import { useState } from 'react'
import { PRODUCT_CATEGORIES } from '@/config'


interface FilterProductsProps {
  onFilterSelect: (filter: string | null) => void;
}

const FilterProducts: React.FC<FilterProductsProps> = ({ onFilterSelect }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)


  const handleFilterClick = (filter: string | null) => {
    const newFilter = activeFilter === filter ? null : filter; 
    setActiveFilter(newFilter);
    onFilterSelect(newFilter); 
  }

  return (
    <div className='flex flex-row text-muted-foreground justify-between space-x-4 mt-4 pb-10 p-4 overflow-x-auto'>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <p
          key={index}
          className={`cursor-pointer ${
            activeFilter === category.value ? 'font-bold' : ''
          }`}
          onClick={() => handleFilterClick(category.value)}
        >
          {category.label}
        </p>
      ))}
    </div>
  );
};


export default FilterProducts