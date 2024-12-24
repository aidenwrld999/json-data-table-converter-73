import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload } from "lucide-react";

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFileName(file.name);
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
    a.download = originalFileName || "data.json";
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
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="container mx-auto p-4 space-y-8 flex-grow opacity-80 hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-center backdrop-blur-lg bg-gray-900/50 p-6 rounded-xl shadow-xl border border-gray-800">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            JSON Data Editor
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => document.getElementById("fileInput")?.click()}
              variant="outline"
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <Upload className="w-4 h-4 mr-2" />
              Open Data
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={data.length === 0}
              className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 opacity-70 hover:opacity-100"
            >
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
        
        <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
          <DataTable data={data} setData={setData} />
        </div>
      </div>
      
      <footer className="w-full py-6 text-center border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <p className="font-medium">
          © Copyright 2024 by{" "}
          <span className="text-green-500">ItsJo</span>
          <span className="text-purple-500">kerZz</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;