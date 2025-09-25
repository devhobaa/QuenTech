import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageProvider";
import { useLanguage } from "@/lib/i18n";
import NotFound from "@/pages/not-found";

// Import working components
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";

// Bilingual components with proper i18n integration  
function SimpleTestimonials() {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: t('testimonials.client1.name'),
      role: t('testimonials.client1.role'),
      text: t('testimonials.client1.text'),
      avatar: 'fas fa-user-circle',
      rating: 5
    },
    {
      name: t('testimonials.client2.name'),
      role: t('testimonials.client2.role'), 
      text: t('testimonials.client2.text'),
      avatar: 'fas fa-user-circle',
      rating: 5
    }
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300" data-aos="fade-up" data-aos-delay={index * 150}>
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-3xl text-primary">
                  <i className={testimonial.avatar}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SimpleContactForm() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('contact.subtitle')}
            </p>
          </div>
          
          <form className="space-y-6" data-aos="fade-up" data-aos-delay="150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('contact.name')}
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('contact.email')}
                  data-testid="input-email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('contact.phone')}
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder={t('contact.phone')}
                data-testid="input-phone"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('contact.message')}
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder={t('contact.message')}
                data-testid="input-message"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-chart-2 text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              data-testid="button-submit"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              {t('contact.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

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
      <WhyUs />
      <SimpleTestimonials />
      <SimpleContactForm />
      
      {/* Enhanced footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  <i className="fas fa-code"></i>
                </div>
                <span className="text-xl font-bold text-foreground">QuenTech</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Building the future with innovative software solutions
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <p><i className="fas fa-envelope mr-2"></i>info@quentech.com</p>
                <p><i className="fas fa-phone mr-2"></i>+966 50 123 4567</p>
                <p><i className="fas fa-map-marker-alt mr-2"></i>Riyadh, Saudi Arabia</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 QuenTech. All rights reserved.</p>
          </div>
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
