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
import { getCoverUrl, fetchCoverImage } from "@/utils/coverImage";

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
  { key: "url", label: "Cover URL" },
  { key: "pkg_url", label: "Package Download URL" },
];

export function DataTable({ data, setData }: DataTableProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCellChange = async (rowIndex: number, columnKey: string, value: string) => {
    const newData = [...data];
    if (columnKey === "title_id") {
      newData[rowIndex] = {
        ...newData[rowIndex],
        [columnKey]: value,
      };
      setData(newData);
      
      if (value) {
        try {
          const imageUrl = await getCoverUrl(value);
          const updatedData = [...newData];
          updatedData[rowIndex] = {
            ...updatedData[rowIndex],
            cover_url: imageUrl,
            url: imageUrl
          };
          setData(updatedData);
        } catch (error) {
          console.error('Error fetching cover:', error);
        }
      }
    } else {
      newData[rowIndex] = {
        ...newData[rowIndex],
        [columnKey]: value,
      };
      setData(newData);
    }
  };

  const addNewRow = () => {
    setData([
      ...data,
      columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {}),
    ]);
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const renderCell = (row: any, column: { key: string; label: string }, rowIndex: number) => {
    if (column.key === "cover_url") {
      return (
        <div className="relative w-full h-full">
          <div 
            className="w-full aspect-[3/4] transition-all duration-500 hover:scale-105 cursor-pointer"
            onClick={() => handleImageClick(rowIndex)}
          >
            <AspectRatio ratio={3/4} className="overflow-hidden rounded-lg">
              <img
                src={row.url || "/placeholder.svg"}
                alt="Cover"
                className="object-cover w-full h-full shadow-lg transition-all duration-500 opacity-70 hover:opacity-100 border border-gray-800"
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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="relative w-full">
            {renderCell(row, columns[0], rowIndex)}
          </div>
        ))}
        <div className="relative w-full aspect-[3/4]">
          <button
            onClick={addNewRow}
            className="w-full h-full flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            Add New
          </button>
        </div>
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
                    readOnly={col.key === "url" || col.key === "cover_url"}
                    placeholder={col.key === "url" || col.key === "cover_url" ? 
                      (data[selectedIndex].title_id ? 
                        data[selectedIndex][col.key] : 
                        "Enter Title ID first"
                      ) : ""}
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