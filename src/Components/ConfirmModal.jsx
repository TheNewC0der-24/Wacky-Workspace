import React from 'react';

import { Box, Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, IconButton } from '@mui/material';
import { IoClose } from "react-icons/io5";

import Services from '../Services/Services';

export default function ConfirmModal({ open, close, type, folderName, folderId, fileName, fileId }) {

    const handleDelete = () => {
        if (type === "folder") {
            Services.deleteFolder(folderId);
        } else {
            Services.deleteFile(fileId);
        }
        close();
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6">
                    Are you sure?
                </Typography>
                <IconButton onClick={close}>
                    <IoClose />
                </IconButton>
            </DialogTitle>

            <Box sx={{ bgcolor: "#FFECEB", p: 2 }}>
                <Typography variant="body2" color="error">
                    Unexpected bad things will happen if you don’t read this!
                </Typography>
            </Box>
            {type === "folder" ?
                <DialogContent>
                    This action <strong>CANNOT</strong> be undone. This will permanently delete the <strong><span style={{ textTransform: "uppercase" }}>{type}</span> - {folderName}</strong>.
                </DialogContent>
                : <DialogContent>
                    This action <strong>CANNOT</strong> be undone. This will permanently delete the <strong><span style={{ textTransform: "uppercase" }}>{type}</span> - {fileName}</strong>.
                </DialogContent>}
            <DialogActions>
                <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    onClick={handleDelete}
                    sx={{ textTransform: 'none' }}
                >
                    I understand, delete this {type}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
