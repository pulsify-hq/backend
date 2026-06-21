const bcrypt = require("bcrypt");
const { create, findByEmail } = require("../../models/userModel");
const { sign }= require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const sendEmail = require("../../services/sendMail");
const loginTemplate = require("../../services/templates/loginTemplate");


const signUp = async(req, res) =>{

    try{

    const { email, password, userName } = req.body;

    if(!email || !password || !userName){
        res.status(400).json({
            message: "Required fields missing"
        });
        return;
    }

    const user = await findByEmail(email);


    if(user){
        return res.status(400).json({
            message: "User already exist"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

  const { id, name } = await create(email, hashPassword, userName);

  const token = sign({
    id,
    name
  },
secret,
{expiresIn: "1h"});

 res.status(201).json({
    message: "User created successfully",
    token
 });
    }catch(e){
        res.status(500).json({
            message: "Internal server Error"
        });
        console.error(`Error creating user, ${e.message}`)
    }


}

// Login

const login = async (req, res)=>{
    
    try {
     
const { email, password } = req.body;

if(!email || !password){
    res.status(400).json({
        message: "Required field missing"
    });
    return;
}
    const user = await findByEmail(email)

    if(!user){
        res.status(401).json({
            message: "Invalid credentials"
        });
        return;
    }

    const isMatched = await bcrypt.compare(password, user.hashPassword);
    if(!isMatched){

        res.status(401).json({
            message: "Invalid credentials"
        });
        return;
    }

    const token = sign({
        id: user.id,
        username: user.name,
    }, secret, {expiresIn: "1h"});

     sendEmail(email, "New Login Detected", loginTemplate());
    res.status(200).json({
        message: "Login successful",
        token
    });
   
    } catch (e) {
        res.status(500).json({
            message: "Internal server error"
        });

        console.error("Error logging in:", e.message)
    }
}

module.exports = {signUp, login}
