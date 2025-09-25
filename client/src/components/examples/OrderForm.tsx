import { OrderForm } from '../OrderForm';
import { LanguageProvider } from '../LanguageProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';

export default function OrderFormExample() {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className=\"bg-background\">
          <OrderForm onNavigate={handleNavigate} />
        </div>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}