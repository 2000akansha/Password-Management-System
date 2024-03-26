const express = require('express');
const mdata =require('./mdata');
var bodyParser = require('body-parser')
const { query, validationResult, check } = require('express-validator');
// const { check, validationResult, matchedData } = require('express-validator');
const { matchedData, sanitizeBody } = require('express-validator');
const { isEmail, isLength } = require('validator');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.set('view engine', 'twig');
app.set('views', './public/view');

app.get('/', (req, res) => {

    res.render('main', {
        title: 'Password Management System', topic: 'Sign Up form', hd1: 'Username', hd2: 'Password', hd3
            : 'Confirm Password', hd4: 'Sign Up'
    })
    console.log(req.body);
})

app.post('/', [check('username', 'Invalid! Username should be EmailId.').isEmail(),
check('password', 'Password must be in 5 Chars.').isLength({ min: 5 }), check('confirmpassword', 'Password does not match !').custom((value, { req }) => value === req.body.password)], async(req, res) => {

    const errors = validationResult(req);
    console.log(errors.mapped());
    console.log(req.body);
    if (!errors.isEmpty()) {
        const user = matchedData(req);
        return res.render('main', {
            title: 'Registered', hd1: 'Username', hd2: 'Password', hd3
                : 'Confirm Password', hd4: 'Sign Up', error: errors.mapped(), user: user
        })
    } else {
 
        
        const user = matchedData(req);
        try {
            const existingUser = await mdata.customerModel.findOne({ username: req.body.username });
            if (existingUser) {
                return res.render('main', {
                    title: 'Not Registered',
                    hd1: 'Username',
                    hd2: 'Password',
                    hd3: 'Confirm Password',
                    hd4: 'Sign Up',
                    error: [{ msg: 'User with this email already exists!' }],
                    user: user
                });
            }
            const newCustomer = new mdata.customerModel({
                username: req.body.username,
                password: req.body.password
            });
            const savedCustomer = await newCustomer.save();
            console.log("Customer saved successfully:", savedCustomer);
            res.render('form', {
                title: 'Registered Successfully',
                title: 'User Detail',
                user: user
            });
        } catch (error) {
            console.error("Error saving customer:", error);
            res.status(500).send("Error saving customer");
        }
    }
});
app.listen(3000, () => {
    console.log("Server listening at 3000.");
})


// const user = matchedData(req); 
// return res.render('form',{title:'Not Registered',user:user})
