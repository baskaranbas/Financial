const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const transactions = new Schema({
    transactionId: {
        type: String,
        unique: true
    },
    senderPhoneNo: {
        type: String,
        required: true,
    },
    fromAccount: {
        type: String,
        required: true
    },
    toAccount: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

transactions.pre('save', async function(next) {
    const doc = this;
    const maxVal = await mongoose.models['Transactions'].find({}).sort({ transactionId: -1 }).limit(1);
    if (maxVal.length > 0) {
        doc.transactionId = parseInt(maxVal[0]._doc.transactionId) + 1;
    } else {
        doc.transactionId = 200000000001
    }
    next();
});

// transactions.plugin(AutoIncrement, {id: 'order_seq', inc_field: 'transactionId'});

module.exports = mongoose.model('Transactions', transactions);