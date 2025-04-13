import { useState, useEffect } from "react";
import HierarchyTable from "./components/HierarchyTable";
import { Node } from "./data/types";
import { fetchData, removeNodeFromData } from "./data/dataService";

function App() {
  const [data, setData] = useState<Node[]>([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const handleRemoveNode = (tempId: string) => {
    const newData = removeNodeFromData(data, tempId);
    setData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hierarchická Tabulka</h1>
        <img
          src={`${process.env.PUBLIC_URL}/koala.svg`}
          alt="Logo Koala42"
          className="h-10 w-auto"
        />
      </div>
      {data.length > 0 ? (
        <HierarchyTable data={data} onRemoveNode={handleRemoveNode} />
      ) : (
        <p>Načítání dat...</p>
      )}
    </div>
  );
}

export default App;
