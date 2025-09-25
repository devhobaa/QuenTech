import { useLanguage } from '@/lib/i18n';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

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
    <footer className=\"bg-card border-t border-border\">
      <div className=\"container mx-auto px-4 py-12\">
        <div className=\"grid grid-cols-1 md:grid-cols-4 gap-8\">
          {/* Company Info */}
          <div className=\"space-y-4\">
            <div className=\"flex items-center space-x-2\">
              <div className=\"text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent\">
                <i className=\"fas fa-code\"></i>
              </div>
              <span className=\"text-xl font-bold text-foreground\">QuenTech</span>
            </div>
            <p className=\"text-muted-foreground text-sm leading-relaxed\">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className=\"space-y-4\">
            <h3 className=\"font-semibold text-foreground\">{t('footer.quicklinks')}</h3>
            <ul className=\"space-y-2\">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className=\"text-muted-foreground hover:text-primary transition-colors text-sm\"
                    data-testid={`link-footer-${link.key}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className=\"space-y-4\">
            <h3 className=\"font-semibold text-foreground\">{t('footer.services.short')}</h3>
            <ul className=\"space-y-2 text-sm text-muted-foreground\">
              <li>{t('services.web.title')}</li>
              <li>{t('services.ecommerce.title')}</li>
              <li>{t('services.mobile.title')}</li>
              <li>{t('services.custom.title')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className=\"space-y-4\">
            <h3 className=\"font-semibold text-foreground\">{t('footer.contact.short')}</h3>
            <div className=\"space-y-2 text-sm text-muted-foreground\">
              <div className=\"flex items-center space-x-2\">
                <i className=\"fas fa-envelope text-primary\"></i>
                <span>info@quentech.com</span>
              </div>
              <div className=\"flex items-center space-x-2\">
                <i className=\"fas fa-phone text-primary\"></i>
                <span>+966 50 123 4567</span>
              </div>
              <div className=\"flex items-center space-x-2\">
                <i className=\"fas fa-map-marker-alt text-primary\"></i>
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className=\"border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center\">
          <p className=\"text-sm text-muted-foreground mb-4 md:mb-0\">
            {t('footer.rights')}
          </p>

          {/* Social Links */}
          <div className=\"flex items-center space-x-4\">
            <span className=\"text-sm text-muted-foreground mr-2\">{t('footer.social')}:</span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`text-muted-foreground transition-colors ${social.color}`}
                data-testid={`link-social-${index}`}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}