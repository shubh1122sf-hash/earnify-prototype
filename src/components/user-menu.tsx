
'use client';

import { signOut } from 'next-auth/react';
import type { User } from 'next-auth';

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col text-right">
        <span className="font-semibold">{user.name}</span>
        <span className="text-sm text-gray-500">{user.email}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.image ?? ''}
        alt={user.name ?? 'User avatar'}
        width={40}
        height={40}
        className="rounded-full"
      />
      <button
        onClick={() => signOut()}
        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
      >
        Sign Out
      </button>
    </div>
  );
}
