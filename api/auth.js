


var jwt = require('jsonwebtoken')

module.exports.authentification = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.userData = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')
        
            next()
        
    } catch (error) {
        res.status(401).send({
            message: "Auth failed"
        })
    }
}

module.exports.authenAdmin = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')

        if (user.role == "Admin") {

            console.log("auth done")
            next()


        }


    } catch (error) {
        res.status(401).send({
            message: "Auth failed"
        })
    }
}

module.exports.authenCandidat = function (req, res, next) {


    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')

        if (user.role == "Candidat") {

            console.log("auth done")
            next()


        }


    } catch (error) {
        res.status(401).send({
            message: "Auth failed"
        })
    }
}
module.exports.authenCoach = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.userData = jwt.verify(token, 'KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2')
        if (req.userData.role == "Coach") {
            next()
        }
    } catch (error) {

        res.status(401).send({
            message: "Auth failed"
        })
    }
} 