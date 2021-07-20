const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const bankDetails = new Schema({
    phoneNo: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    accountNo: {
        type: String,
        unique: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

bankDetails.pre('save', async function(next) {
    const doc = this;
    // const BankDetails = new bankDetails();
    // Goods.find({}).sort({ price: -1 }).limit(1).then(goods => goods[0].price);
    const maxVal = await mongoose.models['Bank_Details'].find({}).sort({ accountNo: -1 }).limit(1);
    if (maxVal.length > 0) {
        doc.accountNo = parseInt(maxVal[0]._doc.accountNo) + 1;
    } else {
        doc.accountNo = 100000000001
    }
    next();
});

module.exports = mongoose.model('Bank_Details', bankDetails);