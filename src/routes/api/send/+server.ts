import { json } from '@sveltejs/kit';
import { getFCM } from '$lib/server/firebaseAdmin.ts';

export async function POST({ request }) {
    try {
        const { token, text } = await request.json();

        if (!token || !text) {
            return json(
                { success: false, error: 'Missing token or text' },
                { status: 400 }
            );
        }

        const fcm = getFCM();

        if (!fcm) {
            return json(
                { success: false, error: 'FCM not initialized' },
                { status: 500 }
            );
        }

        await fcm.send({
            token,
            notification: {
                title: 'PagerKing',
                body: text,
            },
        });

        return json({ success: true });
    } catch (error: any) {
        console.error('FCM send error:', error);
        return json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}