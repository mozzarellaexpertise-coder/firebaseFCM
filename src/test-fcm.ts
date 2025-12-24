import admin from 'firebase-admin';
import { env } from '$env/dynamic/private';

export function getFCM() {
    // 1. If already initialized, return the messaging instance
    if (admin.apps.length > 0) {
        return admin.messaging();
    }

    // 2. Check if variables exist (prevents the 'project_id' error during build)
    if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_PRIVATE_KEY) {
        // We return a "dummy" or throw a silent warning during build
        console.warn("Firebase vars not found. If this is a build step, it's fine.");
        return null; 
    }

    // 3. Initialize
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });

    return admin.messaging();
}
