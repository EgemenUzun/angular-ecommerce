/*const express = require('express');
const WebSocket = require('ws');
const amqp = require('amqplib');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const AMQP_URL = 'amqp://guest:guest@localhost:5672'; // RabbitMQ connection URL
const QUEUE_NAME = 'teste'; // RabbitMQ queue name

// Keep track of active WebSocket connections
const activeConnections = new Set();

// Create a function to handle RabbitMQ connection and message consumption
const consumeMessages = (ws) => {
  amqp
    .connect(AMQP_URL)
    .then((connection) => connection.createChannel())
    .then((channel) => {
      channel.assertQueue(QUEUE_NAME);

      // Start consuming messages from the queue
      channel.consume(
        QUEUE_NAME,
        (msg) => {
          if (msg.content) {
            ws.send(msg.content.toString());
          }
        },
        { noAck: true }
      );
    })
    .catch((error) => {
      console.error('Error connecting to RabbitMQ', error);
    });
};

// WebSocket server
wss.on('connection', (ws) => {
  console.log('WebSocket connected');
  activeConnections.add(ws);

  // Start consuming messages when a new WebSocket connection is established
  consumeMessages(ws);

  ws.on('close', () => {
    console.log('WebSocket disconnected');
    activeConnections.delete(ws);

    // Close the RabbitMQ connection if there are no active WebSocket connections
    if (activeConnections.size === 0) {
      amqp
        .connect(AMQP_URL)
        .then((connection) => connection.close())
        .catch((error) => {
          console.error('Error closing RabbitMQ connection', error);
        });
    }
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
*/

const express = require('express');
const WebSocket = require('ws');
const amqp = require('amqplib');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const AMQP_URL = 'amqp://guest:guest@localhost:5672'; // RabbitMQ connection URL
const EXCHANGE_NAME = 'fanoutExchange'; // Fanout exchange name

// Keep track of active WebSocket connections
const activeConnections = new Set();

// Create a function to handle RabbitMQ connection and message consumption
const consumeMessages = (ws) => {
  amqp
    .connect(AMQP_URL)
    .then((connection) => connection.createChannel())
    .then((channel) => {
      // Declare a fanout exchange
      channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: true });

      // Declare a unique queue for each WebSocket connection
      return channel.assertQueue('', { exclusive: true })
        .then((queue) => {
          // Bind the queue to the fanout exchange
          return channel.bindQueue(queue.queue, EXCHANGE_NAME, '')
            .then(() => {
              // Start consuming messages from the queue
              channel.consume(
                queue.queue,
                (msg) => {
                  if (msg.content) {
                    activeConnections.forEach(connection => {
                      connection.send(msg.content.toString());
                    });
                  }
                },
                { noAck: true }
              );
            });
        });
    })
    .catch((error) => {
      console.error('Error connecting to RabbitMQ', error);
    });
};

// WebSocket server
wss.on('connection', (ws) => {
  console.log('WebSocket connected');
  activeConnections.add(ws);

  // Start consuming messages when a new WebSocket connection is established
  consumeMessages(ws);

  ws.on('close', () => {
    console.log('WebSocket disconnected');
    activeConnections.delete(ws);

    // Close the RabbitMQ connection if there are no active WebSocket connections
    if (activeConnections.size === 0) {
      amqp
        .connect(AMQP_URL)
        .then((connection) => connection.close())
        .catch((error) => {
          console.error('Error closing RabbitMQ connection', error);
        });
    }
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
