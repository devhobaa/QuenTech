import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: t('contact.success'),
        description: 'We will get back to you soon!',
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: t('contact.error'),
        description: 'Please try again or contact us directly.',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data); // TODO: remove mock functionality
    submitContactMutation.mutate(data);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <i className="fas fa-star text-primary text-sm mr-2"></i>
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h2>
              <i className="fas fa-star text-primary text-sm ml-2"></i>
            </div>
            <p className={`text-lg text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن' : 'We are here to help you. Contact us and we will get back to you as soon as possible'}
            </p>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className={`text-center text-xl text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                <i className={`fas fa-envelope ${language === 'ar' ? 'ml-2' : 'mr-2'} text-primary`}></i>
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'ar' ? 'الاسم' : 'Name'}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="border-input"
                            data-testid="input-contact-name"
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
                        <FormLabel>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="border-input"
                            data-testid="input-contact-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel"
                            className="border-input"
                            data-testid="input-contact-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'ar' ? 'الرسالة' : 'Message'}</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={5}
                            className="border-input resize-none"
                            data-testid="textarea-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3"
                        disabled={submitContactMutation.isPending}
                        data-testid="button-contact-submit"
                      >
                        {submitContactMutation.isPending ? (
                          <>
                            <i className={`fas fa-spinner fa-spin ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                            {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                          </>
                        ) : (
                          <>
                            <i className={`fas fa-paper-plane ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                            {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                          </>
                        )}
                      </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}