import { useEffect, useState } from "react";
import type { Todo } from "./types";
import { TodoInput } from "./ui/TodoInput";
import { TodoList } from "./ui/TodoList";

const STORAGE_KEY = "todos";
type Filter = "all" | "active" | "done";

export default function App() {
	const [todos, setTodos] = useState<Todo[]>(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			return saved ? (JSON.parse(saved) as Todo[]) : [];
		} catch {
			return [];
		}
	});
	const [input, setInput] = useState("");
	const [filter, setFilter] = useState<Filter>("all");

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		const text = input.trim();
		if (!text) return;
		setTodos((prev) => [
			...prev,
			{ id: Date.now(), text, done: false, priority: false },
		]);
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

	const togglePriority = (id: number) => {
		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, priority: !t.priority } : t)),
		);
	};

	const filteredTodos = todos.filter((t) => {
		if (filter === "active") return !t.done;
		if (filter === "done") return t.done;
		return true;
	});

	const tabs: { label: string; value: Filter }[] = [
		{ label: "すべて", value: "all" },
		{ label: "未完了", value: "active" },
		{ label: "完了済み", value: "done" },
	];

	return (
		<div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20 px-4">
			<div className="w-full max-w-md">
				<h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
					TODO
				</h1>
				<TodoInput value={input} onChange={setInput} onAdd={addTodo} />
				<div className="flex gap-1 mt-6 mb-3 bg-gray-100 p-1 rounded-lg">
					{tabs.map((tab) => (
						<button
							key={tab.value}
							type="button"
							onClick={() => setFilter(tab.value)}
							className={`flex-1 text-xs py-1.5 rounded-md transition-colors font-medium ${
								filter === tab.value
									? "bg-white text-gray-800 shadow-sm"
									: "text-gray-400 hover:text-gray-600"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
				<TodoList
					todos={filteredTodos}
					onToggle={toggleTodo}
					onDelete={deleteTodo}
					onEdit={editTodo}
					onTogglePriority={togglePriority}
				/>
			</div>
		</div>
	);
}
