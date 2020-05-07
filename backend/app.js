const express = require("express");
const path=require('path');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const cors=require('cors');

const postsRoutes=require('./routes/posts');
const userRoutes=require('./routes/user');

const app = express();
app.use(cors());

mongoose.connect("mongodb+srv://"+process.env.USERNAME+":"+process.env.MONGO_ATLAS_PW+"@cluster0-trvbh.mongodb.net/node-angular?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
  console.log("Connected to Database!");
})
.catch(()=>{
  console.log("Connection Failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images',express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT ,PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
