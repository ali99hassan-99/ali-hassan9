// استيراد المكتبات اللازمة
const express = require('express');
const xlsx = require('xlsx');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// إعداد التطبيق ليتمكن من التعامل مع بيانات JSON
app.use(express.json());

// إعداد مجلد "public" ليتمكن المستخدمون من الوصول إليه عبر الإنترنت
app.use(express.static(path.join(__dirname, 'public')));

// دالة لتحميل ملف Excel من رابط GitHub وتحويله إلى JSON
async function searchExcel(name) {
    // رابط raw لملف Excel في GitHub
    const fileUrl = 'https://raw.githubusercontent.com/ali99hassan-99/ali-hassan9/e57f958836184c49a08ef13885f5bf503d7be411/public/ali.xlsx';

    try {
        // تحميل الملف من GitHub
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

        // قراءة الملف باستخدام xlsx
        const workbook = xlsx.read(response.data);

        // نفترض أن البيانات في أول ورقة
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // تحويل البيانات في الورقة إلى JSON
        const data = xlsx.utils.sheet_to_json(sheet);

        // البحث عن الاسم في العمود A (الذي يحتوي على الأسماء)
        const result = data.find(row => row['A'] === name); // تأكد من أن 'A' هو اسم العمود في ملف Excel

        return result; // إرجاع النتيجة إذا تم العثور على الاسم
    } catch (error) {
        console.error("حدث خطأ أثناء تحميل أو معالجة الملف:", error);
        return null;
    }
}

// إنشاء API لبحث الاسم
app.post('/search', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ found: false, message: 'يرجى إدخال اسم للبحث.' });
    }

    const result = await searchExcel(name);

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
