"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import FailureAlert from "@/app/components/FailureAlert";
import SuccessAlert from "@/app/components/SuccessAlert";

export default function ProfilePage() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    street: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    if (user) {
      // Load initial data from Auth
      const initialData = {
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        street: "",
        city: "",
        zipCode: "",
      };

      // Fetch address from Firestore
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.address) {
              initialData.street = data.address.street || "";
              initialData.city = data.address.city || "";
              initialData.zipCode = data.address.zipCode || "";
            }
          }
          setFormData(initialData);
        } catch (e) {
          console.error("Error fetching user data:", e);
          setError("Failed to load profile data.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) return;

    try {
      // Update Auth Profile
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      // Update Firestore Document
      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          address: {
            street: formData.street,
            city: formData.city,
            zipCode: formData.zipCode,
          },
        },
        { merge: true }
      ); // Merge to avoid overwriting other fields if they exist

      console.log("Document written with ID: ", docRef.id);
      console.log("Profile updated");
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };

  if (!user) {
    return null; // Or loading state
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        User Profile
      </h1>

      {formData.photoURL && (
        <div className="flex justify-center mb-6">
          <img
            className="inline-block size-24 rounded-full ring-2 ring-white dark:ring-neutral-800"
            src={formData.photoURL}
            alt="Profile Preview"
          />
        </div>
      )}

      {error && (
        <div className="mb-4">
          <FailureAlert message={error} />
        </div>
      )}

      {success && (
        <div className="mb-4">
          <SuccessAlert message={success} />
        </div>
      )}

      <form onSubmit={onSubmit}>
        {/* Email Field (Read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={user.email || ""}
            readOnly
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-100 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        </div>

        {/* Display Name Field */}
        <div className="mb-4">
          <label
            htmlFor="displayName"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            disabled={isLoading}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter your display name"
          />
        </div>

        {/* Photo URL Field */}
        <div className="mb-6">
          <label
            htmlFor="photoURL"
            className="block text-sm font-medium mb-2 dark:text-white"
          >
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            disabled={isLoading}
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              disabled={isLoading}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Street"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={isLoading}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="City"
            />
          </div>
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              disabled={isLoading}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Zip Code"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? "Loading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
