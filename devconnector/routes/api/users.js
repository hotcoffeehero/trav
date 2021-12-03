const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


// @route   POST api/users
// @desc    test route
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Enter a valid password at least six characters long').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const { name, email, password } = req.body
    try {
        //See if the user exists
        let user = await User.findOne({ email })

        if(user){
           return res.status(400).json({errors: [{msg: 'User Already Exists'}]})
        }

        //Get user's gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name, 
            email,
            avatar,
            password
        })

        //Encrypt password
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        //Return jswebtoken
        
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtToken'),
            {expiresIn: 3600000},
            (err, token) => {
                if(err) throw err;
                res.json({token})
            }
            )

    } catch (err) {
     console.error(err)   
     res.status(500).send('Server Error')
    }
    
})

module.exports = router