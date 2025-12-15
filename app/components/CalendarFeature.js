"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Calendar from "@/app/components/Calendar";
import TaskModal from "@/app/components/TaskModal";

export default function CalendarFeature() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalDate, setModalDate] = useState("");

  const tasksCollection = collection(db, "tasks");

  const fetchTasks = async () => {
    if (!user) return;
    try {
      const q = query(tasksCollection, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleAddClick = (date) => {
    setSelectedTask(null);
    setModalDate(date);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalDate(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData.id) {
        // Update
        const taskRef = doc(db, "tasks", taskData.id);
        const { id, ...dataToUpdate } = taskData;
        await updateDoc(taskRef, dataToUpdate);
      } else {
        // Create
        const { id, ...newTaskData } = taskData;
        await addDoc(tasksCollection, {
          ...newTaskData,
          uid: user.uid,
          createdAt: Timestamp.now(),
        });
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Calendar
        </h1>
        <div className="flex items-center gap-x-2">
          <button
            onClick={handlePrevMonth}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Prev
          </button>
          <span className="font-semibold text-gray-800 dark:text-white min-w-[150px] text-center">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={handleNextMonth}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Next
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
        <Calendar
          tasks={tasks}
          currentDate={currentDate}
          onAddClick={handleAddClick}
          onTaskClick={handleTaskClick}
        />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={selectedTask}
        initialDate={modalDate}
      />
    </div>
  );
}
