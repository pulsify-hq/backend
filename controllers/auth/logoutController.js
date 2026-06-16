const blackListedTokens = require('../../stores/tokenBlacklist');

async function logOut(req, res) {

    try{
        
    const headers = req.headers["authorization"]

    const token = headers?.split(" ")[1];

    if(!token){
        res.status(401).json({
            message: "Unauthorized"
        });

        return;
    }

    blackListedTokens.add(token);

    res.status(200).json({
        message: "Logout successful"
    })

    }catch (e) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(`Error Loggig out, ${e.message}`)
    }
}

module.exports = logOut