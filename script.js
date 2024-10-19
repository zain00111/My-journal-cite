// Initialize EmailJS
(function () {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

// Handle search form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const articles = Array.from(document.querySelectorAll('#articleList li'));
    const searchMessage = document.getElementById('searchMessage');

    // Clear previous search message
    searchMessage.textContent = '';

    // Filter articles based on search input
    const filteredArticles = articles.filter(article => article.textContent.toLowerCase().includes(searchInput));

    if (filteredArticles.length > 0) {
        // Display matching articles
        searchMessage.innerHTML = `<strong>Results:</strong> <ul>${filteredArticles.map(article => `<li>${article.textContent}</li>`).join('')}</ul>`;
    } else {
        // No articles found
        searchMessage.textContent = 'No articles found matching your search.';
    }
});

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Your message has been sent successfully!");
        }, function (error) {
            console.log('FAILED...', error);
            alert("Failed to send the message. Please try again.");
        });
});
