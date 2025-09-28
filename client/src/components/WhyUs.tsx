import { useLanguage } from '@/lib/i18n';
import { useScrollAnimation, useScrollAnimationMultiple } from '@/hooks/use-scroll-animation';

export function WhyUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: 'fas fa-users',
      title: t('why.experience.title'),
      description: t('why.experience.desc'),
      color: 'text-blue-500',
    },
    {
      icon: 'fas fa-star',
      title: t('why.quality.title'),
      description: t('why.quality.desc'),
      color: 'text-yellow-500',
    },
    {
      icon: 'fas fa-headset',
      title: t('why.support.title'),
      description: t('why.support.desc'),
      color: 'text-green-500',
    },
    {
      icon: 'fas fa-lightbulb',
      title: t('why.innovation.title'),
      description: t('why.innovation.desc'),
      color: 'text-purple-500',
    },
  ];

  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setElementRef, visibleElements } = useScrollAnimationMultiple(features.length);

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-16 scroll-fade-in ${headerVisible ? 'animate' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('why.title')}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={setElementRef(index)}
              className={`text-center group scroll-rotate-in scroll-stagger-${(index % 4) + 1} ${visibleElements[index] ? 'animate' : ''}`}
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-card rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <i className={`${feature.icon} text-2xl sm:text-3xl ${feature.color}`}></i>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}