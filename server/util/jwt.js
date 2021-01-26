const jwt = require("jsonwebtoken");

const generateToken = (payload, options) => {
    return new Promise(async (resolve, reject) => {
        try{
            const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
            resolve(token);
        }catch(e){
            reject("Token error");
        }
    });
}

const verifyToken = async (token) => {

}

module.exports = {
    generateToken,
    verifyToken
}