const SPECIALIZATIONS = [
  'Software Development',
  'Cybersecurity',
  'Data Science',
  'IT Management',
];

const DESCRIPTIONS = {
  'Software Development': 'You have strong analytical and problem-solving abilities and a passion for building software solutions.',
  'Cybersecurity': 'You are interested in protecting systems and data, and have a keen sense for security and ethical issues.',
  'Data Science': 'You enjoy working with data, uncovering patterns, and applying statistical and machine learning techniques.',
  'IT Management': 'You are drawn to managing projects, teams, and using technology to improve business outcomes.',
};

const RECOMMENDATIONS = {
  'Software Development': [
    'Pursue software engineering or computer science degrees.',
    'Build projects and contribute to open source.',
    'Learn modern programming languages and frameworks.',
  ],
  'Cybersecurity': [
    'Take cybersecurity courses and certifications.',
    'Participate in CTFs and security competitions.',
    'Stay updated on the latest security trends.',
  ],
  'Data Science': [
    'Study statistics, machine learning, and data analysis.',
    'Work on data projects and competitions (e.g., Kaggle).',
    'Learn Python, R, and data visualization tools.',
  ],
  'IT Management': [
    'Develop leadership and project management skills.',
    'Learn about business processes and IT strategy.',
    'Consider certifications like PMP or ITIL.',
  ],
};

export function getResult(answers) {
  // answers: { q1: 5, q2: 4, ... }
  const scores = {
    'Software Development': 0,
    'Cybersecurity': 0,
    'Data Science': 0,
    'IT Management': 0,
  };
  // Software Development: 1-3, 7-9
  scores['Software Development'] = (
    (Number(answers.q1)||0) + (Number(answers.q2)||0) + (Number(answers.q3)||0) +
    (Number(answers.q7)||0) + (Number(answers.q8)||0) + (Number(answers.q9)||0)
  ) / 6;
  // Cybersecurity: 4-6
  scores['Cybersecurity'] = (
    (Number(answers.q4)||0) + (Number(answers.q5)||0) + (Number(answers.q6)||0)
  ) / 3;
  // Data Science: 16-18
  scores['Data Science'] = (
    (Number(answers.q16)||0) + (Number(answers.q17)||0) + (Number(answers.q18)||0)
  ) / 3;
  // IT Management: 13-15
  scores['IT Management'] = (
    (Number(answers.q13)||0) + (Number(answers.q14)||0) + (Number(answers.q15)||0)
  ) / 3;

  // Find best match
  const bestMatch = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const confidence = Math.round((scores[bestMatch] / 5) * 100);
  return {
    scores,
    bestMatch,
    confidence,
    description: DESCRIPTIONS[bestMatch],
    recommendations: RECOMMENDATIONS[bestMatch],
  };
} 