import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface AdminLoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { elementRef: cardRef, isVisible: cardVisible } = useScrollAnimation();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (formData.username === 'admin@quentech.com' && formData.password === '01275924043Ee$') {
      // Store authentication state
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminLoginTime', new Date().toISOString());
      onLogin(true);
    } else {
      setError(language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-8 scroll-fade-in ${headerVisible ? 'animate' : ''}`}>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <i className="fas fa-shield-alt text-primary text-2xl"></i>
            </div>
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'تسجيل دخول الإدارة' : 'Admin Login'}
          </h1>
          <p className={`text-muted-foreground mt-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'أدخل بيانات الدخول للوصول إلى لوحة الإدارة' : 'Enter your credentials to access the admin dashboard'}
          </p>
        </div>

        {/* Login Form */}
        <Card ref={cardRef} className={`scroll-scale-up scroll-stagger-1 ${cardVisible ? 'animate' : ''}`}>
          <CardHeader className="text-center">
            <CardTitle className={`text-xl ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'بيانات الدخول' : 'Login Credentials'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className={`text-sm font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'اسم المستخدم / البريد الإلكتروني' : 'Username / Email'}
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="email"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'admin@quentech.com' : 'admin@quentech.com'}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                  <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`text-sm font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                  </>
                )}
              </Button>
            </form>

           
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? '© 2024 QuenTech - جميع الحقوق محفوظة' : '© 2024 QuenTech - All rights reserved'}
          </p>
        </div>
      </div>
    </div>
  );
}
