import { useLanguage } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation, useScrollAnimationMultiple } from '@/hooks/use-scroll-animation';

interface ServicesProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: 'fas fa-mobile-alt',
      title: language === 'ar' ? 'تطبيقات الهاتف المحمول' : 'Mobile Applications',
      description: language === 'ar' ? 'تطوير تطبيقات الهاتف المحمول المتقدمة لنظامي iOS و Android' : 'Advanced mobile app development for iOS and Android platforms',
      value: 'mobile',
    },
    {
      icon: 'fas fa-desktop',
      title: language === 'ar' ? 'تطبيقات سطح المكتب' : 'Desktop Applications',
      description: language === 'ar' ? 'حلول برمجية متطورة لأجهزة الكمبيوتر المكتبية' : 'Advanced software solutions for desktop computers',
      value: 'desktop',
    },
    {
      icon: 'fas fa-globe',
      title: language === 'ar' ? 'المواقع الإلكترونية' : 'Websites',
      description: language === 'ar' ? 'تصميم وتطوير المواقع الإلكترونية الحديثة والمتجاوبة' : 'Modern and responsive website design and development',
      value: 'web-development',
    },
    {
      icon: 'fas fa-clock',
      title: language === 'ar' ? 'تطبيقات الأجهزة القابلة للارتداء' : 'Wearable Apps',
      description: language === 'ar' ? 'تطوير تطبيقات للأجهزة الذكية القابلة للارتداء' : 'Development of applications for smart wearable devices',
      value: 'custom',
    },
    {
      icon: 'fas fa-server',
      title: language === 'ar' ? 'البنية التحتية' : 'Infrastructure',
      description: language === 'ar' ? 'حلول البنية التحتية السحابية والخوادم المتقدمة' : 'Advanced cloud infrastructure and server solutions',
      value: 'custom',
    },
    {
      icon: 'fas fa-paint-brush',
      title: language === 'ar' ? 'تصميم واجهات المستخدم' : 'UI & Web Design',
      description: language === 'ar' ? 'تصميم واجهات مستخدم جذابة وسهلة الاستخدام' : 'Attractive and user-friendly interface design',
      value: 'custom',
    },
  ];

  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setElementRef, visibleElements } = useScrollAnimationMultiple(services.length);
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-16 scroll-fade-in ${headerVisible ? 'animate' : ''}`}>
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-star text-primary text-sm mr-2"></i>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h2>
            <i className="fas fa-star text-primary text-sm ml-2"></i>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              ref={setElementRef(index)}
              className={`group hover-elevate border-border transition-all duration-300 cursor-pointer bg-card scroll-scale-up scroll-stagger-${(index % 5) + 1} ${visibleElements[index] ? 'animate' : ''}`}
              onClick={() => {
                console.log('Service clicked:', service.value);
                onNavigate('order', { serviceType: service.value });
              }}
              data-testid={`card-service-${index}`}
            >
              <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                {/* Icon */}
                <div className="mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 border-2 border-primary/50 text-primary text-lg sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                    <i className={service.icon}></i>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-sm sm:text-base text-muted-foreground leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef as React.RefObject<HTMLDivElement>} className={`text-center mt-12 sm:mt-16 scroll-fade-in ${ctaVisible ? 'animate' : ''}`}>
          <div className="bg-primary p-4 sm:p-6 md:p-8 rounded-lg">
            <p className={`text-base sm:text-lg text-primary-foreground mb-4 sm:mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'مستعد لتنمية عملك؟' : 'Ready To Grow Your Business?'}
            </p>
            <button
              onClick={() => onNavigate('order')}
              className="bg-primary-foreground text-primary px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              data-testid="button-services-cta"
            >
              {language === 'ar' ? 'طلب الآن' : 'Order Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}