import { Services } from '../Services';
import { LanguageProvider } from '../LanguageProvider';

export default function ServicesExample() {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`);
  };

  return (
    <LanguageProvider>
      <Services onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}