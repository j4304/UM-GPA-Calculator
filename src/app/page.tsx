"use client";

import { LatinTable } from "@/components/latin-table";
import SubjectForm from "../components/subject-form";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-center">
      <h1 className="text-4xl font-extrabold mb-6 leading-tight">
        Instant, Accurate GPA & Latin Honors Insights for UM Students
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-xl mx-auto">
        Powered by the University of Mindanao grading system, this tool helps
        you track your GPA and see if you qualify for Latin honors—fast and
        easy.
      </p>

      <SubjectForm />

      <LatinTable />

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 max-w-md mx-auto">
        Have feedback or spotted an issue? We&apos;d love to hear from you!{" "}
        <a
          href="https://forms.gle/E5Y6zC6yHVTGZUQF6"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          Share your thoughts here.
        </a>
      </p>
    </main>
  );
}
