import React from 'react'
import { Button, ListItemIcon, ListItemText } from '@mui/material';
import { MdUploadFile } from 'react-icons/md';
import { useAuth } from '../Context/AuthContext';
import { storage } from '../Config/FirebaseConfig';
import { addDoc, collection, Timestamp, getFirestore, query, where, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ROOT_FOLDER } from '../Hooks/useFolder';
import { notification } from 'antd';

export default function AddFile({ currentFolder, setUploadProgress, setShow, uploadInputRef }) {
    const { currentUser } = useAuth();

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return;

        const filePath = currentFolder === ROOT_FOLDER
            ? `${currentFolder.path.join('/')}/${file.name}`
            : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

        const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setShow(true);
            setUploadProgress(progress);
        }, error => {
            console.log(error);
        }, async () => {
            setTimeout(() => {
                setShow(false);
            }, 1000);

            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const db = getFirestore();
            const filesCollection = collection(db, 'files');

            const existingFileQuery = query(filesCollection,
                where('name', '==', file.name),
                where('folderId', '==', currentFolder.id),
                where('userId', '==', currentUser.uid)
            );

            const existingFileQuerySnapshot = await getDocs(existingFileQuery);

            if (existingFileQuerySnapshot.size > 0) {
                const existingFile = existingFileQuerySnapshot.docs[0];
                await updateDoc(existingFile.ref, { url: url });
            } else {
                const fileDoc = {
                    name: file.name,
                    url: url,
                    createdAt: Timestamp.now(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid
                };
                await addDoc(collection(db, 'files'), fileDoc);
            }

            notification.success({
                message: `${file.name}`,
                description: 'File uploaded successfully !',
                placement: 'topRight',
                duration: 3,
            });
        });
    }
    return (
        <>
            <input ref={uploadInputRef} type='file' id="upload-file" onChange={handleUpload} style={{ display: 'none' }} />
            <label htmlFor="upload-file">
                <Button
                    disableElevation
                    disableRipple
                    variant="text"
                    sx={{
                        color: '#000',
                        fontSize: '15px',
                        textTransform: 'none',
                        '&:hover': {
                            bgcolor: '#f5f5f5',
                        },
                        transform: 'translateX(-8px)'
                    }}
                >
                    <ListItemIcon>
                        <MdUploadFile size={25} />
                    </ListItemIcon>
                    <ListItemText primary="Upload File" />
                </Button>
            </label>
        </>
    )
}
