import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../../public/images/logo.png"; // 로고 이미지 경로에 맞춰 수정
import logoHover from "../../public/images/logo_hover.png"; // 호버 로고 이미지 경로에 맞춰 수정
import data from "@/utils/data.json"; // data.json import

export default function Home() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false); // 로고 호버 상태 관리

  const handleStartClick = () => {
    const firstQuestion = data.questions[0];
    if (firstQuestion) {
      router.push(`/question/${firstQuestion.id}`);
    }
  };

  const handleLogoClick = () => {
    router.reload(); // 페이지 새로고침
  };

  return (
    <>
      <Head>
        <title>냥생뭐였니</title>
        <meta name="description" content="냥생뭐였니 메인 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={isHovered ? logoHover : logo}
            alt="냥생뭐였니 로고"
            width={150}
            height={150}
            className="mb-4 transition-all duration-300"
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          나의 냥이는 전생에 무엇이었을까?
        </h1>
        <p className="text-gray-600 mb-8 text-center px-4">
          우리 냥이의 성향을 분석하여 전생, 환생, 그리고 인간형 모습을
          알아볼까요?
        </p>
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          onClick={handleStartClick}
        >
          시작하기
        </button>
      </div>
    </>
  );
}
