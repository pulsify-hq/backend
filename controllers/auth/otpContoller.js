const { otpStorage, verifiedEmail} = require("../../stores/otpStore");
const crypto = require("crypto");
const { findByEmail } = require("../../models/userModel");


async function requestOtp (req, res){

    try {
       
    const { email } = req.body;

    if(!email){
        res.status(400).json({
            message: "Required Field missing"
        });
        return;
    }

    const user = await findByEmail(email);

    if(!user){
        res.status(401).json({
            message: "Invalid credentials"
        });

        return;
    }

    // Checks if otp has already been sent and deletes it before sending a new one
    if(otpStorage.has(email)){
        otpStorage.delete(email);
    }

    const otp = crypto.randomInt(1000,10000);

    otpStorage.set(email, otp);

    setTimeout(()=>{
        otpStorage.delete(email);
    }, 5 * 60 * 1000) //Deletes Otp in 5mins


    res.status(200).json({
        message: "Otp Sent via email"
    })
 
    } catch (e) {
        res.status(500).json({
            message: "Internal server Error"
        })
        console.error(`Error sending otp: ${e.message}`);
    }}


    async function verifyOtp(req, res){

        try{
      
    const { email, otp } = req.body;

    if(!email || !otp){
        res.status(400).json({
            message: "Required Field missing"
        });
        return;
    }

        const user = await findByEmail(email);

    if(!user){
        res.status(401).json({
            message: "Invalid credentials"
        });

        return;
    }
    
    const savedOtp = Number(otpStorage.get(email));
    const numericOtp = Number(otp);
    
    if(!savedOtp || isNaN(savedOtp)){
        res.status(403).json({
            message: "Forbidden, Please request a new otp"
        });
        return;
    }

    if(savedOtp !== numericOtp){
        res.status(401).json({
            message: "Otp is Invalid or Expired"
        });
        return;
    }

    verifiedEmail.add(email);
   otpStorage.delete(email);
    
    res.status(200).json({
        message: "Otp verified"
    });

        }catch (e) {
        res.status(500).json({
            message: "Internal server Error"
        })
        console.error(`Error verifying otp: ${e.message}`);
    }
         
    }

    module.exports = {
        requestOtp,
        verifyOtp
    }