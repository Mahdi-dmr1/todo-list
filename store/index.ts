"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TodoState, Task } from "../types";

export const useTodoStore = create<TodoState>()(
	persist(
		(set) => ({
			tasks: [],
			addTask: (title, description) =>
				set((state) => ({
					tasks: [
						...state.tasks,
						{ id: Date.now(), title, description, done: false },
					],
				})),
			removeTask: (id) =>
				set((state) => ({
					tasks: state.tasks.filter((task) => task.id !== id),
				})),
			toggleTaskDone: (id) =>
				set((state) => ({
					tasks: state.tasks.map((task) =>
						task.id === id ? { ...task, done: !task.done } : task
					),
				})),
		}),
		{
			name: "todo-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
