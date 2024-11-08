// Function to fetch data from the local JSON file and search for a match
function searchFunction() {
    // Get the input value (the name to search)
    const searchTerm = document.getElementById("search").value.trim();
    const resultElement = document.getElementById("search-result");

    if (searchTerm === "") {
        resultElement.textContent = "الرجاء إدخال اسم للبحث";
        return;
    }

    // Fetch the data from data.json (located in the root folder)
    fetch('data.json')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Try to find a matching name in the JSON data
            const match = data.find(entry => entry.name === searchTerm);

            if (match) {
                // Display the result if a match is found
                resultElement.textContent = `تم العثور على المقابلة: ${match.meeting}`;
            } else {
                // Show a message if no match is found
                resultElement.textContent = "لم يتم العثور على البيانات.";
            }
        })
        .catch(error => {
            // Handle any errors that may occur during the fetch operation
            resultElement.textContent = "حدث خطأ أثناء البحث.";
            console.error(error); // Log the error for debugging
        });
}
