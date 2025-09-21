
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
    setDoc,
    db,
    doc,
    deleteDoc,
    getDoc,
    updateDoc,
    arrayUnion
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
        const account = userCredential.user;
        if (!account.emailVerified) {
            sendEmailVerification(account);
            await addUser(account, 'Email');

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
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, cleanedUser, { merge: true });
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
        else{
            photoUrl = updates.photoURL
        }

        await updateProfile(currentUser, {
            displayName: updates.displayName,
            photoURL: photoUrl,
            phoneNamber: updates.phone,
        });


        const { photoFile, ...restUpdates } = updates;
        const payload = {
            email: updates.email || "",
            displayName: updates.displayName || "",
            phone: updates.phone || "",
            bio: updates.bio || "",
            photoURL: photoUrl,
        };

        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, payload, { merge: true });

    } catch (error) {
        throw error;
    }
}


async function addToWishList(course, userId) {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, { wishList: arrayUnion(course) });
}

async function removeFromWishList(courseId, userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const currentWishList = userData?.wishList || [];
    const updatedWishList = currentWishList.filter((course) => course.id !== courseId);
    await updateDoc(userRef, { wishList: updatedWishList });
}

async function addToFavorites(course, userId) {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, { favorites: arrayUnion(course) });
}

async function removeFromFavorites(courseId, userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const currentFavorites = userData?.favorites || [];
    const updatedFavorites = currentFavorites.filter((course) => course.id !== courseId);
    await updateDoc(userRef, { favorites: updatedFavorites });
}

async function enrollCourse(course, userId) {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, { myCourses: arrayUnion(course) });
}

async function unEnrollCourse(courseId, userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const currentmyCourses = userData?.myCourses || [];
    const updatedmyCourses = currentmyCourses.filter((course) => course.id !== courseId);
    await updateDoc(userRef, { myCourses: updatedmyCourses });
}

export {
    signUp, logIn, resetPassword, addUser, addToWishList, removeFromWishList,
    removeFromFavorites, addToFavorites, unEnrollCourse, enrollCourse,
    updateUser, logOut, getCurrentUser, signInWithGoogle, signInWithGithub
};