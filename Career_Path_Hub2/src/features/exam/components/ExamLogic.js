/**
 * Checks if all required questions are answered.
 * @param {Array} questions - Array of question objects with 'name' property.
 * @param {Object} answers - Object with question names as keys.
 * @returns {boolean}
 */
export function validateAnswers(questions, answers) {
  return questions.every(q => answers[q.name] !== undefined && answers[q.name] !== null && answers[q.name] !== '');
}

/**
 * Returns the questions for the current part.
 * @param {Array} questions - All questions for the model.
 * @param {number} currentPart - Current part index (0-based).
 * @param {number} questionsPerPart - Number of questions per part.
 * @returns {Array}
 */
export function getCurrentQuestions(questions, currentPart, questionsPerPart) {
  const start = currentPart * questionsPerPart;
  const end = start + questionsPerPart;
  return questions.slice(start, end);
}

/**
 * Returns the progress percentage.
 * @param {number} currentPart - Current part index (0-based).
 * @param {number} totalParts - Total number of parts.
 * @returns {number}
 */
export function getProgress(currentPart, totalParts) {
  return ((currentPart + 1) / totalParts) * 100;
} 