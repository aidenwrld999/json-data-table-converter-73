import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

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
  { key: "cover_url", label: "Cover URL" },
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
                  <Input
                    value={row[column.key] || ""}
                    onChange={(e) =>
                      handleCellChange(rowIndex, column.key, e.target.value)
                    }
                  />
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