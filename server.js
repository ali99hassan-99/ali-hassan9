const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

// إعداد التطبيق ليتمكن من التعامل مع بيانات JSON
app.use(express.json()); // لتفسير بيانات JSON المرسلة من العميل

// رابط البيانات JSON على GitHub
const dataUrl = 'https://raw.githubusercontent.com/ali99hassan-99/ali-hassan9/e508e6ba30b413bd5b4654352445570c89c4de2e/data.json';
let data = [];

// دالة تحميل البيانات من الرابط
function loadData() {
    https.get(dataUrl, (response) => {
        let jsonData = '';

        // جمع البيانات
        response.on('data', (chunk) => {
            jsonData += chunk;
        });

        // عند اكتمال التحميل
        response.on('end', () => {
            try {
                data = JSON.parse(jsonData); // تحويل النص إلى JSON وتخزينه
                console.log('Data loaded successfully:', data); // طباعة البيانات للتأكد
            } catch (error) {
                console.error('Error parsing JSON data:', error);
            }
        });
    }).on('error', (error) => {
        console.error('Error loading data from URL:', error);
    });
}

// استدعاء دالة تحميل البيانات عند بدء تشغيل الخادم
loadData();

// نقطة النهاية للبحث
app.post('/search', (req, res) => {
    const { name } = req.body; // الحصول على الاسم الذي يبحث عنه المستخدم

    if (!name) {
        return res.status(400).json({ found: false, message: 'يرجى إدخال اسم للبحث.' });
    }

    const searchResults = [];

    // البحث عن الأسماء في البيانات
    data.forEach(entry => {
        if (entry.name && entry.interview && entry.name.includes(name)) {
            searchResults.push(entry.interview); // إضافة المقابلة إذا تم العثور على الاسم
        }
    });

    // إذا تم العثور على النتائج
    if (searchResults.length > 0) {
        res.json({ found: true, interviews: searchResults.join(', ') });
    } else {
        res.json({ found: false, message: 'لم يتم العثور على البيانات.' });
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
