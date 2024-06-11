'use client'
import React, { useState } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import FilterProducts from '@/components/FilterProducts';
import ProductReel from '../../components/ProductsReel';
import { TQueryValidator } from '@/lib/validators/query-validator';
import { User } from '@/payload-type';
import { Search } from 'lucide-react';


const ProductFilterPage = ({ user }: { user: User | null }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  const productReelQuery: TQueryValidator = {
    sort: 'asc',
    limit: 5,
    ...(activeFilter && { category: activeFilter }), 
  };

   return (
    <MaxWidthWrapper className='bg-white'>
      <FilterProducts onFilterSelect={handleFilterChange} />
      <div className='relative mb-2 items-center'>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-2xl pr-10"
        />
         <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
      </div>
      <ProductReel user={user} query={productReelQuery} searchQuery={searchQuery} activeFilter={activeFilter} />
    </MaxWidthWrapper>
  );
};

export default ProductFilterPage;