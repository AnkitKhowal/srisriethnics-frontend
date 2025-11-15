'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AdminNav() {
  const pathname = usePathname();
  const { logout, getUser } = useAuth();
  const user = getUser();

  const navItems = [
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/categories', label: 'Categories' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/admin/products" className="text-xl font-bold text-primary-600">
              Ethnics Admin
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View Site
            </Link>
            <span className="text-sm text-gray-600">{user?.name}</span>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


