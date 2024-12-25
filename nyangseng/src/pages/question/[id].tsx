// src/pages/question/[id].tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import data from "@/utils/data.json";
import ProgressBar from "@/components/ProgressBar";
import React from "react";

interface Option {
  id: string;
  text: string;
  next?: number;
  result?: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (id) {
      const question = data.questions.find(
        (q) => q.id === Number(id)
      ) as Question;
      setCurrentQuestion(question);

      const questionIndex = data.questions.findIndex(
        (q) => q.id === Number(id)
      );
      const totalQuestions = data.questions.filter((q) => !q.result).length;
      const isLastQuestion =
        question && question.options.some((option) => option.result);

      if (isLastQuestion) {
        setProgress(100); // 마지막 질문이면 프로그레스 바 100%
      } else {
        const progressPercentage = ((questionIndex + 1) / totalQuestions) * 100;
        setProgress(progressPercentage);
      }
    }
  }, [id]);

  const handleOptionClick = (
    next: number | undefined,
    result: string | undefined
  ) => {
    if (result) {
      router.push(`/result/${result}`);
    } else if (next) {
      router.push(`/question/${next}`);
    }
  };
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }
  const { text, options } = currentQuestion;
  const isLastQuestion = options.some((option) => option.result);
  return (
    <div className="bg-sky-100 min-h-screen flex flex-col items-center justify-center">
      <ProgressBar progress={progress} />
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {text}
      </h1>
      <div className="flex flex-col items-center space-y-2 w-48">
        {options.map((option: Option) => (
          <button
            key={option.id}
            className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ${
              isLastQuestion ? "mt-8 py-3 px-6" : ""
            }`}
            onClick={() => handleOptionClick(option.next, option.result)}
          >
            {isLastQuestion ? "결과 확인하러 가기" : option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
