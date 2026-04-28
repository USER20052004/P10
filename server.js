const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/undertaking');
const Form = mongoose.model('Form', {name:String, roll:String, date:String, agreed:Boolean});

app.post('/submit', async (req,res) => {
  await new Form(req.body).save();
  res.json({success:true, message:'Form submitted!'});
});

app.listen(3000, ()=>console.log('http://localhost:3000'));
