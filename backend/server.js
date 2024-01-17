const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDb = require('./config/dbConnection');

const app = express();
const dotenv = require("dotenv").config();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/transaction', require('./routes/transactionRoute'));

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`server's running on port ${process.env.PORT}`);
})