import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageProvider";
import { useLanguage } from "@/lib/i18n";
import { useScrollAnimation, useScrollAnimationMultiple } from "@/hooks/use-scroll-animation";
import { useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";

// Import working components
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Footer } from "@/components/Footer";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminLogin } from "./components/AdminLogin";
import { OrderForm } from "./components/OrderForm";
import { AboutUs } from "./components/AboutUs";
import { ContactInfo } from "./components/ContactInfo";
import { WhatsAppButton } from "./components/WhatsAppButton";

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
  
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setElementRef, visibleElements } = useScrollAnimationMultiple(testimonials.length);
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 scroll-fade-in ${headerVisible ? 'animate' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              ref={setElementRef(index)}
              className={`bg-card p-4 sm:p-6 md:p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 scroll-slide-right scroll-stagger-${(index % 2) + 1} ${visibleElements[index] ? 'animate' : ''}`}
            >
              <div className="flex space-x-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-sm sm:text-base"></i>
                ))}
              </div>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="text-2xl sm:text-3xl text-primary">
                  <i className={testimonial.avatar}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
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
  const { t, language } = useLanguage();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation();
  
  return (
    <section className="py-20 bg-card border-t border-border" id="contact-section" style={{ minHeight: '600px' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-12 scroll-fade-in ${headerVisible ? 'animate' : ''}`}>
            <div className="flex items-center justify-center mb-4">
              <i className="fas fa-star text-primary text-sm mr-2"></i>
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h2>
              <i className="fas fa-star text-primary text-sm ml-2"></i>
            </div>
            <p className={`text-muted-foreground text-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن' : 'We are here to help you. Contact us and we will get back to you as soon as possible'}
            </p>
            <div className="mt-4">
              <p className={`text-sm text-primary font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'املأ النموذج أدناه وسنتواصل معك قريباً' : 'Fill out the form below and we will contact you soon'}
              </p>
            </div>
            <div className="mt-6">
              <div className={`flex flex-col sm:flex-row items-center justify-center ${language === 'ar' ? 'sm:flex-row-reverse' : ''} ${language === 'ar' ? 'space-y-reverse space-y-2' : 'space-y-2'} sm:space-y-0 ${language === 'ar' ? 'sm:space-x-reverse sm:space-x-4' : 'sm:space-x-4'} text-sm text-muted-foreground`}>
                <div className="flex items-center">
                  <i className={`fas fa-phone text-primary ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                  <span>+20 1026897739</span>
                </div>
                <div className="flex items-center">
                  <i className={`fas fa-envelope text-primary ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                  <span>info@quentech.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={formRef as React.RefObject<HTMLDivElement>} className={`bg-background border border-border rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-scale-up scroll-stagger-1 ${formVisible ? 'animate' : ''}`} style={{ minHeight: '400px' }}>
            <div className="text-center mb-6">
              <h3 className={`text-xl font-semibold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'نموذج التواصل' : 'Contact Form'}
              </h3>
            </div>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className={`block text-sm font-medium text-foreground mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                  placeholder={language === 'ar' ? 'الاسم' : 'Name'}
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium text-foreground mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                  placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  data-testid="input-email"
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium text-foreground mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
              </label>
              <input
                type="tel"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:border-primary/50 text-sm sm:text-base"
                placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                data-testid="input-phone"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium text-foreground mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'الرسالة' : 'Message'}
              </label>
              <textarea
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none hover:border-primary/50 text-sm sm:text-base"
                placeholder={language === 'ar' ? 'الرسالة' : 'Message'}
                data-testid="input-message"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              data-testid="button-submit"
            >
              <i className={`fas fa-paper-plane ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
              {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
            </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ onNavigate, currentPage, orderParams }: { onNavigate: (page: string, params?: any) => void; currentPage: string; orderParams?: any }) {
  useEffect(() => {
    // Initialize AOS when component mounts
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 400,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
      });
    }
  }, []);

  // Render different pages based on currentPage
  switch (currentPage) {
    case 'home':
      return (
        <div className="min-h-screen bg-background">
          <Hero onNavigate={onNavigate} />
          <AboutUs />
          <Services onNavigate={onNavigate} />
          <WhyUs />
          <SimpleTestimonials />
          <SimpleContactForm />
          
          <Footer onNavigate={onNavigate} />
          <WhatsAppButton phoneNumber="+201026897739" />
        </div>
      );

    case 'services':
      return (
        <div className="min-h-screen bg-background">
          <div className="pt-20">
            <Services onNavigate={onNavigate} />
          </div>
          <Footer onNavigate={onNavigate} />
          <WhatsAppButton phoneNumber="+201026897739" />
        </div>
      );

    case 'about':
      return (
        <div className="min-h-screen bg-background">
          <div className="pt-20">
            <AboutUs />
            <WhyUs />
            <SimpleTestimonials />
          </div>
          <Footer onNavigate={onNavigate} />
          <WhatsAppButton phoneNumber="+201026897739" />
        </div>
      );

    case 'contact':
      return (
        <div className="min-h-screen bg-background">
          <div className="pt-20">
            <ContactInfo />
            <SimpleContactForm />
          </div>
          <Footer onNavigate={onNavigate} />
          <WhatsAppButton phoneNumber="+201026897739" />
        </div>
      );

    case 'order':
      return (
        <div className="min-h-screen bg-background">
          <div className="pt-20">
            <OrderForm onNavigate={onNavigate} selectedServiceType={orderParams?.serviceType} />
          </div>
          <Footer onNavigate={onNavigate} />
          <WhatsAppButton phoneNumber="+201026897739" />
        </div>
      );

    default:
      return (
        <div className="min-h-screen bg-background">
          <Hero onNavigate={onNavigate} />
          <AboutUs />
          <Services onNavigate={onNavigate} />
          <WhyUs />
          <SimpleTestimonials />
          <SimpleContactForm />
          <Footer onNavigate={onNavigate} />
          <WhatsAppButton phoneNumber="+201026897739" />
        </div>
      );
  }
}

function Router() {
  const [currentPage, setCurrentPage] = useState('home');
  const [orderParams, setOrderParams] = useState<any>(null);
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  
  // Define valid pages
  const validPages = ['home', 'services', 'about', 'contact', 'order', 'admin'];
  
  // Define valid file extensions that should not trigger 404
  const validFileExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  
  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Store parameters for the order page
    if (page === 'order' && params) {
      setOrderParams(params);
    } else {
      setOrderParams(null);
    }
  };

  // Check if a page is valid
  const isValidPage = (page: string) => {
    // Check if it's a valid page
    if (validPages.includes(page)) {
      return true;
    }
    
    // Check if it's a static file (has valid extension)
    const hasValidExtension = validFileExtensions.some(ext => page.toLowerCase().endsWith(ext));
    if (hasValidExtension) {
      return true;
    }
    
    // Check if it's an API route (starts with api/)
    if (page.startsWith('api/')) {
      return true;
    }
    
    // Check if it's an uploads route (starts with uploads/)
    if (page.startsWith('uploads/')) {
      return true;
    }
    
    return false;
  };

  // Check URL on load and when URL changes
  useEffect(() => {
    const path = window.location.pathname.slice(1);
    const validPath = path && path !== '' ? path : 'home';
    console.log('URL changed:', window.location.pathname, '-> page:', validPath);
    
    // If it's an uploads path, don't handle it as a page
    if (path.startsWith('uploads/')) {
      console.log('Skipping uploads path:', path);
      return;
    }
    
    // Check if the page is valid, if not, show 404
    if (isValidPage(validPath)) {
      setCurrentPage(validPath);
    } else {
      setCurrentPage('404');
    }
  }, []);

  // Listen for URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.slice(1);
      const validPath = path && path !== '' ? path : 'home';
      console.log('Location changed:', window.location.pathname, '-> page:', validPath);
      
      // If it's an uploads path, don't handle it as a page
      if (path.startsWith('uploads/')) {
        console.log('Skipping uploads path:', path);
        return;
      }
      
      // Check if the page is valid, if not, show 404
      if (isValidPage(validPath)) {
        setCurrentPage(validPath);
      } else {
        setCurrentPage('404');
      }
    };

    // Listen for popstate events
    window.addEventListener('popstate', handleLocationChange);
    
    // Also check on mount
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1);
      const validPath = path && path !== '' ? path : 'home';
      
      // If it's an uploads path, don't handle it as a page
      if (path.startsWith('uploads/')) {
        console.log('Skipping uploads path in popstate:', path);
        return;
      }
      
      // Check if the page is valid, if not, show 404
      if (isValidPage(validPath)) {
        setCurrentPage(validPath);
      } else {
        setCurrentPage('404');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Initialize AOS when app loads
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    script.onload = () => {
      if ((window as any).AOS) {
        (window as any).AOS.init({
          duration: 400,
          once: true,
          offset: 50,
          easing: 'ease-out-cubic',
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Check if current page is admin
  const isAdminPage = currentPage === 'admin';
  
  console.log('Router state:', { currentPage, isAdminPage, isAuthenticated, isLoading });

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-primary text-4xl mb-4"></i>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isAdminPage && currentPage !== '404' && <Header onNavigate={handleNavigate} currentPage={currentPage} />}
      <main className="min-h-screen">
        {currentPage === 'admin' ? (
          isAuthenticated ? (
            <AdminDashboard onNavigate={handleNavigate} onLogout={logout} />
          ) : (
            <AdminLogin onLogin={login} />
          )
        ) : currentPage === '404' ? (
          <NotFound onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} currentPage={currentPage} orderParams={orderParams} />
        )}
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
