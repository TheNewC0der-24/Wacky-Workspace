import { db } from "../Config/FirebaseConfig";

import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

const folders = collection(db, 'folders');
const files = collection(db, 'files');

export const formatDoc = (doc) => {
    return { id: doc.id, ...doc.data() };
}

class Services {
    addFolder = (folder) => {
        const data = addDoc(folders, folder);
        return data;
    }

    async getFolders() {
        const data = await getDocs(folders);
        return data;
    }

    async getFiles() {
        const data = await getDocs(files);
        return data;
    }

    async addFile(file) {
        const data = await addDoc(files, file);
        return data;
    }

    async updateFolder(id, folder) {
        const data = await updateDoc(doc(db, 'folders', id), folder);
        return data;
    }

    async updateFile(id, file) {
        const data = await updateDoc(doc(db, 'files', id), file);
        return data;
    }

    async deleteFolder(id) {
        const data = await deleteDoc(doc(db, 'folders', id));
        return data;
    }

    async deleteFile(id) {
        const data = await deleteDoc(doc(db, 'files', id));
        return data;
    }
}

export default new Services();
