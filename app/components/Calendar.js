"use client";

import React from "react";

export default function Calendar({
  tasks,
  currentDate,
  onAddClick,
  onTaskClick,
}) {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const paddingDays = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const renderTask = (task) => (
    <div
      key={task.id}
      onClick={(e) => {
        e.stopPropagation();
        onTaskClick(task);
      }}
      className={`text-xs p-1 mb-1 rounded cursor-pointer truncate ${
        task.completed
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 line-through"
          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      }`}
      title={task.title}
    >
      {task.title}
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-px bg-gray-200 text-center text-xs font-semibold text-gray-700 dark:bg-neutral-700 dark:text-neutral-400">
        <div className="bg-white dark:bg-neutral-800 py-2">Sun</div>
        <div className="bg-white dark:bg-neutral-800 py-2">Mon</div>
        <div className="bg-white dark:bg-neutral-800 py-2">Tue</div>
        <div className="bg-white dark:bg-neutral-800 py-2">Wed</div>
        <div className="bg-white dark:bg-neutral-800 py-2">Thu</div>
        <div className="bg-white dark:bg-neutral-800 py-2">Fri</div>
        <div className="bg-white dark:bg-neutral-800 py-2">Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-neutral-700">
        {paddingDays.map((_, index) => (
          <div
            key={`pad-${index}`}
            className="bg-white dark:bg-neutral-800 h-28 sm:h-36 p-1 min-h-[100px]"
          ></div>
        ))}
        {days.map((day) => {
          const dateStr = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;
          const daysTasks = tasks.filter((t) => t.date === dateStr);

          return (
            <div
              key={day}
              className="bg-white dark:bg-neutral-800 h-28 sm:h-36 p-1 flex flex-col min-h-[100px] relative group"
            >
              <div className="font-semibold text-sm text-gray-600 dark:text-neutral-400 mb-1 flex justify-between items-center">
                <span>{day}</span>
                <button
                  onClick={() => onAddClick(dateStr)}
                  className="text-blue-600 hover:text-blue-800 p-0.5"
                  title="Add Task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {daysTasks.map(renderTask)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
