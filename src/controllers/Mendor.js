const User = require("../models/model").Mendor;
const crypto = require('crypto');

const createMendor = async(req,res)=>{
    const {username, phone, email, password,profession,organization} = req.body
    try {
        const uid = crypto.randomBytes(16).toString("hex");
        const user = new User({mendor_uid:uid,user_name: username, phone_no:phone, email_id:email , password:password, profession:profession,organization:organization})
        await user.save()
        res.status(200).json({message:'User created'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}

module.exports = {
    createMendor: createMendor,
}