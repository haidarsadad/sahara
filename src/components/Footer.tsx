import { ShoppingBag, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white/60 dark:bg-muted/60 backdrop-blur-xl border-t border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/90 backdrop-blur-md flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground">SAHARA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Produk alami handmade dari pengrajin lokal, dibuat dengan cinta dan perhatian untuk Anda dan lingkungan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/layanan-informasi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Kategori</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Perawatan Kulit" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Perawatan Kulit
                </Link>
              </li>
              <li>
                <Link href="/products?category=Minuman" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Minuman
                </Link>
              </li>
              <li>
                <Link href="/products?category=Makanan" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Makanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Desa Wates, Undaan<br />Kudus, Jawa Tengah
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">hello@sahara.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 SAHARA. Hak cipta dilindungi. Dibuat dengan cinta oleh pengrajin lokal.
          </p>
        </div>
      </div>
    </footer>
  );
}
