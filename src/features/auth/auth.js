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
} from "../../Api/Firebase-Config";

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

export { signUp, logIn, resetPassword, addUser, logOut, getCurrentUser, signInWithGoogle, signInWithGithub };