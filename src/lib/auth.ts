'use client';

// This file is kept for simplicity to potentially house future client-side auth utilities.
// The main logic is now server-side in the API routes.

export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', { method: 'POST' });
    if (response.ok) {
        // Force a reload to clear all client-side state and redirect via the auth provider
        window.location.href = '/login';
    } else {
        console.error('Sign out failed');
    }
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
