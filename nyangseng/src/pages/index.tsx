// next/head 컴포넌트 import: HTML 문서의 <head> 요소를 수정하는 데 사용
import Head from "next/head";
// next/image 컴포넌트 import: 이미지 최적화를 위한 컴포넌트
import Image from "next/image";
// next/router Hook import: 페이지 이동 및 라우팅 처리를 위한 Hook
import { useRouter } from "next/router";
// react useState Hook import: 컴포넌트의 상태를 관리하기 위한 Hook
import { useState } from "react";
// 로고 이미지 import: public/images/logo.png 파일에서 로고 이미지 가져오기
import logo from "../../public/images/logo.png";
// 로고 호버 이미지 import: public/images/logo_hover.png 파일에서 호버 로고 이미지 가져오기
import logoHover from "../../public/images/logo_hover.png";
// data.json import: utils/data.json 파일에서 질문 데이터 가져오기
import data from "@/utils/data.json";

// Home 컴포넌트 정의: 메인 페이지
export default function Home() {
  // useRouter Hook 사용: 페이지 이동 및 라우팅 관련 기능 사용
  const router = useRouter();
  // isHovered 상태 변수: 로고에 마우스 호버 여부 저장
  const [isHovered, setIsHovered] = useState(false);

  // handleStartClick 함수 정의: "시작하기" 버튼 클릭 시 호출
  const handleStartClick = () => {
    // data.json 파일에서 첫 번째 질문 정보 가져오기
    const firstQuestion = data.questions[0];
    // 첫 번째 질문 정보가 존재하면
    if (firstQuestion) {
      // router.push: 첫 번째 질문 페이지로 이동
      router.push(`/question/${firstQuestion.id}`);
    }
  };

  // handleLogoClick 함수 정의: 로고 클릭 시 호출
  const handleLogoClick = () => {
    // router.reload: 현재 페이지 새로고침
    router.reload();
  };

  return (
    // React Fragment: 불필요한 div 추가 없이 여러 요소를 감싸기 위해 사용
    <>
      {/* Head 컴포넌트: HTML 문서의 <head> 요소 수정 */}
      <Head>
        {/* title: 웹 페이지 제목 */}
        <title>냥생뭐였니</title>
        {/* meta name="description": 웹 페이지 설명 */}
        <meta name="description" content="냥생뭐였니 메인 페이지" />
        {/* link rel="icon": 파비콘 설정 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* div: 페이지 레이아웃 설정 */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100">
        {/* div: 로고 이미지 컨테이너 */}
        <div
          // onMouseEnter: 마우스 포인터가 로고 위로 올라갈 때
          onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave: 마우스 포인터가 로고에서 벗어날 때
          onMouseLeave={() => setIsHovered(false)}
          // onClick: 로고 클릭 시
          onClick={handleLogoClick}
          // 스타일: 로고에 마우스 포인터 표시
          style={{ cursor: "pointer" }}
        >
          {/* Image 컴포넌트: 이미지 최적화하여 로고 출력 */}
          <Image
            // src: isHovered 상태에 따라 일반 로고 또는 호버 로고 표시
            src={isHovered ? logoHover : logo}
            // alt: 로고 이미지 설명
            alt="냥생뭐였니 로고"
            // width: 이미지 너비
            width={150}
            // height: 이미지 높이
            height={150}
            // className: 스타일 정의 (마진, 전환 효과)
            className="mb-4 transition-all duration-300"
            // priority: 이미지 로딩 우선순위 높임 (LCP 최적화)
            priority
            // style: 이미지 크기 조정 (반응형)
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        {/* h1: 페이지 제목 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          나의 냥이는 어떤 생이었을까?
        </h1>
        {/* p: 페이지 설명 */}
        <p className="text-gray-600 mb-8 text-center px-4">
          우리 냥이의 성향을 분석하여 전생, 환생, 그리고 인간형 모습을
          알아볼까요?
        </p>
        {/* button: "시작하기" 버튼 */}
        <button
          // className: 버튼 스타일 정의
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          // onClick: 버튼 클릭 시 handleStartClick 함수 호출
          onClick={handleStartClick}
        >
          시작하기
        </button>
      </div>
    </>
  );
}
