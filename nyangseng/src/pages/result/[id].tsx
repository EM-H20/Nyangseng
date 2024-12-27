// src/pages/result/[id].tsx

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import data from "@/utils/data.json";

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
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cornerRadius = 15;
  const footerText = "냥생뭐였니"; // Footer 문구 추가
  const logoUrl = "/images/logo.png"; // 로고 이미지 경로

  useEffect(() => {
    if (id) {
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

  const handleSaveImage = () => {
    if (imageRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = image;

      img.onload = () => {
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

        const maxTextHeight = 3 * lineHeight;

        const calculatedTextHeight =
          lineHeight * (description.length / (textWidth / 15));
        const textHeight = Math.min(calculatedTextHeight, maxTextHeight);

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

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // 둥근 사각형 그리기
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

        ctx!.save();
        ctx!.clip();
        ctx?.drawImage(img, padding, padding);
        ctx!.restore();

        ctx!.font = `bold ${fontSize}px sans-serif`;
        ctx!.fillStyle = "black";

        // Wrap the description text
        const wrapText = (
          text: string,
          x: number,
          y: number,
          maxWidth: number,
          lineHeight: number
        ) => {
          const words = text.split(" ");
          let line = "";
          let testLine = "";
          let currentY = y;
          for (let word of words) {
            testLine = line + word + " ";
            const metrics = ctx!.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth - padding * 2 && line.length > 0) {
              const lineMetrics = ctx!.measureText(line);
              const lineX = x + (maxWidth - lineMetrics.width) / 2;
              ctx!.fillText(line, lineX, currentY);
              line = word + " ";
              currentY += lineHeight;
            } else {
              line = testLine;
            }
          }
          const metrics = ctx!.measureText(line);
          const lineX = x + (maxWidth - metrics.width) / 2;
          ctx!.fillText(line, lineX, currentY);
          return currentY + lineHeight;
        };

        const titleMetrics = ctx!.measureText(title);
        const titleX = (canvasWidth - titleMetrics.width) / 2;
        const textStartY =
          img.height +
          padding * 2 +
          lineHeight +
          imageBottomMargin +
          titleBottomMargin;
        ctx!.fillText(
          title,
          titleX,
          textStartY - lineHeight - titleBottomMargin
        );

        ctx!.font = `${fontSize * 0.6}px sans-serif`;
        const descriptionStartY = textStartY + titleDescriptionMargin;
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
        logoImg.onload = () => {
          ctx!.drawImage(
            logoImg,
            footerX,
            footerY - footerLogoSize / 2,
            footerLogoSize,
            footerLogoSize
          );
          // Footer 문구 추가
          ctx!.font = `${footerTextSize}px sans-serif`;
          ctx!.fillStyle = "black";
          ctx!.fillText(
            footerText,
            footerX + footerLogoSize + 5,
            footerY + footerTextSize / 2 - 5
          );

          const dataURL = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = dataURL;
          downloadLink.download = `${title}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        };
        logoImg.onerror = () => {
          alert("로고 이미지 로드 실패");
        };
      };

      img.onerror = () => {
        alert("이미지 로드 실패");
      };
    } else {
      alert("저장할 이미지를 찾을 수 없습니다.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        alert("공유하기가 취소되었거나 오류가 발생했습니다.");
      }
    } else {
      alert("현재 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover rounded-t-xl mb-4"
          ref={imageRef}
        />
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="mt-4 flex justify-center space-x-2 px-6 py-2">
          <button
            onClick={handleShare}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            공유하기
          </button>
          <button
            onClick={() => router.push("/question/1")}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            다시하기
          </button>
          <button
            onClick={handleSaveImage}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            결과저장
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
