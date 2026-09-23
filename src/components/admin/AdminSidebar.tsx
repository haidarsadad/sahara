"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ShoppingBasket,
  Newspaper,
  BookOpen,
  HelpCircle,
  Settings,
} from "lucide-react";
import { cn } from "@/components/ui/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Promo Beranda", icon: Sparkles, exact: true },
  { href: "/admin/products", label: "Produk", icon: ShoppingBasket },
  { href: "/admin/news", label: "Berita", icon: Newspaper },
  { href: "/admin/guides", label: "Panduan", icon: BookOpen },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { href: "/admin/settings", label: "Pengaturan Situs", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:bg-white/60 dark:hover:bg-card/60 hover:text-foreground border border-transparent",
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
