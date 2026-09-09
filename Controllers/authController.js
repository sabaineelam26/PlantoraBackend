const jwt = require("jsonwebtoken"); 
const Admin = require("../models/Admin"); 

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async(req, res) => {
    const {name, email, password, role} = req.body; 
    const exists = await Admin.findOne({email}); 
    if(exists) return res.status(400).json({ message: "User already exists" }); 

    const user = await Admin.create({name, email, password, role}); 

    res.status(201).json({_id: user._id, name: user.name, email: user})
}

