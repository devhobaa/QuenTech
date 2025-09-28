import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Home, ArrowLeft, Search, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";

interface NotFoundProps {
  onNavigate?: (page: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.href = '/';
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simple search implementation - redirect to home with search query
      if (onNavigate) {
        onNavigate('home');
        // You can enhance this to pass search query to home page
        setTimeout(() => {
          // Scroll to services section if searching for services
          if (searchQuery.toLowerCase().includes('service') || searchQuery.toLowerCase().includes('خدمة')) {
            const servicesSection = document.getElementById('services-section');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100);
      }
    }
  };

  const quickLinks = [
    { key: 'home', label: t('nav.home'), icon: Home },
    { key: 'services', label: t('nav.services'), icon: Search },
    { key: 'about', label: t('nav.about'), icon: Search },
    { key: 'contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main 404 Content */}
          <Card className="w-full shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                {/* 404 Icon and Title */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                    <div className="relative bg-primary/10 rounded-full p-6">
                      <AlertCircle className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>
                
                <h1 className={`text-4xl md:text-6xl font-bold text-foreground mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t('404.title')}
                </h1>
                
                <h2 className={`text-xl md:text-2xl text-muted-foreground mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t('404.subtitle')}
                </h2>
                
                <p className={`text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t('404.description')}
                </p>
              </div>

              {/* Search Section */}
              <div className="mb-8">
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={t('404.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" variant="default" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className={`text-xs text-muted-foreground mt-2 text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'ابحث عن الخدمات أو الصفحات المتاحة' : 'Search for available services or pages'}
                  </p>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  onClick={handleGoHome}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Home className="h-4 w-4 mr-2" />
                  {t('404.goHome')}
                </Button>
                
                <Button 
                  onClick={handleGoBack}
                  variant="outline"
                  size="lg"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('404.goBack')}
                </Button>
              </div>

              {/* Quick Links */}
              <div className="border-t border-border pt-8">
                <h3 className={`text-lg font-semibold text-foreground mb-6 text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t('404.suggestions')}
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Button
                        key={link.key}
                        variant="ghost"
                        className="flex flex-col items-center p-4 h-auto hover:bg-primary/10 transition-colors"
                        onClick={() => onNavigate && onNavigate(link.key)}
                      >
                        <IconComponent className="h-6 w-6 mb-2 text-primary" />
                        <span className={`text-sm font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {link.label}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-center">
                  <p className={`text-muted-foreground mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t('404.contact')}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>info@quentech.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>+20 1026897739</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
