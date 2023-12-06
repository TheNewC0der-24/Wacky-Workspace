import React, { useState } from 'react'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { BiSolidFolderPlus } from 'react-icons/bi';
import Services from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import { serverTimestamp } from 'firebase/firestore';
import { ROOT_FOLDER } from '../Hooks/useFolder';

export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState('');

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

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
            // Add folder in database
            await Services.addFolder(newFolder);
            setFolderName('');
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <IconButton
                sx={{
                    color: 'white',
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
                onClick={openModal}

            >
                <BiSolidFolderPlus />
            </IconButton>

            {/* Modal */}
            <Dialog open={open} onClose={closeModal} maxWidth="xs" fullWidth>
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
                        <Button type='submit' variant='contained' size="small">Add</Button>
                        <Button variant='outlined' size="small" onClick={closeModal}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
