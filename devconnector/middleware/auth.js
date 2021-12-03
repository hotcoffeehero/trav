const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    //Is there a token?
    if(!token) {
        return res.status(401).json({msg: "No token, you can't get in."})
    }
    //If so, verify it:
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'))
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({msg: 'Your Toke is not valid'})        
    }

}