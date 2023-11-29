import { UserModel,TodoModel} from "../Model/Model.js"
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
            res.status(201).json(newUser);
        } catch (error) {
            res.status(404).json({ message:  "Signup error" });
        }
};

export const signInUser = async (req, res) => {
        const { email, password } = req.body;
        try {
                const user = await UserModel.findOne({ email: email });
                if (!user) return res.status(404).json({ message: "User email does not exist" })
                        
                const passwordValidation = await bcrypt.compare(password,user.password);
                if (!passwordValidation) return res.status(401).json({ message: "Password is incorrect" })
                const token = await user.generateSessionToken();
                res.setHeader("X-Auth-Token", token);
                res.status(200).json(user);
        } 
        catch (error) {
                res.status(500).json({ message: "Signin Error"});
        }
};

export const getUserData = (req, res) =>{
        return res.send(req.rootUser);
}

export const signOutUser = (req, res)=> {
        const token = req.token
        
        res.status(200).send(`userLogout`);
}

export const createTodo = async(req,res) => {
        try {
                const userId = req.rootUserId
                const newTodo = new TodoModel({createdBy: userId,...req.body});
                await newTodo.save()
                res.status(201).json(newTodo);
        } catch (error) {
                res.status(500).json({ message: "Create Todo error" });
        }
}

export const getTodos = async(req,res) => {
        try {
                const userId = req.rootUserId
                const userTodos = await TodoModel.find({createdBy:userId})
                res.status(200).json(userTodos)
        } catch (error) {
                res.status(500).json({ message: "Get Todos Error"});
        }
}

export const getTodo = async(req,res) => {
        try {
                const {id} = req.params
                const userTodos = await TodoModel.findOne({_id:id})
                res.status(200).json(userTodos)
        } catch (error) {
                res.status(500).json({ message: "Get Todo Error"});
        }
}

export const deleteTodo = async(req,res) => {
        try {
                const {id} = req.params
                const todo = await TodoModel.findByIdAndDelete(id);
                if (!todo)  return res.status(404).json({ error: 'Todo not found' });
                res.status(204).json({ message: 'Todo deleted successfully' });   
        } catch (error) {
                res.status(500).json({ message: "Delete Todo Error"});
        }
}

export const editTodo = async (req, res) => {
        try {
          const { id } = req.params;
          const editedTodo = req.body;
          const todo = await TodoModel.findByIdAndUpdate(id, editedTodo);
          if (!todo) return res.status(404).json({ error: 'Todo not found' });
          res.status(200).json(todo);
        } catch (error) {
                res.status(500).json({ message: "Edit Todo Error" });
        }
};
