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
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
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
            createdAt: new Date(),
            createdWith: createdWith,
            createdAt: new Date(),
        };

        await addDoc(collection(db, 'users'), cleanedUser);

    }
    catch (error) {
        throw error;
    }
}

async function updateUser(updates) {
    try {
        const current = auth.currentUser || await getCurrentUser().catch(() => null);
        if (!current) throw new Error("AUTH_REQUIRED");

        // Optionally upload photo file to Supabase Storage
        let uploadedPhotoURL;
        if (updates?.photoFile instanceof Blob) {
            const objectPath = `users/${current.uid}/profile.jpg`;
            const { error: uploadError } = await supabase
                .storage
                .from('avatars')
                .upload(objectPath, updates.photoFile, {
                    upsert: true,
                    contentType: updates.photoFile.type || 'image/jpeg'
                });
            if (uploadError) throw uploadError;
            const { data } = supabase.storage.from('avatars').getPublicUrl(objectPath);
            uploadedPhotoURL = data?.publicUrl;
        }

        // Update Auth profile if name or photo changed
        const shouldUpdateName = typeof updates?.displayName === 'string' && updates.displayName !== current.displayName;
        if (shouldUpdateName || uploadedPhotoURL) {
            await updateProfile(current, {
                ...(shouldUpdateName ? { displayName: updates.displayName } : {}),
                ...(uploadedPhotoURL ? { photoURL: uploadedPhotoURL } : {}),
            });
        }

        const userRef = doc(db, 'users', current.uid);
        const payload = {
            uid: current.uid,
            email: typeof updates?.email === 'string' && updates.email ? updates.email : current.email,
            name: typeof updates?.displayName === 'string' ? updates.displayName : (current.displayName || ""),
            phone: typeof updates?.phone === 'string' ? updates.phone : undefined,
            bio: typeof updates?.bio === 'string' ? updates.bio : undefined,
            photoURL: uploadedPhotoURL !== undefined ? uploadedPhotoURL : (current.photoURL || ""),
            updatedAt: new Date().toISOString(),
        };
        // Remove undefined to avoid overwriting with undefined
        Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

        await setDoc(userRef, payload, { merge: true });
        return payload;
    } catch (error) {
        throw error;
    }
}

export { signUp, logIn, resetPassword, addUser, updateUser, logOut, getCurrentUser, signInWithGoogle, signInWithGithub };