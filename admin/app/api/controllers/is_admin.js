const adminModel = require('../models/is_admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require("dotenv").config();
const saveImage = (name, imageFile, user_id, key) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./uploads/' + name, imageFile, 'base64', (err) => {
            console.log("name", name)
            if (err) return reject(err);
            adminModel.findByIdAndUpdate(user_id, { [key]: name }, (err, result) => {
                console.log("Result()=>", result)
                if (err) return reject(err);
                resolve({ status: "Success", message: `Admin successfully got ${name}`, data: result })
            })
        });
    })
}

module.exports = {
    create: (req, res, next) => {
        console.log('this is body req: ', req.body)
        adminModel.create({
            firstname: req.body.firstname, othernames: req.body.othernames, email: req.body.email, phone: req.body.phone,
            role: req.body.role, password: req.body.password
        }, async (err, result) => {
            if (err) return next(err);
            let { image } = req.body;
            let name = `${req.body.phone}.png`

            if (image) {
                try {
                    await saveImage(name, image, result._id, 'admin_dp');
                } catch (error) {
                    console.log(error);
                }
            }

            //when reg is successful then autrhenticate user

            adminModel.findOne({ email: req.body.email }, (err, adminInfo) => {

                if (err) {
                    next(err)
                } else {
                    if (bcrypt.compareSync(req.body.password, adminInfo.password)) {
                        const token = jwt.sign({ id: adminInfo.id }, req.app.get('secretKey'), { expiresIn: '7d' });
                        res.json({ status: "Success", statuscode: 200, message: "Admin Successfully Created!", data: { admin: adminInfo, token: token } })
                    } else {
                        res.json({ status: "error", message: "Invalid email/password", data: adminInfo });
                    }

                }
            })
        });
    },
    authenticate: (req, res, next) => {
        adminModel.findOne({ email: req.body.email }, (err, adminInfo) => {
            console.log("err ()=>", req.body);
            console.log("adminInfo ()=>", adminInfo)
            if (adminInfo === null) {
                return res.json({ status: "error", statuscode: 400, message: "Invalid email/password", data: adminInfo });
            }



            if (err) {
                next(err)
            } else {
                if (bcrypt.compareSync(req.body.password, adminInfo.password)) {
                    const token = jwt.sign({ id: adminInfo.id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    return res.json({ status: "Success", statuscode: 200, message: "Admin found and Login Successful!", data: { admin: adminInfo, token: token } })
                } else {
                    return res.json({ status: "error", statuscode: 200, message: "The password for this email is Incorrect, please try again!", data: adminInfo });
                }
            }
        })
    },
    updateById: (req, res, next) => {
        console.log(req.body);
        adminModel.findByIdAndUpdate(req.params.adminId, {
            name: req.body.name,
            email: req.body.email, phone: req.body.phone, admin_dp: admins.admin_dp
        }, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin record updated successfully", data: result })
        })
    },
    deleteById: (req, res, next) => {
        console.log(req.body);
        adminModel.findByIdAndDelete(req.params.adminId, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin has been successfully deleted", data: result })
        })
    },
    getById: async (req, res, next) => {
        await adminModel.findById(req.params.adminId, (err, result) => {
            console.log("One admin ()=>", result)
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin successfully found!", data: result });
        })
    },
    getAll: (req, res, next) => {
        console.log(req.body);
        const adminList = [];
        adminModel.find({}, (err, result) => {
            if (err) throw err
            else
                for (let admins of result) {
                    adminList.push({
                        id: admins._id,
                        firstname: admins.firstname, othernames: admins.othernames,
                        email: admins.email, phone: admins.phone, admin_dp: admins.admin_dp, date_created: admins.date_created
                    })
                }
            res.json({ status: "Success", statuscode: 200, message: "All Admins found", data: adminList.reverse() })
        })
    },
    // forgotPassword: (req, res, next) => {
    //     console.log(req.body);
    //     adminModel.findOneAndUpdate(req.params.adminId, { password: req.body.password }, (err, result) => {
    //         console.log("password result is", result)
    //         if (err) throw err
    //         else res.json({ status: "Success", message: "Password successfully reset", data: result });
    //         console.log("password result after", result)
    //     })
    // },
    // adminModel.findOne({ email: req.body.email }, (err, adminInfo) => {
    //     console.log("err ()=>", req.body);
    //     console.log("adminInfo ()=>", adminInfo)
    //     if (adminInfo === null) {
    //         return res.json({ status: "error", statuscode: 400, message: "Invalid email/password", data: adminInfo });
    //     }


    forgotPassword: (req, res, next) => {
        console.log(req.body);
        adminModel.findOne({ email: req.body.email }, (err, adminInfo) => {
            console.log(adminInfo)
            if (adminInfo.email === null) {
                console.log("Admin does not exist")
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                console.log(token, adminInfo.update);
                adminInfo.update({
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 360000
                })

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        admin: `${process.env.EMAIL_ADDRESS}`,
                        pass: `${process.env.EMAIL_ADDRESS}`,
                    }
                });

                const mailOptions = {
                    from: "nonsodaniel04@gmail.com",
                    to: "nonsodaniel07@gmail.com",
                    text:
                        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                        + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                        + `http://localhost:3031/reset/${token}\n\n`
                        + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                }

                console.log('sending mail');

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an error: ', err);
                    } else {
                        console.log('here is the res: ', response);
                        res.status(200).json('recovery email sent');
                    }
                });
            }
        })
    },
    createImage: async (req, res, next) => {
        try {
            let imageFile = req.body.image;
            let user_id = req.body.adminid
            imageFile = imageFile.replace(/^data:image\/[a-z]+;base64,/, "");
            //  console.log("ImageFile()=>", imageFile); 
            let name = `${Math.random().toString(36).slice(-5)}.png`
            let response = await saveImage(name, imageFile, adminid, 'admin_dp');
            res.json(response);
        } catch (error) {
            console.log(error)
        }

    }
}

