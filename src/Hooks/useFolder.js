import { useEffect, useReducer } from 'react';
import { db } from '../Config/FirebaseConfig';
import { formatDoc } from '../Services/Services';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders',
    SET_CHILD_FILES: 'set-child-files'
}

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] };

function folderReducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: []
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles
            }
        default:
            return state;
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(folderReducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    });

    const { currentUser } = useAuth();

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder }
        })
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER }
            })
        }

        const foldersRef = doc(db, 'folders', folderId);

        getDoc(foldersRef).then(doc => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER, payload: { folder: formatDoc(doc) }
            })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [folderId]);

    useEffect(() => {
        const foldersCollection = collection(db, 'folders');
        const q = query(foldersCollection, where("parentId", "==", folderId), where("userId", "==", currentUser.uid), orderBy("createdAt"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS, payload: { childFolders: snapshot.docs.map(formatDoc) }
            });
        });

        // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
        return () => unsubscribe();

    }, [folderId, currentUser]);

    useEffect(() => {
        const filesCollection = collection(db, 'files');
        const q = query(filesCollection, where("folderId", "==", folderId), where("userId", "==", currentUser.uid), orderBy("createdAt"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FILES, payload: { childFiles: snapshot.docs.map(formatDoc) }
            });
        });

        // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
        return () => unsubscribe();

    }, [folderId, currentUser]);

    return state;
}