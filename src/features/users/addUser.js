import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../Api/Firebase-Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { supabase } from "../../Api/supabase";

export const addUser = async (instructorData, uid) => {
  try {
    let imageUrl = "";
    if (instructorData.image) {
      const image = instructorData.image;
      const imageName = `${Date.now()}-${image.name}`;
      const { data, error } = await supabase.storage
        .from("instructors-images")
        .upload(imageName, image);

      if (error) throw error;

      const getImageUrl = supabase.storage
        .from("instructors-images")
        .getPublicUrl(imageName);
      imageUrl = getImageUrl.data.publicUrl;
    }

    const docRef = await addDoc(collection(db, "Instructors"), {
      ...instructorData,
      image: imageUrl,
      uid,
      status: "pending",
      createdAt: new Date(),
    });

    await updateDoc(doc(db, "Instructors", docRef.id), {
      id: docRef.id,
    });

    console.log("User added with ID:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const createUser = (email, password) => {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
