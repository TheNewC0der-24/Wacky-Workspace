import { useState } from "react";
import { Link } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Container,
} from "@mui/material";

import { useAuth } from "../Context/AuthContext";

export default function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();

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

            <Container maxWidth="sm">
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Reset your password
                </Typography>

                <Typography variant="subtitle1" mb={3}>
                    Enter your email and we'll send you instructions on how to reset your <br /> password.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="Email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Box mt={2} mb={1}>
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                        >
                            Send Instructions
                        </Button>
                    </Box>

                    <Typography variant="subtitle1" mb={3}>
                        Go back to <Link to="/login" style={{ fontWeight: "bold", color: "#1976d2", textDecoration: "none", borderBottom: "1px solid #1976d2" }}>Login page.</Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    )
}


