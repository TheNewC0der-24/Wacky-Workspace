import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, IconButton, Menu, MenuItem, Divider, Tooltip, Card, CardHeader, Typography, CardContent, TextField, CardActions, CardMedia } from '@mui/material';

import { FaFile, FaTrash } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { MdFileOpen } from "react-icons/md";

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../Config/FirebaseConfig';

import ConfirmModal from './ConfirmModal';

import { notification } from 'antd';

const File = ({ file }) => {
    const [openFileMenu, setOpenFileMenu] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openRename, setOpenRename] = useState(false);
    const [newFileName, setNewFileName] = useState(file.name);

    const open = Boolean(openFileMenu);

    const handleOpenFileMenu = (event) => {
        setOpenFileMenu(event.currentTarget);
    };

    const handleCloseFileMenu = () => {
        setOpenFileMenu(null);
    };

    const handleDeleteFile = () => {
        setOpenConfirmModal(true);
    }

    const handleRenameFile = () => {
        setOpenRename(true);
    }

    const handleUpdateFile = async () => {
        const fileRef = doc(db, 'files', file.id);
        await updateDoc(fileRef, { name: newFileName });
        setOpenRename(false);
        notification.success({
            message: 'File Name Updated',
            description: 'File name has been updated successfully.',
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
                    avatar={<FaFile size={20} />}
                    title={file.name.length > 15 ? (
                        <Tooltip title={file.name} placement="bottom">
                            <Link to={file.url} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant='subtitle1'>{file.name.substring(0, 15) + "..."}</Typography>
                            </Link>
                        </Tooltip>
                    ) : (
                        <Tooltip title={file.name} placement="bottom">
                            <Link to={file.url} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant='subtitle1'>{file.name}</Typography>
                            </Link>
                        </Tooltip>
                    )}
                    action={
                        <IconButton sx={{ fontSize: "18px", color: "inherit" }} onClick={handleOpenFileMenu}>
                            <HiDotsVertical />
                        </IconButton>
                    }
                />
                {
                    openRename
                        ? <React.Fragment>
                            <CardContent>
                                <TextField
                                    fullWidth
                                    size='small'
                                    label="Rename File"
                                    value={newFileName}
                                    onChange={(e) => setNewFileName(e.target.value)}
                                />
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant='outlined' size="small" onClick={() => setOpenRename(false)}>
                                    Cancel
                                </Button>
                                <Button fullWidth variant='contained' size="small" onClick={handleUpdateFile}>
                                    Ok
                                </Button>
                            </CardActions>
                        </React.Fragment>
                        : <React.Fragment>
                            {(file.name.includes('.png')
                                || file.name.includes('.svg')
                                || file.name.includes('.jpg')
                                || file.name.includes('.jpeg')
                                || file.name.includes('.gif')
                            ) &&
                                <Link to={file.url} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: "100%", maxWidth: "140px", margin: "auto" }}
                                            image={file.url}
                                            alt="File"
                                        />
                                    </CardContent>
                                </Link>
                            }
                        </React.Fragment>
                }
            </Card>
            <Menu
                anchorEl={openFileMenu}
                open={open}
                onClose={handleCloseFileMenu}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={() => { handleCloseFileMenu() }}>
                    <Link to={file.url} style={{ textDecoration: 'none', color: 'inherit' }}    >
                        <Button
                            variant="text"
                            startIcon={<MdFileOpen size={18} />}
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
                    handleRenameFile();
                    handleCloseFileMenu();
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
                    handleDeleteFile();
                    handleCloseFileMenu();
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

            {openConfirmModal && <ConfirmModal open={openConfirmModal} close={() => setOpenConfirmModal(false)} type="file" fileName={file.name} fileId={file.id} />}

        </>
    )
}

export default File;
