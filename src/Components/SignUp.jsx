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
    FormHelperText,
    Alert
} from "@mui/material";

import { BiSolidShow, BiSolidHide } from "react-icons/bi";

import { useAuth } from "../Context/AuthContext";

export default function SignUp() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { signup } = useAuth();

    const [error, setError] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            await signup(email, password);
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
                        Sign Up
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
                        <TextField
                            fullWidth
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <BiSolidHide /> : <BiSolidShow />}
                                        </IconButton>
                                    </InputAdornment>

                            }}
                        />

                        <FormHelperText error={true}>
                            {
                                password !== confirmPassword && "Passwords do not match"
                            }
                        </FormHelperText>

                        <Button
                            sx={{ mt: 3 }}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Typography mt={2} variant="subtitle1">
                Already have an account? <Link to="/login" style={{ fontWeight: "bold", color: "#1976d2", textDecoration: "none" }}>Log In</Link>
            </Typography>

        </Box>
    )
}
