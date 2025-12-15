"use client";

import React from "react";
import Link from "next/link";
import LogoutModal from "./LogoutModal";

export default function SideMenu() {
  const handleLogout = () => {
    const modal = document.querySelector("#hs-sign-out-alert");
    if (window.HSOverlay && modal) {
      window.HSOverlay.open(modal);
    }
  };

  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700">
      <div>
        <div className="border-t border-gray-200 dark:border-neutral-700">
          <div className="px-2">
            <ul className="space-y-1 border-t border-gray-200 pt-4 dark:border-neutral-700">
              <li>
                <Link
                  href="/user/calendar"
                  className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                >
                  <svg
                    className="size-5 opacity-75"
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible dark:bg-neutral-700">
                    Calendar
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/user/profile"
                  className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible dark:bg-neutral-700">
                    Account
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-200 bg-white p-2 dark:bg-neutral-800 dark:border-neutral-700">
        <button
          type="button"
          onClick={handleLogout}
          data-hs-overlay="#hs-sign-out-alert"
          className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>

          <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible dark:bg-neutral-700">
            Logout
          </span>
        </button>
      </div>
      <LogoutModal />
    </div>
  );
}
