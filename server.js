const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// تحديد مسار مجلد public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // لتفسير بيانات JSON المرسلة من العميل

// تحميل البيانات من ملف JSON مباشرة
const dataPath = path.join(__dirname, 'data.json'); // تحديد المسار للملف data.json
let data = [];

// قراءة البيانات من ملف data.json عند بدء تشغيل الخادم
fs.readFile(dataPath, 'utf8', (err, jsonData) => {
    if (err) {
        console.error('Error reading data.json:', err);
        return;
    }
    data = JSON.parse(jsonData); // تحويل النص إلى كائن JSON
});

// نقطة النهاية للبحث
app.post('/search', (req, res) => {
    const { name } = req.body; // الحصول على الاسم الذي يبحث عنه المستخدم
    const searchResults = [];

    // البحث عن الأسماء في البيانات
    data.forEach(entry => {
        if (entry.name.includes(name)) {
            searchResults.push(entry.details); // إضافة التفاصيل إذا تم العثور على الاسم
        }
    });

    // إذا تم العثور على النتائج
    if (searchResults.length > 0) {
        res.json({ found: true, name: searchResults.join(', ') });
    } else {
        res.json({ found: false });
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
