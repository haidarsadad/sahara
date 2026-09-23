import Link from "next/link";
import { ShoppingBag, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export function AdminHeader({ userEmail }: { userEmail: string }) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#8B7355] to-[#A0826D] dark:from-[#7a6349] dark:to-[#8d7259] border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-white">SAHARA Admin</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
            >
              Lihat Situs
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="hidden md:inline text-sm text-white/70 max-w-[200px] truncate">
              {userEmail}
            </span>
            <form action={logout}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
