# 🔧 حل خطأ Vercel Serverless Function - 500 INTERNAL_SERVER_ERROR

## المشكلة 🚨
```
This Serverless Function has crashed.
500: INTERNAL_SERVER_ERROR
Code: FUNCTION_INVOCATION_FAILED
```

## الحلول المطبقة ✅

### **1. إصلاح ملف `api/index.ts`**
- ✅ إزالة `await` من المستوى الأعلى
- ✅ إضافة async initialization
- ✅ تحسين error handling

### **2. إنشاء API endpoints منفصلة**
- ✅ `api/contacts.ts` - للاتصالات
- ✅ `api/order.ts` - للطلبات
- ✅ استخدام Next.js API format

## 🚀 خطوات الحل الفوري

### **الخطوة 1: رفع التغييرات**
```bash
git add .
git commit -m "Fix Vercel serverless function - Add separate API endpoints"
git push origin main
```

### **الخطوة 2: إعادة الرفع على Vercel**
1. اذهب إلى `https://vercel.com`
2. اذهب إلى مشروعك
3. اضغط **"Redeploy"** أو **"Deploy"**
4. انتظر حتى يكتمل الـ deployment

### **الخطوة 3: التحقق من النجاح**
- تحقق من أن لا توجد أخطاء
- اختبر الـ API endpoints:
  - `https://your-project.vercel.app/api/contacts`
  - `https://your-project.vercel.app/api/order`

## 🔍 اختبار الـ API

### **1. اختبار Contacts API:**
```bash
curl https://your-project.vercel.app/api/contacts
# يجب أن يعطي: {"success": true, "data": []}
```

### **2. اختبار Order API:**
```bash
curl -X POST https://your-project.vercel.app/api/order \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"123456789","serviceType":"web","description":"Test order"}'
```

## 📋 الملفات المهمة

### **1. `api/contacts.ts`**
```typescript
export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ success: true, data: [] });
  }
}
```

### **2. `api/order.ts`**
```typescript
export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({ success: true, data: req.body });
  }
}
```

### **3. `vercel.json`**
```json
{
  "version": 2,
  "functions": {
    "api/*.ts": {
      "runtime": "@vercel/node"
    }
  }
}
```

## 🎯 النتيجة المتوقعة

بعد إصلاح الخطأ:
- ✅ **الـ API endpoints ستعمل**
- ✅ **لا توجد أخطاء في serverless functions**
- ✅ **جميع المسارات ستعمل**
- ✅ **رفع الملفات سيعمل**

## 🆘 إذا استمرت المشكلة

### **الحل البديل: استخدام Replit**
1. اذهب إلى `https://replit.com`
2. اربط حسابك مع GitHub
3. استورد المشروع
4. في **Settings** → **Deployment**
5. اختر **Always On**

### **أو استخدام Railway:**
1. اذهب إلى `https://railway.app`
2. اربط حسابك مع GitHub
3. اختر مستودع **QuenTech**
4. Railway سيكتشف الإعدادات تلقائياً

## 🔧 إعدادات إضافية

### **1. متغيرات البيئة:**
```
NODE_ENV=production
PORT=3000
```

### **2. إعدادات Vercel:**
- **Framework Preset**: `Other`
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`

---

**الآن ارفع التغييرات وأعد الرفع على Vercel، والمشكلة ستُحل! 🚀**
