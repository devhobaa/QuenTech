# 🚀 رفع API على Vercel - دليل شامل

## 📁 المجلدات المطلوبة للرفع

### **المجلد الرئيسي:**
```
QuenTechWeb/
├── server/           ← المجلد الرئيسي للـ API
├── shared/           ← الملفات المشتركة
├── uploads/          ← ملفات الرفع
├── package.json      ← ملف التبعيات
├── vercel.json       ← إعدادات Vercel
└── api/              ← نقطة دخول Vercel
```

## 🔧 خطوات الرفع على Vercel

### **الخطوة 1: إعداد Vercel**
1. اذهب إلى `https://vercel.com`
2. اضغط **"Sign up"** أو **"Log in"**
3. اختر **"Continue with GitHub"**
4. اربط حسابك مع GitHub

### **الخطوة 2: رفع المشروع**
1. اضغط **"New Project"**
2. اختر مستودع **QuenTech** من GitHub
3. في **Framework Preset** اختر **"Other"**
4. في **Root Directory** اكتب: `./` (المجلد الجذر)
5. اضغط **"Deploy"**

### **الخطوة 3: إعدادات البيئة (Environment Variables)**
1. اذهب إلى **Settings** → **Environment Variables**
2. أضف المتغيرات التالية:
   ```
   NODE_ENV=production
   PORT=3000
   ```

## 📋 الملفات المطلوبة

### **1. ملف `vercel.json` (تم إنشاؤه)**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    }
  ]
}
```

### **2. ملف `api/index.js` (تم إنشاؤه)**
```javascript
import express from 'express';
import { registerRoutes } from '../server/routes.js';

const app = express();
app.use(express.json());

await registerRoutes(app);

export default app;
```

## 🚀 خطوات الرفع الفوري

### **الخطوة 1: رفع التغييرات**
```bash
git add .
git commit -m "Add Vercel configuration for API deployment"
git push origin main
```

### **الخطوة 2: رفع على Vercel**
1. اذهب إلى `https://vercel.com`
2. اضغط **"New Project"**
3. اختر مستودع **QuenTech**
4. في **Root Directory** اكتب: `./`
5. اضغط **"Deploy"**

### **الخطوة 3: التحقق من النجاح**
- انتظر حتى يكتمل الـ deployment
- ستجد رابط مثل: `https://your-project.vercel.app`
- اختبر الـ API: `https://your-project.vercel.app/api/contacts`

## 🔍 اختبار الـ API

### **1. اختبار الاتصال:**
```bash
# اختبار الـ API
curl https://your-project.vercel.app/api/contacts

# يجب أن يعطي response مثل:
{"success": true, "data": []}
```

### **2. اختبار الرفع:**
```bash
# اختبار رفع ملف
curl -X POST https://your-project.vercel.app/api/order \
  -F "name=Test" \
  -F "email=test@example.com" \
  -F "file=@test-file.txt"
```

## 📁 هيكل المشروع على Vercel

```
QuenTechWeb/
├── server/
│   ├── index.ts      ← نقطة دخول الـ API
│   ├── routes.ts     ← مسارات الـ API
│   ├── storage.ts    ← قاعدة البيانات
│   └── vite.ts       ← إعدادات Vite
├── shared/
│   └── schema.ts     ← مخططات البيانات
├── uploads/          ← ملفات الرفع
├── package.json      ← التبعيات
├── vercel.json       ← إعدادات Vercel
└── api/
    └── index.js      ← نقطة دخول Vercel
```

## 🎯 النتيجة المتوقعة

بعد الرفع:
- ✅ **الـ API سيعمل على Vercel**
- ✅ **جميع المسارات ستعمل: `/api/contacts`, `/api/order`**
- ✅ **رفع الملفات سيعمل**
- ✅ **قاعدة البيانات ستعمل**

## 🔧 إعدادات إضافية

### **1. قاعدة البيانات:**
- تأكد من أن متغيرات البيئة صحيحة
- تحقق من اتصال قاعدة البيانات

### **2. ملفات الرفع:**
- Vercel يدعم ملفات الرفع
- المسار: `/uploads/`

### **3. CORS:**
- Vercel يدعم CORS تلقائياً
- لا حاجة لإعدادات إضافية

## 🆘 حل المشاكل

### **إذا فشل الرفع:**
1. تحقق من `package.json` - يجب أن يحتوي على `"type": "module"`
2. تحقق من `vercel.json` - يجب أن يكون صحيح
3. تحقق من `api/index.js` - يجب أن يكون صحيح

### **إذا لم تعمل المسارات:**
1. تحقق من `vercel.json` routes
2. تأكد من أن المسارات تبدأ بـ `/api/`

### **إذا لم تعمل قاعدة البيانات:**
1. تحقق من متغيرات البيئة
2. تأكد من اتصال قاعدة البيانات

---

**الآن اذهب إلى Vercel واتبع الخطوات، والـ API سيعمل! 🚀**
