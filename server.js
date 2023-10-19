require('dotenv').config();
const express = require('express')
const cors = require('cors');
const User = require('./models/user');
const app = express();
const dbconnect = require('./utils/dbconnect');
const userRoutes = require("./routes/userRoutes")
const jwt = require('jsonwebtoken');
dbconnect();

app.use(express.json())
app.use(cors())

app.use("/users", userRoutes)

const PORT = 7000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

