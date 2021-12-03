const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')

const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route   GET api/auth
// @desc    test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('There was a server error')
    }
}
)

// @route   POST api/auth
// @desc    Authenticate User & Get token 
// @access  Public
router.post('/', [
    check('email', 'Enter your email').isEmail(),
    check('password', 'Enter your password').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const { email, password } = req.body

    try {
        //See if the user exists
        let user = await User.findOne({ email })

        if(!user){
           return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})

        }

        //Return jswebtoken
        const payload = {
            user: {
                id: user._id
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