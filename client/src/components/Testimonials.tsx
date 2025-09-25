import { useLanguage } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import clientImage from '@assets/generated_images/Client_testimonial_portrait_f9971a38.png';

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t('testimonials.client1.name'),
      role: t('testimonials.client1.role'),
      text: t('testimonials.client1.text'),
      image: clientImage,
      rating: 5,
    },
    {
      name: t('testimonials.client2.name'),
      role: t('testimonials.client2.role'),
      text: t('testimonials.client2.text'),
      image: clientImage,
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index}
        className={`fas fa-star text-sm ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      ></i>
    ));
  };

  return (
    <section className=\"py-20 bg-background\">
      <div className=\"container mx-auto px-4\">
        {/* Section Header */}
        <div className=\"text-center mb-16\" data-aos=\"fade-up\">
          <h2 className=\"text-3xl md:text-4xl font-bold text-foreground mb-4\">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto\">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className=\"hover-elevate border-border transition-all duration-300\"
              data-aos=\"fade-up\"
              data-aos-delay={index * 200}
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className=\"p-8\">
                {/* Quote Icon */}
                <div className=\"mb-4\">
                  <i className=\"fas fa-quote-left text-2xl text-primary/60\"></i>
                </div>

                {/* Rating */}
                <div className=\"flex gap-1 mb-4\">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className=\"text-muted-foreground leading-relaxed mb-6 italic\">
                  \"{testimonial.text}\"
                </p>

                {/* Client Info */}
                <div className=\"flex items-center gap-4\">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className=\"w-12 h-12 rounded-full object-cover ring-2 ring-primary/20\"
                    data-testid={`img-testimonial-${index}`}
                  />
                  <div>
                    <h4 className=\"font-semibold text-foreground\" data-testid={`text-testimonial-name-${index}`}>
                      {testimonial.name}
                    </h4>
                    <p className=\"text-sm text-muted-foreground\" data-testid={`text-testimonial-role-${index}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}