'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategories, useDeleteCategory } from '@/hooks/useCategories';

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategories(undefined);
  const deleteCategory = useDeleteCategory();

  const handleDelete = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"? This will affect all products in this category.`)) {
      return;
    }

    try {
      await deleteCategory.mutateAsync(categoryId);
      alert('Category deleted successfully');
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <Link href="/admin/categories/add" className="btn-primary">
          + Add Category
        </Link>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories && categories.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No categories found
            </div>
          ) : (
            categories?.map((category) => (
              <div key={category.categoryId} className="card">
                {category.imageUrl && (
                  <div className="relative aspect-video">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">/{category.slug}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        category.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  {category.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Display Order: {category.displayOrder}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/categories/${category.categoryId}`}
                      className="flex-1 text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(category.categoryId, category.name)
                      }
                      className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}


