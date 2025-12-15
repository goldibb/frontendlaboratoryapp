"use client";

import LogoutModal from "@/app/components/LogoutModal";

export default function LogoutForm() {
  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-sign-out-alert"
          data-hs-overlay="#hs-sign-out-alert"
        >
          Sign out
        </button>
      </div>
      <LogoutModal />
    </>
  );
}
