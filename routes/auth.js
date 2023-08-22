const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// managing all routes for the user (doesn't required authentication)
router.post('/', [

    // specifying parameters validations
    body('name').isLength({min: 3}),
    body('email').isEmail().custom(async (email) => {

        if (await User.findOne({ email })) {
            throw new Error('Email already in use');
        }
    }),
    body('password').isLength({min: 6}),

] , (req, res) => {

    // validating for errors
    const result = validationResult(req);
    if(!result.isEmpty()) {
        console.log(result["errors"][0]);
        return res.status(400).json({"errors": result, "desc": result["errors"][0]["msg"] + ", Issue on: " + result["errors"][0]["path"]});
    }
    
    // response for the errors to the users
    // console.log(validateEmail(res.body.email));
    
    // creating user here
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(user => res.json(user))
    .catch(err => res.send({
        "issue": "Something went wrong.",
        "error": err
    }));
});

module.exports = router;