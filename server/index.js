const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

require('dotenv').config({
  path: './.env'
});
require('./configs/db.cfg');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/list', require('./routes/list'));
app.use('/add', require('./routes/home'));
app.use('/edit', require('./routes/edit'));
app.use('/delete', require('./routes/delete'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});