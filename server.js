function searchFunction() {
    const searchTerm = document.getElementById('search').value;

    if (!searchTerm) {
        document.getElementById('search-result').innerHTML = 'الرجاء إدخال اسم للبحث';
        return;
    }

    // إرسال طلب POST إلى الخادم
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchTerm: searchTerm })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('search-result').innerHTML = data.error;
        } else {
            document.getElementById('search-result').innerHTML = 'النتيجة: ' + data.result;
        }
    })
    .catch(error => {
        document.getElementById('search-result').innerHTML = 'حدث خطأ أثناء البحث';
        console.error('Error:', error);
    });
}
