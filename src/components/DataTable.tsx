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
  { key: "title_id", label: "Title ID" },
  { key: "region", label: "Region" },
  { key: "name", label: "Name" },
  { key: "size", label: "Size" },
  { key: "version", label: "Version" },
  { key: "release", label: "Release" },
  { key: "min_fw", label: "Min FW" },
  { key: "url", label: "URL" },
  { key: "cover_url", label: "Cover" },
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
        <div className="w-32 mx-auto">
          <AspectRatio ratio={3/4}>
            {row[column.key] ? (
              <img
                src={row[column.key]}
                alt="Cover"
                className="rounded-md object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                No Image
              </div>
            )}
          </AspectRatio>
          <Input
            value={row[column.key] || ""}
            onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
            className="mt-2"
          />
        </div>
      );
    }

    return (
      <Input
        value={row[column.key] || ""}
        onChange={(e) => handleCellChange(rowIndex, column.key, e.target.value)}
      />
    );
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(row, column, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={columns.length}>
              <button
                onClick={addNewRow}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-2"
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