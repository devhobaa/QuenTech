import { useLanguage } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  const { t } = useLanguage();

  const services = [
    {
      icon: 'fas fa-globe',
      title: t('services.web.title'),
      description: t('services.web.desc'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: 'fas fa-shopping-cart',
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.desc'),
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: 'fas fa-graduation-cap',
      title: t('services.education.title'),
      description: t('services.education.desc'),
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: 'fas fa-desktop',
      title: t('services.desktop.title'),
      description: t('services.desktop.desc'),
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: t('services.mobile.title'),
      description: t('services.mobile.desc'),
      gradient: 'from-pink-500 to-pink-600',
    },
    {
      icon: 'fas fa-cogs',
      title: t('services.custom.title'),
      description: t('services.custom.desc'),
      gradient: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group hover-elevate border-border transition-all duration-300 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => onNavigate('order')}
              data-testid={`card-service-${index}`}
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.gradient} text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <i className={service.icon}></i>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-arrow-right text-primary"></i>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start your project?
          </p>
          <button
            onClick={() => onNavigate('order')}
            className="bg-gradient-to-r from-primary to-chart-2 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary/90 hover:to-chart-2/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            data-testid="button-services-cta"
          >
            <i className="fas fa-rocket mr-2"></i>
            {t('nav.order')}
          </button>
        </div>
      </div>
    </section>
  );
}