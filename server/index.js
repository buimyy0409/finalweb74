require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const connectDB = require('./configs/db.cfg')

app.use(cors());

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;


connectDB()


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
