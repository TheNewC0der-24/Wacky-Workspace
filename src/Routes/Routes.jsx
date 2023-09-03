import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Dashboard from "../Components/Dashboard";
import UpdateProfile from "../Components/UpdateProfile";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import ForgetPassword from "../Components/ForgetPassword";

import { useAuth } from "../Context/AuthContext";

const Routing = () => {

    const { currentUser } = useAuth();

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={
                    currentUser ? <Dashboard /> : <Navigate to="/login" />
                } />
                <Route path="/update-profile" element={
                    currentUser ? <UpdateProfile /> : <Navigate to="/login" />
                } />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
            </Routes>
        </Router>
    )
};

export default Routing;