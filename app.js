require("dotenv").config({ path: '.env' });

require("./config/database").connect();


const express = require("express");

const bcrypt = require("bcrypt");

const User = require("./model/user");

const app = express();
app.use(express.json());

const bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const nodemailer = require("nodemailer");

//SIGNUP//

app.post("/SignUP",async (req,res)=>{

    try{
    const{first_name,last_name,email,password}=req.body
    if(!(first_name&&last_name&&email&&password))
    {
res.status(400).send("all data is required")
    }

    const user = await User.findOne({email});
    if(user){
        return res.status(400).send("user is already exisits")
    }
    else{
const  user = await User.create({
    first_name,
    last_name,
    email,
    password,
});

const salt  =  bcrypt.genSalt(10);
user.password= await bcrypt.hash(user.password,salt);

await user.save();
res.status(200).json(user);
}

    }
     catch(error){
     console.log(error)
    }


});

//login


app.post("/LOGIN", async(req ,res)=>{
try{
    const{email ,password}= req.body;
    if(!(email&&password))
    {
    res.status(400).send("all data is required")
    }

    const user = await User.findOne({email});
  

const pass= bcrypt.compare(password,bcrypt.hash,function(err, result) {
    if (result) {
      console.log("It matches!")
    }
    else {
      console.log("Invalid password!");
    }
  });
    res.status(200).json(user)
    
}
catch(error)
{
console.log(error)    
}
});




const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
user:"haroonzulkifl@gmail.com",
pass:"Shahzada444"
    }
});

app.post("/email", (req,res)=>{
    const {from,to,subject,text}=req.body;
    const data={
        from :"haroonzulkifl@gmail.com",
        to:"haroonzulkifl@gmail.com",
        subject:" Mail ",
        text:" ho gia yah bhi"
    };

    transporter.sendMail(data,(error) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "DONE" });
    });
})

module.exports= app;

