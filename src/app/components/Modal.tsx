import React from "react";
import { ModalProps } from "../../../types";

export const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg relative">
				<button
					className="absolute text-2xl top-2 right-2 text-red-400 hover:text-red-700"
					onClick={onClose}>
					×
				</button>
				{children}
			</div>
		</div>
	);
};
