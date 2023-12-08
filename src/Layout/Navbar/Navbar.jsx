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

import { useSearch } from '../../Context/SearchContext';

import Navtabs from '../Navtabs/Navtabs';

export default function Navbar() {
    const { searchTerm, updateSearchTerm } = useSearch();

    const handleSearch = (e) => {
        e.preventDefault();
        updateSearchTerm(e.target.value);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: '#f7f9fc',
                    boxShadow: 'none',
                }}
            >
                <Toolbar>
                    <Avatar src={logo} variant='rounded' sx={{ mr: 2 }} />

                    <TextField
                        size="small"
                        placeholder="Search here for files and folders..."
                        sx={{
                            width: '100%',
                            maxWidth: 350,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 30,
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch />
                                </InputAdornment>
                            ),
                        }}
                        value={searchTerm}
                        onChange={handleSearch}
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
