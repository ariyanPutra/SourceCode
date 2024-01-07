function sendMessage() {
    const webhookURL = document.getElementById('idWebhook').value;
    const message = document.getElementById('message').value;

    if (webhookURL && message) {
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Message sent successfully!');

        })
        .catch(error => {
            alert('There was a problem sending the message:', error);
        });
    } else {
        alert('Webhook URL and message are required');
    }
}
