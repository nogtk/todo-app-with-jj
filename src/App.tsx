import { useState } from "react";
import type { Todo } from "./types";
import { TodoInput } from "./ui/TodoInput";
import { TodoList } from "./ui/TodoList";

export default function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [input, setInput] = useState("");

	const addTodo = () => {
		const text = input.trim();
		if (!text) return;
		setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
		setInput("");
	};

	const toggleTodo = (id: number) => {
		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
		);
	};

	const deleteTodo = (id: number) => {
		setTodos((prev) => prev.filter((t) => t.id !== id));
	};

	const editTodo = (id: number, newText: string) => {
		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, text: newText } : t)),
		);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
			<div className="w-full max-w-md">
				<h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
					TODO
				</h1>
				<TodoInput value={input} onChange={setInput} onAdd={addTodo} />
				<TodoList
					todos={todos}
					onToggle={toggleTodo}
					onDelete={deleteTodo}
					onEdit={editTodo}
				/>
			</div>
		</div>
	);
}
