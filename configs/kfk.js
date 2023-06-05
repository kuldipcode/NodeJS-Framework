const {Kafka} = require('kafkajs');

module.exports.kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: ['localhost:9092'],
    ssl: false
  });

