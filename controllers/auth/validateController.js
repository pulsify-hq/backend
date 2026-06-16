const blackListedTokens = require('../../stores/tokenBlacklist');
const { verify } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

async function validate(req, res) {

    try{
        
    const headers = req.headers["authorization"]
    if(!headers){
        res.status(401).json({
            message: "Unauthorized"
        });

        return;
    }

    if(!headers.startsWith("Bearer ")){
              res.status(400).json({
            message: "Invalid Headers"
        });

        return;
    }

    const token = headers.split(" ")[1];

    if( !token || blackListedTokens.has(token) ){
        res.status(401).json({
            message: "Unauthorized"
        });

        return;
    }

const user =  verify(token,secret);

   res.status(200).json({
        message: "Token is valid"
});

    }catch (e) {
        res.status(401).json({
            message: "Invalid token"
        })
        console.error(`Error validating token, ${e.message}`)
    }
}

module.exports = validate