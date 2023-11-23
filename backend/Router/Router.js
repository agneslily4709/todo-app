import express from "express"
import { apiCheck, signInUser, signUpUser,getUserData,signOutUser } from "../Controller/Controller.js"
import Authenticate from "../Middleware/Authentication.js"

const router = express.Router()
router.get("/check",apiCheck)
router.post("/signup",signUpUser)
router.post("/signin",signInUser)
router.get("/getUserData",Authenticate, getUserData)
router.get("/signout", signOutUser)

export default router