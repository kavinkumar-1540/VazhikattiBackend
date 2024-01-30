const User = require("../models/model").Student;
const crypto = require('crypto');

const createStudent = async(req,res)=>{
  const userData = req.body
    const {username, phone, email, password} = userData
    const requiredFields = ['username','phone','email_id','email','password'];
    const missingFields = requiredFields.filter(field => {
      if (Array.isArray(userData[field])) {
        if(userData[field].length === 0){return userData[field];}
      }else{return !userData[field];}});
    if (missingFields.length > 0) {
      const errorMessage = `Required fields missing: ${missingFields.join(', ')}`;
      return res.status(400).json({ message: errorMessage });
    }
    try {
        const uid = crypto.randomBytes(16).toString("hex");
        const user = new User({student_uid:uid,user_name: username, phone_no:phone, email_id:email , password:password})
        await user.save()
        res.status(200).json({message:'User created'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}


const StudentLogin = async(req,res) =>{
    const { username, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({user_name: username });
  
      if (!user) {
        return res.status(404).json({ message: "Appadi oru aalae illa" });
      }
  
    // Check if password matches
    if (password !== user.password) {
        return res.status(401).json({ message: "password thappu da" });
      }
  console.log(user.phone_no);
      // If both email and password are valid, return success
      return res.json({ message: "Ulla Poda Mairu", user });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

}
module.exports = {
    createUser: createStudent,
    StudentLogin:StudentLogin,
}