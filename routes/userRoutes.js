const express = require('express')
const userRouter= express()

userRouter.get("/",(req,res)=>{
    res.send("WELCOME IN USER SECTION")
})

userRouter.post("/register",(req,res)=>{
   const {name,email,gender,password}=req.body;
   try {
    
   } catch (error) {
    
   }

})
