'use client'
import React, { useState } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import FilterProducts from '@/components/FilterProducts';
import ProductReel from '../../components/ProductsReel';
import { TQueryValidator } from '@/lib/validators/query-validator';
import { User } from '@/payload-type';


const ProductFilterPage = ({ user }: { user: User | null }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
      <ProductReel user={user} query={productReelQuery} />
    </MaxWidthWrapper>
  );
};

export default ProductFilterPage;