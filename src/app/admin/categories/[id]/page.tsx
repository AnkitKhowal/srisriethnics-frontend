'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useCategory, useUpdateCategory } from '@/hooks/useCategories';
import ImageUpload from '@/components/ImageUpload';
import type { CategoryFormData } from '@/types/category';

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: category, isLoading } = useCategory(id);
  const updateCategory = useUpdateCategory(id);
  const [imageUrl, setImageUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>();

  // Populate form when category loads
  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('slug', category.slug);
      setValue('description', category.description);
      setValue('displayOrder', category.displayOrder);
      setValue('isActive', category.isActive);
      if (category.imageUrl) {
        setImageUrl(category.imageUrl);
        setValue('imageUrl', category.imageUrl);
      }
    }
  }, [category, setValue]);

  const handleImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setImageUrl(urls[0]);
      setValue('imageUrl', urls[0]);
    } else {
      setImageUrl('');
      setValue('imageUrl', '');
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    const categoryData: Partial<CategoryFormData> = {
      ...data,
      imageUrl: imageUrl || '',
      displayOrder: parseInt(data.displayOrder.toString()),
    };

    try {
      await updateCategory.mutateAsync(categoryData);
      alert('Category updated successfully!');
      router.push('/admin/categories');
    } catch (error: any) {
      alert(error.message || 'Failed to update category');
    }
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading category...</p>;
  }

  if (!category) {
    return <p className="text-red-600">Category not found</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/categories" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
          ← Back to Categories
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                {...register('name', { required: 'Category name is required' })}
                type="text"
                className="input"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug (URL) *
              </label>
              <input
                {...register('slug', {
                  required: 'Slug is required',
                  pattern: {
                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    message: 'Slug must be lowercase with hyphens only',
                  },
                })}
                type="text"
                className="input"
                disabled
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Slug cannot be changed after creation
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                {...register('displayOrder')}
                type="number"
                className="input"
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers appear first in the category list
              </p>
            </div>

            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  {...register('isActive')}
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active (visible to customers)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Category Image */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Category Image</h2>
          <ImageUpload
            onImagesUploaded={handleImageUpload}
            existingImages={imageUrl ? [imageUrl] : []}
            maxImages={1}
          />
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updateCategory.isPending}
            className="btn-primary"
          >
            {updateCategory.isPending ? 'Updating...' : 'Update Category'}
          </button>
          <Link href="/admin/categories" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}


