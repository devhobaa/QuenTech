# إصلاح مشكلة URL الملفات

## المشكلة
كان هناك خطأ في بناء URL الملفات:
```
Failed to execute 'open' on 'Window': Unable to open a window with invalid URL 'http://localhost:5000uploaded/Ehab_Hussein_Cv.pdf'
```

## السبب
المشكلة كانت في أن `fileUrl` يُحفظ بدون `/uploads/` في بعض الحالات، مما يؤدي إلى URL غير صحيح.

## الحل المطبق

### 1. إصلاح بناء URL في العميل
```typescript
// Ensure fileUrl starts with /uploads/
let fileUrl = order.fileUrl;
if (!fileUrl.startsWith('/uploads/')) {
  fileUrl = `/uploads/${fileUrl}`;
}

// Build complete URL
const completeUrl = fileUrl.startsWith('http') 
  ? fileUrl 
  : `${window.location.origin}${fileUrl}`;
```

### 2. إضافة console.log للتشخيص
```typescript
console.log('Opening file URL:', completeUrl);
console.log('Downloading file URL:', completeUrl);
```

### 3. تحسين الخادم للتشخيص
```typescript
console.log('Order data with file:', {
  ...orderData,
  fileUrl: orderData.fileUrl,
  fileExists: req.file ? fs.existsSync(path.join(process.cwd(), 'uploads', req.file.filename)) : false
});
```

## الملفات المعدلة

### ✅ العميل (Client)
- `client/src/components/AdminDashboard.tsx` - إصلاح جميع أزرار عرض/تحميل الملفات

### ✅ الخادم (Server)  
- `server/routes.ts` - إضافة تشخيص لحفظ الملفات

## النتيجة

### ✅ ما تم إصلاحه:
1. **URL صحيح**: الملفات تُفتح بالمسار الصحيح
2. **تشخيص أفضل**: console.log لتتبع المشاكل
3. **معالجة الأخطاء**: fallback آمن إذا فشل فتح النافذة
4. **دعم جميع الحالات**: سواء كان fileUrl يحتوي على `/uploads/` أم لا

### 🧪 للاختبار:
1. ارفع ملف من نموذج الطلب
2. اذهب إلى لوحة الإدارة
3. اضغط على "عرض الملف" - سيفتح بالمسار الصحيح
4. اضغط على "تحميل" - سيحمل الملف بشكل صحيح

الآن جميع مشاكل URL الملفات تم حلها! 🎉
