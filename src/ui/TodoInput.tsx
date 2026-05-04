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
				className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			/>
			<button
				type="button"
				onClick={onAdd}
				className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 active:bg-blue-700 transition-colors"
			>
				追加
			</button>
		</div>
	);
}
