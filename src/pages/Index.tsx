import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoverImage } from "@/utils/coverImage";

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const { toast } = useToast();

  // Fetch data from orbispatches.com
  const { data: orbisData } = useQuery({
    queryKey: ['orbisData'],
    queryFn: async () => {
      const response = await fetch('https://orbispatches.com/CUSA02290');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: false, // Only fetch when needed
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFileName(file.name);
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const tableData = await Promise.all(
            Object.entries(json.DATA).map(async ([pkg_url, details]: [string, any]) => {
              let coverUrl = details.cover_url;
              if (details.title_id) {
                coverUrl = await fetchCoverImage(details.title_id);
              }
              return {
                pkg_url,
                title_id: details.title_id,
                region: details.region,
                name: details.name,
                size: details.size,
                version: details.version,
                release: details.release,
                min_fw: details.min_fw,
                url: coverUrl,
                cover_url: coverUrl
              };
            })
          );
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
        acc[row.pkg_url] = {
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
    <div className="min-h-screen flex flex-col bg-[#1A1F2C] text-white">
      <div className="container mx-auto p-4 space-y-8 flex-grow opacity-80 hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-center backdrop-blur-lg bg-[#221F26]/50 p-6 rounded-xl shadow-xl border border-purple-800/20">
          <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            JSON Data Editor
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => document.getElementById("fileInput")?.click()}
              variant="outline"
              className="bg-[#403E43]/50 border-purple-800/20 hover:bg-[#403E43]/80 transition-all duration-300 opacity-70 hover:opacity-100 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Open Data
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={data.length === 0}
              className="bg-purple-600/80 hover:bg-purple-700/80 transition-all duration-300 opacity-70 hover:opacity-100 text-white"
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
      
      <footer className="w-full py-6 text-center border-t border-purple-800/20 bg-[#1A1F2C]/50 backdrop-blur-sm">
        <p className="font-medium text-white">
          © Copyright 2024 by{" "}
          <span className="text-green-500">ItsJo</span>
          <span className="text-purple-500">kerZz</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;