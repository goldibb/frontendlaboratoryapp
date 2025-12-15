"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Verify() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      const auth = getAuth();
      signOut(auth);
    }
  }, [user]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Verify your email
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Email not verified. Verify clicking on link in email send to your
              address <span className="font-bold">{email}</span>
            </p>
            <div className="mt-6">
              <a
                href="/user/signin"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
