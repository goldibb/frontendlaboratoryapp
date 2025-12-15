"use client";

import React, { useState, useEffect } from "react";
import FailureAlert from "./FailureAlert";

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
  initialDate,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    completed: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        date: task.date || "",
        completed: task.completed || false,
      });
    } else if (initialDate) {
      setFormData({
        title: "",
        description: "",
        date: initialDate,
        completed: false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        completed: false,
      });
    }
    setError("");
  }, [task, initialDate, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.date) {
      setError("Date is required");
      return;
    }
    onSave({ ...formData, id: task?.id });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white border rounded-xl shadow-sm max-w-lg w-full dark:bg-neutral-900 dark:border-neutral-700">
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
          <h3 className="font-bold text-gray-800 dark:text-white">
            {task ? "Edit Task" : "Add Task"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
          >
            <span className="sr-only">Close</span>
            <svg
              className="flex-shrink-0 size-4"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {error && <FailureAlert message={error} />}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                />
                {formData.date && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">
                    {new Date(formData.date).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                  placeholder="Task description"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="completed"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                />
                <label
                  htmlFor="completed"
                  className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
                >
                  Completed
                </label>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700 mt-4">
              {task && (
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
