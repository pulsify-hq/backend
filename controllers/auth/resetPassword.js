const { resetPassword } = require("../../models/userModel")
const bcrypt = require("bcrypt");
const { verifiedEmail } = require("../../stores/otpStore");

async function reset (req, res){

    try {
        const { email, password } = req.body;
    
    if( !email || !password ){
        res.status(400).json({
            message: "Required field missing"
        });
        return;
    }
 
    if(!verifiedEmail.has(email)){
        res.status(403).json({
            message: "Access denied"
        });
        return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await resetPassword( email, hashPassword);
    verifiedEmail.delete(email)
    res.status(200).json({
        message: "Password changed successfully, please relogin"
    });

    } catch (e) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.error(`Error reseting password, ${e.message}`)
    }
   
    
}

module.exports = reset