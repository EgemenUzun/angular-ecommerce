const express = require('express');
const WebSocket = require('ws');
const amqp = require('amqplib');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const AMQP_URL = 'amqp://guest:guest@localhost:5672'; // RabbitMQ connection URL
const EXCHANGE_NAME = 'fanoutExchange'; // Fanout exchange name

const activeConnections = new Set(); // Keep track of active WebSocket connections

let channel = null; // RabbitMQ channel for consuming messages
let queue = null; // RabbitMQ queue for WebSocket connections

// Create a function to handle RabbitMQ connection and message consumption
const consumeMessages = (ws) => {
  if (!channel) {
    amqp
      .connect(AMQP_URL)
      .then((connection) => connection.createChannel())
      .then((ch) => {
        channel = ch;
        // Declare a fanout exchange
        return channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: true });
      })
      .then(() => {
        // Declare a unique queue for all WebSocket connections
        return channel.assertQueue('', { exclusive: true });
      })
      .then((q) => {
        queue = q;
        // Bind the queue to the fanout exchange
        return channel.bindQueue(queue.queue, EXCHANGE_NAME, '');
      })
      .then(() => {
        // Start consuming messages from the queue
        channel.consume(
          queue.queue,
          (msg) => {
            if (msg.content) {
              wss.clients.forEach(client => {
                client.send(msg.content.toString());
              });
            }
          },
          { noAck: true }
        );
      })
      .catch((error) => {
        console.error('Error connecting to RabbitMQ', error);
      });
  }

  activeConnections.add(ws);
};

// WebSocket server
wss.on('connection', (ws) => {
  console.log('WebSocket connected');
  consumeMessages(ws);

  ws.on('close', () => {
    console.log('WebSocket disconnected');
    activeConnections.delete(ws);

    // Close the RabbitMQ queue if there are no active WebSocket connections
    if (activeConnections.size === 0 && channel && channel.connection && queue) {
      channel.cancel(queue.queue) // Stop consuming messages from the queue
        .then(() => {
          queue = null; // Reset the queue variable
        })
        .catch((error) => {
          console.error('Error cancelling RabbitMQ consumer', error);
        });
    }
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
