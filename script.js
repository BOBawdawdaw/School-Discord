// Prompt user for a name
let userName = localStorage.getItem('userName') || prompt('Enter your name:');
localStorage.setItem('userName', userName);

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Get the room name from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('room') || 'default';

// Local storage key for messages
const storageKey = `chat-room-${room}-messages`;

// Load messages from local storage
const loadMessages = () => {
  const storedMessages = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedMessages.forEach(msg => {
    const item = document.createElement('li');
    item.textContent = `${msg.user}: ${msg.text}`;
    messages.appendChild(item);
  });
};

// Save messages to local storage
const saveMessage = (msg) => {
  const storedMessages = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedMessages.push(msg);
  localStorage.setItem(storageKey, JSON.stringify(storedMessages));
};

// Listen for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const message = {
      user: userName,
      text: input.value
    };
    const item = document.createElement('li');
    item.textContent = `${message.user}: ${message.text}`;
    messages.appendChild(item);
    saveMessage(message);
    input.value = '';
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {
      location.reload();
    }, 1000); // Refresh the page after 1 second
  }
});

// Load existing messages
loadMessages();
