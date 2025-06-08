"use client";

import SubjectForm from "../components/subject-form";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4 leading-snug">
        Accurate, Instant GPA Insights for UM Students
      </h1>
      <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
        Powered by the official University of Mindanao grading system — so you
        can track your academic progress with confidence and ease.
      </p>

      <SubjectForm />

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-10">
        Got thoughts, suggestions or found a bug? We&apos;d love to hear from
        you!{" "}
        <a
          href="https://forms.gle/E5Y6zC6yHVTGZUQF6"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Fill out this quick feedback form.
        </a>
      </p>
    </div>
  );
}
