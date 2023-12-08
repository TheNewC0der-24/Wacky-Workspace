import { db } from "../Config/FirebaseConfig";

import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

const folders = collection(db, 'folders');

export const formatDoc = (doc) => {
    return { id: doc.id, ...doc.data() };
}

class Services {
    addFolder = (folder) => {
        const data = addDoc(folders, folder);
        return data;
    }

    deleteFolder(id) {
        const data = deleteDoc(doc(db, 'folders', id));
        return data;
    }

    deleteFile(id) {
        const data = deleteDoc(doc(db, 'files', id));
        return data;
    }
}

export default new Services();


