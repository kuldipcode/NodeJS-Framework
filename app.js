require('dotenv').config()
const dbConnect = require('./configs/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Kafka} = require('kafkajs');
const massuserRoute = require('./routes/massusers');
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin')
const app = express();

const kafka = new Kafka({
  clientId: 'kafka-nodejs-starter',
  brokers: ['localhost:9092'],
  ssl: false
});

const producer = kafka.producer()
app.use(bodyParser.json());
app.use(cors());
app.get('/api',function(req, res){
    console.log(process.env.dbUrl)
    res.send('It Works')
})

app.use('/api/massuserUpload', massuserRoute);
app.use('/api/user', usersRoute);
app.use('/api/admin', adminRoute)

app.listen(3001, async ()=>{
    await dbConnect.then(data=>{console.log(`DB Connected at:`)})
    // Connect to the producer
await producer.connect()

// Send an event to the demoTopic topic
await producer.send({
  topic: 'userTopic',
  messages: [
    { value: 'Hello micro-services world!' },
  ],
});

// Disconnect the producer once we're done
await producer.disconnect()
    .catch(err=>{console.log(err)});
    console.log("Server started at")
})