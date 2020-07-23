require('dotenv').config();
require ('./config/passport');
const express = require('express')
const app = express();
const cors = require('cors');
const { urlencoded } = require('express');
const db = require("./models")
const userRoutes = require("./routes/user")
const todoListRoutes = require("./routes/todoList");
const passport = require('passport');


app.use(express.json());
app.use(urlencoded({extended:false}));
app.use(cors());
app.use("/users", userRoutes)
app.use("/todos", todoListRoutes);


db.sequelize.sync({force:false}).then( () => {
    console.log("connect");
})

app.listen(process.env.PORT ,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})