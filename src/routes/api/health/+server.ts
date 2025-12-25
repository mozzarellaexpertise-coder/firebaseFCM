import { json } from '@sveltejs/kit';
import { getFCM } from '$lib/server/firebaseAdmin.ts';

export async function GET() {
    const fcm = getFCM();

    if (!fcm) {
        return json({ ok: false, fcm: false });
    }

    return json({ ok: true, fcm: true });
}