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
      <div
        className="bg-gradient-to-r from-sky-100 to-sky-200 py-8 text-center relative"
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 relative z-10"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          다양한 냥이들
        </h1>
        {/* 배경 이미지 추가를 원할 경우
              <div className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: 'url(/images/nyangs_bg.jpg)'}}
              >
            </div> */}
        {/* 아이콘 또는 일러스트 예시
            <span className="inline-block ml-2">
            <img src="/icons/cat_icon.png" alt="고양이 아이콘" className="h-8 w-8"/>
            </span> */}
      </div>
      <div className="flex flex-wrap justify-center">
        {results.map((result) => (
          <div
            key={result.id}
            className="m-4 p-4 border border-gray-200 rounded-md w-64 flex flex-col items-center" // flex 및 가운데 정렬 클래스 추가
          >
            <img
              src={result.image}
              alt={result.title}
              className="w-full h-48 object-cover mb-2 rounded-md"
              style={{
                pointerEvents: "none",
              }}
            />
            <h2 className="text-xl font-semibold text-center">
              {result.title}
            </h2>{" "}
            {/* 가운데 정렬 클래스 추가 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NyangsPage;
