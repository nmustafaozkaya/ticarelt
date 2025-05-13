document.querySelector('.chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    displayMessage(message, 'user');
    if (message) {
        
        // Send data to server and handle response
        fetch('/chat-bot/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userInput=${encodeURIComponent(message)}`
        })
        .then(response => response.text()) // Assuming the server sends back plain text
        .then(data => {
            
            displayMessage(data, 'bot'); // Display bot response
        })
        .catch(error => console.error('Error:', error));

        input.value = '';
    }
});

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    var converter = new showdown.Converter(),
    html      = converter.makeHtml(message);
    html = html.split('*').join('<br />')
    msgDiv.innerHTML = html;
    msgDiv.className = sender; // Add class for styling purpose
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
 