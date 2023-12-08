import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { notification } from 'antd';

import { FaFolder, FaTrash, FaFile } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { MdFileOpen } from "react-icons/md";
import { BsFillFolderSymlinkFill } from "react-icons/bs";

import ConfirmModal from './ConfirmModal';

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../Config/FirebaseConfig';

import { useAuth } from '../Context/AuthContext';

export default function TableView({ folders, files }) {
    const [openFolderMenu, setOpenFolderMenu] = useState(null);
    const [openFileMenu, setOpenFileMenu] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openRename, setOpenRename] = useState(false);
    const [newFolderName, setNewFolderName] = useState(folders.map((folder) => folder.name));
    const [newFileName, setNewFileName] = useState(files.map((file) => file.name));
    const [folderId, setFolderId] = useState("");
    const [fileId, setFileId] = useState("");
    const [folderName, setFolderName] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType] = useState("");

    const type = "folder";

    const header = [
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'type', label: 'Type', minWidth: 70 },
        { id: 'owner', label: 'Owner', minWidth: 150 },
        { id: 'date', label: 'Date Created at ', minWidth: 100 },
        { id: "actions", label: "Actions", minWidth: 50 }
    ];

    const { currentUser } = useAuth();

    const openFolder = Boolean(openFolderMenu);
    const openFile = Boolean(openFileMenu);

    const handleOpenFolderMenu = (event, id, name, type) => {
        setOpenFolderMenu(event.currentTarget);
        setFolderId(id);
        setFolderName(name);
        setFileType(type);
    };
    const handleOpenFileMenu = (event, id, name, url, type) => {
        setOpenFileMenu(event.currentTarget);
        setFileId(id);
        setFileName(name);
        setFileUrl(url);
        setFileType(type);
    };

    const handleCloseFolderMenu = () => {
        setOpenFolderMenu(null);
    };
    const handleCloseFileMenu = () => {
        setOpenFileMenu(null);
    };

    const handleDeleteFolder = () => {
        setOpenConfirmModal(true);
    }
    const handleDeleteFile = () => {
        setOpenConfirmModal(true);
    }

    const handleRenameFolder = () => {
        setOpenRename(true);
    }
    const handleRenameFile = () => {
        setOpenRename(true);
    }

    const handleUpdateFolder = async () => {
        const folderRef = doc(db, 'folders', folderId);
        await updateDoc(folderRef, { name: newFolderName });
        setOpenRename(false);
        notification.success({
            message: 'Folder Name Updated',
            description: 'Folder name has been updated successfully.',
            placement: 'topRight',
        });
    };

    const handleUpdateFile = async () => {
        const fileRef = doc(db, 'files', fileId);
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
            <TableContainer sx={{
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                borderRadius: "4px",
                mt: 3,
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {header.map((head) => (
                                <TableCell key={head.id} sx={{ fontWeight: "bold", minWidth: head.minWidth, }}>{head.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {folders.map((folder) => (
                            <TableRow key={folder.id}>
                                <TableCell><FaFolder size={20} style={{ marginRight: "0.5rem", transform: "translateY(2px)" }} />{folder.name.length > 15 ? folder.name.substring(0, 15) + "..." : folder.name}</TableCell>
                                <TableCell>Folder</TableCell>
                                <TableCell>{currentUser.email}</TableCell>
                                <TableCell>{new Date(folder.createdAt?.seconds * 1000).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: "numeric" })}</TableCell>
                                <TableCell>
                                    <IconButton sx={{ fontSize: "18px", color: "inherit" }} onClick={(event) => handleOpenFolderMenu(event, folder.id, folder.name, "folder")}>
                                        <HiDotsVertical />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {files.map((file) => (
                            <TableRow key={file.id}>
                                <TableCell><FaFile size={20} style={{ marginRight: "0.5rem", transform: "translateY(2px)" }} />{file.name}</TableCell>
                                <TableCell>File</TableCell>
                                <TableCell>{currentUser.email}</TableCell>
                                <TableCell>{new Date(file.createdAt?.seconds * 1000).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: "numeric" })}</TableCell>
                                <TableCell>
                                    <IconButton sx={{ fontSize: "18px", color: "inherit" }} onClick={(event) => handleOpenFileMenu(event, file.id, file.name, file.url, "file")}>
                                        <HiDotsVertical />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu
                anchorEl={openFolderMenu}
                open={openFolder}
                onClose={handleCloseFolderMenu}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={() => { handleCloseFolderMenu(); }}>
                    <Link
                        to={`/folder/${folderId}`}
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

            <Menu
                anchorEl={openFileMenu}
                open={openFile}
                onClose={handleCloseFileMenu}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={() => { handleCloseFileMenu() }}>
                    <Link to={fileUrl} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}    >
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

            {openConfirmModal && <ConfirmModal open={openConfirmModal} close={() => setOpenConfirmModal(false)} type={fileType === "folder" ? "folder" : "file"} folderName={folderName} folderId={folderId} fileName={fileName} fileId={fileId} />}

            <Dialog open={openRename} onClose={() => setOpenRename(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Rename</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={fileType === "folder" ? "Enter New Folder Name" : "Enter New File Name"}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={fileType === "folder" ? newFolderName : newFileName}
                        onChange={fileType === "folder" ? (e) => setNewFolderName(e.target.value) : (e) => setNewFileName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        size="small"
                        onClick={() => setOpenRename(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        size="small"
                        onClick={() => {
                            fileType === "folder" ? handleUpdateFolder() : handleUpdateFile()
                            setOpenRename(false);
                        }}>
                        Rename
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
