// src/pages/nyangs.tsx

import { useState, useEffect } from "react";
import data from "@/utils/data.json";

interface ResultType {
  id: string;
  title: string;
  description: string;
  image: string;
  types: string[];
}

const NyangsPage = () => {
  const [results, setResults] = useState<ResultType[]>([]);

  useEffect(() => {
    if (data && data.results) {
      setResults(data.results);
    }
  }, []);

  const handlePreventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };
  return (
    <div
      onContextMenu={handlePreventDefault}
      onDragStart={handlePreventDefault}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        pointerEvents: "auto",
      }}
    >
      <h1>다양한 냥이들</h1>
      <div className="flex flex-wrap justify-center">
        {results.map((result) => (
          <div
            key={result.id}
            className="m-4 p-4 border border-gray-200 rounded-md w-64"
          >
            <img
              src={result.image}
              alt={result.title}
              className="w-full h-48 object-cover mb-2 rounded-md"
              style={{
                pointerEvents: "none",
              }}
            />
            <h2 className="text-xl font-semibold">{result.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NyangsPage;
