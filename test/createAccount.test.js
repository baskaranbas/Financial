const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const axios = require('axios');
const faker = require('faker');
const moment = require('moment');

describe('Financial Test Cases', async function() {
    let firstCustomerAccountNo;
    let secondCustomerAccountNo;
    let senderPhoneNo;
    before(async function() {
        firstCustomerAccountNo = '';
        secondCustomerAccountNo = '';
        senderPhoneNo = '';
    });
    it('Create Account to First Customer', async function() {
        const payload = {
            "firstName": faker.name.firstName(),
            "lastName": faker.name.lastName(),
            "dob": moment(new Date()).subtract(20, 'years'),
            "phoneNo":`${faker.datatype.number({min: 5000000000, max: 9999999999})}`,
            "pan": `DTDG${faker.datatype.number({min: 10000, max: 99999})}`,
            "bankName": "State Bank Of India",
            "branch": "Kanchipuram",
            "ifscCode": "SBI0001"
        }

        const result = await axios.post('http://localhost:4000/api/account', payload);
        firstCustomerAccountNo = result.data.data.bankDetail.accountNo;
        senderPhoneNo = result.data.data.customer.phoneNo;
        expect(result.data.success).to.equal(true);
    });
    it('Create Account to Second Customer', async function() {
        const payload = {
            "firstName": faker.name.firstName(),
            "lastName": faker.name.lastName(),
            "dob": moment(new Date()).subtract(20, 'years'),
            "phoneNo": `${faker.datatype.number({min: 5000000000, max: 9999999999})}`,
            "pan": `DTVS${faker.datatype.number({min: 10000, max: 99999})}`,
            "bankName": "State Bank Of India",
            "branch": "Kanchipuram",
            "ifscCode": "SBI0001"
        }

        const result = await axios.post('http://localhost:4000/api/account', payload);
        secondCustomerAccountNo = result.data.data.bankDetail.accountNo;
        expect(result.data.success).to.equal(true);

    });
    it('Balance Check', async function() {
        const result = await axios.get(`http://localhost:4000/api/bank/bal/${firstCustomerAccountNo}`);
        expect(result.data.success).to.be.equal(true);
    });
    it('Money Transfer', async function() {
        const payload = {
            fromAccount: firstCustomerAccountNo,
            toAccount: secondCustomerAccountNo,
            phoneNo: senderPhoneNo,
            amount: 1000
        }
        const result = await axios.post(`http://localhost:4000/api/transfer`, payload);
        expect(result.data.success).to.be.equal(true);
    });
    it('Money Transfer History', async function() {
        const result = await axios.get(`http://localhost:4000/api/transfer/history/${firstCustomerAccountNo}`);
        expect(result.data.success).to.be.equal(true);
    });
});