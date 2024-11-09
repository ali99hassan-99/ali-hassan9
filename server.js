const express = require('express');
const app = express();
const port = 3000;

// إعداد التطبيق ليتمكن من التعامل مع بيانات JSON
app.use(express.json());

// البيانات الثابتة داخل الكود
const data = [
    { "name": "أحمد علي", "interview": "المقابلة 1" },
    { "name": "محمد سعيد", "interview": "المقابلة 2" },
    { "name": "فلاح", "interview": "المقابلة 3" },
    { "name": "علي حسن", "interview": "المقابلة 3" },
    { "name": "سارة خالد", "interview": "المقابلة 3" }
];

// نقطة النهاية للبحث
app.post('/search', (req, res) => {
    const { name } = req.body; // الحصول على الاسم الذي يبحث عنه المستخدم

    if (!name) {
        return res.status(400).json({ found: false, message: 'يرجى إدخال اسم للبحث.' });
    }

    // البحث في البيانات
    const searchResults = data.filter(entry => entry.name.includes(name));

    if (searchResults.length > 0) {
        const interviews = searchResults.map(entry => entry.interview).join(', ');
        res.json({ found: true, interviews });
    } else {
        res.status(404).json({ found: false, message: 'لم يتم العثور على البيانات.' });
    }
});

// بدء الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
