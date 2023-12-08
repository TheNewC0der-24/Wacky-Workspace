import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, IconButton, Menu, MenuItem, Divider, Tooltip, Card, CardHeader, Typography, CardContent, TextField, CardActions } from '@mui/material';

import { FaFolder, FaTrash } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { BsFillFolderSymlinkFill } from "react-icons/bs";

import ConfirmModal from './ConfirmModal';

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../Config/FirebaseConfig';
import { notification } from 'antd';

export default function Folder({ folder }) {
    const [openFolderMenu, setOpenFolderMenu] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openRename, setOpenRename] = useState(false);
    const [newFolderName, setNewFolderName] = useState(folder.name);

    const open = Boolean(openFolderMenu);

    const handleOpenFolderMenu = (event) => {
        setOpenFolderMenu(event.currentTarget);
    };

    const handleCloseFolderMenu = () => {
        setOpenFolderMenu(null);
    };

    const handleDeleteFolder = () => {
        setOpenConfirmModal(true);
    }

    const handleRenameFolder = () => {
        setOpenRename(true);
    }

    const handleUpdateFolder = async () => {
        const folderRef = doc(db, 'folders', folder.id);
        await updateDoc(folderRef, { name: newFolderName });
        setOpenRename(false);
        notification.success({
            message: 'Folder Name Updated',
            description: 'Folder name has been updated successfully.',
            placement: 'topRight',
        });
    };

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    bgcolor: "#f2f6fc",
                    borderRadius: "10px",
                    '&:hover': {
                        bgcolor: "#e4e9f2",
                        cursor: "pointer",
                        '& .MuiCardHeader-root': {
                            bgcolor: "#e4e9f2",
                        }
                    }
                }}>

                <CardHeader
                    avatar={<FaFolder size={20} />}
                    title={folder.name.length > 15 ? (
                        <Tooltip title={folder.name} placement="bottom">
                            <Link to={`/folder/${folder.id}`} state={{ folder: folder }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant='subtitle1'>{folder.name.substring(0, 15) + "..."}</Typography>
                            </Link>
                        </Tooltip>
                    ) : (
                        <Tooltip title={folder.name} placement="bottom">
                            <Link to={`/folder/${folder.id}`} state={{ folder: folder }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant='subtitle1'>{folder.name}</Typography>
                            </Link>
                        </Tooltip>
                    )}
                    action={
                        <IconButton sx={{ fontSize: "18px", color: "inherit" }} onClick={handleOpenFolderMenu}>
                            <HiDotsVertical />
                        </IconButton>
                    }
                />

                {
                    openRename &&
                    <React.Fragment>
                        <CardContent>
                            <TextField
                                fullWidth
                                size='small'
                                label="Rename Folder"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                        </CardContent>
                        <CardActions>
                            <Button fullWidth variant='outlined' size="small" onClick={() => setOpenRename(false)}>
                                Cancel
                            </Button>
                            <Button fullWidth variant='contained' size="small" onClick={handleUpdateFolder}>
                                Ok
                            </Button>
                        </CardActions>
                    </React.Fragment>
                }
            </Card>

            <Menu
                anchorEl={openFolderMenu}
                open={open}
                onClose={handleCloseFolderMenu}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={() => { handleCloseFolderMenu(); }}>
                    <Link
                        to={`/folder/${folder.id}`}
                        state={{ folder: folder }}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Button
                            variant="text"
                            startIcon={<BsFillFolderSymlinkFill size={18} />}
                            sx={{
                                color: "darkslategray",
                                textTransform: "none",
                                '&:hover': {
                                    bgcolor: "#f5f5f5",
                                }
                            }}
                            disableElevation
                            disableRipple
                        >
                            Open
                        </Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleRenameFolder();
                    handleCloseFolderMenu();
                }}>
                    <Button
                        variant="text"
                        color="primary"
                        startIcon={<FiEdit3 size={18} />}
                        sx={{
                            textTransform: "none",
                            '&:hover': {
                                bgcolor: "#f5f5f5",
                            }
                        }}
                        disableElevation
                        disableRipple
                    >
                        Rename
                    </Button>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    handleDeleteFolder();
                    handleCloseFolderMenu();
                }}>
                    <Button
                        variant="text"
                        color="error"
                        startIcon={<FaTrash size={18} />}
                        sx={{
                            textTransform: "none",
                            '&:hover': {
                                bgcolor: "#f5f5f5",
                            }
                        }}
                        disableElevation
                        disableRipple
                    >
                        Delete
                    </Button>
                </MenuItem>
            </Menu>

            {openConfirmModal && <ConfirmModal open={openConfirmModal} close={() => setOpenConfirmModal(false)} type="folder" folderName={folder.name} folderId={folder.id} />}
        </>

    )
}
