import express from "express"
import { apiCheck, signInUser, signUpUser, getUserData, signOutUser, createTodo, getTodos,getTodo, deleteTodo, editTodo} from "../Controller/Controller.js"
import {Authenticate} from "../Middleware/Middleware.js"

const router = express.Router()
router.get("/check",apiCheck)
router.post("/signup",signUpUser)
router.post("/signin",signInUser)
router.get("/getUserData",Authenticate, getUserData)
router.get("/signout",Authenticate, signOutUser)
router.post("/createTodo",Authenticate,createTodo)
router.get("/getTodos",Authenticate,getTodos)
router.get("/getTodo/:id",Authenticate,getTodo)
router.delete("/deleteTodo/:id",Authenticate,deleteTodo)
router.put("/editTodo/:id",Authenticate,editTodo)

export default router