// Function to fetch data from the local JSON file and search for a match
function searchFunction() {
    const searchTerm = document.getElementById("search").value.trim();  // الحصول على النص من حقل البحث
    const resultElement = document.getElementById("search-result");  // العنصر الذي سيعرض النتيجة

    // إذا كان حقل البحث فارغًا
    if (searchTerm === "") {
        resultElement.textContent = "الرجاء إدخال اسم للبحث";
        return;
    }

    // جلب البيانات من الملف data.json
    fetch('data.json')  // تأكد أن مسار data.json صحيح (مسار الملف في نفس المجلد)
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل في تحميل البيانات');
            }
            return response.json(); // تحليل البيانات بتنسيق JSON
        })
        .then(data => {
            // البحث عن المطابقة في البيانات
            const match = data.find(entry => entry.name.trim() === searchTerm); // التأكد من تطابق الاسم تمامًا

            if (match) {
                // إذا تم العثور على المطابقة
                resultElement.textContent = `تم العثور على المقابلة: ${match.meeting}`;
            } else {
                // إذا لم يتم العثور على مطابقة
                resultElement.textContent = "لم يتم العثور على البيانات.";
            }
        })
        .catch(error => {
            // التعامل مع الأخطاء مثل مشاكل الاتصال أو الأخطاء في التحليل
            resultElement.textContent = "حدث خطأ أثناء البحث.";
            console.error(error); // تسجيل الخطأ في وحدة التحكم
        });
}
