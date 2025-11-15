'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useProduct, useUpdateProduct } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import ImageUpload from '@/components/ImageUpload';
import { AVAILABLE_SIZES, AVAILABLE_COLORS } from '@/lib/constants';
import type { ProductFormData } from '@/types/product';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct(id);
  const { data: categories } = useCategories();
  
  const [images, setImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>();

  // Populate form when product loads
  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('stock', product.stock);
      setValue('category', product.category);
      setValue('isActive', product.isActive);
      setImages(product.images);
      setSelectedSizes(product.sizes);
      setSelectedColors(product.colors);
    }
  }, [product, setValue]);

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

    const productData: Partial<ProductFormData> = {
      ...data,
      price: parseFloat(data.price.toString()),
      stock: parseInt(data.stock.toString()),
      images,
      sizes: selectedSizes,
      colors: selectedColors,
    };

    try {
      await updateProduct.mutateAsync(productData);
      alert('Product updated successfully!');
      router.push('/admin/products');
    } catch (error: any) {
      alert(error.message || 'Failed to update product');
    }
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-red-600">Product not found</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
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
            disabled={updateProduct.isPending}
            className="btn-primary"
          >
            {updateProduct.isPending ? 'Updating...' : 'Update Product'}
          </button>
          <Link href="/admin/products" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}


