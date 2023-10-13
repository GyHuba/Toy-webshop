import { storage } from "../constants/storage-initialize";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid';

export function uploadImages(imageUpload) {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${v4()}`);
    return uploadBytes(imageRef, imageUpload)
            .then((res) => getDownloadURL(res?.ref))
}