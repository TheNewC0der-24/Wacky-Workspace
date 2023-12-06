import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import UpdateProfile from "../Authentication/UpdateProfile";
import SignUp from "../Authentication/SignUp";
import Login from "../Authentication/Login";
import ForgetPassword from "../Authentication/ForgetPassword";
import Dashboard from "../Pages/Dashboard";

import { useAuth } from "../Context/AuthContext";
import Navbar from "../Layout/Navbar/Navbar";

const Routing = () => {
    const { currentUser } = useAuth();

    return (
        <Router>
            {currentUser &&
                <Navbar />
            }
            <Routes>
                {/* Protected Routes && Profile */}
                <Route exact path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/folder/:folderId" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/update-profile" element={
                    currentUser ? <UpdateProfile /> : <Navigate to="/login" />
                } />

                {/* Authentication */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
            </Routes>
        </Router>
    )
};

export default Routing;