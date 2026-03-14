/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Validation
  if (!student || typeof student !== "object") return null;

  const { name, marks } = student;

  if (typeof name !== "string" || name.trim() === "") return null;
  if (!marks || typeof marks !== "object") return null;

  const entries = Object.entries(marks);
  if (entries.length === 0) return null;

  for (const [, value] of entries) {
    if (typeof value !== "number" || value < 0 || value > 100) {
      return null;
    }
  }

  const subjectCount = entries.length;
  const totalMarks = entries.reduce((sum, [, value]) => sum + value, 0);

  const percentageRaw = (totalMarks / (subjectCount * 100)) * 100;
  const percentage = parseFloat(percentageRaw.toFixed(2));

  let grade;
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 40) grade = "D";
  else grade = "F";

  let [firstSubject, firstMark] = entries[0];
  let highestSubject = firstSubject;
  let lowestSubject = firstSubject;
  let highestMark = firstMark;
  let lowestMark = firstMark;

  for (const [subject, mark] of entries) {
    if (mark > highestMark) {
      highestMark = mark;
      highestSubject = subject;
    }
    if (mark < lowestMark) {
      lowestMark = mark;
      lowestSubject = subject;
    }
  }

  const passedSubjects = entries
    .filter(([, mark]) => mark >= 40)
    .map(([subject]) => subject);

  const failedSubjects = entries
    .filter(([, mark]) => mark < 40)
    .map(([subject]) => subject);

  return {
    name,
    totalMarks,
    percentage,
    grade,
    highestSubject,
    lowestSubject,
    passedSubjects,
    failedSubjects,
    subjectCount,
  };
}
