// دالة البحث التي يتم استدعاؤها عند الضغط على زر البحث
function searchFunction() {
    var searchValue = document.getElementById("search").value; // قيمة البحث من المدخل النصي
    var resultElement = document.getElementById("search-result"); // العنصر لعرض النتيجة

    // التأكد من إدخال قيمة في خانة البحث
    if (!searchValue) {
        resultElement.innerHTML = "يرجى إدخال اسم للبحث.";
        return;
    }

    // إرسال طلب للبحث في ملف Excel عبر الخادم
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: searchValue }), // إرسال الاسم الذي سيتم البحث عنه
    })
    .then(response => response.json())
    .then(data => {
        if (data.found) {
            // إذا تم العثور على الاسم، عرض النتيجة
            resultElement.innerHTML = `تم العثور على البيانات: ${data.name} - ${data.details}`;
        } else {
            // إذا لم يتم العثور على الاسم
            resultElement.innerHTML = "لم يتم العثور على البيانات.";
        }
    })
    .catch(error => {
        console.error("حدث خطأ أثناء البحث:", error);
        resultElement.innerHTML = "حدث خطأ أثناء البحث.";
    });
}
