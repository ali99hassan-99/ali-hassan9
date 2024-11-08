const express = require('express');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

const app = express();
const port = 3000;

// لتحديد مكان الملف excel
const filePath = path.join(__dirname, 'public', 'ali.xlsx'); // تأكد من أن اسم الملف والمسار صحيحين

// تفعيل خدمة static لتقديم الملفات من مجلد public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // لاستخلاص البيانات من الاستعلامات POST

// تعامل مع POST طلبات البحث
app.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;

    if (!searchTerm) {
        return res.json({ error: 'الرجاء إدخال اسم للبحث' });
    }

    // تحميل ورقة العمل من ملف Excel
    let workbook;
    try {
        workbook = xlsx.readFile(filePath);
    } catch (error) {
        return res.json({ error: 'حدث خطأ أثناء تحميل ملف Excel' });
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]]; // نفترض أنه الملف يحتوي على ورقة واحدة
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // تحويل البيانات إلى مصفوفة من المصفوفات

    // البحث عن القيمة في العمود A
    let found = false;
    let result = '';

    for (let i = 1; i < data.length; i++) {  // بدءاً من الصف الثاني
        if (data[i][0] === searchTerm) {
            found = true;
            result = data[i][1];  // العودة للعمود B
            break;
        }
    }

    if (found) {
        return res.json({ result: result });
    } else {
        return res.json({ error: 'لم يتم العثور على البيانات' });
    }
});

// صفحة HTML الأساسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
