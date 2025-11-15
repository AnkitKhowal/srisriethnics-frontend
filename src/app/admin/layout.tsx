'use client';

import { usePathname } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';
  
  // Debug logging
  console.log('Admin Layout - pathname:', pathname);
  console.log('Admin Layout - isLoginPage:', isLoginPage);

  // Don't protect the login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Protect all other admin pages
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <main className="container-custom py-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}


