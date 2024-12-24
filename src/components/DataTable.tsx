import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface DataTableProps {
  data: any[];
  setData: (data: any[]) => void;
}

const columns = [
  { key: "cover_url", label: "Cover" },
  { key: "title_id", label: "Title ID" },
  { key: "region", label: "Region" },
  { key: "name", label: "Name" },
  { key: "size", label: "Size" },
  { key: "version", label: "Version" },
  { key: "release", label: "Release" },
  { key: "min_fw", label: "Min FW" },
  { key: "url", label: "URL" },
];

export function DataTable({ data, setData }: DataTableProps) {
  const handleCellChange = (rowIndex: number, columnKey: string, value: string) => {
    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnKey]: value,
    };
    setData(newData);
  };

  const addNewRow = () => {
    setData([
      ...data,
      columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {}),
    ]);
  };

  const renderCell = (row: any, column: { key: string; label: string }, rowIndex: number) => {
    if (column.key === "cover_url") {
      return (
        <div className="w-24 transition-all duration-300 hover:w-32 group opacity-70 hover:opacity-100">
          <AspectRatio ratio={3/4}>
            {row[column.key] ? (
              <img
                src={row[column.key]}
                alt="Cover"
                className="rounded-lg object-cover w-full h-full shadow-lg transition-transform duration-300 group-hover:scale-105 border border-gray-800"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center text-sm text-gray-400 transition-colors duration-300 hover:bg-gray-800 border border-gray-800">
                No Image
              </div>
            )}
          </AspectRatio>
          <Input
            value={row[column.key] || ""}
            onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
            className="mt-2 text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gray-900 border-gray-800"
            placeholder="Enter image URL"
          />
        </div>
      );
    }

    return (
      <Input
        value={row[column.key] || ""}
        onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
        className="transition-all duration-300 hover:ring-2 hover:ring-purple-500/20 opacity-70 hover:opacity-100 bg-gray-900 border-gray-800"
      />
    );
  };

  return (
    <div className="border border-gray-800 rounded-xl shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl backdrop-blur-lg bg-gray-900/50">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800">
            {columns.map((column) => (
              <TableHead 
                key={column.key} 
                className="font-semibold text-gray-400 bg-black/50"
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              className="group/row border-gray-800"
            >
              {columns.map((column) => (
                <TableCell 
                  key={column.key} 
                  className="group-hover/row:bg-gray-800/50 transition-colors duration-300"
                >
                  {renderCell(row, column, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow className="border-gray-800">
            <TableCell colSpan={columns.length}>
              <button
                onClick={addNewRow}
                className="w-full text-center text-sm text-gray-400 hover:text-white py-2 transition-colors duration-300 opacity-70 hover:opacity-100"
              >
                Add New Row
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}