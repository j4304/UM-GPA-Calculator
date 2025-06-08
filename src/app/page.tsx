"use client";

import SubjectForm from "../components/subject-form";

export default function Home() {
  return (
    <div>
      <div className="mx-auto py-4">
        Enter your subjects, grades, and units below to get your accurate GPA
        based on the University of Mindanao’s official grading system.
      </div>

      <SubjectForm />
    </div>
  );
}
