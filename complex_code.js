/*
   Filename: complex_code.js
   Description: This complex code demonstrates a real-time chat application using Node.js and socket.io.
*/

// Import required modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set static directory
app.use(express.static(__dirname + '/public'));

// Handle app routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Store online users
const users = {};

// Socket.io event handling
io.on('connection', (socket) => {
  // On user connection
  socket.on('user_connected', (username) => {
    users[socket.id] = username;
    io.emit('user_list', Object.values(users));
  });

  // On new chat message
  socket.on('new_message', (message) => {
    io.emit('new_message', {
      user: users[socket.id],
      message: message
    });
  });

  // On user disconnection
  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('user_list', Object.values(users));
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Generate random message
function generateRandomMessage() {
  const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').split('\n');
  const randomIndex = Math.floor(Math.random() * words.length);
  return `Random message: ${words[randomIndex]}`;
}

// Print random messages every 5 seconds
setInterval(() => {
  console.log(generateRandomMessage());
}, 5000);

// Define a complex class
class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  // Add two complex numbers
  add(complex) {
    return new Complex(this.real + complex.real, this.imag + complex.imag);
  }

  // Multiply two complex numbers
  multiply(complex) {
    return new Complex(this.real * complex.real - this.imag * complex.imag, this.real * complex.imag + this.imag * complex.real);
  }

  // Calculate the magnitude of a complex number
  magnitude() {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }
}

// Test the complex class
const complex1 = new Complex(2, 3);
const complex2 = new Complex(4, 5);
const complex3 = complex1.add(complex2);
console.log(`Result of addition: ${complex3.real} + ${complex3.imag}i`);
const complex4 = complex1.multiply(complex2);
console.log(`Result of multiplication: ${complex4.real} + ${complex4.imag}i`);
const magnitude = complex1.magnitude();
console.log(`Magnitude: ${magnitude}`);