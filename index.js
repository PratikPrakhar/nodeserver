const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const buttonSchema = new mongoose.Schema({
  value: String,
  timestamp: Date,
});
const moment = require('moment-timezone');
const Button = mongoose.model('Button', buttonSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
app.post('/button', (req, res) => {
  const { value } = req.body;
  const timestamp = moment().tz('Asia/Kolkata').format();
  const button = new Button({ value, timestamp });
  button.save()
    .then(() => res.send('added to database'))
    .catch((err) => console.error(err));
});

app.listen(PORT, () => console.log(`running ${PORT}`));
