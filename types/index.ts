import { ReactNode } from "react";

export interface ModalProps {
	show: boolean;
	onClose: () => void;
	children: ReactNode;
}

export interface Task {
	id: number;
	title: string;
	description: string;
	done: boolean;
}

export interface TodoState {
	tasks: Task[];
	addTask: (title: string, description: string) => void;
	removeTask: (id: number) => void;
	toggleTaskDone: (id: number) => void;
}
