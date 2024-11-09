// استيراد المكتبات اللازمة
const express = require('express');
const xlsx = require('xlsx');
const path = require('path');
const app = express();
const port = 3000;

// إعداد التطبيق ليتمكن من التعامل مع بيانات JSON
app.use(express.json());

// دالة لقراءة ملف Excel والبحث فيه
function searchExcel(name) {
    // تحديد مسار ملف Excel الذي يحتوي على البيانات
    const filePath = path.join(__dirname, 'ali.xlsx'); // تأكد من أن ملف Excel في نفس مجلد الأكواد
    const workbook = xlsx.readFile(filePath);  // قراءة الملف
    const sheetName = workbook.SheetNames[0]; // نفترض أن البيانات في أول ورقة
    const sheet = workbook.Sheets[sheetName];

    // تحويل البيانات في الورقة إلى JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // البحث عن الاسم في العمود A (الذي يحتوي على الأسماء)
    const result = data.find(row => row['A'] === name); // تأكد من أن 'A' هو اسم العمود في ملف Excel

    return result; // إرجاع النتيجة إذا تم العثور على الاسم
}

// إنشاء API لبحث الاسم
app.post('/search', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ found: false, message: 'يرجى إدخال اسم للبحث.' });
    }

    const result = searchExcel(name);

    if (result) {
        // إرجاع النتيجة مع الاسم والتفاصيل من العمود B
        res.json({ found: true, name: result['A'], details: result['B'] }); // العمود A للاسم و B للتفاصيل
    } else {
        res.json({ found: false, message: 'لم يتم العثور على البيانات.' });
    }
});

// بدء الخادم على المنفذ 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
