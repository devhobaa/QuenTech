import { useLanguage } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import clientImage from '@assets/generated_images/Client_testimonial_portrait_f9971a38.png';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: string;
  imageUrl?: string;
  isActive: string;
  createdAt: string;
}

export function Testimonials() {
  const { t, language } = useLanguage();

  // Fetch active testimonials from API
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['/api/testimonials/active'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/testimonials/active');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result.data || [];
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to static testimonials if API fails
        return [
          {
            id: '1',
            name: t('testimonials.client1.name'),
            role: t('testimonials.client1.role'),
            text: t('testimonials.client1.text'),
            rating: '5',
            isActive: 'true',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            name: t('testimonials.client2.name'),
            role: t('testimonials.client2.role'),
            text: t('testimonials.client2.text'),
            rating: '5',
            isActive: 'true',
            createdAt: new Date().toISOString(),
          },
        ];
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  const renderStars = (rating: string) => {
    const ratingNum = parseInt(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index}
        className={`fas fa-star text-sm ${
          index < ratingNum ? 'text-yellow-400' : 'text-gray-300'
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
          {isLoading ? (
            <div className=\"text-center py-8 col-span-2\">
              <i className=\"fas fa-spinner fa-spin text-2xl text-primary\"></i>
              <p className={`mt-2 text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
              </p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className=\"text-center py-8 col-span-2\">
              <i className=\"fas fa-comments text-4xl text-muted-foreground\"></i>
              <p className={`mt-2 text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'لا توجد تعليقات متاحة حالياً' : 'No testimonials available at the moment'}
              </p>
            </div>
          ) : (
            testimonials.map((testimonial: Testimonial, index) => (
              <Card 
                key={testimonial.id}
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
                  <p className={`text-muted-foreground leading-relaxed mb-6 italic ${language === 'ar' ? 'font-arabic' : ''}`}>
                    \"{testimonial.text}\"
                  </p>

                  {/* Client Info */}
                  <div className=\"flex items-center gap-4\">
                    <img 
                      src={testimonial.imageUrl || clientImage} 
                      alt={testimonial.name}
                      className=\"w-12 h-12 rounded-full object-cover ring-2 ring-primary/20\"
                      data-testid={`img-testimonial-${index}`}
                    />
                    <div>
                      <h4 className={`font-semibold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`} data-testid={`text-testimonial-name-${index}`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`} data-testid={`text-testimonial-role-${index}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}