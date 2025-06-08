"use client";

import SubjectForm from "../components/subject-form";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4 leading-snug">
        Accurate, Instant GPA Insights for UM Students
      </h1>
      <p className="text-base text-gray-600 mb-8">
        Powered by the official University of Mindanao grading system — so you
        can track your academic progress with confidence and ease.
      </p>

      <SubjectForm />
    </div>
  );
}
