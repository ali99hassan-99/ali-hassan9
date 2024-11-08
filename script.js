function searchFunction() {
    const searchTerm = document.getElementById("search").value.trim();
    const resultElement = document.getElementById("search-result");

    if (searchTerm === "") {
        resultElement.textContent = "الرجاء إدخال اسم للبحث";
        return;
    }

    fetch('data.json')  // تأكد من المسار
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل في تحميل البيانات');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // طباعة البيانات في Console للتأكد من أنه تم تحميلها
            const match = data.find(entry => entry.name.trim() === searchTerm);

            if (match) {
                resultElement.textContent = `تم العثور على المقابلة: ${match.meeting}`;
            } else {
                resultElement.textContent = "لم يتم العثور على البيانات.";
            }
        })
        .catch(error => {
            resultElement.textContent = "حدث خطأ أثناء البحث.";
            console.error(error);
        });
}
