"use server";

import {cookies} from "next/headers";
import {auth, db} from "@/firebase/admin";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
    const cookieStore = cookies(); // ✅ no await

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: SESSION_DURATION * 1000,
    });

    cookieStore.set("session", sessionCookie, {
        maxAge: SESSION_DURATION,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });
}

export async function signUp(params: SignUpParams) {
    const {uid, name, email} = params;

    try {
        const userRecord = await db.collection("users").doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists. Please sign in.",
            };
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
        });

        return {
            success: true,
            message: "Account created successfully. Please sign in.",
        };
    } catch (error: any) {
        console.error("Error creating user:", error);

        if (error.code === "auth/email-already-exists") {
            return {
                success: false,
                message: "This email is already in use",
            };
        }

        return {
            success: false,
            message: "Failed to create account. Please try again.",
        };
    }
}

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;

    try {
        const decoded = await auth.verifyIdToken(idToken);
        const uid = decoded.uid;

        const userDoc = db.collection("users").doc(uid);
        const snapshot = await userDoc.get();

        if (!snapshot.exists) {
            // Create default user record
            await userDoc.set({
                email,
                name: "Unnamed User",
            });
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: "Signed in successfully.",
        };
    } catch (error) {
        console.error("Error during sign in:", error);
        return {
            success: false,
            message: "Failed to log into account. Please try again.",
        };
    }
}

// Sign out user by clearing the session cookie
export async function signOut() {
    const cookieStore = cookies(); // ✅ fixed
    cookieStore.delete("session");
}

// Get current user from session cookie

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        console.log("❌ No session cookie found");
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        console.log("✅ Session verified:", decodedClaims);

        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            console.log("❌ No user found in DB for uid:", decodedClaims.uid);
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.error("❌ Error verifying session:", error);
        return null;
    }
}

// Check if user is authenticated
export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}
