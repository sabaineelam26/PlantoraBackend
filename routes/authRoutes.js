const express = require("express"); 
const router = express.Router(); 
const { register, login, getMe, updateProfile, changePassword} = require("../Controllers/authController"); 
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register); 
router.post("/login", login ); 

// Protected APIs
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
module.exports = router;  