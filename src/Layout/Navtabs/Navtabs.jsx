import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    IconButton,
    Typography,
    MenuItem,
    Menu,
    Avatar,
    Divider,
    Stack,
    Box,
    Button
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

import { MdDashboardCustomize } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

import { useAuth } from '../../Context/AuthContext';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(0.5),
        minWidth: 250,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const Navtabs = () => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    const { currentUser, logout } = useAuth();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setError("");
        setAlertVisible(false);

        try {
            await logout();
            handleClose();
            navigate("/login");
        } catch (error) {
            setError(error.message);
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        }

    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <Avatar sx={{
                    bgcolor: "#dee2e6",
                    color: "#000",
                    fontWeight: "bold"
                }}>
                    {currentUser && currentUser.email.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
            <StyledMenu
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <Stack>
                        <Typography variant='h6' color='text.primary' sx={{ fontWeight: 'bold' }}>
                            WackyWorkspace
                        </Typography>
                        <Typography variant='subtitle1' color='text.secondary'>
                            Welcome, {currentUser && currentUser.email}
                        </Typography>
                    </Stack>

                </MenuItem>
                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={() => {
                    handleClose();
                    navigate("/");
                }} disableRipple>
                    <MdDashboardCustomize style={{ marginRight: "0.5rem" }} />
                    Dashboard
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose();
                    navigate("/update-profile")
                }} disableRipple>
                    <FaUserAlt style={{ marginRight: "0.5rem" }} />
                    Profile
                </MenuItem>
                <Box sx={{ p: 2, pt: 2 }}>
                    <Button
                        fullWidth
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </StyledMenu>
        </div >
    );
};

export default Navtabs;