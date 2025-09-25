import { Hero } from '../Hero';
import { LanguageProvider } from '../LanguageProvider';

export default function HeroExample() {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`);
  };

  return (
    <LanguageProvider>
      <Hero onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}