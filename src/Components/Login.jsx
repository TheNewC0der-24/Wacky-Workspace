import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    Alert
} from "@mui/material";

import { BiSolidShow, BiSolidHide } from "react-icons/bi";

import { useAuth } from "../Context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    const [error, setError] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        }
        setLoading(false);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "5rem",
                paddingBottom: "5rem",
            }}
        >
            <Box sx={{
                mb: 2
            }}>
                {
                    alertVisible && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )
                }
            </Box>

            <Card elevation={0} sx={{
                maxWidth: "500px",
                width: "100%",
                border: "1px solid #ccc",
                p: 2
            }}>
                <CardHeader title={
                    <Typography variant="h4" align="center">
                        Login
                    </Typography>
                } />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            type="email"
                            placeholder="Email"
                            sx={{ mb: 3 }}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            sx={{ mb: 3 }}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                                        </IconButton>
                                    </InputAdornment>

                            }}
                        />

                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Login
                        </Button>
                    </form>

                    <Typography variant="subtitle1" align="center" sx={{ mt: 3 }}>
                        <Link to="/forgot-password" style={{ fontWeight: "bold", color: "#1976d2", textDecoration: "none" }}>Forgot Password?</Link>
                    </Typography>
                </CardContent>
            </Card>

            <Typography mt={2} variant="subtitle1">
                Don't have an account? <Link to="/signup" style={{ fontWeight: "bold", color: "#1976d2", textDecoration: "none" }}>Sign Up</Link>
            </Typography>

        </Box>
    )
}

