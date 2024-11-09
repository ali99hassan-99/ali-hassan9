// تحميل ملف Excel والبحث فيه
function searchFunction() {
    const searchQuery = document.getElementById("search").value.trim();

    if (!searchQuery) {
        alert("يرجى إدخال اسم للبحث");
        return;
    }

    // قراءة ملف Excel
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx, .xls';
    
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // اختر الورقة الأولى
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            let result = '';
            let found = false;

            // البحث في العمود الأول (الأسماء)
            rows.forEach(row => {
                if (row[0] && row[0].includes(searchQuery)) {
                    result = row[1] ? row[1] : 'لا توجد مقابلة مسجلة';
                    found = true;
                }
            });

            // عرض النتيجة
            if (found) {
                document.getElementById("search-result").innerText = `المقابلة: ${result}`;
            } else {
                document.getElementById("search-result").innerText = 'الاسم غير موجود في الملف';
            }
        };

        reader.readAsArrayBuffer(file);
    };

    fileInput.click();
}

// إضافة اسم جديد إلى البيانات (يمكن تعديل هذا حسب الحاجة لتخزين البيانات)
function addName() {
    const newName = document.getElementById("newName").value.trim();
    const newInterview = document.getElementById("newInterview").value.trim();

    if (!newName || !newInterview) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    // هنا يمكن إضافة البيانات إلى ملف Excel أو قاعدة بيانات حسب الحاجة
    console.log(`تم إضافة: ${newName} - ${newInterview}`);

    // غلق النافذة المنبثقة
    closeAddNameModal();
}

// فتح النافذة المنبثقة لإضافة اسم جديد
function openAddNameModal() {
    document.getElementById("addNameModal").style.display = "block";
}

// غلق النافذة المنبثقة
function closeAddNameModal() {
    document.getElementById("addNameModal").style.display = "none";
}
