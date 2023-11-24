import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
        fullName:{
                type:String,
                required:true
        },
        email:{
                type:String,
                required:true     
        },
        password:{
                type:String,
                required:true
        },
        agreedToTerms: {
                type: Boolean,
        },
        signedUpAt:{
                type:Date,
                default:Date.now,
                immutable:true
            },
        authToken:{
                type:String,
        }
})

userSchema.methods.generateSessionToken = async function() {
        try {
            let token = jwt.sign({ _id: this._id }, process.env.AUTH_KEY,{ expiresIn: "2h" });
            this.sessionToken = token
            return token;
        } catch (err) {
            console.log(err);
        }
};
      
export const UserModel = mongoose.model("user",userSchema)

const todoSchema = new mongoose.Schema({
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required:true
        },
        priority:{
                type: String,
                enum: ['High', 'Medium', 'Low'],
        },
        status: {
          type: String,
          enum: ['Todo', 'InProgress', 'Done'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
         immutable:true
        },
        createdBy:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required:true
        }
});

export const TodoModel = mongoose.model("todo",todoSchema)