export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://y0pd1bhlca.execute-api.us-west-2.amazonaws.com';

// Debug logging
if (typeof window !== 'undefined') {
  console.log('API_URL:', API_URL);
  console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
}
export const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || '';
export const PHONE = process.env.NEXT_PUBLIC_PHONE || '+91-1234567890';
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '+911234567890';

export const PRODUCTS_PER_PAGE = 20;

export const AVAILABLE_SIZES = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'Free Size',
  'Custom',
];

export const AVAILABLE_COLORS = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Purple',
  'Pink',
  'Black',
  'White',
  'Gray',
  'Brown',
  'Maroon',
  'Gold',
  'Silver',
  'Multicolor',
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export const PRICE_RANGES = [
  { min: 0, max: 1000, label: 'Under ₹1,000' },
  { min: 1000, max: 5000, label: '₹1,000 - ₹5,000' },
  { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
  { min: 10000, max: 50000, label: '₹10,000 - ₹50,000' },
  { min: 50000, max: null, label: 'Above ₹50,000' },
];


