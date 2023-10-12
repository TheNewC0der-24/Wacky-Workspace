import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    FormHelperText,
    Alert,
    CardActions,
    Container,
    Grid,
    Divider
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
    const [success, setSuccess] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);

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
            setSuccess("Profile updated successfully");
            setSuccessAlertVisible(true);
            setTimeout(() => {
                setSuccessAlertVisible(false);
                navigate("/");
            }, 2000);
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

                {
                    successAlertVisible && (
                        <Alert severity="success">
                            {success}
                        </Alert>
                    )
                }
            </Box>

            <Container maxWidth="lg" sx={{ bgcolor: "#f5f5f5", borderRadius: "10px", p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                    <Box>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Edit Profile
                        </Typography>

                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            Click Edit to update your email and password
                        </Typography>
                    </Box>

                    <Button sx={{
                        color: "#fff",
                        bgcolor: "#000",
                        "&:hover": {
                            bgcolor: "#000",
                            boxShadow: "none"
                        }
                    }} onClick={() => setEdit(true)}>
                        Edit
                    </Button>
                </Box>

                <Box mt={5}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    placeholder="Email"
                                    required
                                    disabled={!edit}
                                    value={email || currentUser.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    disabled={!edit}
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
                                <FormHelperText>
                                    Leave blank to keep the same
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    disabled={!edit}
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
                                        <FormHelperText>
                                            Leave blank to keep the same
                                        </FormHelperText>
                                    )
                                }
                            </Grid>
                        </Grid>

                        <Box mt={5} sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Button
                                disabled={loading || !edit}
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
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box>
    )
}

