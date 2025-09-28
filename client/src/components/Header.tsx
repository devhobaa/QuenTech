import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'services', label: t('nav.services') },
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div 
            className={`flex items-center cursor-pointer hover-elevate rounded-lg px-3 py-2 ${
              language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'
            }`}
            onClick={() => onNavigate('home')}
            data-testid="link-home"
          >
            <div className="text-2xl font-bold text-primary">
              <img src="/logo.webp" alt="QuenTech Logo" className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold text-foreground">QuenTech</span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${
            language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'
          }`}>
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.key ? 'text-primary' : 'text-muted-foreground'
                }`}
                data-testid={`link-${item.key}`}
              >
                {item.label}
              </button>
            ))}
            
        <Button
          onClick={() => onNavigate('order')}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-testid="button-contact"
        >
          {language === 'ar' ? 'اعمل طلبك الآن' : 'Order Now'}
        </Button>

            {/* Admin Link - Hidden */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('admin')}
              className="text-muted-foreground hover:text-primary"
              data-testid="button-admin"
            >
              <i className="fas fa-cog text-sm"></i>
            </Button> */}

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className={`flex items-center ${
                language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'
              }`}
              data-testid="button-language-toggle"
            >
              <i className="fas fa-globe text-sm"></i>
              <span className="text-xs font-medium">{language === 'en' ? 'عربي' : 'EN'}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className={`md:hidden flex items-center ${
            language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'
          }`}>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              data-testid="button-language-toggle-mobile"
            >
              <i className="fas fa-globe"></i>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border" data-aos="fade-down">
            <div className="flex flex-col space-y-3 pt-4">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-sm font-medium transition-colors hover:text-primary p-2 rounded ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  } ${
                    currentPage === item.key ? 'text-primary bg-primary/5' : 'text-muted-foreground'
                  }`}
                  data-testid={`link-mobile-${item.key}`}
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={() => {
                  onNavigate('order');
                  setIsMobileMenuOpen(false);
                }} 
                className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 mt-2"
                data-testid="button-order-mobile"
              >
                {t('nav.order')}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}