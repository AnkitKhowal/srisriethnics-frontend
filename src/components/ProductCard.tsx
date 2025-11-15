import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0] || '/placeholder-product.jpg';

  return (
    <Link href={`/products/${product.productId}`} className="card group cursor-pointer transform hover:scale-[1.02] transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-gray-900 group-hover:gradient-text transition-all duration-300 line-clamp-2 text-lg">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-2 capitalize font-medium">{product.category}</p>
        <p className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mt-3">
          {formatPrice(product.price)}
        </p>
        {product.stock > 0 && product.stock < 5 && (
          <p className="text-xs text-orange-500 mt-2 font-medium bg-orange-50 px-2 py-1 rounded-full inline-block">
            Only {product.stock} left!
          </p>
        )}
      </div>
    </Link>
  );
}


