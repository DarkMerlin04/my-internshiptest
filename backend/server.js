const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');

app.use(express.json());
app.use(cors());
app.use('/api/auth', require('./routes/authRoute'));

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`server's running on port ${process.env.PORT}`);
})