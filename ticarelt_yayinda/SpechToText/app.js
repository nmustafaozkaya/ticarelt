document.querySelector('.speech-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (message) {
        // Her yeni çeviri için sağ kutuyu temizle
        const responseBox = document.getElementById('speec-box');
        responseBox.innerHTML = ''; // Sağ kutuyu temizle

        // Send data to server and handle response
        fetch('/speech-translate/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userInput=${encodeURIComponent(message)}`
        })
        .then(response => response.text()) // Assuming the server sends back plain text
        .then(data => {
            displayMessage(data, 'bot'); // Display bot response in the right box
        })
        .catch(error => console.error('Error:', error));
    }
});

function displayMessage(message, sender) {
    const chatBox = document.getElementById('speec-box'); // Always use the right box for both user and bot messages
    const msgDiv = document.createElement('div');
    msgDiv.innerText = message;
    msgDiv.className = sender; // Add class for styling purpose
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}
