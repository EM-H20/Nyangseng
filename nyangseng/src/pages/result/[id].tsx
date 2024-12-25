import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import data from "@/utils/data.json";
import React from "react";

interface Result {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentResult, setCurrentResult] = useState<Result | null>(null);

  useEffect(() => {
    if (id) {
      const result = data.results.find((r) => r.id === id) as Result;
      setCurrentResult(result);
    }
  }, [id]);

  if (!currentResult) {
    return <div>Loading...</div>;
  }

  const { title, description, image } = currentResult;

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center p-8">
      <Image
        src={image}
        alt="결과 이미지"
        width={200}
        height={200}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-700 mb-4 text-center">{description}</p>
    </div>
  );
};

export default ResultPage;
