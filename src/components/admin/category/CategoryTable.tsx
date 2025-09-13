import { Category } from "@/types/article";
import CategoryRow from "./CategoryRow";

interface Props {
    categories: Category[];
    onRefresh: () => void; // tambahin prop ini
}

export default function CategoryTable({ categories, onRefresh }: Props) {
    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-200 shadow text-center text-slate-900">
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Created at</th>
                    <th className="py-2 px-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((cat) => (
                    <CategoryRow key={cat.id} category={cat} onRefresh={onRefresh} />
                ))}
            </tbody>
        </table>
    );
}
