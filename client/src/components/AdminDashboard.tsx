import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  fileUrl?: string;
  createdAt: string;
}


interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('contacts');
  const [adminLanguage, setAdminLanguage] = useState<'en' | 'ar'>('en');

  // Load admin language from localStorage
  useEffect(() => {
    const savedAdminLanguage = localStorage.getItem('adminLanguage') as 'en' | 'ar';
    if (savedAdminLanguage && (savedAdminLanguage === 'en' || savedAdminLanguage === 'ar')) {
      setAdminLanguage(savedAdminLanguage);
    }
  }, []);

  // Save admin language to localStorage
  useEffect(() => {
    localStorage.setItem('adminLanguage', adminLanguage);
  }, [adminLanguage]);

  // Toggle admin language
  const toggleAdminLanguage = () => {
    setAdminLanguage(adminLanguage === 'en' ? 'ar' : 'en');
  };

  // Fetch contacts
  const { data: contacts = [], isLoading: contactsLoading, refetch: refetchContacts, error: contactsError } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/contacts');
        const result = await response.json();
        return result.data || [];
      } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
      }
    },
  });

  // Fetch orders
  const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders, error: ordersError } = useQuery({
    queryKey: ['/api/orders'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/orders');
        const result = await response.json();
        return result.data || [];
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    },
  });


  // Delete order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const response = await apiRequest('DELETE', `/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      return response.json();
    },
    onSuccess: () => {
      refetchOrders();
      // You can add a toast notification here if needed
    },
    onError: (error: any) => {
      console.error('Error deleting order:', error);
      // You can add error toast notification here
    },
  });

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(adminLanguage === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب؟' : 'Are you sure you want to delete this order?')) {
      deleteOrderMutation.mutate(orderId);
    }
  };

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (contactId: string) => {
      const response = await apiRequest('DELETE', `/api/contacts/${contactId}`);
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      return response.json();
    },
    onSuccess: () => {
      refetchContacts();
    },
    onError: (error: any) => {
      console.error('Error deleting contact:', error);
    },
  });

  const handleDeleteContact = (contactId: string) => {
    if (window.confirm(adminLanguage === 'ar' ? 'هل أنت متأكد من حذف هذه الرسالة؟' : 'Are you sure you want to delete this message?')) {
      deleteContactMutation.mutate(contactId);
    }
  };



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(adminLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getServiceTypeLabel = (serviceType: string) => {
    const serviceMap: Record<string, string> = {
      'web-development': t('services.web.title'),
      'ecommerce': t('services.ecommerce.title'),
      'education': t('services.education.title'),
      'desktop': t('services.desktop.title'),
      'mobile': t('services.mobile.title'),
      'custom': t('services.custom.title'),
    };
    return serviceMap[serviceType] || serviceType;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center mb-2">
                <i className="fas fa-star text-primary text-sm mr-2"></i>
                <h1 className={`text-3xl font-bold text-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                  {adminLanguage === 'ar' ? 'لوحة الإدارة' : 'Admin Dashboard'}
                </h1>
                <i className="fas fa-star text-primary text-sm ml-2"></i>
              </div>
              <p className={`text-muted-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                {adminLanguage === 'ar' ? 'إدارة الطلبات والرسائل' : 'Manage orders and messages'}
              </p>
            </div>
            {onLogout && (
              <Button
                variant="outline"
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                {adminLanguage === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </Button>
            )}
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAdminLanguage}
              className={`flex items-center ${
                adminLanguage === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'
              }`}
              data-testid="button-language-toggle"
            >
              <i className="fas fa-globe text-sm"></i>
              <span className="text-xs font-medium">{adminLanguage === 'en' ? 'عربي' : 'EN'}</span>
            </Button>
            {onNavigate && (
              <Button
                onClick={() => onNavigate('home')}
                variant="outline"
                className={`border-primary text-primary hover:bg-primary/10 ${adminLanguage === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <i className={`fas fa-arrow-left ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                {adminLanguage === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                {adminLanguage === 'ar' ? 'إجمالي الرسائل' : 'Total Messages'}
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
                <i className="fas fa-envelope text-primary text-sm"></i>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                {contacts.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                {adminLanguage === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
                <i className="fas fa-shopping-cart text-primary text-sm"></i>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                {orders.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                {adminLanguage === 'ar' ? 'الرسائل الجديدة' : 'New Messages'}
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
                <i className="fas fa-bell text-primary text-sm"></i>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                {contacts.filter((contact: Contact) => {
                  const today = new Date().toDateString();
                  return new Date(contact.createdAt).toDateString() === today;
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Messages */}
        {(contactsError || ordersError) && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className={`text-destructive ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
              {adminLanguage === 'ar' ? 'خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.' : 'Error loading data. Please try again.'}
            </p>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border-border">
            <TabsTrigger 
              value="contacts" 
              className={`${adminLanguage === 'ar' ? 'font-arabic' : ''} data-[state=active]:bg-primary data-[state=active]:text-primary-foreground`}
            >
              {adminLanguage === 'ar' ? 'الرسائل' : 'Messages'}
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className={`${adminLanguage === 'ar' ? 'font-arabic' : ''} data-[state=active]:bg-primary data-[state=active]:text-primary-foreground`}
            >
              {adminLanguage === 'ar' ? 'الطلبات' : 'Orders'}
            </TabsTrigger>
            <TabsTrigger 
              value="files" 
              className={`${adminLanguage === 'ar' ? 'font-arabic' : ''} data-[state=active]:bg-primary data-[state=active]:text-primary-foreground`}
            >
              {adminLanguage === 'ar' ? 'الملفات' : 'Files'}
            </TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className={`flex items-center justify-between ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                  <span>{adminLanguage === 'ar' ? 'الرسائل الواردة' : 'Incoming Messages'}</span>
                  <Button
                    onClick={() => refetchContacts()}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <i className={`fas fa-refresh ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                    {adminLanguage === 'ar' ? 'تحديث' : 'Refresh'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-primary"></i>
                    <p className={`mt-2 text-muted-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                      {adminLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                    </p>
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-inbox text-4xl text-muted-foreground"></i>
                    <p className={`mt-2 text-muted-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                      {adminLanguage === 'ar' ? 'لا توجد رسائل' : 'No messages yet'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact: Contact) => (
                      <Card key={contact.id} className="bg-card border-border border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className={`font-semibold text-lg ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                                {contact.name}
                              </h3>
                              <p className="text-muted-foreground">{contact.email}</p>
                              {contact.phone && (
                                <p className="text-muted-foreground">
                                  <i className={`fas fa-phone ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                  {contact.phone}
                                </p>
                              )}
                            </div>
                            <Badge variant="secondary">
                              {formatDate(contact.createdAt)}
                            </Badge>
                          </div>
                          <p className={`text-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                            {contact.message}
                          </p>
                          <div className="mt-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`mailto:${contact.email}`)}
                            >
                              <i className={`fas fa-reply ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                              {adminLanguage === 'ar' ? 'رد' : 'Reply'}
                            </Button>
                            {contact.phone && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`tel:${contact.phone}`)}
                              >
                                <i className={`fas fa-phone ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                {adminLanguage === 'ar' ? 'اتصال' : 'Call'}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteContact(contact.id)}
                              disabled={deleteContactMutation.isPending}
                            >
                              <i className={`fas fa-trash ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                              {adminLanguage === 'ar' ? 'حذف' : 'Delete'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className={`flex items-center justify-between ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                  <span>{adminLanguage === 'ar' ? 'الطلبات الواردة' : 'Incoming Orders'}</span>
                  <Button
                    onClick={() => refetchOrders()}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <i className={`fas fa-refresh ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                    {adminLanguage === 'ar' ? 'تحديث' : 'Refresh'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-primary"></i>
                    <p className={`mt-2 text-muted-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                      {adminLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                    </p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-shopping-cart text-4xl text-muted-foreground"></i>
                    <p className={`mt-2 text-muted-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                      {adminLanguage === 'ar' ? 'لا توجد طلبات' : 'No orders yet'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: Order) => (
                      <Card key={order.id} className="bg-card border-border border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className={`font-semibold text-lg ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                                {order.name}
                              </h3>
                              <p className="text-muted-foreground">{order.email}</p>
                              <p className="text-muted-foreground">
                                <i className={`fas fa-phone ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                {order.phone}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="mb-2">
                                {formatDate(order.createdAt)}
                              </Badge>
                              <Badge variant="outline">
                                {getServiceTypeLabel(order.serviceType)}
                              </Badge>
                            </div>
                          </div>
                          <p className={`text-foreground mb-4 ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                            {order.description}
                          </p>
                          {order.fileUrl && (
                            <div className="mb-4">
                              <div className="flex items-center space-x-2">
                                <a
                                  href={(() => {
                                    let fileUrl = order.fileUrl;
                                    if (!fileUrl.startsWith('/uploads/')) {
                                      fileUrl = `/uploads/${fileUrl}`;
                                    }
                                    return fileUrl.startsWith('http') 
                                      ? fileUrl 
                                      : `${window.location.origin}${fileUrl}`;
                                  })()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center"
                                >
                                  <i className={`fas fa-file ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                  {adminLanguage === 'ar' ? 'عرض الملف المرفق' : 'View Attached File'}
                                </a>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    if (!order.fileUrl) return;
                                    
                                    // Ensure fileUrl starts with /uploads/
                                    let fileUrl = order.fileUrl;
                                    if (!fileUrl.startsWith('/uploads/')) {
                                      fileUrl = `/uploads/${fileUrl}`;
                                    }
                                    
                                    // Build complete URL
                                    const completeUrl = fileUrl.startsWith('http') 
                                      ? fileUrl 
                                      : `${window.location.origin}${fileUrl}`;
                                    
                                    console.log('Downloading file URL from orders:', completeUrl);
                                    
                                    const a = document.createElement('a');
                                    a.href = completeUrl;
                                    a.download = fileUrl.split('/').pop() || 'file';
                                    a.target = '_blank';
                                    a.rel = 'noopener noreferrer';
                                    
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                  }}
                                  className="text-xs"
                                >
                                  <i className={`fas fa-download ${adminLanguage === 'ar' ? 'ml-1' : 'mr-1'}`}></i>
                                  {adminLanguage === 'ar' ? 'تحميل' : 'Download'}
                                </Button>
                              </div>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`mailto:${order.email}`)}
                            >
                              <i className={`fas fa-reply ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                              {adminLanguage === 'ar' ? 'رد' : 'Reply'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`tel:${order.phone}`)}
                            >
                              <i className={`fas fa-phone ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                              {adminLanguage === 'ar' ? 'اتصال' : 'Call'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteOrder(order.id)}
                              disabled={deleteOrderMutation.isPending}
                            >
                              <i className={`fas fa-trash ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                              {adminLanguage === 'ar' ? 'حذف' : 'Delete'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className={`flex items-center justify-between ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                  <span>{adminLanguage === 'ar' ? 'الملفات المرفوعة من الطلبات' : 'Files from Orders'}</span>
                  <Button
                    onClick={() => refetchOrders()}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <i className={`fas fa-refresh ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                    {adminLanguage === 'ar' ? 'تحديث' : 'Refresh'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-primary"></i>
                    <p className={`mt-2 text-muted-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                      {adminLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                    </p>
                  </div>
                ) : orders.filter((order: Order) => order.fileUrl).length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-folder-open text-4xl text-muted-foreground"></i>
                    <p className={`mt-2 text-muted-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                      {adminLanguage === 'ar' ? 'لا توجد ملفات مرفوعة من الطلبات' : 'No files uploaded from orders yet'}
                    </p>
                    <p className={`text-sm text-muted-foreground mt-1 ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                      {adminLanguage === 'ar' ? 'ستظهر الملفات هنا عندما يرفع العملاء ملفات مع طلباتهم' : 'Files will appear here when customers upload files with their orders'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders
                      .filter((order: Order) => order.fileUrl)
                      .map((order: Order) => (
                        <Card key={order.id} className="bg-card border-border border-l-4 border-l-primary">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                  <i className="fas fa-file text-primary"></i>
                                </div>
                                <div>
                                  <h4 className="font-medium text-foreground">
                                    {order.name} - {getServiceTypeLabel(order.serviceType)}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {order.email} • {formatDate(order.createdAt)}
                                  </p>
                                  {order.fileUrl && (
                                    <p className="text-xs text-primary mt-1">
                                      <i className={`fas fa-paperclip ${adminLanguage === 'ar' ? 'ml-1' : 'mr-1'}`}></i>
                                      {adminLanguage === 'ar' ? 'ملف مرفق' : 'File Attached'}: {order.fileUrl.split('/').pop()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Badge variant="secondary">
                                {getServiceTypeLabel(order.serviceType)}
                              </Badge>
                            </div>
                            
                            <div className="mb-3">
                              <p className={`text-sm text-foreground ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                                <strong>{adminLanguage === 'ar' ? 'وصف المشروع:' : 'Project Description:'}</strong>
                              </p>
                              <p className={`text-sm text-muted-foreground mt-1 ${adminLanguage === 'ar' ? 'font-arabic' : ''}`}>
                                {order.description}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    if (!order.fileUrl) return;
                                    
                                    // Ensure fileUrl starts with /uploads/
                                    let fileUrl = order.fileUrl;
                                    if (!fileUrl.startsWith('/uploads/')) {
                                      fileUrl = `/uploads/${fileUrl}`;
                                    }
                                    
                                    // Build complete URL
                                    const completeUrl = fileUrl.startsWith('http') 
                                      ? fileUrl 
                                      : `${window.location.origin}${fileUrl}`;
                                    
                                    console.log('Opening file URL:', completeUrl);
                                    
                                    // Open file in new tab
                                    const newWindow = window.open(completeUrl, '_blank');
                                    if (!newWindow) {
                                      // Fallback if popup is blocked
                                      window.location.href = completeUrl;
                                    }
                                  }}
                                >
                                  <i className={`fas fa-eye ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                  {adminLanguage === 'ar' ? 'عرض الملف' : 'View File'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    if (!order.fileUrl) return;
                                    
                                    // Ensure fileUrl starts with /uploads/
                                    let fileUrl = order.fileUrl;
                                    if (!fileUrl.startsWith('/uploads/')) {
                                      fileUrl = `/uploads/${fileUrl}`;
                                    }
                                    
                                    // Build complete URL
                                    const completeUrl = fileUrl.startsWith('http') 
                                      ? fileUrl 
                                      : `${window.location.origin}${fileUrl}`;
                                    
                                    console.log('Downloading file URL:', completeUrl);
                                    
                                    // Create download link
                                    const a = document.createElement('a');
                                    a.href = completeUrl;
                                    a.download = fileUrl.split('/').pop() || 'file';
                                    a.target = '_blank';
                                    a.rel = 'noopener noreferrer';
                                    
                                    // Trigger download
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                  }}
                                >
                                  <i className={`fas fa-download ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                  {adminLanguage === 'ar' ? 'تحميل' : 'Download'}
                                </Button>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(`mailto:${order.email}`)}
                                >
                                  <i className={`fas fa-reply ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                  {adminLanguage === 'ar' ? 'رد' : 'Reply'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(`tel:${order.phone}`)}
                                >
                                  <i className={`fas fa-phone ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                  {adminLanguage === 'ar' ? 'اتصال' : 'Call'}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteOrder(order.id)}
                                  disabled={deleteOrderMutation.isPending}
                                >
                                  <i className={`fas fa-trash ${adminLanguage === 'ar' ? 'ml-2' : 'mr-2'}`}></i>
                                  {adminLanguage === 'ar' ? 'حذف' : 'Delete'}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  );
}
