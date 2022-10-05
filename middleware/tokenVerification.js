const jwt = require('jsonwebtoken')
const { user_credential } = require('../models/index')
const dotenv = require('dotenv');

dotenv.config({path: '.env'})

module.exports = verifyToken

function verifyToken(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, async function(err, decode) {
            try {
                // console.log(decode.id);
               const userDetails = await user_credential.findOne({
                where: {
                    id: decode.id
                },
                attributes: ["id"]
               })
            //    console.log(userDetails);
               if (userDetails) {
                req.user = userDetails.id
                next()
               } else {
                res.status(401).send({ message: "Unauthorized" })
                next()
               }
            } catch (error) {
                req.user = undefined
            }
        })
    } else {
        req.user = undefined
        next()
    }
}
