'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { PRICE_RANGES, AVAILABLE_COLORS } from '@/lib/constants';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}

export default function Filters({ onFilterChange, currentFilters }: FiltersProps) {
  const { data: categories } = useCategories(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (categorySlug: string) => {
    onFilterChange({
      ...currentFilters,
      category: currentFilters.category === categorySlug ? undefined : categorySlug,
    });
  };

  const handlePriceChange = (min: number, max: number | null) => {
    onFilterChange({
      ...currentFilters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleColorChange = (color: string) => {
    const currentColors = currentFilters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter((c: string) => c !== color)
      : [...currentColors, color];
    
    onFilterChange({
      ...currentFilters,
      colors: newColors.length > 0 ? newColors : undefined,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <button
        className="lg:hidden w-full btn-outline mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide' : 'Show'} Filters
      </button>

      {/* Filters Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories?.map((category) => (
              <label key={category.categoryId} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentFilters.category === category.slug}
                  onChange={() => handleCategoryChange(category.slug)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm capitalize">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-2">
            {PRICE_RANGES.map((range, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={
                    currentFilters.minPrice === range.min &&
                    currentFilters.maxPrice === range.max
                  }
                  onChange={() => handlePriceChange(range.min, range.max)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="font-semibold mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  currentFilters.colors?.includes(color)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


