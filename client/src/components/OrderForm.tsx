import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const orderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  serviceType: z.string().min(1, 'Please select a service type'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  fileUrl: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  onNavigate: (page: string) => void;
  selectedServiceType?: string;
}

export function OrderForm({ onNavigate, selectedServiceType }: OrderFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceType: selectedServiceType || '',
      description: '',
      fileUrl: '',
    },
  });

  // Update form when selectedServiceType changes
  useEffect(() => {
    if (selectedServiceType) {
      console.log('Setting service type:', selectedServiceType);
      form.setValue('serviceType', selectedServiceType);
    }
  }, [selectedServiceType, form]);

  const serviceOptions = [
    { value: 'web-development', label: t('services.web.title') },
    { value: 'ecommerce', label: t('services.ecommerce.title') },
    { value: 'education', label: t('services.education.title') },
    { value: 'desktop', label: t('services.desktop.title') },
    { value: 'mobile', label: t('services.mobile.title') },
    { value: 'custom', label: t('services.custom.title') },
  ];

  const createWhatsAppMessage = (data: OrderFormData) => {
    return `🎯 *طلب خدمة جديد من موقع QuenTech*

👤 *الاسم:* ${data.name}
📧 *البريد الإلكتروني:* ${data.email}
📱 *رقم الهاتف:* ${data.phone}
🛠️ *نوع الخدمة:* ${data.serviceType}
📝 *الوصف:* ${data.description}

📅 *تاريخ الطلب:* ${new Date().toLocaleDateString('ar-SA')}
⏰ *وقت الطلب:* ${new Date().toLocaleTimeString('ar-SA')}

---
*شكراً لاختيارك QuenTech للبرمجيات* 🚀`;
  };

  const submitOrderMutation = {
    mutate: async (data: OrderFormData) => {
      // Create WhatsApp message
      const whatsappMessage = createWhatsAppMessage(data);
      
      // Open WhatsApp with the message
      const whatsappUrl = `https://wa.me/201026897739?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      toast({
        title: t('order.success'),
        description: 'تم فتح الواتساب لإرسال طلبك. شكراً لك!',
      });
      
      form.reset();
      setUploadedFile(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const onSubmit = (data: OrderFormData) => {
    console.log('Order form submitted:', data);
    submitOrderMutation.mutate(data);
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('order.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('order.subtitle')}
            </p>
          </div>

          {/* Order Form */}
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl text-foreground">
                <i className="fas fa-shopping-cart mr-2 text-primary"></i>
                {t('order.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.name')}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="border-input"
                              data-testid="input-order-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.email')}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="border-input"
                              data-testid="input-order-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.phone')}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="tel"
                              className="border-input"
                              data-testid="input-order-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Service Type Field */}
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('order.service')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-input" data-testid="select-order-service">
                                <SelectValue placeholder={t('order.service.placeholder')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description Field */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('order.description')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={6}
                            placeholder={t('order.description.placeholder')}
                            className="border-input resize-none"
                            data-testid="textarea-order-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t('order.file')}
                    </label>
                    <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                        className="hidden"
                        id="file-upload"
                        data-testid="input-order-file"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="space-y-2">
                          <i className="fas fa-cloud-upload-alt text-3xl text-muted-foreground"></i>
                          <p className="text-sm text-muted-foreground">
                            {uploadedFile ? (
                              <span className="text-primary font-medium">
                                <i className="fas fa-check mr-1"></i>
                                {uploadedFile.name}
                              </span>
                            ) : (
                              'Click to upload files or drag and drop'
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, DOC, TXT, ZIP files (Max 10MB)
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 font-semibold py-3 text-lg"
                    data-testid="button-order-submit"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    {t('order.submit')}
                  </Button>
                </form>
              </Form>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('home')}
                  data-testid="button-back-home"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  {t('nav.home')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}