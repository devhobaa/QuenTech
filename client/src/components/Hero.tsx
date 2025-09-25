import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Modern_tech_office_workspace_3921dfa9.png';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-chart-2/70 to-primary/60"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1000">
          {/* Logo Icon */}
          <div className="mb-8" data-aos="zoom-in" data-aos-delay="200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <i className="fas fa-code text-3xl text-white"></i>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up" 
            data-aos-delay="600"
          >
            {t('hero.subtitle')}
          </p>

          {/* Call to Action Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            data-aos="fade-up" 
            data-aos-delay="800"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('order')}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg shadow-lg"
              data-testid="button-hero-cta-primary"
            >
              <i className="fas fa-rocket mr-2"></i>
              {t('hero.cta.primary')}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('services')}
              className="border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3 text-lg"
              data-testid="button-hero-cta-secondary"
            >
              <i className="fas fa-info-circle mr-2"></i>
              {t('hero.cta.secondary')}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          data-aos="fade-in" 
          data-aos-delay="1200"
        >
          <div className="flex flex-col items-center text-white/80">
            <span className="text-sm mb-2">Scroll Down</span>
            <i className="fas fa-chevron-down text-xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
}