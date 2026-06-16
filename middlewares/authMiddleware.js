const { verify } = require("jsonwebtoken");
const blacklistedTokens = require("../stores/tokenBlacklist");
const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next)=>{
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

    if(!token || blacklistedTokens.has(token)){
        res.status(401).json({
            message: "Unauthorized"
        });

        return;
    }


    const user =  verify(token,secret);

    req.user = user;

    next();

    }catch (e) {
        res.status(401).json({
            message: "Invalid token"
        })
        console.error(`Error validating token, ${e.message}`)
    }
}