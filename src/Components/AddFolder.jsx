import React, { useState } from 'react'
import {
    ListItemText,
    ListItemIcon,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box
} from '@mui/material';
import { BiSolidFolderPlus } from 'react-icons/bi';
import Services from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import { serverTimestamp } from 'firebase/firestore';
import { ROOT_FOLDER } from '../Hooks/useFolder';
import { notification } from 'antd';

export default function AddFolderButton({ currentFolder, openModal, handleOpenModal, handleCloseModal }) {
    const [folderName, setFolderName] = useState('');

    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentFolder == null) return;

        const path = [...currentFolder.path];
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id })
        }

        const newFolder = {
            name: folderName,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: serverTimestamp(),
        }

        try {
            await Services.addFolder(newFolder);
            setFolderName('');
            handleCloseModal();
            notification.success({
                message: `${folderName}`,
                description: 'Folder added successfully',
                placement: 'topRight',
                duration: 3,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Box display="flex" alignItems="center">
                <ListItemIcon>
                    <BiSolidFolderPlus size={25} />
                </ListItemIcon>
                <ListItemText primary="New Folder" onClick={handleOpenModal} />
            </Box>


            {/* Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <DialogTitle>
                    Add New Folder
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <TextField
                            autoFocus
                            id="folderName"
                            label="Folder Name"
                            placeholder="Enter Folder Name"
                            type="text"
                            fullWidth
                            required
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' size="small" onClick={handleCloseModal}>Cancel</Button>
                        <Button type='submit' variant='contained' size="small">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
