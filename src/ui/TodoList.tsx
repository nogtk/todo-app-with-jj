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
			<p className="text-center text-gray-400 text-sm">タスクがありません</p>
		);
	}

	return (
		<>
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
			<p className="mt-4 text-right text-xs text-gray-400">
				{todos.filter((t) => t.done).length} / {todos.length} 完了
			</p>
		</>
	);
}
