// importing requirements
const connectToMongo = require('./db');
const express = require('express');
const cors = require("cors");

// mongo connection
connectToMongo();

const app = express();
const port = 3100;
const apiPath = '/api/v1/';

// to use req.body, we have to use this middleware
app.use(express.json());
app.use(cors());

// all availble routing for the api
app.use(apiPath + 'auth', require('./routes/auth.js'));
app.use(apiPath + 'notes', require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});