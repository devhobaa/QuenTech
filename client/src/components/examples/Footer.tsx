import { Footer } from '../Footer';
import { LanguageProvider } from '../LanguageProvider';

export default function FooterExample() {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`);
  };

  return (
    <LanguageProvider>
      <div className=\"bg-background min-h-screen\">
        <div className=\"pt-20 pb-8\">
          <p className=\"text-center text-muted-foreground\">Footer component with links and social media</p>
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    </LanguageProvider>
  );
}