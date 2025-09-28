import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({ 
  phoneNumber = '+201026897739', 
  message = '' 
}: WhatsAppButtonProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Show button after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Stop animation after 2 seconds of being visible
  useEffect(() => {
    if (isVisible) {
      const animationTimer = setTimeout(() => {
        setHasAnimated(true);
      }, 2000);

      return () => clearTimeout(animationTimer);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    // Remove any non-numeric characters except +
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Default message based on language
    const defaultMessage = language === 'ar' 
      ? 'مرحباً، أريد الاستفسار عن خدماتكم' 
      : 'Hello QuenTech, I would like to inquire about your services';
    
    const finalMessage = message || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className={`group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-20 ${
          !hasAnimated ? 'animate-bounce' : ''
        }`}
        title={language === 'ar' ? 'تواصل معنا عبر الواتساب' : 'Contact us on WhatsApp'}
        data-testid="whatsapp-button"
      >
        {/* WhatsApp Icon */}
        <i className="fab fa-whatsapp text-2xl relative z-10"></i>
        
        {/* Pulse Animation */}
        <div className={`absolute inset-0 rounded-full bg-green-500 opacity-75 group-hover:opacity-100 ${
          !hasAnimated ? 'animate-ping' : ''
        }`}></div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {language === 'ar' ? 'تواصل معنا' : 'Contact us'}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </button>
    </div>
  );
}
