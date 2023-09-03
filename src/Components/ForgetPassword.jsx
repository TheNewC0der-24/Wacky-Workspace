import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Typography,
    Alert,
} from "@mui/material";

import { useAuth } from "../Context/AuthContext";

export default function ForgetPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const { resetPassword } = useAuth();

    const [error, setError] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            await resetPassword(email);
            setSuccess(true);
            setError("Check your inbox for further instructions");
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
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

            <Box sx={{
                mb: 2
            }}>
                {
                    success && (
                        <Alert severity="success">
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
                        Forgot Password
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

                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>

                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Reset Password
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>

            <Typography mt={2} variant="subtitle1">
                Don't have an account? <Link to="/signup" style={{ fontWeight: "bold", color: "#1976d2", textDecoration: "none" }}>Sign Up</Link>
            </Typography>

        </Box>
    )
}


