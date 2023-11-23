import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import Errorpage from "./Pages/Errorpage";
import Signout from "./Components/Signout";
import Profile from "./Components/Profile";
import { AuthDataContext } from "./Context/AuthContext";
import "./Styles/styles.css"
import InputTodo from "./Pages/InputTodo";

function App() {
  return (
        <>
                <div className="App">
                <AuthDataContext>
                        <BrowserRouter>
                                <Navbar/>
                                        <Routes>
                                                <Route exact path="/" element={<Home />} />
                                                <Route exact path="/signup" element={<Signup />} />
                                                <Route exact path="/signin" element={<Signin />} />
                                                <Route exact path="/signout" element={<Signout />} />
                                                <Route exact path="/profile" element={<Profile />} />
                                                <Route path="*" element={<Errorpage />} />

                                        </Routes>
                                </BrowserRouter>
                        </AuthDataContext>
                </div>
        </>
  );
}

export default App;
