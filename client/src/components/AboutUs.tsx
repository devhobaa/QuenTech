import { useLanguage } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation, useScrollAnimationMultiple } from '@/hooks/use-scroll-animation';

export function AboutUs() {
  const { language } = useLanguage();

  const aboutSections = [
    {
      icon: 'fas fa-bullseye',
      title: language === 'ar' ? 'لماذا كوين تك' : 'WHY QUENTECH',
      description: language === 'ar' ? 'نحن نقدم حلول برمجية مبتكرة ومتطورة تلبي احتياجات عملائنا بأعلى معايير الجودة والكفاءة' : 'We provide innovative and advanced software solutions that meet our clients\' needs with the highest standards of quality and efficiency',
    },
    {
      icon: 'fas fa-cogs',
      title: language === 'ar' ? 'كيف نعمل' : 'HOW WE WORK',
      description: language === 'ar' ? 'نتبع منهجية عمل منظمة ومتطورة تضمن تسليم المشاريع في الوقت المحدد وبأفضل النتائج' : 'We follow an organized and advanced work methodology that ensures project delivery on time with the best results',
    },
    {
      icon: 'fas fa-chart-line',
      title: language === 'ar' ? 'نتائج مثبتة' : 'PROVEN RESULTS',
      description: language === 'ar' ? 'لدينا سجل حافل من المشاريع الناجحة والعملاء الراضين في مختلف المجالات التقنية' : 'We have a proven track record of successful projects and satisfied clients across various technical fields',
    },
  ];

  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { setElementRef, visibleElements } = useScrollAnimationMultiple(aboutSections.length);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-16 scroll-fade-in ${headerVisible ? 'animate' : ''}`}>
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-star text-primary text-sm mr-2"></i>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h2>
            <i className="fas fa-star text-primary text-sm ml-2"></i>
          </div>
        </div>

        {/* About Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {aboutSections.map((section, index) => (
            <Card 
              key={index} 
              ref={setElementRef(index)}
              className={`bg-card border-border hover-elevate transition-all duration-300 scroll-slide-left scroll-stagger-${(index % 3) + 1} ${visibleElements[index] ? 'animate' : ''}`}
            >
              <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                {/* Icon */}
                <div className="mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 border-2 border-primary/50 text-primary text-lg sm:text-2xl">
                    <i className={section.icon}></i>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {section.title}
                </h3>

                {/* Description */}
                <p className={`text-sm sm:text-base text-muted-foreground leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {section.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
