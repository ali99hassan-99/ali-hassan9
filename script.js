function searchFunction() {
    const searchQuery = document.getElementById('search').value.trim(); // الحصول على النص المدخل من المستخدم
    const resultElement = document.getElementById('search-result'); // العنصر لعرض النتيجة

    if (!searchQuery) {
        resultElement.textContent = 'يرجى إدخال اسم للبحث';
        return;
    }

    // إرسال طلب GET إلى السيرفر للبحث
    fetch(`/search?name=${encodeURIComponent(searchQuery)}`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                resultElement.textContent = `النتيجة: ${data.result}`; // عرض النتيجة إذا تم العثور عليها
            } else {
                resultElement.textContent = data.error || 'حدث خطأ أثناء البحث'; // عرض الخطأ إذا لم يتم العثور على البيانات
            }
        })
        .catch(error => {
            resultElement.textContent = 'حدث خطأ أثناء البحث';
            console.error('Error:', error); // عرض الخطأ في الكونسول للمساعدة في التصحيح
        });
}
