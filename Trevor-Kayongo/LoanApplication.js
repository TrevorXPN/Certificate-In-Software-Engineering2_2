const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        match: /^[A-Za-z]+$/
    },
    givenName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        match: /^[A-Za-z]+$/
    },
    nin: {
        type: String,
        required: true,
        minlength: 13,
        maxlength: 14,
        validate: {
            validator: (value) => /^(CM|CF)[0-9]{8}[^0-9]+$/.test(value),
            message: 'Invalid NIN format'
        }
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const ageDiff = Date.now() - new Date(value).getTime();
                const ageDate = new Date(ageDiff);
                return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
            },
            message: 'Applicant must be at least 18 years old.'
        }
    },
    occupation: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    placeOfWork: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    loanAmount: {
        type: Number,
        required: true,
        min: 500000,
        max: 50000000,
    },
    loanSecurity: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    fallbackSecurity: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
