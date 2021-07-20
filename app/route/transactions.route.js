const router = require('express').Router();
const moment = require('moment');

const Bank_Details = require('../models/bank_details.model.js');
const Transactions = require('../models/transactions.model.js');

router.post('/', async (req, res) => {
    const transPayload ={
        fromAccount: req.body.fromAccount,
        toAccount: req.body.toAccount,
        amount: req.body.amount,
        senderPhoneNo: req.body.phoneNo,
        date: moment(new Date())
    }

    let response = null;

    try {

    const updateResult = await Bank_Details.updateOne(
        {accountNo: transPayload.fromAccount},
        {$inc: {balance: -transPayload.amount}});
        if (updateResult) {
            await Bank_Details.updateOne(
                {accountNo: transPayload.toAccount},
                {$inc: {balance: transPayload.amount}});
        }
        
    if (updateResult) {
        const transResult = await Transactions.create(transPayload);
        if (!transResult) {
            response = {
                success: false,
                message: "Amount doesn't' send"
            }
        } else {
            response = {
                success: true,
                message: "Amount sent successfully",
                data: transResult
            }
        }
    }    
    res.status(200).send(response);
    } catch(ex) {
        res.status(500).send(ex);
    }
});

router.get('/history/:accountNo', async (req, res) => {
    let response = null;
    try {
        const result = await Transactions.find({senderPhoneNo: req.params.phoneNo, fromAccount: req.params.accountNo}).exec();
        if (result) {
            response = {
                success: true,
                message: "Transaction Histories",
                data: result
            }
        } else {
            response = {
                success: false,
                message: "Transaction Histories Failed"
            }
        }
        res.status(200).send(response);
    } catch(ex) {
        res.status(200).send(ex);
    }
});

module.exports = router;