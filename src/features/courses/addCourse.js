import { addDoc, collection } from "firebase/firestore"
import { db } from "../../Api/Firebase-Config"

export const addCourse = async(data)=> {
    try {
        const docRef = await addDoc(collection(db,'courses'), {
        ...data,
        creatAt:new Date()
        });
        console.log("Course added with ID:", docRef.id);
        return docRef
    }
    catch (error) {
        console.error("Error adding course:", error);
        throw error;
    }
}