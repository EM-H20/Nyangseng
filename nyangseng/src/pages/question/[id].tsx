// src/pages/question/[id].tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import data from "@/utils/data.json";
import ProgressBar from "@/components/ProgressBar";
import React from "react";
import Head from "next/head";

interface Option {
  id: string;
  text: string;
  type?: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Result {
  id: string;
  title: string;
  description: string;
  image: string;
  types: string[];
}

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);
  const [lastOptionSelected, setLastOptionSelected] = useState(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const question = data.questions.find(
        (q) => q.id === Number(id)
      ) as Question;
      setCurrentQuestion(question);
      const questionIndex = data.questions.findIndex(
        (q) => q.id === Number(id)
      );
      setQuestionIndex(questionIndex + 1);
      const totalQuestions = data.questions.length;
      const progressPercentage =
        questionIndex === 0 ? 0 : ((questionIndex + 1) / totalQuestions) * 100;
      setProgress(progressPercentage);
      setIsLastQuestion(Number(id) === totalQuestions);
      setIsPageLoaded(true);
    }
    return () => {
      setShowResultButton(false);
      setLastOptionSelected(false);
    };
  }, [id]);

  useEffect(() => {
    if (currentQuestion) {
      document.title = `냥생뭐했니 - 질문`;
    }
  }, [currentQuestion]);

  useEffect(() => {
    const handlePopstate = () => {
      router.replace("/");
    };
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [router]);

  useEffect(() => {
    if (isPageLoaded) {
      const handleBeforeunload = () => {
        sessionStorage.setItem("reloaded", "true");
      };

      window.addEventListener("beforeunload", handleBeforeunload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeunload);
      };
    }
  }, [isPageLoaded]);

  useEffect(() => {
    if (sessionStorage.getItem("reloaded") === "true") {
      router.replace("/");
      sessionStorage.removeItem("reloaded");
    }
  }, [router]);

  const handleOptionClick = (type: string) => {
    setSelectedTypes((prevTypes) => [...prevTypes, type]);

    if (Number(id) === data.questions.length) {
      setShowResultButton(true);
      setLastOptionSelected(true);
    } else {
      history.pushState(null, "", `/question/${Number(id) + 1}`);
      router.push(`/question/${Number(id) + 1}`);
    }
  };

  const handleResultClick = () => {
    const minMatchingTypes = 6; // 최소 일치 타입 개수 설정

    // 일치하는 타입 개수를 세는 함수
    const countMatchingTypes = (resultTypes: string[]) => {
      return selectedTypes.filter((type) => resultTypes.includes(type)).length;
    };

    // 최소 일치 개수를 만족하는 결과 필터링
    const matchingResults = data.results.filter((result: Result) => {
      return countMatchingTypes(result.types) >= minMatchingTypes;
    });

    if (matchingResults.length > 0) {
      // 일치하는 타입 개수가 많은 순서대로 정렬, 개수가 같으면 id가 작은순으로 정렬
      matchingResults.sort((a, b) => {
        const aMatchingCount = countMatchingTypes(a.types);
        const bMatchingCount = countMatchingTypes(b.types);
        if (aMatchingCount !== bMatchingCount) {
          return bMatchingCount - aMatchingCount;
        }
        return (
          Number(a.id.replace("result", "")) -
          Number(b.id.replace("result", ""))
        );
      });
      const bestResult = matchingResults[0];
      history.pushState(null, "", `/result/${bestResult.id}`);
      router.push(`/result/${bestResult.id}`);
    } else {
      history.pushState(null, "", `/result/result-not-found`);
      router.push(`/result/result-not-found`);
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const questionText =
    isLastQuestion && showResultButton ? "냥생 뭐였니?" : currentQuestion.text;
  const { options } = currentQuestion;
  const totalQuestions = data.questions.length;

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>냥생뭐했니 - 질문</title>
      </Head>
      <div className="mb-4 w-[80%]">
        <div className="text-xl font-semibold text-gray-700 mb-2 text-center">
          {questionIndex} / {totalQuestions}
        </div>
        <ProgressBar
          progress={progress}
          isLastQuestion={isLastQuestion && showResultButton}
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {questionText}
      </h1>
      <div className="flex flex-col items-center space-y-2 w-48">
        {!lastOptionSelected &&
          options.map((option: Option) => (
            <button
              key={option.id}
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 break-words"
              style={{ width: "300px" }}
              onClick={() => handleOptionClick(option.type ?? "")}
            >
              {option.text}
            </button>
          ))}
      </div>
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

export default QuestionPage;
