import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload } from "lucide-react";

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const tableData = Object.entries(json.DATA).map(([url, details]: [string, any]) => ({
            url,
            title_id: details.title_id,
            region: details.region,
            name: details.name,
            size: details.size,
            version: details.version,
            release: details.release,
            min_fw: details.min_fw,
            cover_url: details.cover_url
          }));
          setData(tableData);
          toast({
            title: "Success",
            description: "File loaded successfully",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to parse JSON file",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    const jsonData = {
      DATA: data.reduce((acc: any, row) => {
        const url = row.url.startsWith("http") ? row.url : `https://${row.url}`;
        acc[url] = {
          title_id: row.title_id,
          region: row.region,
          name: row.name,
          size: row.size,
          version: row.version,
          release: row.release,
          min_fw: row.min_fw,
          cover_url: row.cover_url
        };
        return acc;
      }, {})
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Data saved successfully",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">JSON Data Editor</h1>
        <div className="space-x-2">
          <Button
            onClick={() => document.getElementById("fileInput")?.click()}
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" />
            Open Data
          </Button>
          <Button onClick={handleSave} disabled={data.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Save Data
          </Button>
        </div>
      </div>
      
      <input
        type="file"
        id="fileInput"
        accept=".json"
        className="hidden"
        onChange={handleFileUpload}
      />
      
      <DataTable data={data} setData={setData} />
    </div>
  );
};

export default Index;