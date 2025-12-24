/// <reference types="@sveltejs/kit" />

declare namespace App {
  // nothing needed here
}

declare module '$env/static/private' {
  export const FIREBASE_PROJECT_ID: string;
  export const FIREBASE_CLIENT_EMAIL: string;
  export const FIREBASE_PRIVATE_KEY: string;
}
declare module '$env/static/public' {
  // empty
}

declare module '$env/dynamic/private' {
  export const FIREBASE_PROJECT_ID: string;
  export const FIREBASE_CLIENT_EMAIL: string;
  export const FIREBASE_PRIVATE_KEY: string;
}

declare module '$env/dynamic/public' {
  // empty
}		