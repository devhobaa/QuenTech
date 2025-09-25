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
  const { t } = useLanguage();
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
      return apiRequest('/api/contacts', {
        method: 'POST',
        body: JSON.stringify(data),
      });
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
    <section className=\"py-20 bg-gradient-to-br from-background to-muted/30\">
      <div className=\"container mx-auto px-4\">
        <div className=\"max-w-2xl mx-auto\">
          {/* Section Header */}
          <div className=\"text-center mb-12\" data-aos=\"fade-up\">
            <h2 className=\"text-3xl md:text-4xl font-bold text-foreground mb-4\">
              {t('contact.title')}
            </h2>
            <p className=\"text-lg text-muted-foreground\">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Contact Form */}
          <Card className=\"border-border shadow-lg\" data-aos=\"fade-up\" data-aos-delay=\"200\">
            <CardHeader>
              <CardTitle className=\"text-center text-xl text-foreground\">
                <i className=\"fas fa-envelope mr-2 text-primary\"></i>
                {t('contact.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className=\"p-8\">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=\"space-y-6\">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name=\"name\"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.name')}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className=\"border-input\"
                            data-testid=\"input-contact-name\"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name=\"email\"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.email')}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type=\"email\"
                            className=\"border-input\"
                            data-testid=\"input-contact-email\"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Field */}
                  <FormField
                    control={form.control}
                    name=\"phone\"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.phone')}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type=\"tel\"
                            className=\"border-input\"
                            data-testid=\"input-contact-phone\"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name=\"message\"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={5}
                            className=\"border-input resize-none\"
                            data-testid=\"textarea-contact-message\"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type=\"submit\"
                    className=\"w-full bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 font-semibold py-3\"
                    disabled={submitContactMutation.isPending}
                    data-testid=\"button-contact-submit\"
                  >
                    {submitContactMutation.isPending ? (
                      <>
                        <i className=\"fas fa-spinner fa-spin mr-2\"></i>
                        {t('contact.sending') || 'Sending...'}
                      </>
                    ) : (
                      <>
                        <i className=\"fas fa-paper-plane mr-2\"></i>
                        {t('contact.submit')}
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