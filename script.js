function searchFunction() {
    const searchTerm = document.getElementById("search").value.trim();  // الحصول على النص من حقل البحث
    const resultElement = document.getElementById("search-result");  // العنصر الذي سيعرض النتيجة

    // إذا كان حقل البحث فارغًا
    if (searchTerm === "") {
        resultElement.textContent = "الرجاء إدخال اسم للبحث";
        return;
    }

    // جلب البيانات من ملف JSON
    fetch('data.json')  // تأكد من مسار data.json صحيح (يجب أن يكون في نفس المجلد مع index.html)
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل في تحميل البيانات: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('بيانات تم تحميلها بنجاح:', data);  // طباعة البيانات في وحدة التحكم

            // البحث عن المطابقة في البيانات
            const match = data.find(entry => entry.name.trim() === searchTerm);

            if (match) {
                // إذا تم العثور على المطابقة
                resultElement.textContent = `تم العثور على المقابلة: ${match.meeting}`;
            } else {
                // إذا لم يتم العثور على مطابقة
                resultElement.textContent = "لم يتم العثور على البيانات.";
            }
        })
        .catch(error => {
            // التعامل مع الأخطاء في وحدة التحكم
            resultElement.textContent = "حدث خطأ أثناء البحث: " + error.message;  // رسالة تظهر للمستخدم مع تفاصيل الخطأ
            console.error('حدث خطأ:', error);  // طباعة تفاصيل الخطأ في وحدة التحكم
        });
}
