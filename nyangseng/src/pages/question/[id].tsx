// src/pages/question/[id].tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import data from "@/utils/data.json";
import ProgressBar from "@/components/ProgressBar";
import React from "react";
import Head from "next/head";

// Option 인터페이스 정의: 질문의 선택지를 나타냅니다.
interface Option {
  id: string; // 옵션의 고유 ID
  text: string; // 옵션의 텍스트 내용
  type: string; // 옵션의 타입 (결과 연결에 사용)
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
  // 선택한 타입들을 저장하는 state입니다. 초기값은 빈 배열입니다.
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  // 마지막 질문인지 여부를 저장하는 state입니다.
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  // 결과 확인 버튼 표시 여부를 저장하는 state입니다.
  const [showResultButton, setShowResultButton] = useState(false);
  // 마지막 질문의 선택 여부를 저장하는 state입니다.
  const [lastOptionSelected, setLastOptionSelected] = useState(false);
  // 마지막 질문 텍스트를 저장하는 state입니다.
  // const [lastQuestionText, setLastQuestionText] = useState<string | null>(null); // 제거
  const [questionIndex, setQuestionIndex] = useState<number>(0);

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
      setQuestionIndex(questionIndex + 1);
      // 모든 질문의 총 개수를 구합니다.
      const totalQuestions = data.questions.length;
      // 프로그레스 바의 진행률을 계산합니다.
      const progressPercentage =
        questionIndex === 0 ? 0 : ((questionIndex + 1) / totalQuestions) * 100; // 첫 질문에서 0%
      // 계산된 진행률로 프로그레스 바 상태를 업데이트합니다.
      setProgress(progressPercentage);
      // 현재 질문이 마지막 질문인지 확인하고 state 업데이트
      setIsLastQuestion(Number(id) === totalQuestions);
      // 마지막 질문일 경우 "냥생 뭐였니?" 텍스트로 설정하고, showResultButton, lastOptionSelected 초기화
      // if (Number(id) === totalQuestions) { // 제거
      //     setLastQuestionText("냥생 뭐였니?"); // 제거
      // } else { // 제거
      //     setLastQuestionText(null); // 제거
      // } // 제거
    }
    // 컴포넌트가 unmount 될 때 상태 초기화
    return () => {
      setShowResultButton(false);
      setLastOptionSelected(false);
    };
  }, [id]); // id가 변경될 때마다 useEffect hook을 다시 실행합니다.

  // useEffect hook을 사용하여 currentQuestion이 변경될 때 실행되는 코드를 정의합니다.
  useEffect(() => {
    // currentQuestion이 존재하면 실행합니다.
    if (currentQuestion) {
      // Head 컴포넌트를 사용하여 페이지 title을 업데이트합니다.
      document.title = `냥생뭐했니 - 질문`;
    }
  }, [currentQuestion]); // currentQuestion이 변경될 때마다 useEffect hook을 다시 실행합니다.

  // 옵션 클릭 시 실행되는 핸들러 함수입니다.
  const handleOptionClick = (type: string) => {
    // 선택한 type을 selectedTypes 배열에 추가합니다.
    setSelectedTypes((prevTypes) => [...prevTypes, type]);
    // 마지막 질문일 경우 결과 확인 버튼을 표시하고, 아닐경우 다음 질문으로 이동
    if (Number(id) === data.questions.length) {
      setShowResultButton(true);
      setLastOptionSelected(true); // 마지막 질문의 옵션 선택 여부 true
    } else {
      router.push(`/question/${Number(id) + 1}`);
    }
  };

  // 결과 확인 버튼 클릭 시 실행되는 핸들러 함수입니다.
  const handleResultClick = () => {
    // 마지막 질문일 경우 결과 계산 로직을 수행합니다.
    // data.results 배열에서 selectedTypes의 모든 타입을 포함하는 결과를 찾습니다.
    const result = data.results.find((r) =>
      selectedTypes.every((type) => r.types.includes(type))
    );
    // 결과가 존재하면 결과 페이지로 이동합니다.
    if (result) {
      router.push(`/result/${result.id}`);
    } else {
      // 결과가 없을 경우 예외 결과 페이지로 이동합니다.
      router.push(`/result/result-not-found`);
    }
  };

  // currentQuestion이 null이면 로딩 메시지를 표시합니다.
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  // 현재 질문의 텍스트를 설정하고, 마지막 질문일 경우 lastQuestionText 상태값을 사용합니다.
  const questionText =
    isLastQuestion && showResultButton ? "냥생 뭐였니?" : currentQuestion.text;
  // 현재 질문의 옵션을 추출합니다.
  const { options } = currentQuestion;
  // 전체 질문 수
  const totalQuestions = data.questions.length;

  // 컴포넌트의 UI를 반환합니다.
  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>냥생뭐했니 - 질문</title>
      </Head>
      {/* 프로그레스 바 컴포넌트 */}
      <div className="mb-4 w-[80%]">
        <div className="text-xl font-semibold text-gray-700 mb-2 text-center">
          {questionIndex} / {totalQuestions}
        </div>
        <ProgressBar
          progress={progress}
          isLastQuestion={isLastQuestion && showResultButton}
        />
      </div>
      {/* 질문 텍스트 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {questionText}
      </h1>
      {/* 옵션 버튼들을 감싸는 div */}
      <div className="flex flex-col items-center space-y-2 w-48">
        {/* 마지막 질문의 옵션을 선택하지 않았을 경우 옵션들을 출력 */}
        {!lastOptionSelected &&
          options.map((option: Option) => (
            <button
              key={option.id}
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 break-words"
              style={{ width: "300px" }}
              onClick={() => handleOptionClick(option.type)} // 옵션 클릭 시 핸들러 함수 실행
            >
              {option.text}
            </button>
          ))}
      </div>
      {/* 마지막 질문이고 showResultButton이 true일 경우 결과 확인 버튼을 표시 */}
      {isLastQuestion && showResultButton && (
        <button
          onClick={handleResultClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 mt-4"
          style={{ width: "300px" }}
        >
          결과 확인하러 가기
        </button>
      )}
    </div>
  );
};

// QuestionPage 컴포넌트를 export합니다.
export default QuestionPage;
