import type { Todo } from "../types";

type Props = {
	todo: Todo;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
	return (
		<li className="flex items-center gap-3 rounded-lg bg-white border border-gray-200 px-4 py-3 shadow-sm">
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
				onClick={() => onDelete(todo.id)}
				className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
				aria-label="削除"
			>
				×
			</button>
		</li>
	);
}
