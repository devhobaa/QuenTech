import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import heroImage from '@assets/generated_images/Modern_tech_office_workspace_3921dfa9.png';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { t, language } = useLanguage();
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation();
  const { elementRef: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Abstract Digital Illustration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central Monitor */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-24 bg-primary/20 rounded-lg border-2 border-primary/50 ${language === 'ar' ? 'scale-x-[-1]' : ''}`}>
          <div className="w-full h-full bg-primary/10 rounded-md flex items-center justify-center">
            <i className="fas fa-desktop text-primary text-2xl"></i>
          </div>
        </div>
        
        {/* Connected Elements */}
        <div className={`absolute top-1/3 left-1/4 w-8 h-8 bg-primary/30 rounded border border-primary/50 ${language === 'ar' ? 'scale-x-[-1]' : ''}`}>
          <div className="w-full h-full bg-primary/20 rounded flex items-center justify-center">
            <i className="fas fa-server text-primary text-sm"></i>
          </div>
        </div>
        
        <div className={`absolute top-1/4 right-1/4 w-8 h-8 bg-primary/30 rounded border border-primary/50 ${language === 'ar' ? 'scale-x-[-1]' : ''}`}>
          <div className="w-full h-full bg-primary/20 rounded flex items-center justify-center">
            <i className="fas fa-mobile-alt text-primary text-sm"></i>
          </div>
        </div>
        
        <div className={`absolute bottom-1/3 left-1/3 w-8 h-8 bg-primary/30 rounded border border-primary/50 ${language === 'ar' ? 'scale-x-[-1]' : ''}`}>
          <div className="w-full h-full bg-primary/20 rounded flex items-center justify-center">
            <i className="fas fa-globe text-primary text-sm"></i>
          </div>
        </div>
        
        <div className={`absolute bottom-1/4 right-1/3 w-8 h-8 bg-primary/30 rounded border border-primary/50 ${language === 'ar' ? 'scale-x-[-1]' : ''}`}>
          <div className="w-full h-full bg-primary/20 rounded flex items-center justify-center">
            <i className="fas fa-cloud text-primary text-sm"></i>
          </div>
        </div>
        
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="25%" y1="33%" x2="50%" y2="50%" stroke="hsl(180, 100%, 50%)" strokeWidth="2" strokeOpacity="0.3"/>
          <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="hsl(180, 100%, 50%)" strokeWidth="2" strokeOpacity="0.3"/>
          <line x1="33%" y1="67%" x2="50%" y2="50%" stroke="hsl(180, 100%, 50%)" strokeWidth="2" strokeOpacity="0.3"/>
          <line x1="67%" y1="75%" x2="50%" y2="50%" stroke="hsl(180, 100%, 50%)" strokeWidth="2" strokeOpacity="0.3"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-foreground">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight scroll-fade-in ${titleVisible ? 'animate' : ''} ${language === 'ar' ? 'font-arabic' : ''}`}
          >
            {language === 'ar' ? 'إذا كنت تستطيع تخيله، فنحن نستطيع صنعه' : 'If you can imagine it we can make it'}
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
            className={`text-base sm:text-lg md:text-xl mb-8 md:mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 scroll-fade-in scroll-stagger-1 ${subtitleVisible ? 'animate' : ''} ${language === 'ar' ? 'font-arabic' : ''}`}
          >
            {language === 'ar' ? 'نحن نقدم حلول برمجية مبتكرة ومتطورة لتحويل أفكارك إلى واقع رقمي مذهل' : 'We provide innovative and advanced software solutions to transform your ideas into amazing digital reality'}
          </p>

          {/* Call to Action Buttons */}
          <div 
            ref={buttonsRef as React.RefObject<HTMLDivElement>}
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 scroll-fade-in scroll-stagger-2 ${buttonsVisible ? 'animate' : ''} ${language === 'ar' ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button
              size="lg"
              onClick={() => onNavigate('order')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg w-full sm:w-auto"
              data-testid="button-hero-cta-primary"
            >
              {language === 'ar' ? 'تعلم المزيد' : 'Learn More'}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="border-primary text-primary hover:bg-primary/10 font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
              data-testid="button-hero-cta-secondary"
            >
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
        
        </div>
      </div>
    </section>
  );
}