import { use } from "react";
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updatePassword,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut,
    collection,
    addDoc,
    db,
    setDoc,
    doc,
    deleteDoc,
} from "../../Api/Firebase-Config";
import { supabase } from "../../Api/supabase";

async function signUp(user) {

    if (!user?.username || !user?.email || !user?.password) {
        throw new Error("MISSING_CREDENTIALS");
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

        const account = userCredential.user;

        await updateProfile(account, { displayName: user.username });
        await sendEmailVerification(account);

        await addUser(account, 'Email');

    } catch (error) {
        throw error;
    }
}

async function logIn(user) {

    if (!user?.email || !user?.password) {
        throw new Error("MISSING_CREDENTIALS");
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);

        if (!userCredential.user.emailVerified) {
            sendEmailVerification(userCredential.user);
            throw new Error("EMAIL_NOT_VERIFIED");
        }
    } catch (error) {
        throw error;
    }
}

async function resetPassword(email) {

    try {
        await sendPasswordResetEmail(auth, email, {
            url: "http://localhost:5173/login/reset-password",
            handleCodeInApp: true,
        });
        console.log("soijfsdi")
    } catch (error) {
        throw error;
    }
}

async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await addUser(user, 'Google');

    } catch (error) {
        throw error;
    }
}

async function signInWithGithub() {
    const provider = new GithubAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await addUser(user, 'Github');

    } catch (error) {
        throw error;
    }
}

async function logOut() {
    signOut(auth)
        .then(() => {
            return true;
        })
        .catch((error) => {
            throw error;
        });
}

async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            }
            else {
                reject(null);
            }
        }, (error) => reject(error));
    });
}

async function addUser(user, createdWith) {
    try {
        const cleanedUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            phone: user.phone || "",
            bio: user.bio || "",
            createdWith: createdWith,
            createdAt: new Date().toString(),
            wishList: user.wishList || [],
            favorites: user.favorites || [],
            myCourses: user.myCourses || [],
            block: user.block || false
        };
        await addDoc(collection(db, 'users'), cleanedUser);
    }
    catch (error) {
        throw error;
    }
}

async function updateUser(updates) {
    try {
        const currentUser = await getCurrentUser();

        const userId = currentUser?.uid;
        if (!userId) {
            console.log("uerId not found");
            throw new Error("User is not authenticated.");
        }

        let photoUrl = "";
        const imageUpdated = updates.photoFile;

        if (imageUpdated) {
            const imageName = `${Date.now()}-${imageUpdated.name}`;
            const { error: uploadError } = await supabase.storage
                .from("users-images")
                .upload(imageName, imageUpdated);

            if (uploadError) {
                throw new Error("Image upload failed: " + uploadError.message);
            }

            const { data: publicUrlData, error: urlError } = supabase.storage
                .from("users-images")
                .getPublicUrl(imageName);

            if (urlError) {
                throw new Error("Failed to get image URL: " + urlError.message);
            }

            photoUrl = publicUrlData?.publicUrl || "";
        }

        await updateProfile(currentUser, {
            displayName: updates.displayName,h
        });


        const { photoFile, ...restUpdates } = updates;
        const payload = {
            ...restUpdates,
            uid: userId,
            email: updates.email || "",
            displayName: updates.displayName || "",
            phone: updates.phone || "",
            bio: updates.bio || "",
            photoURL: photoUrl,
        };
        const createdWith = updates.createdWith || "Email";
        await addUser(payload, createdWith);
        (userId && await deleteDoc(doc(db, "users", userId)));

        return payload;
    } catch (error) {
        console.error("Failed to update user:", error.message);
        throw error;
    }
}



export { signUp, logIn, resetPassword, addUser, updateUser, logOut, getCurrentUser, signInWithGoogle, signInWithGithub };