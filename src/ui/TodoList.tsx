import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

type Props = {
	todos: Todo[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
	onTogglePriority: (id: number) => void;
};

export function TodoList({
	todos,
	onToggle,
	onDelete,
	onEdit,
	onTogglePriority,
}: Props) {
	if (todos.length === 0) {
		return (
			<div className="py-10 text-center">
				<p className="text-3xl mb-2">📋</p>
				<p className="text-sm text-gray-400">タスクがありません</p>
			</div>
		);
	}

	const done = todos.filter((t) => t.done).length;
	const pct = Math.round((done / todos.length) * 100);

	return (
		<>
			<div className="mb-4">
				<div className="flex justify-between text-xs text-gray-400 mb-1.5">
					<span>
						{done} / {todos.length} 完了
					</span>
					<span className="font-medium">{pct}%</span>
				</div>
				<div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
					<div
						className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 transition-all duration-500"
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>
			<ul className="space-y-2">
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={onToggle}
						onDelete={onDelete}
						onEdit={onEdit}
						onTogglePriority={onTogglePriority}
					/>
				))}
			</ul>
		</>
	);
}
