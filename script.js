// دالة البحث التي يتم استدعاؤها عند الضغط على زر البحث
function searchFunction() {
    var searchValue = document.getElementById("search").value;
    var resultElement = document.getElementById("search-result");

    // التأكد من إدخال قيمة في خانة البحث
    if (!searchValue) {
        resultElement.innerHTML = "يرجى إدخال اسم للبحث.";
        return;
    }

    // ارسال طلب للبحث في ملف الاكسل (تأكد من إعداد السيرفر بشكل صحيح)
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: searchValue }), // تأكد من استخدام 'name' بدلاً من 'searchTerm'
    })
    .then(response => response.json())
    .then(data => {
        if (data.found) {
            resultElement.innerHTML = `تم العثور على البيانات: ${data.name}`;
        } else {
            resultElement.innerHTML = "لم يتم العثور على البيانات.";
        }
    })
    .catch(error => {
        console.error("حدث خطأ أثناء البحث:", error);
        resultElement.innerHTML = "حدث خطأ أثناء البحث.";
    });
}
