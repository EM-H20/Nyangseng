// src/pages/result/[id].tsx

// 필요한 React hooks와 컴포넌트들을 import합니다.
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import data from "@/utils/data.json";
import React from "react";

// Result 인터페이스 정의: 결과 페이지에 표시될 결과 데이터를 나타냅니다.
interface Result {
  id: string; // 결과의 고유 ID
  title: string; // 결과 제목
  description: string; // 결과 설명
  image: string; // 결과 이미지 URL
}

// ResultPage 컴포넌트: 결과 페이지를 담당하는 React 컴포넌트입니다.
const ResultPage: React.FC = () => {
  // useRouter hook을 사용하여 next/router 객체를 가져옵니다.
  const router = useRouter();
  // router.query에서 결과 ID를 가져옵니다.
  const { id } = router.query;
  // 현재 결과 상태를 저장하는 state입니다. 초기값은 null입니다.
  const [currentResult, setCurrentResult] = useState<Result | null>(null);

  // useEffect hook을 사용하여 컴포넌트가 마운트되거나 id가 변경될 때 실행되는 코드를 정의합니다.
  useEffect(() => {
    // id가 존재하면 실행합니다.
    if (id) {
      // data.results 배열에서 현재 id와 일치하는 결과를 찾습니다.
      const result = data.results.find((r) => r.id === id) as Result;
      // 찾은 결과로 currentResult 상태를 업데이트합니다.
      setCurrentResult(result);
    }
  }, [id]); // id가 변경될 때마다 useEffect hook을 다시 실행합니다.

  // currentResult가 null이면 로딩 메시지를 표시합니다.
  if (!currentResult) {
    return <div>Loading...</div>;
  }

  // 현재 결과에서 제목, 설명, 이미지 URL을 추출합니다.
  const { title, description, image } = currentResult;

  // 컴포넌트의 UI를 반환합니다.
  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center p-8">
      {/* 결과 이미지 */}
      <Image
        src={image}
        alt="결과 이미지"
        width={200}
        height={200}
        className="mb-4"
      />
      {/* 결과 제목 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      {/* 결과 설명 */}
      <p className="text-gray-700 mb-4 text-center">{description}</p>
    </div>
  );
};

// ResultPage 컴포넌트를 export합니다.
export default ResultPage;
