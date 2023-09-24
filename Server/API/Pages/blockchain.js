const express = require('express');
const app =  express();
const router = express.Router();

router.get('/:_add',(req,res)=>{
    res.json("hello")

})



module.exports=router