import React from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    Stack,
    TextField,
    InputAdornment,
    Avatar,
} from '@mui/material';

import { FaSearch } from 'react-icons/fa';

import logo from '../../Assets/Logo.svg';

import Navtabs from '../Navtabs/Navtabs';

export default function Navbar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: '#f6fafd',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                <Toolbar>
                    <Avatar src={logo} variant='rounded' sx={{ mr: 2 }} />

                    <TextField
                        size="small"
                        placeholder="Search here…"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction='row' style={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}>
                        <Navtabs />
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ p: 3 }}></Box>
        </Box>
    )
}
