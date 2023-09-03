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
    Alert,
    CardActions
} from "@mui/material";

import { BiSolidShow, BiSolidHide } from "react-icons/bi";

import { useAuth } from "../Context/AuthContext";

export default function UpdateProfile() {

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

    const { currentUser, editEmail, editPassword } = useAuth();

    const [error, setError] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const promises = [];
        setLoading(true);
        setError("");

        if (email !== currentUser.email) {
            promises.push(editEmail(email));
        }

        if (password) {
            promises.push(editPassword(password));
        }

        Promise.all(promises).then(() => {
            navigate("/");
        }).catch(() => {
            setError("Failed to update account");
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        }).finally(() => {
            setLoading(false);
        });
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
                        Update Profile
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
                            value={email || currentUser.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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
                        <FormHelperText sx={{
                            mb: 3, color: "#1976d2", fontWeight: "bold"
                        }}>
                            Leave blank to keep the same
                        </FormHelperText>

                        <TextField
                            fullWidth
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
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
                        {
                            password !== confirmPassword ? (
                                <FormHelperText error={true}>
                                    Passwords do not match
                                </FormHelperText>
                            ) : (
                                <FormHelperText sx={{
                                    mb: 3, color: "#1976d2", fontWeight: "bold"
                                }}>
                                    Leave blank to keep the same
                                </FormHelperText>
                            )
                        }

                        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                disabled={loading}
                                type="submit"
                                variant="contained"
                            >
                                Update
                            </Button>
                            <Button
                                disabled={loading}
                                variant="outlined"
                                onClick={() => navigate("/")}
                            >
                                Cancel
                            </Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

