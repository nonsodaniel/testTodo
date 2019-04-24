const mongoose = require('mongoose')
const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//Define a schema

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
    },
    othernames: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        trim: true,
        required: true
    },
    school: {
        type: String,
        trim: true,
        required: true
    },
    user_dp: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        trim: true,
        required: false
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: "none",
        trim: true
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: null
    }
});




// hash admin password before saving into database
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});


module.exports = mongoose.model('User', UserSchema)