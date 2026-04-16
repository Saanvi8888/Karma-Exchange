const express = require("express")
const{register,login,logout,getProfile,updateProfile, communitySpotlight} = require("../controllers/AuthController");
const {protect} = require("../middleware/auth")
const router= express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',protect,logout)
router.get('/community-spotlight',protect,communitySpotlight)
router.get('/profile',protect,getProfile)
router.put('/update-Profile',protect,updateProfile)
module.exports = router;