import { useLanguage } from '@/lib/i18n';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t, language } = useLanguage();

  const quickLinks = [
    { key: 'home', label: t('nav.home') },
    { key: 'services', label: t('nav.services') },
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook', href: '#', color: 'hover:text-blue-500' },
    { icon: 'fab fa-twitter', href: '#', color: 'hover:text-blue-400' },
    { icon: 'fab fa-linkedin', href: '#', color: 'hover:text-blue-600' },
    { icon: 'fab fa-instagram', href: '#', color: 'hover:text-pink-500' },
    { icon: 'fab fa-github', href: '#', color: 'hover:text-gray-600' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <div className="text-2xl font-bold text-primary">
                <img src="/logo.webp" alt="QuenTech Logo" className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold text-foreground">QuenTech</span>
            </div>
            <p className={`text-muted-foreground text-sm leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('footer.company.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>{t('footer.quicklinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}
                    data-testid={`link-footer-${link.key}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('footer.services.short')}
            </h3>
            <ul className={`space-y-2 text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              <li>{t('footer.services.mobile')}</li>
              <li>{t('footer.services.desktop')}</li>
              <li>{t('footer.services.websites')}</li>
              <li>{t('footer.services.design')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('footer.contact.title')}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <i className="fas fa-envelope text-primary"></i>
                <span>info@quentech.com</span>
              </div>
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <i className="fas fa-phone text-primary"></i>
                <span>+20 1026897739</span>
              </div>
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span>{t('footer.contact.location')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          <p className={`text-sm text-muted-foreground mb-4 md:mb-0 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t('footer.rights')}
          </p>

          {/* Social Links */}
          <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <span className={`text-sm text-muted-foreground ${language === 'ar' ? 'ml-2' : 'mr-2'} ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('footer.social')}:
            </span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`text-muted-foreground transition-colors hover:text-primary ${social.color}`}
                data-testid={`link-social-${index}`}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Developer Credit */}
        <div className="border-t border-border mt-6 pt-6 text-center">
          <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            Made with <span className="text-red-500">❤️</span> by <span className="text-primary font-semibold">Ehab Hussein</span>
          </p>
        </div>
      </div>
    </footer>
  );
}