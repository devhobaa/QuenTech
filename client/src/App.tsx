import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageProvider";
import NotFound from "@/pages/not-found";

// Import working components
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    // Initialize AOS when component mounts
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero onNavigate={onNavigate} />
      <Services onNavigate={onNavigate} />
      
      {/* Simple footer placeholder */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              <i className="fas fa-code"></i>
            </div>
            <span className="text-xl font-bold text-foreground">QuenTech</span>
          </div>
          <p className="text-muted-foreground">Building the future with innovative software solutions</p>
          <p className="text-sm text-muted-foreground mt-4">© 2024 QuenTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  const [currentPage, setCurrentPage] = useState('home');
  
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Initialize AOS when app loads
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    script.onload = () => {
      if ((window as any).AOS) {
        (window as any).AOS.init({
          duration: 800,
          once: true,
          offset: 100,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="min-h-screen">
        <HomePage onNavigate={handleNavigate} />
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Router />
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
