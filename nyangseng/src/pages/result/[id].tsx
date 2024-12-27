// src/pages/result/[id].tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import data from "@/utils/data.json"; // JSON 파일 경로

interface Result {
  id: string;
  title: string;
  description: string;
  image: string;
  types: string[];
}

const ResultPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentResult, setCurrentResult] = useState<Result | null>(null);

  useEffect(() => {
    if (id) {
      // data.results 배열에서 id와 일치하는 결과 또는 디폴트 결과를 찾습니다.
      const result = data.results.find((result) => result.id === id);
      setCurrentResult(
        result ||
          data.results.find((result) => result.id === "result-not-found") ||
          null
      );
    }
  }, [id]);

  if (!currentResult) {
    return <div>Loading...</div>;
  }

  const { title, description, image } = currentResult;

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover rounded-t-xl mb-4"
        />
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="mt-4 flex justify-center space-x-2 px-6 py-2">
          <button
            onClick={() => router.push("/question/1")}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            다시 하기
          </button>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            공유하기
          </button>
        </div>
        <div className="flex flex-col items-center mt-2 px-6 py-2">
          <button
            onClick={() => router.push("/nyangs")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            히든냥이
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
