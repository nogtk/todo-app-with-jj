import { useState } from "react";
import type { Todo } from "../types";

type Props = {
	todo: Todo;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
	onTogglePriority: (id: number) => void;
};

export function TodoItem({
	todo,
	onToggle,
	onDelete,
	onEdit,
	onTogglePriority,
}: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);

	const handleSave = () => {
		const text = editText.trim();
		if (text) onEdit(todo.id, text);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditText(todo.text);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<li className="flex items-center gap-2 rounded-lg bg-white border border-blue-300 px-4 py-3 shadow-sm">
				<input
					type="text"
					value={editText}
					onChange={(e) => setEditText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSave();
						if (e.key === "Escape") handleCancel();
					}}
					className="flex-1 text-sm text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
					autoFocus
				/>
				<button
					type="button"
					onClick={handleSave}
					className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
				>
					保存
				</button>
				<button
					type="button"
					onClick={handleCancel}
					className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
				>
					キャンセル
				</button>
			</li>
		);
	}

	return (
		<li
			className={`flex items-center gap-3 rounded-lg bg-white border px-4 py-3 shadow-sm ${todo.priority ? "border-orange-300" : "border-gray-200"}`}
		>
			<input
				type="checkbox"
				checked={todo.done}
				onChange={() => onToggle(todo.id)}
				className="h-4 w-4 accent-blue-500 cursor-pointer"
			/>
			<span
				className={`flex-1 text-sm ${todo.done ? "line-through text-gray-400" : "text-gray-700"}`}
			>
				{todo.text}
			</span>
			<button
				type="button"
				onClick={() => onTogglePriority(todo.id)}
				className={`text-sm leading-none transition-colors ${todo.priority ? "text-orange-400" : "text-gray-300 hover:text-orange-300"}`}
				aria-label="優先度"
			>
				★
			</button>
			<button
				type="button"
				onClick={() => setIsEditing(true)}
				className="text-gray-300 hover:text-blue-400 transition-colors text-sm leading-none"
				aria-label="編集"
			>
				✎
			</button>
			<button
				type="button"
				onClick={() => onDelete(todo.id)}
				className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
				aria-label="削除"
			>
				×
			</button>
		</li>
	);
}
