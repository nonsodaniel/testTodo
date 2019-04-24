const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");

const saveImage = (name, imageFile, user_id, key) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./uploads/user/' + name, imageFile, 'base64', async (err) => {
            console.log("name", name)
            if (err) return reject(err);
            try {
                console.log('user_id==>', user_id);
                console.log(await userModel.findById(user_id));
                let result = await userModel.findByIdAndUpdate(user_id, { [key]: name });
                console.log("Result()=>", result)
                resolve({ status: "Success", message: `User successfully got ${name}`, data: result })
            } catch (e) {
                reject(e)
            }


        });
    })
}

module.exports = {
    // create: (req, res, next)=>{
    //     console.log('this is body req: ', req.body)
    //     userModel.create({firstname: req.body.firstname, othernames: req.body.othernames,
    //              email: req.body.email, phone: req.body.phone, dob: req.body.dob, school: req.body.school,
    //              state: req.body.state, address: req.body.address, 
    //              password: req.body.password}, async (err, result)=>{
    //         if(err) return  next(err);
    //         let { image } = req.body;
    //         let name = `${req.body.phone}.png`;

    //         if(image){
    //             try {
    //                await saveImage(name,image,result._id,'user_dp'); 
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }


    //             //when reg is successful then autrhenticate user
    //             userModel.findOne({email: req.body.email}, (err, userInfo)=>{
    //                 if(err){
    //                     next(err)
    //                 }else{
    //                     if(bcrypt.compareSync(req.body.password, userInfo.password)){
    //                         console.log("UserInfo", userInfo);
    //                         const token = jwt.sign({id: userInfo.id}, req.app.get('secretKey'), {expiresIn: '1h'});
    //                         res.json({status: "Success", message: "user Successfully Created!", data: {user: userInfo, token: token}})
    //                     }else{
    //                         res.json({status: "error", message: "Invalid email/password", data: userInfo});
    //                     }
    //                 }
    //             })

    //     });
    // },
    create: (req, res, next) => {
        console.log('this is body req: ', req.body)
        userModel.create({
            firstname: req.body.firstname, othernames: req.body.othernames,
            email: req.body.email, phone: req.body.phone, dob: req.body.dob, school: req.body.school,
            state: req.body.state, address: req.body.address, status: req.body.status,
            password: req.body.password
        }, async (err, result) => {
            if (err) return next(err);
            let { image } = req.body;
            let name = `${req.body.phone}.png`

            if (image) {
                try {
                    await saveImage(name, image, result._id, 'user_dp');
                } catch (error) {
                    console.log(error);
                }
            }

            //when reg is successful then autrhenticate user

            userModel.findOne({ email: req.body.email }, (err, userInfo) => {
                console.log(userInfo)
                if (err) {
                    next(err)
                } else {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({ id: userInfo.id }, req.app.get('secretKey'), { expiresIn: '7d' });
                        console.log("User Info", userInfo)
                        res.json({ status: "Success", message: "User Successfully Created!", data: { user: userInfo, token: token } })
                    } else {
                        res.json({ status: "error", message: "Invalid email/password", data: userInfo });
                    }
                }
            })
        });
    },
    authenticate: (req, res, next) => {
        userModel.findOne({ email: req.body.email }, (err, userInfo) => {
            if (err) {
                next(err)
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo.id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({ status: "Success", statuscode: 200, message: "User successfully Authenticated!", data: { user: userInfo, token: token } })
                } else {
                    res.json({ status: "error", statuscode: 404, message: "Invalid email/password", data: userInfo });
                }
            }
        })
    },
    getAll: async (req, res, next) => {
        await userModel.find({}, (err, result) => {
            console.log(result)
            let userList = [];
            if (err) throw err;
            else
                for (let users of result) {
                    console.log("My user details", users)
                    userList.push({
                        id: users._id, firstname: users.firstname, othernames: users.othernames,
                        email: users.email, phone: users.phone, school: users.school, address: req.address,
                        dob: users.dob, user_dp: users.user_dp, status: users.status, date_updated: req.date_updated, isVerify: users.isVerify
                    })
                }
            res.json({ status: "Success", statuscode: 200, message: "All Users Found!", data: userList });
        })
    },
    getById: async (req, res, next) => {
        console.log(req.body)
        await userModel.findById(req.params.userId, (err, result) => {
            // console.log(result)

            if (err) throw err;
            // console.log(result)
            else res.json({ status: "Success", statuscode: 200, message: "User Successfully Found!", data: result });
        })
    },
    updateById: async (req, res, next) => {
        let reqst = req.body
        console.log("req", reqst)
        await userModel.findByIdAndUpdate(req.params.userId, {
            firstname: reqst.firstname, othernames: reqst.othernames, email: reqst.email,
            phone: reqst.phone, school: reqst.school, address: reqst.address, dob: reqst.dob, image: reqst.image
        }, (err, result) => {
            console.log("Updated result", result)
            if (err) return err;
            else res.json({ status: "Success", statuscode: 200, message: "User profile successfully Updated!", data: result });
        })//pictures are not updatiing
    },
    deleteById: async (req, res, next) => {
        await userModel.findByIdAndDelete(req.params.userId, (err, result) => {
            if (err) throw err;
            else res.json({ status: "Success", statuscode: 200, message: "User has been successfully deleted!", data: result });
        })
    },
    // likes: async (req, res, next) =>{
    //     await
    // }

    // forgotPassword: (req, res, next)=>{
    //     userModel.findByIdAndUpdate(req.params.id{})
    // }


    createImage: async (req, res, next) => {
        try {
            let imageFile = req.body.image;
            let user_id = req.body.userid
            imageFile = imageFile.replace(/^data:image\/[a-z]+;base64,/, "");
            //  console.log("ImageFile()=>", imageFile); 
            let name = `${Math.random().toString(36).slice(-5)}.png`
            let response = await saveImage(name, imageFile, userid, 'user_dp');
            res.json(response);
        } catch (error) {
            console.log(error)
        }

    }
}



