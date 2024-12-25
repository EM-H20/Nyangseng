// src/pages/question/[id].tsx

// React hooks와 컴포넌트들을 import합니다.
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import data from "@/utils/data.json";
import ProgressBar from "@/components/ProgressBar";
import React from "react";

// Option 인터페이스 정의: 질문의 선택지를 나타냅니다.
interface Option {
  id: string; // 옵션의 고유 ID
  text: string; // 옵션의 텍스트 내용
  next?: number; // 다음 질문의 ID (선택 사항)
  result?: string; // 결과를 나타내는 문자열 (선택 사항)
}

// Question 인터페이스 정의: 질문을 나타냅니다.
interface Question {
  id: number; // 질문의 고유 ID
  text: string; // 질문의 텍스트 내용
  options: Option[]; // 질문의 선택지 배열
}

// QuestionPage 컴포넌트: 질문 페이지를 담당하는 React 컴포넌트입니다.
const QuestionPage: React.FC = () => {
  // useRouter hook을 사용하여 next/router 객체를 가져옵니다.
  const router = useRouter();
  // router.query에서 질문 ID를 가져옵니다.
  const { id } = router.query;
  // 현재 질문 상태를 저장하는 state입니다. 초기값은 null입니다.
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  // 프로그레스 바의 진행률을 저장하는 state입니다. 초기값은 0입니다.
  const [progress, setProgress] = useState(0);

  // useEffect hook을 사용하여 컴포넌트가 마운트되거나 id가 변경될 때 실행되는 코드를 정의합니다.
  useEffect(() => {
    // id가 존재하면 실행합니다.
    if (id) {
      // data.questions 배열에서 현재 id와 일치하는 질문을 찾습니다.
      const question = data.questions.find(
        (q) => q.id === Number(id)
      ) as Question;
      // 찾은 질문으로 currentQuestion 상태를 업데이트합니다.
      setCurrentQuestion(question);

      // 현재 질문의 인덱스를 찾습니다.
      const questionIndex = data.questions.findIndex(
        (q) => q.id === Number(id)
      );
      // 결과 페이지로 넘어가지 않는 질문의 총 개수를 계산합니다.
      const totalQuestions = data.questions.filter((q) => !q.result).length;
      // 현재 질문이 마지막 질문인지 확인합니다.
      const isLastQuestion =
        question && question.options.some((option) => option.result);

      // 만약 현재 질문이 마지막 질문이라면,
      if (isLastQuestion) {
        setProgress(100); // 프로그레스 바를 100%로 설정합니다.
      } else {
        // 프로그레스 바의 진행률을 계산합니다.
        const progressPercentage = ((questionIndex + 1) / totalQuestions) * 100;
        // 계산된 진행률로 프로그레스 바 상태를 업데이트합니다.
        setProgress(progressPercentage);
      }
    }
  }, [id]); // id가 변경될 때마다 useEffect hook을 다시 실행합니다.

  // 옵션 클릭 시 실행되는 핸들러 함수입니다.
  const handleOptionClick = (
    next: number | undefined, // 다음 질문의 ID (선택 사항)
    result: string | undefined // 결과를 나타내는 문자열 (선택 사항)
  ) => {
    // 만약 result가 존재한다면,
    if (result) {
      router.push(`/result/${result}`); // 결과 페이지로 이동합니다.
    } else if (next) {
      // 만약 next가 존재한다면, 다음 질문 페이지로 이동합니다.
      router.push(`/question/${next}`);
    }
  };

  // currentQuestion이 null이면 로딩 메시지를 표시합니다.
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }
  // 현재 질문의 텍스트와 옵션을 추출합니다.
  const { text, options } = currentQuestion;
  // 현재 질문이 마지막 질문인지 확인합니다.
  const isLastQuestion = options.some((option) => option.result);

  // 컴포넌트의 UI를 반환합니다.
  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center">
      {/* 프로그레스 바 컴포넌트 */}
      <ProgressBar progress={progress} />
      {/* 질문 텍스트 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {text}
      </h1>
      {/* 옵션 버튼들을 감싸는 div */}
      <div className="flex flex-col items-center space-y-2 w-48">
        {/* 옵션들을 map 함수를 사용하여 반복하여 출력합니다. */}
        {options.map((option: Option) => (
          <button
            key={option.id} // 각 버튼에 고유한 key를 제공합니다.
            className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${
              isLastQuestion ? "mt-8 py-3 px-6" : "" // 마지막 질문일 경우 스타일 변경
            }`}
            onClick={() => handleOptionClick(option.next, option.result)} // 옵션 클릭 시 핸들러 함수 실행
          >
            {isLastQuestion ? "결과 확인하러 가기" : option.text}{" "}
            {/* 마지막 질문일 경우 버튼 텍스트 변경 */}
          </button>
        ))}
      </div>
    </div>
  );
};

// QuestionPage 컴포넌트를 export합니다.
export default QuestionPage;
