import { ContactForm } from '../ContactForm';
import { LanguageProvider } from '../LanguageProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';

export default function ContactFormExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ContactForm />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}