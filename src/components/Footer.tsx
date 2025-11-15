import Link from 'next/link';
import { PHONE, WHATSAPP } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20 text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">SriSriEthnics</h3>
            <p className="text-gray-400 leading-relaxed">
              Your premier destination for exquisite traditional ethnic wear. 
              Crafted with passion, designed with elegance, and delivered with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/?category=sarees" className="hover:text-white transition-colors">
                  Sarees
                </Link>
              </li>
              <li>
                <Link href="/?category=lehengas" className="hover:text-white transition-colors">
                  Lehengas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">
                  📞 {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(WHATSAPP)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  💬 WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 text-sm text-center">
          <p className="text-gray-400">&copy; {currentYear} SriSriEthnics. All rights reserved. Made with ❤️ for tradition.</p>
        </div>
      </div>
    </footer>
  );
}


