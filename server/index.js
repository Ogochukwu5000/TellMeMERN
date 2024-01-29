//api-setup and database setup info
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/users')

mongoose.connect("mongodb+srv://ogochukwu:Jocavick5000_@cluster1.ggkob7y.mongodb.net/TellMeDb?retryWrites=true&w=majority");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/getUsers", async (req, res) => {
    const user =await UserModel.find({})
   console.log(user)  
   res.json(user)   
});

app.post("/createUser", async(req, res) =>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    console.log(user)  
    res.json(user);
});

app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
});