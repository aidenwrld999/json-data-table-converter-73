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

  const getCoverUrl = (titleId: string) => {
    return `https://orbispatches.com/patches/${titleId}/icon0.png`;
  };

  const renderCell = (row: any, column: { key: string; label: string }, rowIndex: number) => {
    if (column.key === "cover_url") {
      const coverUrl = getCoverUrl(row.title_id);
      return (
        <div className="relative group">
          <div className="w-24 transition-all duration-500 group-hover:w-32">
            <AspectRatio ratio={3/4}>
              <img
                src={coverUrl}
                alt="Cover"
                className="rounded-lg object-cover w-full h-full shadow-lg transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105 border border-gray-800"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </AspectRatio>
          </div>
          
          <div className="absolute left-full ml-4 top-0 min-w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-x-[-20px] group-hover:translate-x-0">
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-purple-800/20">
              <div className="grid grid-cols-2 gap-4">
                {columns.slice(1).map((col) => (
                  <div key={col.key} className="space-y-2">
                    <label className="text-sm text-gray-400">{col.label}</label>
                    <Input
                      value={row[col.key] || ""}
                      onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">
        Total Items: <span className="text-purple-400">{data.length}</span>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="relative group">
            {renderCell(row, columns[0], rowIndex)}
          </div>
        ))}
        <button
          onClick={addNewRow}
          className="w-24 h-32 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
        >
          Add New
        </button>
      </div>
    </div>
  );
}