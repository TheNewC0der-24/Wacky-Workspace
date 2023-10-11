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
    Alert,
    Container,
    Divider
} from "@mui/material";

import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

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

            <Container maxWidth="sm">
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Log into WackyWorkspace
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" mb={3}>
                    Please enter your details to continue.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="Email address"
                        sx={{ mb: 3 }}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Typography variant="subtitle1" align="end" gutterBottom>
                        <Link to="/forgot-password" style={{ fontWeight: "bold", color: "#1976d2", textDecoration: "none", }}>Forgot Password?</Link>
                    </Typography>
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
                        size="large"
                        variant="contained"
                    >
                        Login
                    </Button>
                </form>

                <Box mt={2}>
                    <Typography variant="subtitle1" align="center">
                        Don't have an account? <Link to="/signup" style={{ fontWeight: "bold", color: "#1976d2", textDecoration: "none", borderBottom: "1px solid #1976d2" }}>Sign Up</Link>
                    </Typography>
                </Box>

                <Typography variant="subtitle1" align="center" mt={3} mb={3}>
                    <Divider>
                        Or
                    </Divider>
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button
                        size="large"
                        variant="contained"
                        startIcon={<FcGoogle />}
                        sx={{ textTransform: "none", backgroundColor: "rgb(25 118 210 / 4%)", color: "#000", "&:hover": { backgroundColor: "rgb(25 118 210 / 4%)" } }}
                        disabled
                    >
                        Log in with Google
                    </Button>
                </Box>

            </Container>
        </Box>
    )
}

