require('dotenv').config()
const dbConnect = require('./configs/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin')
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/api', function (req, res) {
  console.log(process.env.dbUrl)
  res.send('It Works')
})
app.use('/api/user', usersRoute);
app.use('/api/admin', adminRoute)

app.listen(3000, async () => {
  try {
    const dbconnection =  await dbConnect;
    console.log(`DB Connected at:`)
  } catch (err) {
     console.log(err) 
  }
  
  console.log("Server started at")
})