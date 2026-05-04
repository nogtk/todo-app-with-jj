type Props = {
	value: string;
	onChange: (value: string) => void;
	onAdd: () => void;
};

export function TodoInput({ value, onChange, onAdd }: Props) {
	return (
		<div className="flex gap-2 mb-6">
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && onAdd()}
				placeholder="タスクを入力..."
				className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
			/>
			<button
				type="button"
				onClick={onAdd}
				className="rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-indigo-600 hover:to-blue-600 active:scale-95 transition-all duration-200"
			>
				追加
			</button>
		</div>
	);
}
