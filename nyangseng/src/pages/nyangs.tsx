// src/pages/nyangs.tsx
import { useState, useEffect } from "react"; // React 훅 import
import data from "@/utils/data.json"; // 데이터 파일 import
import Head from "next/head";
import Image from "next/image"; // next/image import

// 결과 데이터 타입 정의
interface ResultType {
  id: string; // 결과 ID
  title: string; // 결과 제목
  description: string; // 결과 설명
  image: string; // 결과 이미지 URL
}

// 다양한 냥이들을 보여주는 페이지 컴포넌트
const NyangsPage = () => {
  // 결과 데이터를 저장할 상태 변수, 초기값은 빈 배열
  const [results, setResults] = useState<ResultType[]>([]);

  // 컴포넌트가 마운트될 때 실행되는 useEffect 훅
  useEffect(() => {
    // 데이터가 존재하고, 데이터 안에 results 배열이 있을 경우
    if (data && data.results) {
      // 결과를 상태 변수에 저장
      setResults(data.results);
    }
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링 될때만 실행하도록 함

  useEffect(() => {
    // Head 컴포넌트를 사용하여 페이지 title을 업데이트합니다.
    document.title = `냥생뭐했니 - 히든냥이`;
  }, []);

  // 마우스 우클릭, 드래그 방지 함수
  const handlePreventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); // 기본 이벤트 동작 방지
  };

  // 다양한 냥이들을 보여주는 페이지 컴포넌트 return
  return (
    // 마우스 우클릭, 드래그 방지
    <div
      onContextMenu={handlePreventDefault} // 마우스 우클릭 방지
      onDragStart={handlePreventDefault} // 드래그 방지
      style={{
        userSelect: "none", // 텍스트 선택 방지
        WebkitUserSelect: "none", // 웹킷 브라우저 텍스트 선택 방지
        msUserSelect: "none", // IE/Edge 텍스트 선택 방지
        MozUserSelect: "none", // 파이어폭스 텍스트 선택 방지
        pointerEvents: "auto", // 포인터 이벤트 활성화
      }}
    >
      <Head>
        <title>냥생뭐했니 - 히든냥이</title>
      </Head>
      {/* 배경색과 그림자가 있는 헤더 */}
      <div
        className="bg-gradient-to-r from-sky-100 to-sky-200 py-8 text-center relative"
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* 메인 제목 */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 relative z-10"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          다양한 냥이들
        </h1>
      </div>
      {/* 냥이들 리스트를 감싸는 flex 컨테이너 */}
      <div className="flex flex-wrap justify-center">
        {/* 결과 데이터를 순회하며 각 냥이 결과 표시 */}
        {results.map((result) => (
          // 각 냥이 결과를 감싸는 div
          <div
            key={result.id}
            className="m-4 p-4 border border-gray-200 rounded-md w-64 flex flex-col items-center"
          >
            <Image
              src={result.image} // 냥이 이미지 URL
              alt={result.title} // 냥이 이미지 alt 속성
              width={256} // 적절한 width 값 지정
              height={192} // 적절한 height 값 지정
              className="w-full h-48 object-cover mb-2 rounded-md"
              style={{
                pointerEvents: "none",
              }}
            />
            {/* 냥이 제목 */}
            <h2 className="text-xl font-semibold text-center">
              {result.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NyangsPage;
