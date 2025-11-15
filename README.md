# Ethnics Frontend - Next.js Application

React/Next.js frontend for the Ethnics e-commerce catalog platform.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and state management
- **React Hook Form** - Form handling
- **React Dropzone** - File upload
- **Axios** - HTTP client

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend/README.md)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.amazonaws.com
NEXT_PUBLIC_CLOUDFRONT_URL=https://your-cloudfront-domain.cloudfront.net
NEXT_PUBLIC_PHONE=+91-1234567890
NEXT_PUBLIC_WHATSAPP=+911234567890
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── providers.tsx      # React Query provider
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Product detail page
│   │   └── admin/
│   │       ├── layout.tsx     # Admin layout
│   │       ├── login/
│   │       │   └── page.tsx   # Admin login
│   │       ├── products/
│   │       │   ├── page.tsx   # Product list
│   │       │   ├── add/       # Add product
│   │       │   └── [id]/      # Edit product
│   │       └── categories/
│   │           ├── page.tsx   # Category list
│   │           ├── add/       # Add category
│   │           └── [id]/      # Edit category
│   ├── components/            # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── Filters.tsx
│   │   ├── AdminNav.tsx
│   │   └── ProtectedRoute.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   ├── useCategories.ts
│   │   └── useUpload.ts
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API client
│   │   ├── auth.ts           # Auth service
│   │   ├── utils.ts          # Helper functions
│   │   └── constants.ts      # App constants
│   ├── types/                # TypeScript types
│   │   ├── product.ts
│   │   ├── category.ts
│   │   └── api.ts
│   └── styles/
│       └── globals.css       # Global styles
├── public/                    # Static assets
├── next.config.js            # Next.js config
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

## Features

### Public Pages

1. **Home Page** (`/`)
   - Product catalog with grid layout
   - Search functionality
   - Category filters
   - Price range filters
   - Color and size filters
   - Responsive design

2. **Product Detail Page** (`/products/[id]`)
   - Image gallery with thumbnails
   - Product information
   - Available sizes and colors
   - Stock status
   - Contact buttons (WhatsApp, Phone)

### Admin Panel

1. **Admin Login** (`/admin/login`)
   - Email/password authentication
   - JWT token management

2. **Product Management** (`/admin/products`)
   - Product list with search
   - Add new products
   - Edit existing products
   - Delete products
   - Drag-and-drop image upload
   - Multiple image support
   - Size and color selection
   - Inventory management

3. **Category Management** (`/admin/categories`)
   - Category list
   - Add new categories
   - Edit existing categories
   - Delete categories
   - Category image upload
   - Display order management

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Adding New Pages

1. Create page in `src/app/` directory
2. Follow Next.js App Router conventions
3. Use existing hooks and components
4. Add to navigation if needed

### Creating Components

1. Create component in `src/components/`
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Make components reusable

### API Integration

Use custom hooks from `src/hooks/`:
```typescript
import { useProducts } from '@/hooks/useProducts';

function MyComponent() {
  const { data, isLoading } = useProducts();
  // ...
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Deploy to AWS S3 + CloudFront

```bash
# Build the application
npm run build

# Upload to S3
aws s3 sync out/ s3://your-bucket-name

# Create CloudFront invalidation
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Environment Variables

Required environment variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL          # Backend API URL

# CDN Configuration  
NEXT_PUBLIC_CLOUDFRONT_URL   # CloudFront domain for images

# Contact Information
NEXT_PUBLIC_PHONE            # Phone number
NEXT_PUBLIC_WHATSAPP         # WhatsApp number
```

## Authentication

Admin authentication uses JWT tokens stored in localStorage:
- Login at `/admin/login`
- Token automatically added to API requests
- Auto-redirect to login if token expires
- Protected routes use `ProtectedRoute` component

## Image Upload

Images are uploaded directly to S3 using presigned URLs:
1. Request presigned URL from backend
2. Upload file directly to S3 from browser
3. Save S3 URL in product/category data

## Styling

Uses Tailwind CSS with custom configuration:
- Custom colors (primary, secondary)
- Custom components (buttons, inputs, cards)
- Responsive utilities
- Dark mode ready (optional)

## Performance Optimization

- Image optimization with Next.js `Image` component
- Lazy loading for images
- React Query for caching and deduplication
- Code splitting with dynamic imports
- Production build optimizations

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## Troubleshooting

### API Connection Issues

Check `NEXT_PUBLIC_API_URL` is correctly set and backend is running.

### Image Upload Failing

Verify S3 bucket CORS configuration and presigned URL generation.

### Authentication Not Working

Clear localStorage and try logging in again. Check JWT_SECRET matches backend.

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

Private project - All rights reserved


