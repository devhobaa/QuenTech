import { createContext, useContext } from 'react';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.order': 'Order Now',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Innovative Software Solutions',
    'hero.subtitle': 'QuenTech delivers cutting-edge software development services that transform your business ideas into reality',
    'hero.cta.primary': 'Get Started Now',
    'hero.cta.secondary': 'Learn More',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive software solutions tailored to your needs',
    'services.web.title': 'Web Development',
    'services.web.desc': 'Modern, responsive websites built with latest technologies',
    'services.ecommerce.title': 'E-Commerce Solutions',
    'services.ecommerce.desc': 'Complete online stores with payment integration',
    'services.education.title': 'Educational Platforms',
    'services.education.desc': 'Interactive learning management systems',
    'services.desktop.title': 'Desktop Applications',
    'services.desktop.desc': 'Cross-platform desktop software solutions',
    'services.mobile.title': 'Mobile Apps',
    'services.mobile.desc': 'Native and hybrid mobile applications',
    'services.custom.title': 'Custom Solutions',
    'services.custom.desc': 'Tailored software solutions for unique requirements',
    
    // Why Us
    'why.title': 'Why Choose QuenTech?',
    'why.experience.title': 'Expert Team',
    'why.experience.desc': 'Years of experience in software development',
    'why.quality.title': 'High Quality',
    'why.quality.desc': 'We deliver excellent quality in every project',
    'why.support.title': '24/7 Support',
    'why.support.desc': 'Round-the-clock technical support and maintenance',
    'why.innovation.title': 'Innovation',
    'why.innovation.desc': 'Using latest technologies and best practices',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Your Message',
    'contact.submit': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Failed to send message. Please try again.',
    
    // Order
    'order.title': 'Order Your Service',
    'order.subtitle': 'Tell us about your project requirements',
    'order.service': 'Service Type',
    'order.service.placeholder': 'Select a service',
    'order.description': 'Project Description',
    'order.description.placeholder': 'Describe your project requirements...',
    'order.file': 'Upload Files (Optional)',
    'order.submit': 'Submit Order',
    'order.success': 'Order submitted successfully! We will contact you soon.',
    'order.error': 'Failed to submit order. Please try again.',
    
    // About
    'about.title': 'About QuenTech',
    'about.subtitle': 'Your trusted software development partner',
    'about.description': 'QuenTech is a leading software development company dedicated to delivering innovative solutions that drive business growth. Our team of experienced developers and designers work collaboratively to bring your vision to life.',
    'about.team.title': 'Our Team',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To be the leading software development company in the region, empowering businesses through innovative technology solutions.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'We strive to deliver exceptional software solutions that exceed our clients\' expectations while fostering long-term partnerships.',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.client1.name': 'Ahmed Al-Rashid',
    'testimonials.client1.role': 'CEO, TechCorp',
    'testimonials.client1.text': 'QuenTech delivered an exceptional e-commerce platform that exceeded our expectations. Their team is professional and highly skilled.',
    'testimonials.client2.name': 'Sarah Johnson',
    'testimonials.client2.role': 'Product Manager, EduTech',
    'testimonials.client2.text': 'The educational platform they built for us has transformed how we deliver online courses. Excellent work!',
    
    // Footer
    'footer.tagline': 'Building the future with innovative software solutions',
    'footer.quicklinks': 'Quick Links',
    'footer.services.short': 'Services',
    'footer.contact.short': 'Contact Info',
    'footer.social': 'Follow Us',
    'footer.rights': '© 2024 QuenTech. All rights reserved.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.order': 'اطلب الآن',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    
    // Hero Section
    'hero.title': 'حلول برمجية مبتكرة',
    'hero.subtitle': 'كوين تك تقدم خدمات تطوير البرمجيات المتقدمة التي تحول أفكار عملك إلى واقع',
    'hero.cta.primary': 'ابدأ الآن',
    'hero.cta.secondary': 'اعرف المزيد',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'حلول برمجية شاملة مصممة خصيصاً لاحتياجاتك',
    'services.web.title': 'تطوير المواقع',
    'services.web.desc': 'مواقع حديثة ومتجاوبة بأحدث التقنيات',
    'services.ecommerce.title': 'المتاجر الإلكترونية',
    'services.ecommerce.desc': 'متاجر إلكترونية متكاملة مع أنظمة الدفع',
    'services.education.title': 'المنصات التعليمية',
    'services.education.desc': 'أنظمة إدارة التعلم التفاعلية',
    'services.desktop.title': 'برامج سطح المكتب',
    'services.desktop.desc': 'حلول برمجية متعددة المنصات',
    'services.mobile.title': 'تطبيقات الموبايل',
    'services.mobile.desc': 'تطبيقات أصلية ومختلطة للهواتف الذكية',
    'services.custom.title': 'حلول مخصصة',
    'services.custom.desc': 'حلول برمجية مصممة خصيصاً للمتطلبات الفريدة',
    
    // Why Us
    'why.title': 'لماذا كوين تك؟',
    'why.experience.title': 'فريق خبير',
    'why.experience.desc': 'سنوات من الخبرة في تطوير البرمجيات',
    'why.quality.title': 'جودة عالية',
    'why.quality.desc': 'نقدم جودة ممتازة في كل مشروع',
    'why.support.title': 'دعم 24/7',
    'why.support.desc': 'دعم فني وصيانة على مدار الساعة',
    'why.innovation.title': 'الابتكار',
    'why.innovation.desc': 'استخدام أحدث التقنيات وأفضل الممارسات',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'تواصل مع فريقنا',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.message': 'رسالتك',
    'contact.submit': 'إرسال الرسالة',
    'contact.success': 'تم إرسال الرسالة بنجاح!',
    'contact.error': 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    
    // Order
    'order.title': 'اطلب خدمتك',
    'order.subtitle': 'أخبرنا عن متطلبات مشروعك',
    'order.service': 'نوع الخدمة',
    'order.service.placeholder': 'اختر الخدمة',
    'order.description': 'وصف المشروع',
    'order.description.placeholder': 'اوصف متطلبات مشروعك...',
    'order.file': 'رفع ملفات (اختياري)',
    'order.submit': 'إرسال الطلب',
    'order.success': 'تم إرسال الطلب بنجاح! سنتواصل معك قريباً.',
    'order.error': 'فشل في إرسال الطلب. يرجى المحاولة مرة أخرى.',
    
    // About
    'about.title': 'عن كوين تك',
    'about.subtitle': 'شريكك الموثوق في تطوير البرمجيات',
    'about.description': 'كوين تك هي شركة رائدة في تطوير البرمجيات متخصصة في تقديم حلول مبتكرة تدفع نمو الأعمال. فريقنا من المطورين والمصممين ذوي الخبرة يعملون بشكل تعاوني لإحياء رؤيتكم.',
    'about.team.title': 'فريقنا',
    'about.vision.title': 'رؤيتنا',
    'about.vision.desc': 'أن نكون الشركة الرائدة في تطوير البرمجيات في المنطقة، وتمكين الشركات من خلال حلول تقنية مبتكرة.',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'نسعى لتقديم حلول برمجية استثنائية تتجاوز توقعات عملائنا مع تعزيز الشراكات طويلة المدى.',
    
    // Testimonials
    'testimonials.title': 'آراء عملائنا',
    'testimonials.client1.name': 'أحمد الراشد',
    'testimonials.client1.role': 'الرئيس التنفيذي، تك كورب',
    'testimonials.client1.text': 'قدمت كوين تك منصة تجارة إلكترونية استثنائية فاقت توقعاتنا. فريقهم محترف وماهر جداً.',
    'testimonials.client2.name': 'سارة جونسون',
    'testimonials.client2.role': 'مدير المنتج، إيديو تك',
    'testimonials.client2.text': 'المنصة التعليمية التي بنوها لنا غيرت طريقة تقديم الدورات الإلكترونية. عمل ممتاز!',
    
    // Footer
    'footer.tagline': 'بناء المستقبل بحلول برمجية مبتكرة',
    'footer.quicklinks': 'روابط سريعة',
    'footer.services.short': 'الخدمات',
    'footer.contact.short': 'معلومات التواصل',
    'footer.social': 'تابعنا',
    'footer.rights': '© 2024 كوين تك. جميع الحقوق محفوظة.',
  }
};