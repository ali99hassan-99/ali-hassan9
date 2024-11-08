const express = require('express');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
const port = 3000;

// تحديد مسار مجلد public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // لتفسير بيانات JSON المرسلة من العميل

// تحميل ملف الاكسل
const workbook = XLSX.readFile(path.join(__dirname, 'public', 'ali.xlsx'));
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// نقطة النهاية للبحث
app.post('/search', (req, res) => {
    const { searchTerm } = req.body;
    const searchResults = [];

    // استخراج بيانات من العمود A وB
    for (let row = 1; row <= 1000; row++) { // افترض أن البيانات في 1000 صف
        const name = sheet[`A${row}`] ? sheet[`A${row}`].v : '';
        const result = sheet[`B${row}`] ? sheet[`B${row}`].v : '';

        if (name && name.includes(searchTerm)) {
            searchResults.push(result);
        }
    }

    // إذا تم العثور على النتائج
    if (searchResults.length > 0) {
        res.json({ found: true, result: searchResults.join(', ') });
    } else {
        res.json({ found: false });
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
