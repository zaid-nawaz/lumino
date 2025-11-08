"use client";
import { useState } from "react";

export default function MCQSection({ question_data, nextVideoHref }: any) {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionIndex: number, option: string) => {
    if (submitted) return; // prevent changing after submit
    const selectedLetter = option.trim().charAt(0);
    setSelectedOptions((prev) => ({ ...prev, [questionIndex]: selectedLetter }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        ✨ GenAI Quiz
      </h2>

      <div className="space-y-8">
        {question_data.map((questionitem: any, index: number) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Q{index + 1}. {questionitem.question}
            </h3>

            <div className="space-y-3">
              {questionitem.options.map((option: string, optIndex: number) => {
                const letter = option.trim().charAt(0);
                const isSelected = selectedOptions[index] === letter;
                const isCorrect =
                  submitted && questionitem.answer.trim().charAt(0) === letter;
                const isIncorrect =
                  submitted &&
                  isSelected &&
                  questionitem.answer.trim().charAt(0) !== letter;

                let optionClass = "border-gray-300 hover:border-blue-400 hover:bg-blue-50";
                if (isCorrect) optionClass = "border-green-400 bg-green-50";
                else if (isIncorrect) optionClass = "border-red-400 bg-red-50";
                else if (isSelected) optionClass = "border-blue-400 bg-blue-50";

                return (
                  <label
                    key={optIndex}
                    htmlFor={`${index}-${letter}`}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${optionClass}`}
                  >
                    <input
                      type="radio"
                      id={`${index}-${letter}`}
                      name={`question-${index}`}
                      value={letter}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => handleOptionSelect(index, option)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        ) : (
          <a
            href={nextVideoHref}
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
          >
            Next ▶
          </a>
        )}
      </div>
    </div>
  );
}

