import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Typography
} from '@mui/material';

import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        setError("");
        setAlertVisible(false);

        try {
            await logout();
            navigate("/login");
        } catch (error) {
            setError(error.message);
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        }
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5rem",
            paddingBottom: "5rem",
        }}>
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


            <Card elevation={0}
                sx={{
                    maxWidth: 500,
                    width: "100%",
                    bgcolor: "#f5f5f5",
                }}
            >
                <CardHeader title={
                    <Typography variant="h4" align="center">
                        Profile
                    </Typography>
                } />
                <CardContent>
                    <Typography variant="body1">
                        <span style={{ fontWeight: "bold" }}>Email: </span>{currentUser.email}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate("/update-profile")}
                    >
                        Update Profile
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Dashboard;
