import { About } from '../About';
import { LanguageProvider } from '../LanguageProvider';

export default function AboutExample() {
  return (
    <LanguageProvider>
      <About />
    </LanguageProvider>
  );
}