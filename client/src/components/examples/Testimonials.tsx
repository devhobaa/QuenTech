import { Testimonials } from '../Testimonials';
import { LanguageProvider } from '../LanguageProvider';

export default function TestimonialsExample() {
  return (
    <LanguageProvider>
      <Testimonials />
    </LanguageProvider>
  );
}