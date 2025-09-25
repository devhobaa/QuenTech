import { Header } from '../Header';
import { LanguageProvider } from '../LanguageProvider';

export default function HeaderExample() {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`);
  };

  return (
    <LanguageProvider>
      <div className=\"min-h-screen bg-background\">
        <Header onNavigate={handleNavigate} currentPage=\"home\" />
        <div className=\"pt-20 p-8\">
          <p className=\"text-muted-foreground\">Header component with navigation and language switcher</p>
        </div>
      </div>
    </LanguageProvider>
  );
}