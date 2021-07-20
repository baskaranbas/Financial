const router = require('express').Router();

const Customers = require('../models/customers.model.js');
const Bank_Details = require('../models/bank_details.model.js');

router.post('/', async (req, res) => {

    const cusPayload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        phoneNo: req.body.phoneNo
    }

    const bankPayload = {
        phoneNo: req.body.phoneNo,
        bankName: req.body.bankName,
        branch: req.body.branch,
        ifscCode: req.body.ifscCode,
        pan: req.body.pan,
        balance: 10000        
    }
    let response = null;
    try {

        const existCustomer = await Customers.findOne({phoneNo: cusPayload.phoneNo});

        if (existCustomer && existCustomer.phoneNo === cusPayload.phoneNo) {
            bankResult = await Bank_Details.create(bankPayload);
            response = {
                success: true,
                message: 'Account created successfully',
                data: bankResult
            }
        } else {
        const customerResult = await Customers.create(cusPayload)        
        let bankResult;
        if (customerResult) {
            bankResult = await Bank_Details.create(bankPayload);
        }
        
        if (!bankResult && !customerResult) {
            response = {
                success: true,
                message: 'Customer Not Created'
            }
        } else {
            response = {
                success: true,
                message: 'Customer Created',
                data: {
                    customer: customerResult,
                    bankDetail: bankResult
                }
            }
        }
    }
        res.status(200).send(response);
    } catch(ex) {
        console.log('error --> ', ex);
        res.status(500).send(ex);
    }
});

module.exports = router;