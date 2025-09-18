import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Api/Firebase-Config";
import { supabase } from "../../Api/supabase";


const uploadFile = async (bucket, file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};

export const addCourse = async (courseData) => {
  try {
    let videoUrl = "";
    let posterUrl = "";

    if (courseData.video) {
      videoUrl = await uploadFile("courses-videos", courseData.video);
    }

    if (courseData.poster) {
      posterUrl = await uploadFile("courses-poster", courseData.poster);
    }

    const newCourse = {
      ...courseData,
      video: videoUrl,
      poster: posterUrl,
      createdAt: serverTimestamp(), 
    };

    const docRef = await addDoc(collection(db, "courses"), newCourse);

    console.log("Course added with ID:", docRef.id);

    
    return { id: docRef.id, ...newCourse };
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};
