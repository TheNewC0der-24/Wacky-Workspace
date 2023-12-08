import React, { useState, useRef } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';

import {
    Grid,
    Container,
    Box,
    LinearProgress,
    Typography,
    Divider,
    Alert,
    Button,
    List,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Collapse,
    Menu,
    MenuItem,
    Select,
    IconButton,
    Tooltip,
} from '@mui/material';
import { FaPlus } from "react-icons/fa";
import { FaArrowUp, FaArrowDown, FaFolder } from "react-icons/fa6";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import AddFolder from '../Components/AddFolder';
import Folder from '../Components/Folder';
import File from '../Components/File';
import AddFile from '../Components/AddFile';
import Breadcrumbs from '../Components/Breadcrumbs';

import { useFolder, ROOT_FOLDER } from '../Hooks/useFolder';

export default function Dashboard() {
    const navigate = useNavigate();
    const { folderId } = useParams();
    const location = useLocation();
    const { state = {} } = location;

    const [uploadProgress, setUploadProgress] = useState(0);
    const [show, setShow] = useState(false);
    const [openNewMenu, setNewOpenMenu] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isAscending, setIsAscending] = useState(true);
    const [sortField, setSortField] = useState('name');
    const [openList, setOpenList] = useState(false);

    const handleList = () => {
        setOpenList(!openList);
    };

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder);

    const handleOpenNewMenu = (event) => {
        setNewOpenMenu(event.currentTarget);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const uploadInputRef = useRef(null);

    const uploadFile = () => {
        uploadInputRef.current
        uploadInputRef.current.click();
    }

    const sortByField = (array, field, isAscending) => {
        const sortedArray = [...array].sort((a, b) => {
            if (field === 'name') {
                return a.name.localeCompare(b.name);
            } else if (field === 'createdAt') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else {
                return 0;
            }
        });
        return isAscending ? sortedArray : sortedArray.reverse();
    };

    const sortedFolders = sortByField(childFolders, sortField, isAscending);
    const sortedFiles = sortByField(childFiles, sortField, isAscending);

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} sx={{ mt: 5, mb: 3 }}>
                <Grid item xs={12} sm={12} md={4} lg={2}>
                    <Button
                        variant="contained"
                        startIcon={<FaPlus />}
                        size="large"
                        sx={{
                            mb: 2,
                            borderRadius: "10px",
                            bgcolor: "#fff",
                            color: "#000",
                            '&:hover': {
                                bgcolor: "#edf1fa",
                                color: "#000",
                            }
                        }}
                        onClick={handleOpenNewMenu}
                    >
                        New
                    </Button>

                    <List
                        sx={{ width: '100%', maxWidth: 350 }}
                        component="nav">
                        <ListItemButton sx={{
                            bgcolor: "#c2e7ff",
                            borderRadius: "50px",
                            '&:hover': {
                                bgcolor: "#c2e7ff",
                            }
                        }} onClick={handleList}>
                            <ListItemIcon>
                                <HiMiniRectangleStack size={20} style={{ color: "#000" }} />
                            </ListItemIcon>
                            <ListItemText primary="My Folders" />

                            {openList ? childFolders.length !== 0 && childFiles.length !== 0 && <MdExpandLess size={25} /> : childFolders.length !== 0 && childFiles.length !== 0 && <MdExpandMore size={25} />}
                        </ListItemButton>
                        <Collapse in={openList} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {childFolders.map((childFolder) => (
                                    <Link key={childFolder.id} to={`/folder/${childFolder.id}`} state={{ folder: childFolder }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <ListItemButton sx={{ pl: 4, borderRadius: "50px", }}>
                                            <ListItemIcon>
                                                <FaFolder />
                                            </ListItemIcon>
                                            <ListItemText primary={childFolder.name.length > 10 ? childFolder.name.substring(0, 10) + "..." : childFolder.name} />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </List>

                    <Menu
                        keepMounted
                        anchorEl={openNewMenu}
                        open={Boolean(openNewMenu)}
                        onClose={() => setNewOpenMenu(null)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        PaperProps={{
                            style: {
                                width: '27ch',
                            },
                        }}
                    >
                        <MenuItem onClick={() => {
                            setNewOpenMenu(null);
                            handleOpenModal();
                        }}>
                            <AddFolder currentFolder={folder} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal} />
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {
                            setNewOpenMenu(null)
                            uploadFile();
                        }}>
                            <AddFile currentFolder={folder} setUploadProgress={setUploadProgress} setShow={setShow} uploadInputRef={uploadInputRef} />
                        </MenuItem>
                    </Menu>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={10}>
                    <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: "10px" }}>
                        {folder !== ROOT_FOLDER && <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                mb: 2,
                                bgcolor: "#000",
                                color: "#fff",
                                '&:hover': {
                                    bgcolor: "#000",
                                    color: "#fff",
                                }
                            }}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>}
                        <Box mb={2} sx={{ display: 'flex', alignItems: "center", flexWrap: 'wrap' }}>
                            <Breadcrumbs currentFolder={folder} />

                            <Tooltip title="Reverse sort direction" placement="bottom">
                                <IconButton
                                    size="small"
                                    onClick={toggleSortOrder}
                                    sx={{ ml: 2 }}
                                >
                                    {isAscending ? <FaArrowUp /> : <FaArrowDown />}
                                </IconButton>
                            </Tooltip>

                            <Select
                                size="small"
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                                sx={{ ml: 2, width: "100%", maxWidth: "150px" }}
                            >
                                <MenuItem disabled value="">
                                    <em>Sort by</em>
                                </MenuItem>
                                <MenuItem sx={{ pl: 4 }} value="name">Name</MenuItem>
                                <MenuItem sx={{ pl: 4 }} value="created at">Created At</MenuItem>
                            </Select>
                        </Box>

                        {show &&
                            <>
                                <Typography variant="body2" align='center'>{`${Math.round(uploadProgress)}%`}</Typography>
                                <LinearProgress variant="determinate" value={uploadProgress} />
                            </>
                        }

                        {
                            childFolders.length > 0 && (
                                <>
                                    <Typography variant="h6">Folders</Typography>
                                    <Grid container spacing={2} sx={{ p: 2 }}>
                                        {sortedFolders.map((childFolder) => (
                                            <Grid key={childFolder.id} item xs={12} sm={6} md={6} lg={2.5}>
                                                <Folder folder={childFolder} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </>
                            )
                        }

                        {childFolders.length > 0 && childFiles.length > 0 && <Divider sx={{ my: 2 }} />}

                        {childFiles.length > 0 && (
                            <>
                                <Typography variant="h6">Files</Typography>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    {sortedFiles.map((childFile) => (
                                        <Grid key={childFile.id} item xs={12} sm={6} md={6} lg={2.5}>
                                            <File file={childFile} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}

                        {
                            childFolders.length === 0 && childFiles.length === 0 && (
                                <Alert severity="info" sx={{ mt: 2 }}>This folder is empty</Alert>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
