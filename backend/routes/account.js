const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account} = require("../db");
const mongoose = require("mongoose");
const router = express.Router();


router.get("/balance",authMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userid: req.userid
    });
    res.json({
        balance:account.balance
    });

});


router.post("/transfer",authMiddleware,async (req,res)=>{

    const session = await mongoose.startSession();

    session.startTransaction();

    const{amount,to}=req.body;

    const account = await Account.findOne({userid:req.userid}).session(session);

        if(!account || account.balance < amount){
        await session.abortTransaction();
            return res.status(411).json({
                message: "Insufficient balance"
        });
        }
        
    const toAccount = await Account.findOne({userid:to}).session(session);
        if (!toAccount) {
        await session.abortTransaction();
            return res.status(400).json({
            message: "Invalid account"
        });
        }

    await Account.updateOne({userid: req.userid},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userid:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfer successfull"
    });
})
module.exports = router;