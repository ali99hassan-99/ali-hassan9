const xlsx = require('xlsx');
const fs = require('fs');
const path = './names.xlsx';

app.post('/add-name', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "يرجى إدخال اسم." });
    }

    // قراءة ملف Excel
    let workbook;
    if (fs.existsSync(path)) {
        workbook = xlsx.readFile(path);
    } else {
        workbook = xlsx.utils.book_new();
    }

    // استخراج أو إنشاء ورقة العمل
    let sheet = workbook.Sheets['Names'];
    if (!sheet) {
        sheet = xlsx.utils.aoa_to_sheet([['Name']]);
        xlsx.utils.book_append_sheet(workbook, sheet, 'Names');
    }

    // العثور على أول صف فارغ في الورقة
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const newRow = rows.length + 1;

    // إضافة الاسم إلى الورقة
    sheet[`A${newRow}`] = { v: name };

    // حفظ التغييرات في ملف Excel
    xlsx.writeFile(workbook, path);

    res.json({ message: "تم إضافة الاسم بنجاح." });
});
