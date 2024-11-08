const express = require('express');
const path = require('path');
const xlsx = require('xlsx');
const app = express();

// استخدام Express لخدمة الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));

// تكوين البورت الذي سيعمل عليه السيرفر
const port = 3000;

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// المسار الرئيسي للموقع
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// معالجة طلبات البحث
app.get('/search', (req, res) => {
    const searchQuery = req.query.name; // الحصول على اسم البحث من الطلب
    const filePath = path.join(__dirname, 'public', 'ali.xlsx'); // مسار ملف الإكسل

    try {
        const workbook = xlsx.readFile(filePath); // قراءة الملف
        const sheet = workbook.Sheets[workbook.SheetNames[0]]; // قراءة أول ورقة من الملف
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // تحويل البيانات إلى JSON

        // البحث في العمود الأول (الاسم) والعودة بالقيمة المقابلة من العمود الثاني
        let found = false;
        for (let row of data) {
            if (row[0] && row[0].toString().toLowerCase() === searchQuery.toLowerCase()) {
                res.json({ result: row[1] }); // إذا تم العثور على البيانات
                found = true;
                break;
            }
        }

        if (!found) {
            res.json({ error: 'لم يتم العثور على البيانات' }); // إذا لم يتم العثور على الاسم
        }

    } catch (error) {
        console.error('Error processing the file:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء البحث' }); // إظهار الخطأ إذا حدث
    }
});
