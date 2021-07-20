const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: { 
        type: Date,
        required: true
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Customers', customerModel);