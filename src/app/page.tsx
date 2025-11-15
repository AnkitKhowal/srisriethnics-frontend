'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import Filters from '@/components/Filters';
import { useProducts } from '@/hooks/useProducts';

function HomePageContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<any>({});

  // Update filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    setFilters({
      category: category || undefined,
      search: search || undefined,
      isActive: true,
    });
  }, [searchParams]);

  const { data, isLoading, error } = useProducts(filters);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    
    setFilters({
      ...filters,
      search: searchQuery || undefined,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                SriSriEthnics
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-4">
                Premium Traditional Ethnic Wear
              </p>
              <p className="text-lg text-purple-200 mb-12">
                Discover exquisite sarees, lehengas, and traditional outfits crafted with elegance
              </p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-3 backdrop-blur-sm bg-white/10 p-2 rounded-2xl border border-white/20">
                <input
                  type="text"
                  name="search"
                  placeholder="Search for exquisite ethnic wear..."
                  defaultValue={filters.search}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white transition-all"
                />
                <button type="submit" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Products Section */}
        <section className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Filters
                  onFilterChange={setFilters}
                  currentFilters={filters}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {isLoading && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <p className="text-red-600">Error loading products. Please try again.</p>
                </div>
              )}

              {data && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      {data.count} {data.count === 1 ? 'product' : 'products'} found
                    </p>
                  </div>
                  <ProductGrid products={data.products || []} />
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}


