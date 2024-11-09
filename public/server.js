const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// إعدادات middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // للملفات الثابتة

// تحميل بيانات الأسماء من ملف JSON
function loadData() {
  const data = fs.readFileSync('names.json', 'utf8');
  return JSON.parse(data);
}

// حفظ البيانات في ملف JSON
function saveData(data) {
  fs.writeFileSync('names.json', JSON.stringify(data, null, 2), 'utf8');
}

// نقطة لإحضار كل الأسماء
app.get('/api/names', (req, res) => {
  const data = loadData();
  res.json(data);
});

// نقطة لإضافة اسم جديد
app.post('/api/names', (req, res) => {
  const { name, interview } = req.body;
  const data = loadData();
  data.push({ name, interview });
  saveData(data);
  res.json({ success: true, message: 'تمت إضافة الاسم بنجاح' });
});

// نقطة لحذف اسم
app.delete('/api/names/:name', (req, res) => {
  const nameToDelete = req.params.name;
  let data = loadData();
  data = data.filter(entry => entry.name !== nameToDelete);
  saveData(data);
  res.json({ success: true, message: 'تم حذف الاسم بنجاح' });
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
