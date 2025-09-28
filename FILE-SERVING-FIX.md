# إصلاح مشكلة عرض الملفات المرفوعة

## المشكلة
كانت الملفات المرفوعة من العملاء تظهر رابط 404 عند محاولة عرضها من لوحة الإدارة.

## السبب
1. **خطأ في الاستيراد**: `express` لم يكن مستورداً في `server/routes.ts`
2. **إعدادات خدمة الملفات**: لم تكن الملفات الثابتة تُخدم بشكل صحيح
3. **روابط الملفات**: لم تكن الروابط تُبنى بشكل صحيح في العميل

## الحل

### 1. إصلاح الخادم (Server)
```typescript
// إضافة express للاستيراد
import express from "express";

// إعداد خدمة الملفات الثابتة
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
  setHeaders: (res, filePath) => {
    // تعيين headers مناسبة لأنواع الملفات المختلفة
    const ext = path.extname(filePath).toLowerCase();
    if (['.pdf'].includes(ext)) {
      res.setHeader('Content-Type', 'application/pdf');
    } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      res.setHeader('Content-Type', `image/${ext.slice(1)}`);
    }
    // ... أنواع أخرى
    res.setHeader('Content-Disposition', 'inline');
  }
}));
```

### 2. إصلاح العميل (Client)
```typescript
// بناء الروابط بشكل صحيح
const fileUrl = order.fileUrl?.startsWith('http') 
  ? order.fileUrl 
  : `${window.location.origin}${order.fileUrl}`;

// استخدام الروابط المبنية بشكل صحيح
window.open(fileUrl, '_blank');
```

### 3. إضافة endpoint للاختبار
```typescript
// endpoint لاختبار الملفات
app.get('/api/test-files', async (req, res) => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const files = fs.readdirSync(uploadsDir).filter(file => file !== '.gitignore');
  res.json({ 
    success: true, 
    files: files.map(file => ({
      name: file,
      path: `/uploads/${file}`,
      exists: fs.existsSync(path.join(uploadsDir, file))
    }))
  });
});
```

## النتيجة

### ✅ ما تم إصلاحه:
1. **الخادم يعمل بشكل صحيح** - لا مزيد من أخطاء express
2. **الملفات تُخدم بشكل صحيح** - يمكن الوصول إليها عبر `/uploads/`
3. **الروابط تعمل** - لوحة الإدارة تعرض الملفات بشكل صحيح
4. **أنواع الملفات المختلفة** - PDF, DOC, TXT, ZIP, الصور

### 🧪 الاختبار:
```bash
# اختبار endpoint الملفات
curl http://localhost:5000/api/test-files

# اختبار ملف مباشر
curl http://localhost:5000/uploads/test-file.txt
```

### 📁 الملفات المعدلة:
- ✅ `server/routes.ts` - إصلاح express وخدمة الملفات
- ✅ `client/src/components/AdminDashboard.tsx` - إصلاح الروابط
- ✅ `uploads/test-file.txt` - ملف اختبار

## التحسينات المستقبلية:
- [ ] ضغط الملفات تلقائياً
- [ ] فحص الفيروسات
- [ ] معاينة الملفات قبل التحميل
- [ ] إحصائيات الملفات
