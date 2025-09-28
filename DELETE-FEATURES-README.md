# إضافة ميزة حذف الطلبات والرسائل

## المميزات الجديدة

### 🗑️ حذف الطلبات
- **زر حذف**: في تبويب "الطلبات" و "الملفات"
- **تأكيد الحذف**: رسالة تأكيد قبل الحذف
- **حذف فوري**: يتم حذف الطلب من قاعدة البيانات
- **تحديث تلقائي**: قائمة الطلبات تُحدث تلقائياً

### 🗑️ حذف الرسائل
- **زر حذف**: في تبويب "الرسائل"
- **تأكيد الحذف**: رسالة تأكيد قبل الحذف
- **حذف فوري**: يتم حذف الرسالة من قاعدة البيانات
- **تحديث تلقائي**: قائمة الرسائل تُحدث تلقائياً

## التحديثات التقنية

### ✅ العميل (Client)
```typescript
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
  },
  onError: (error: any) => {
    console.error('Error deleting order:', error);
  },
});

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
```

### ✅ الخادم (Server)
```typescript
// Delete order endpoint
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const deleted = await storage.deleteOrder(orderId);
    
    if (deleted) {
      res.json({ success: true, message: "Order deleted successfully" });
    } else {
      res.status(404).json({ 
        success: false, 
        error: "Order not found" 
      });
    }
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to delete order" 
    });
  }
});

// Delete contact endpoint
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    const deleted = await storage.deleteContact(contactId);
    
    if (deleted) {
      res.json({ success: true, message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ 
        success: false, 
        error: "Contact not found" 
      });
    }
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to delete contact" 
    });
  }
});
```

### ✅ Storage (قاعدة البيانات)
```typescript
// Delete order function
async deleteOrder(id: string): Promise<boolean> {
  if (this.orders.has(id)) {
    this.orders.delete(id);
    this.saveData();
    return true;
  }
  return false;
}

// Delete contact function
async deleteContact(id: string): Promise<boolean> {
  if (this.contacts.has(id)) {
    this.contacts.delete(id);
    this.saveData();
    return true;
  }
  return false;
}
```

## واجهة المستخدم

### 🎨 أزرار الحذف
- **لون أحمر**: `variant="destructive"`
- **أيقونة سلة المهملات**: `fas fa-trash`
- **نص متعدد اللغات**: "حذف" / "Delete"
- **تعطيل أثناء التحميل**: `disabled={mutation.isPending}`

### ⚠️ تأكيد الحذف
```typescript
const handleDeleteOrder = (orderId: string) => {
  if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب؟' : 'Are you sure you want to delete this order?')) {
    deleteOrderMutation.mutate(orderId);
  }
};

const handleDeleteContact = (contactId: string) => {
  if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذه الرسالة؟' : 'Are you sure you want to delete this message?')) {
    deleteContactMutation.mutate(contactId);
  }
};
```

## الملفات المعدلة

### ✅ العميل
- `client/src/components/AdminDashboard.tsx` - إضافة أزرار الحذف والوظائف

### ✅ الخادم
- `server/routes.ts` - إضافة endpoints الحذف
- `server/storage.ts` - إضافة دوال الحذف

## النتيجة النهائية

### ✅ ما يعمل الآن:
- **حذف الطلبات**: من تبويب "الطلبات" و "الملفات"
- **حذف الرسائل**: من تبويب "الرسائل"
- **تأكيد الحذف**: رسائل تأكيد بالعربية والإنجليزية
- **تحديث تلقائي**: القوائم تُحدث فوراً بعد الحذف
- **معالجة الأخطاء**: رسائل خطأ واضحة

### 🧪 للاختبار:
1. اذهب إلى `/admin`
2. سجل دخول الإدمن
3. اذهب إلى أي تبويب (الرسائل/الطلبات/الملفات)
4. اضغط على زر "حذف" (أحمر)
5. أكد الحذف في النافذة المنبثقة
6. ستختفي العنصر من القائمة فوراً

الآن يمكن للإدمن حذف الطلبات والرسائل بسهولة! 🎉
