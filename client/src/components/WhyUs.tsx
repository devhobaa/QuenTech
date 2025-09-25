import { useLanguage } from '@/lib/i18n';

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

  return (
    <section className=\"py-20 bg-gradient-to-br from-muted/30 to-background\">
      <div className=\"container mx-auto px-4\">
        {/* Section Header */}
        <div className=\"text-center mb-16\" data-aos=\"fade-up\">
          <h2 className=\"text-3xl md:text-4xl font-bold text-foreground mb-4\">
            {t('why.title')}
          </h2>
        </div>

        {/* Features Grid */}
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8\">
          {features.map((feature, index) => (
            <div 
              key={index}
              className=\"text-center group\"
              data-aos=\"fade-up\"
              data-aos-delay={index * 150}
            >
              {/* Icon */}
              <div className=\"mb-6\">
                <div className=\"inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-card rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110\">
                  <i className={`${feature.icon} text-3xl ${feature.color}`}></i>
                </div>
              </div>

              {/* Title */}
              <h3 className=\"text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors\">
                {feature.title}
              </h3>

              {/* Description */}
              <p className=\"text-muted-foreground leading-relaxed\">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}