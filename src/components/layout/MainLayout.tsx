import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "sonner";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/10">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Header />
      </header>

      <main className="flex-1 w-full  px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 transition-all duration-200">
        <Outlet />
      </main>
      <Toaster position="bottom-right" />

      <footer className="w-full border-t border-border/40 bg-muted/30 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Your App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;