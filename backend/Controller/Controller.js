import { UserModel} from "../Model/Model.js"
import bcrypt from "bcryptjs"

export const apiCheck = (req,res) => {
        res.send(`Hello from backend`)
}

export const signUpUser = async (req, res) => {
        const { fullName, email,  password } = req.body;
        try {
            const emailCheck = await UserModel.findOne({ email: email });
            if (emailCheck) return res.status(409).json({ message: "Email ID already exists" })

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({ fullName:fullName, email: email, password: hashedPassword});
            await newUser.save();
            res.status(200).json(newUser);
        } catch (error) {
            res.status(404).json({ message:  "Signup error" });
        }
};

export const signInUser = async (req, res) => {
        const { email, password } = req.body;
        try {
                const user = await UserModel.findOne({ email: email });
                if (!user) return res.status(409).json({ message: "User email does not exist" })
                        
                const passwordValidation = await bcrypt.compare(password,user.password);
                if (!passwordValidation) return res.status(401).json({ message: "Password is incorrect" })
                
                const token = await user.generateSessionToken();
                //production
                // res.cookie("jwtoken", token, { httpOnly: true, expires: new Date(Date.now() + 3600000), secure: true, sameSite:'none' })
                //development
                res.cookie("jwtoken", token, { httpOnly: false, expires: new Date(Date.now() + 3600000), secure: true, sameSite:'none' })
                res.status(200).json(user);
        } 
        catch (error) {
                res.status(404).json({ message: "Signin Error" +error});
        }
};

export const getUserData = (req, res) =>{
        return res.send(req.rootUser);
}

export const signOutUser = (req, res)=> {
        res.clearCookie("jwtoken", { path: "/" });
        res.status(200).send(`userLogout`);
}
