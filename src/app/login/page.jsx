"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <button
          onClick={() => signIn()} // ✅ Just this — no callbackUrl
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded mt-4"
        >
          Sign in with Credentials
        </button>
      </div>
    </div>
  );
}
