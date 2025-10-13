import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

type TableProps<T> = {
    columns: ColumnDef<T>[];
    data: T[];
};

export function ClassicTable<T>({ columns, data }: TableProps<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-xl border border-gray-700 bg-gray-900 text-gray-200">
            <table className="w-full text-left">
                <thead className="bg-gray-800">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => {
                                const isFirst = index === 0;
                                const isLast = index === headerGroup.headers.length - 1;

                                return (
                                    <th
                                        key={header.id}
                                        className={`p-3 font-semibold 
        ${isFirst ? "rounded-tl-xl" : ""}
        ${isLast ? "rounded-tr-xl" : ""}
      `}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-800/70 transition">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-3">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
