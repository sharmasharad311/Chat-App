document.addEventListener("DOMContentLoaded", function() {
    // Wait for the DOM content to be fully loaded before executing the code inside this function

    const messageContainer = document.getElementById("message-container");
    // Get a reference to the HTML element with the id "message-container"
    // This element will be used to display messages in the chat app

    const messageInput = document.getElementById("message-input");
    // Get a reference to the HTML input element for typing messages

    const usernameInput = document.getElementById("username-input");
    // Get a reference to the HTML input element for entering username

    const sendButton = document.getElementById("send-button");
    // Get a reference to the HTML button element for sending messages

    const clearButton = document.getElementById("clear-button");
    // Get a reference to the HTML button element for clearing the chat

    sendButton.addEventListener("click", function() {
        // Add an event listener to the send button
        // This function will be executed when the send button is clicked

        const messageText = messageInput.value.trim();
        // Get the message text entered by the user and remove leading/trailing whitespaces

        const username = usernameInput.value.trim() || "Anonymous";
        // Get the username entered by the user or use "Anonymous" if no username is provided

        if (messageText !== "") {
            // Check if the message text is not empty

            const timestamp = new Date().toLocaleTimeString();
            // Get the current time as a formatted string

            const formattedMessage = `${timestamp} - ${username}: ${messageText}`;
            // Create a formatted message string with timestamp, username, and message text

            displayMessage(formattedMessage);
            // Display the formatted message in the chat

            saveMessageToLocalStorage(formattedMessage);
            // Save the formatted message to local storage
           
            messageInput.value = "";
            // Clear the message input field after sending the message
        }
    });

    clearButton.addEventListener("click", function() {
        // Add an event listener to the clear button
        // This function will be executed when the clear button is clicked

        localStorage.removeItem("chatMessages");
        // Remove the "chatMessages" key from local storage
        // This effectively clears the chat history

        messageContainer.innerHTML = "";
        // Clear the message container by removing all its child elements
    });

    function displayMessage(message) {
        // Define a function to display a message in the chat

        const messageElement = document.createElement("div");
        // Create a new <div> element to display the message

        messageElement.classList.add("message");
        // Add the "message" class to the message element for styling

        messageElement.textContent = message;
        // Set the text content of the message element to the provided message string

        messageContainer.appendChild(messageElement);
        // Append the message element to the message container

        messageContainer.scrollTop = messageContainer.scrollHeight;
        // Scroll the message container to the bottom to show the latest message
    }

    function saveMessageToLocalStorage(message) {
        // Define a function to save a message to local storage

        let chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        // Get the current chat messages from local storage, or an empty array if none exists

        chatMessages.push(message);
        // Add the new message to the array of chat messages

        localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
        // Save the updated array of chat messages back to local storage
    }

    function loadMessagesFromLocalStorage() {
        // Define a function to load chat messages from local storage

        const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        // Get the chat messages from local storage, or an empty array if none exists

        chatMessages.forEach(message => {
            // Loop through each message in the chat messages array

            displayMessage(message);
            // Display each message in the chat
        });
    }

    loadMessagesFromLocalStorage();
    // Load chat messages from local storage when the page is first loaded
});
