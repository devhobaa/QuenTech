import { useLanguage } from '@/lib/i18n';

export function ContactInfo() {
  const { language } = useLanguage();

  const contactMethods = [
    {
      icon: 'fas fa-map-marker-alt',
      title: language === 'ar' ? 'العنوان' : 'Address',
      details: language === 'ar' ? 'طنطا، مصر' : 'Tanta, Egypt',
    },
    {
      icon: 'fas fa-phone',
      title: language === 'ar' ? 'رقم الهاتف' : 'Phone Number',
      details: '+20 1026897739',
    },
    {
      icon: 'fas fa-envelope',
      title: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      details: 'info@quentech.com',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-star text-primary text-sm mr-2"></i>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h2>
            <i className="fas fa-star text-primary text-sm ml-2"></i>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/50 text-primary text-2xl mb-4">
                <i className={method.icon}></i>
              </div>
              <h3 className={`text-xl font-semibold text-foreground mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {method.title}
              </h3>
              <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {method.details}
              </p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <div className="w-full h-64 bg-muted/20 rounded-lg overflow-hidden mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.123456789!2d31.000000!3d30.783333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7a5b5b5b5b5b5%3A0x1234567890abcdef!2sTanta%2C%20Egypt!5e0!3m2!1sen!2seg!4v1234567890123!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'ar' ? 'خريطة موقع كوين تك في طنطا' : 'QuenTech Location Map in Tanta'}
            ></iframe>
          </div>
          <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'نحن موجودون في طنطا، مصر' : 'We are located in Tanta, Egypt'}
          </p>
        </div>
      </div>
    </section>
  );
}
