'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useCreateCategory } from '@/hooks/useCategories';
import ImageUpload from '@/components/ImageUpload';
import { slugify } from '@/lib/utils';
import type { CategoryFormData } from '@/types/category';

export default function AddCategoryPage() {
  const router = useRouter();
  const createCategory = useCreateCategory();
  const [imageUrl, setImageUrl] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      displayOrder: 0,
      isActive: true,
    },
  });

  const categoryName = watch('name');

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue('name', name);
    if (name) {
      setValue('slug', slugify(name));
    }
  };

  const handleImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setImageUrl(urls[0]);
      setValue('imageUrl', urls[0]);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    const categoryData: CategoryFormData = {
      ...data,
      imageUrl: imageUrl || '',
      displayOrder: parseInt(data.displayOrder.toString()),
      isActive: data.isActive ?? true,
    };

    try {
      await createCategory.mutateAsync(categoryData);
      alert('Category created successfully!');
      router.push('/admin/categories');
    } catch (error: any) {
      alert(error.message || 'Failed to create category');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/categories" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
          ← Back to Categories
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
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
                onChange={handleNameChange}
                className="input"
                placeholder="e.g., Sarees"
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
                placeholder="e.g., sarees"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Used in URL: /category/{watch('slug') || 'slug'}
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
                placeholder="Category description..."
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
                placeholder="0"
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
                  defaultChecked
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
            disabled={createCategory.isPending}
            className="btn-primary"
          >
            {createCategory.isPending ? 'Creating...' : 'Create Category'}
          </button>
          <Link href="/admin/categories" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}


