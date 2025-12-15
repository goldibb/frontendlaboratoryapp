"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="h-[calc(100vh-60px)] flex flex-col justify-center items-center">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
            Aplikacja Kalendarz
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-neutral-400 font-medium">
            Projekt zaliczeniowy temat nr 1
          </p>
        </div>

        <div className="mt-8 gap-3 flex justify-center">
          {user ? (
            <Link
              href="/user/calendar"
              className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-full focus:outline-hidden focus:ring-1 focus:ring-gray-600 py-3 px-6 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Przejdź do kalendarza
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ) : (
            <>
              <Link
                href="/user/register"
                className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-full focus:outline-hidden focus:ring-1 focus:ring-gray-600 py-3 px-6 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Zarejestruj sie
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
              <Link
                href="/user/signin"
                className="relative group p-2 ps-3 inline-flex items-center gap-x-2 text-sm font-mono rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 transition-colors"
              >
                Zaloguj sie
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
