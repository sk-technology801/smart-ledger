"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 bg-gray-900 rounded shadow-lg">
        <h1 className="text-2xl mb-4 font-bold">Login</h1>
        <button
          onClick={() => signIn()}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
