'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useCreateProduct } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import ImageUpload from '@/components/ImageUpload';
import { AVAILABLE_SIZES, AVAILABLE_COLORS } from '@/lib/constants';
import type { ProductFormData } from '@/types/product';

export default function AddProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const { data: categories } = useCategories();
  const [images, setImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const onSubmit = async (data: ProductFormData) => {
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    const productData: ProductFormData = {
      ...data,
      price: parseFloat(data.price.toString()),
      stock: parseInt(data.stock.toString()),
      images,
      sizes: selectedSizes,
      colors: selectedColors,
      isActive: data.isActive ?? true,
    };

    try {
      await createProduct.mutateAsync(productData);
      alert('Product created successfully!');
      router.push('/admin/products');
    } catch (error: any) {
      alert(error.message || 'Failed to create product');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                {...register('name', { required: 'Product name is required' })}
                type="text"
                className="input"
                placeholder="e.g., Silk Saree - Red"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="input"
                placeholder="Product description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' },
                  })}
                  type="number"
                  step="0.01"
                  className="input"
                  placeholder="5999"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  {...register('stock', {
                    required: 'Stock is required',
                    min: { value: 0, message: 'Stock cannot be negative' },
                  })}
                  type="number"
                  className="input"
                  placeholder="10"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="input"
              >
                <option value="">Select category</option>
                {categories?.map((category) => (
                  <option key={category.categoryId} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
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

        {/* Images */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Product Images *</h2>
          <ImageUpload onImagesUploaded={setImages} existingImages={images} maxImages={5} />
        </div>

        {/* Sizes */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Available Sizes</h2>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedSizes.includes(size)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Available Colors</h2>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => toggleColor(color)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedColors.includes(color)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={createProduct.isPending}
            className="btn-primary"
          >
            {createProduct.isPending ? 'Creating...' : 'Create Product'}
          </button>
          <Link href="/admin/products" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}


