import { ShoppingBag } from "lucide-react";
import { LoginForm } from "./login-form";

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/90 backdrop-blur-md flex items-center justify-center mx-auto shadow-md">
              <ShoppingBag className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Masuk ke Admin SAHARA</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Kelola konten promo &amp; penawaran di landing page.
              </p>
            </div>
          </div>
          <LoginForm redirectTo={redirectTo && redirectTo.startsWith("/admin") ? redirectTo : "/admin"} />
        </div>
      </div>
    </div>
  );
}
