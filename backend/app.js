const express=require('express');
const cors=require('cors');
const app=express();
const seedDB = require('./seed');
const Routes=require('./routes/transactions');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ExpenseTracker';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.get('/home',(req,res)=>{
    res.status(200).json({msg:"Backend connected"});
})
// seedDB();
app.use(express.urlencoded({extended:true}));
app.use(express.json())//to convert the request data to json format
app.use(cors())//to connect react with backend
app.use(Routes);
app.listen(8000,()=>{
    console.log("Server connected at port 8000")
})
