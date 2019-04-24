const mongoose = require('mongoose')
const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//Define a schema

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
    admin_dp: {
        type: String,
        required: false,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
        default: "admin"
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date
    },
}, { timestamps: true });




// hash admin password before saving into database
AdminSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});


module.exports = mongoose.model('Admin', AdminSchema)