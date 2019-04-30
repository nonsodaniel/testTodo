const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express()
const path = require('path');


const admin = require('./admin/routes/is_admin')
const user = require('./users/routes/user')

// =========================
// PRIVATE ROUTES WITH AUTH
// ========================



// ===== ADMIN =====
const news = require('./admin/routes/news')
const category = require('./admin/routes/category')


// ===== USER =====
const comments = require("./users/routes/comments")
const likes = require("./users/routes/likes")


//    ======  EMAIL =====   
var hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID || 'nonsodaniel07@gmail.com',
    pass = process.env.MAILER_PASSWORD || 'pa##word'
nodemailer = require('nodemailer');



app.use(cors());

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'client/build')))

app.set('secretKey', 'nodeRestApi');// JWT secret key

//connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({ limit: '50mb' }))


//Public route
app.use('/api/admin', admin)
app.use('/api/user', user)
app.use('/api/news', news)
app.use('/api/dp', admin)
app.use('/api/category', category)
app.use('/api/comments', comments)


app.get('/api/uploads/:imgName', (req, res) => {
    console.log("My image path is", req.path)
    res.sendFile(path.join(__dirname + req.path))
})

app.get('/api/uploads/user/:imgName', (req, res) => {
    console.log("My image path is", req.path)
    res.sendFile(path.join(__dirname + req.path))
})

app.get('/api/uploads/news/:imgName', (req, res) => {
    console.log("My image path is", req.path)
    res.sendFile(path.join(__dirname + req.path))
})

//private routes
app.use('/api/admin/news', validateUser, news)
app.use('/api/admin/category', validateUser, category)
app.use('api/users/buy', validateUser, comments)

// app.use('/tickets', validateUser, tickets);  
// app.use('/category', validateUser, category)

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
})

var smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
});

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('admin/app/api/templates'),
    extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
        if (err) {
            res.json({ status: "Error", message: err.message, data: null });
        } else {
            //add user id to request 
            req.body.userId = decoded.id;
            next();
        }
    })
}




//for production use only
//get all request that are not /api and returns index file
//client app will take care of other routes i.e loaclhost:4000/somepage
//somepage will be taken care of by the server
app.get('*', (req, res) => {
    console.log("hello", path.join(__dirname + "/client/build/index.html"))
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
})
app.get('/', (req, res) => {
    console.log("helo", req, res)
})


//express doesn't really consider  not found 404 as an error so we need to handle 404 explicitly

//handle 404 error
app.use((req, res, next) => {
    let err = new Error('Not found!');
    err.status = 404;
    next(err);
})

//handle errors
app.use((err, req, res, next) => {
    console.log(err);
    if (err.status === 404)
        res.status(404).json({ message: "Not found" })
    else
        res.status(500).json({ message: "Something went wrong" })
});

let port = process.env.PORT || 4000;
app.listen(port, () => {
    // console.log(port)
    console.log(`We are live on port ${port}`)
})