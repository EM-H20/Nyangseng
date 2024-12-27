// src/pages/result/[id].tsx

import { useState, useEffect, useRef } from "react"; // React 훅 import
import { useRouter } from "next/router"; // Next.js 라우터 import
import data from "@/utils/data.json"; // 데이터 파일 import

// 결과 데이터 타입 정의
interface Result {
  id: string; // 결과 ID
  title: string; // 결과 제목
  description: string; // 결과 설명
  image: string; // 결과 이미지 URL
  types: string[]; // 결과 타입 (현재 사용하지 않음)
}

// 결과 페이지 컴포넌트
const ResultPage = () => {
  const router = useRouter(); // Next.js 라우터 인스턴스
  const { id } = router.query; // URL에서 id 추출
  const [currentResult, setCurrentResult] = useState<Result | null>(null); // 현재 결과 상태 변수
  const imageRef = useRef<HTMLImageElement | null>(null); // 이미지 참조 변수
  const cornerRadius = 15; // 캔버스 테두리 둥글기 값
  const footerText = "냥생뭐였니"; // Footer 문구 추가
  const logoUrl = "/images/logo.png"; // 로고 이미지 경로

  // 컴포넌트가 마운트될 때 실행되는 useEffect 훅
  useEffect(() => {
    // id 값이 존재하는 경우
    if (id) {
      // 데이터 파일에서 현재 id에 해당하는 결과 찾기
      const result = data.results.find((result) => result.id === id);
      // 찾은 결과를 현재 결과 상태로 설정
      setCurrentResult(
        result || // 결과가 존재하면 해당 결과 설정
          data.results.find((result) => result.id === "result-not-found") || // 결과가 없으면 "result-not-found" 결과 설정 (예외처리)
          null // 결과가 없으면 null 설정
      );
    }
  }, [id]); // id 값이 변경될 때마다 실행

  // 결과 데이터가 없는 경우 로딩 화면 표시
  if (!currentResult) {
    return <div>Loading...</div>;
  }

  const { title, description, image } = currentResult; // 현재 결과에서 제목, 설명, 이미지 URL 추출

  // 이미지 저장 함수
  const handleSaveImage = () => {
    if (imageRef.current) {
      // 이미지 참조가 존재하는 경우
      const canvas = document.createElement("canvas"); // 캔버스 엘리먼트 생성
      const ctx = canvas.getContext("2d"); // 캔버스 컨텍스트 가져오기
      const img = new Image(); // 이미지 객체 생성
      img.src = image; // 이미지 객체에 이미지 URL 설정

      // 이미지 로드 완료 후 실행
      img.onload = () => {
        // 이미지, 텍스트, 푸터 영역 패딩 및 간격 설정
        const padding = 5;
        const fontSize = 60;
        const lineHeight = fontSize * 1.2;
        const textWidth = 400;
        const imageBottomMargin = 170;
        const canvasHeightReduceRatio = 0.3;
        const titleDescriptionMargin = 50;
        const titleBottomMargin = 15;
        const footerHeight = 80;
        const footerLogoSize = 50;
        const footerTextSize = 30;

        const maxTextHeight = 3 * lineHeight; // 최대 텍스트 높이

        // 텍스트 높이 계산
        const calculatedTextHeight =
          lineHeight * (description.length / (textWidth / 15));
        const textHeight = Math.min(calculatedTextHeight, maxTextHeight);

        // 캔버스 가로, 세로 크기 계산
        const canvasWidth = Math.max(img.width, textWidth) + padding * 2;
        const originalCanvasHeight =
          img.height +
          textHeight +
          padding * 4 +
          lineHeight * 15 +
          imageBottomMargin +
          titleDescriptionMargin +
          titleBottomMargin +
          footerHeight;

        const canvasHeight =
          originalCanvasHeight * (1 - canvasHeightReduceRatio);

        canvas.width = canvasWidth; // 캔버스 가로 크기 설정
        canvas.height = canvasHeight; // 캔버스 세로 크기 설정

        // 캔버스에 흰색 배경 둥근 사각형 그리기
        ctx!.fillStyle = "white";
        ctx!.beginPath();
        ctx!.moveTo(padding + cornerRadius, padding);
        ctx!.lineTo(canvasWidth - padding - cornerRadius, padding);
        ctx!.quadraticCurveTo(
          canvasWidth - padding,
          padding,
          canvasWidth - padding,
          padding + cornerRadius
        );
        ctx!.lineTo(
          canvasWidth - padding,
          canvasHeight - padding - cornerRadius
        );
        ctx!.quadraticCurveTo(
          canvasWidth - padding,
          canvasHeight - padding,
          canvasWidth - padding - cornerRadius,
          canvasHeight - padding
        );
        ctx!.lineTo(padding + cornerRadius, canvasHeight - padding);
        ctx!.quadraticCurveTo(
          padding,
          canvasHeight - padding,
          padding,
          canvasHeight - padding - cornerRadius
        );
        ctx!.lineTo(padding, padding + cornerRadius);
        ctx!.quadraticCurveTo(
          padding,
          padding,
          padding + cornerRadius,
          padding
        );
        ctx!.closePath();
        ctx!.fill();

        // 캔버스에 이미지 그리기
        ctx!.save();
        ctx!.clip();
        ctx?.drawImage(img, padding, padding);
        ctx!.restore();

        ctx!.font = `bold ${fontSize}px sans-serif`; // 텍스트 폰트 설정
        ctx!.fillStyle = "black"; // 텍스트 색상 설정

        // 텍스트 줄바꿈 함수
        const wrapText = (
          text: string,
          x: number,
          y: number,
          maxWidth: number,
          lineHeight: number
        ) => {
          const words = text.split(" "); // 텍스트 단어 단위로 나누기
          let line = ""; // 현재 라인 텍스트 저장 변수
          let testLine = ""; // 테스트 라인 저장 변수
          let currentY = y; // 현재 Y 좌표
          // 단어들을 순회하며 텍스트 출력
          for (let word of words) {
            testLine = line + word + " "; // 현재 라인에 단어 추가
            const metrics = ctx!.measureText(testLine); // 테스트 라인 너비 측정
            const testWidth = metrics.width; // 테스트 라인 너비
            // 라인 너비가 최대 너비보다 크면 줄바꿈
            if (testWidth > maxWidth - padding * 2 && line.length > 0) {
              const lineMetrics = ctx!.measureText(line);
              const lineX = x + (maxWidth - lineMetrics.width) / 2; // 텍스트를 가운데 정렬
              ctx!.fillText(line, lineX, currentY); // 텍스트 출력
              line = word + " "; // 다음 라인 텍스트 초기화
              currentY += lineHeight; // Y 좌표 증가
            } else {
              line = testLine; // 다음 라인 텍스트 업데이트
            }
          }
          // 마지막 라인 출력
          const metrics = ctx!.measureText(line);
          const lineX = x + (maxWidth - metrics.width) / 2;
          ctx!.fillText(line, lineX, currentY);
          return currentY + lineHeight;
        };

        // 제목 가운데 정렬 계산
        const titleMetrics = ctx!.measureText(title);
        const titleX = (canvasWidth - titleMetrics.width) / 2;
        const textStartY =
          img.height +
          padding * 2 +
          lineHeight +
          imageBottomMargin +
          titleBottomMargin;
        // 제목 출력
        ctx!.fillText(
          title,
          titleX,
          textStartY - lineHeight - titleBottomMargin
        );

        ctx!.font = `${fontSize * 0.6}px sans-serif`; // 설명 폰트 크기 설정
        const descriptionStartY = textStartY + titleDescriptionMargin;
        // 설명 출력 (줄바꿈 처리)
        wrapText(
          description,
          (canvasWidth - textWidth) / 2,
          descriptionStartY,
          textWidth,
          lineHeight
        );

        // Footer 영역 설정
        const footerY = canvasHeight - padding - footerHeight / 2; // 푸터 세로 위치 계산
        const footerTextMetrics = ctx!.measureText(footerText); // 푸터 텍스트 너비 측정
        const combinedWidth = footerLogoSize + 5 + footerTextMetrics.width; // 로고 + 텍스트 너비 계산
        const footerX = canvasWidth - padding - combinedWidth; // 푸터 가로 우측 위치 계산 (수정)
        // 로고 이미지 추가
        const logoImg = new Image();
        logoImg.src = logoUrl;
        // 로고 이미지 로드 완료 후 실행
        logoImg.onload = () => {
          // 로고 이미지 캔버스에 그리기
          ctx!.drawImage(
            logoImg,
            footerX,
            footerY - footerLogoSize / 2,
            footerLogoSize,
            footerLogoSize
          );
          // 푸터 문구 출력
          ctx!.font = `${footerTextSize}px sans-serif`;
          ctx!.fillStyle = "black";
          ctx!.fillText(
            footerText,
            footerX + footerLogoSize + 5,
            footerY + footerTextSize / 2 - 5
          );

          const dataURL = canvas.toDataURL("image/png"); // 캔버스 데이터 URL로 변환
          const downloadLink = document.createElement("a"); // 다운로드 링크 생성
          downloadLink.href = dataURL; // 다운로드 링크에 이미지 데이터 URL 설정
          downloadLink.download = `${title}.png`; // 다운로드 파일 이름 설정
          document.body.appendChild(downloadLink); // 다운로드 링크 추가
          downloadLink.click(); // 다운로드 링크 클릭
          document.body.removeChild(downloadLink); // 다운로드 링크 제거
        };
        // 로고 이미지 로드 실패 처리
        logoImg.onerror = () => {
          alert("로고 이미지 로드 실패");
        };
      };
      // 이미지 로드 실패 처리
      img.onerror = () => {
        alert("이미지 로드 실패");
      };
    } else {
      // 저장할 이미지 참조를 찾을 수 없을 경우
      alert("저장할 이미지를 찾을 수 없습니다.");
    }
  };

  // 공유 기능 함수
  const handleShare = async () => {
    if (navigator.share) {
      // 공유 기능 지원 여부 확인
      try {
        await navigator.share({
          // 공유 API 호출
          title: title,
          text: description,
          url: window.location.href, // 현재 페이지 URL
        });
      } catch (error) {
        // 공유 오류 발생 시 처리
        console.error("Error sharing:", error);
        alert("공유하기가 취소되었거나 오류가 발생했습니다.");
      }
    } else {
      // 공유 기능 미지원 시 알림
      alert("현재 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };

  // 결과 페이지 UI 반환
  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center text-center">
      {/* 결과 카드 */}
      <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {/* 결과 이미지 */}
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover rounded-t-xl mb-4"
          ref={imageRef} // 이미지 참조 설정
        />
        {/* 결과 제목 및 설명 */}
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-700">{description}</p>
        </div>
        {/* 버튼 컨테이너 */}
        <div className="mt-4 flex justify-center space-x-2 px-6 py-2">
          {/* 다시 하기 버튼 */}
          <button
            onClick={() => router.push("/question/1")}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            다시 하기
          </button>
          {/* 공유하기 버튼 */}
          <button
            onClick={handleShare}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            공유하기
          </button>
          {/* 결과 저장 버튼 */}
          <button
            onClick={handleSaveImage}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            결과 저장
          </button>
        </div>
        {/* 히든 냥이 페이지 버튼 */}
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
