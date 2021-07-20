const router = require('express').Router();

const Bank_Details = require('../models/bank_details.model.js');

router.get('/bal/:accountNo', async (req, res) => {
    try {
        const result = await Bank_Details.findOne(
            {accountNo: req.params.accountNo}).select('balance');
        let response = null;    
        if (result) {
            response = {
                success: true,
                message: 'Customer Balance',
                data: {
                    balance: result._doc.balance
                }
            }
        } else {
            response = {
                success: true,
                message: 'Customer Balance getting error'
            }
        }
        res.status(200).send(response);    
    } catch(ex) {
        res.status(500).send(ex);
    }
});

module.exports = router;