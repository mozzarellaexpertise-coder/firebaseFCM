import admin from 'firebase-admin';

let app: admin.app.App | null = null;

function initFirebase() {
    if (admin.apps.length > 0) {
        app = admin.app();
        return;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing Firebase Admin environment variables');
    }

    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
    });
}

export function getFCM() {
    try {
        if (!app) initFirebase();
        return admin.messaging();
    } catch (err) {
        console.error('Firebase Admin init failed:', err);
        return null;
    }
}