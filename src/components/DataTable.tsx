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
import { useState } from "react";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const handleImageClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const renderCell = (row: any, column: { key: string; label: string }, rowIndex: number) => {
    if (column.key === "cover_url") {
      const coverUrl = getCoverUrl(row.title_id);
      return (
        <div className="relative">
          <div 
            className="w-32 transition-all duration-500 hover:scale-105 cursor-pointer"
            onClick={() => handleImageClick(rowIndex)}
          >
            <AspectRatio ratio={3/4}>
              <img
                src={coverUrl}
                alt="Cover"
                className="rounded-lg object-cover w-full h-full shadow-lg transition-all duration-500 opacity-70 hover:opacity-100 border border-gray-800"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </AspectRatio>
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
          <div key={rowIndex} className="relative">
            {renderCell(row, columns[0], rowIndex)}
          </div>
        ))}
        <button
          onClick={addNewRow}
          className="w-32 h-44 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
        >
          Add New
        </button>
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#221F26]/95 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-purple-800/20 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {columns.slice(1).map((col) => (
                <div key={col.key} className="space-y-2">
                  <label className="text-sm text-gray-400">{col.label}</label>
                  <Input
                    value={data[selectedIndex][col.key] || ""}
                    onChange={(e) => handleCellChange(selectedIndex, col.key, e.target.value)}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedIndex(null)}
              className="mt-6 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg text-purple-200 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}