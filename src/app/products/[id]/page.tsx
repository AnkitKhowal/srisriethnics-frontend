'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import { useProduct } from '@/hooks/useProducts';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { PHONE, WHATSAPP } from '@/lib/constants';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container-custom py-12">
          <p className="text-center text-gray-500">Loading product...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="container-custom py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">Product not found</p>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const whatsappMessage = `Hi, I'm interested in ${product.name} (₹${product.price})`;

  return (
    <>
      <Header />
      <main className="container-custom py-16">
        {/* Breadcrumb */}
        <nav className="mb-12 text-sm">
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-4 border border-white/30 shadow-lg inline-flex">
            <Link href="/" className="text-gray-600 hover:bg-gradient-to-r hover:from-primary-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent font-medium transition-all duration-300">
              Home
            </Link>
            <span className="text-gray-400 font-light">/</span>
            <Link href={`/?category=${product.category}`} className="text-gray-600 hover:bg-gradient-to-r hover:from-primary-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent capitalize font-medium transition-all duration-300">
              {product.category}
            </Link>
            <span className="text-gray-400 font-light">/</span>
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent font-semibold">{product.name}</span>
          </div>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <p className="text-sm text-purple-600 uppercase tracking-wider mb-3 font-semibold">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-green-600 font-medium">✓ In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-red-600 font-medium">✗ Out of Stock</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Available Sizes</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Available Colors</h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="glass rounded-2xl p-8">
              <p className="text-lg font-semibold gradient-text mb-6">
                Ready to make this yours?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={getWhatsAppUrl(WHATSAPP, whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center flex-1 py-4 text-lg"
                >
                  💬 WhatsApp Us
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="btn-outline text-center flex-1 py-4 text-lg"
                >
                  📞 Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


