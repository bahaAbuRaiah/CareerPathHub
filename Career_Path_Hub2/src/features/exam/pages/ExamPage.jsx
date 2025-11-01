import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ModelSelector from '../components/ModelSelector';
import ProgressBar from '../components/ProgressBar';
import QuestionStepper from '../components/QuestionStepper';

// Model 1 questions
const model1Questions = [
  { text: 'Do you have experience or a strong interest in mathematics, such as algebra and calculus?', name: 'q1' },
  { text: 'Have you engaged in activities that require critical thinking and problem-solving, such as programming or robotics competitions?', name: 'q2' },
  { text: 'Are you comfortable working with technology, and do you have any basic programming or computer hardware skills?', name: 'q3' },
  { text: 'I am excited to understand how firewalls and intrusion detection systems work and their impact', name: 'q4' },
  { text: 'I find topics like data encryption and defending against electronic attacks interesting and look forward to learning more about them.', name: 'q5' },
  { text: 'I believe that a deep understanding of ethical issues related to data protection and surveillance is essential for professionals in this field.', name: 'q6' },
  { text: 'I believe that understanding and applying fundamental principles of good architectural design aids in creating more stable and efficient applications.', name: 'q7' },
  { text: 'I see that paying attention to the details of tests conducted on different parts of the application is integral to achieving high quality.', name: 'q8' },
  { text: 'I consider the memorization and deep understanding of theoretical aspects in software engineering to be stimulating rather than boring.', name: 'q9' },
  { text: 'The idea of developing technical solutions that help individuals and organizations achieve their goals excites me.', name: 'q10' },
  { text: 'I am interested in learning how data analysis can reveal important patterns that might affect operational and strategic performance of organizations.', name: 'q11' },
  { text: 'I enjoy the challenge that comes with managing system integration projects that affect various departments within an organization.', name: 'q12' },
  { text: 'I find working on designing and implementing IT solutions that improve operational efficiency for businesses exciting and rewarding.', name: 'q13' },
  { text: 'I am curious to explore how decision support systems can help companies make more effective strategic decisions.', name: 'q14' },
  { text: 'I am eager to learn how to use data to analyze performance and predict market trends to enhance business decisions.', name: 'q15' },
  { text: 'I am captivated by how robots can learn from experiences and improve over time, and I am eager to delve deeper into machine learning techniques.', name: 'q16' },
  { text: 'I find joy in using statistical methods to analyze data and uncover hidden patterns that help in decision-making.', name: 'q17' },
  { text: 'It is crucial for me to consider the societal impacts, such as privacy and fairness, when developing new technologies.', name: 'q18' },
];

// Model 2 questions (real, from HTML)
const model2Questions = [
  { text: 'If given a complex mathematical problem, how confident are you in your ability to solve it using logical reasoning?', name: 'q1' },
  { text: 'When faced with a challenging technical task, how do you approach breaking it down into manageable parts?', name: 'q2' },
  { text: 'Can you describe an instance where you successfully used technology to solve a problem or create something new?', name: 'q3' },
  { text: 'The challenges of data protection in environments like the cloud and enterprise networks particularly interest me.', name: 'q4' },
  { text: 'I am curious to learn how technologies like encryption and digital signatures can help secure communications and transactions.', name: 'q5' },
  { text: 'I consider it a duty of technology professionals to think about how protection technologies impact individual rights.', name: 'q6' },
  { text: 'I believe that logically distributing functions and services within an application makes the programming process smoother and maintenance easier.', name: 'q7' },
  { text: 'I believe that delivering a flawless product requires meticulously testing each component of the application independently before integrating them.', name: 'q8' },
  { text: 'I find theoretical subjects in software engineering to be more tedious than interesting, and prefer more hands-on or practical learning.', name: 'q9' },
  { text: 'I am excited to contribute to the development of systems that enhance efficiency and address key challenges in workplace environments.', name: 'q10' },
  { text: 'I want to learn how to use data analysis techniques to improve user experience and internal processes of organizations.', name: 'q11' },
  { text: 'I am interested in taking on the responsibility of large technical projects involving strategic planning and effective execution.', name: 'q12' },
  { text: 'I am enthusiastic about contributing to projects that enhance the use of technology to achieve business goals and improve customer experience.', name: 'q13' },
  { text: 'I want to understand how decision support systems contribute to advanced analytics and risk management in business environments.', name: 'q14' },
  { text: 'I find that analyzing data to derive strategies and identify new opportunities is a vital area that requires advanced skills, and I am prepared to develop them.', name: 'q15' },
  { text: 'I am excited by the prospect of robots performing complex tasks and making decisions based on previous learning experiences using machine learning.', name: 'q16' },
  { text: 'I am enthusiastic about learning and applying statistical methods to deeply understand data and enhance analytical outcomes.', name: 'q17' },
  { text: 'I am committed to understanding how the algorithms I develop may affect individuals and society, prioritizing ethical considerations in my work.', name: 'q18' },
];

// Model 3 questions (real, from HTML)
const model3Questions = [
  { text: 'How passionate are you about learning new mathematical concepts and applying them to real-world scenarios?', name: 'q1' },
  { text: 'What is your level of interest in developing and troubleshooting software or hardware systems?', name: 'q2' },
  { text: 'How often do you explore new technologies or programming languages on your own initiative?', name: 'q3' },
  { text: 'I am particularly interested in developing strategies to defend against denial-of-service attacks and malicious software.', name: 'q4' },
  { text: 'I want to explore how advanced technologies can be used to enhance data security.', name: 'q5' },
  { text: 'I believe it is important for technology specialists to adhere to the highest ethical standards when applying protection technologies.', name: 'q6' },
  { text: 'I think that using diagrams and prototypes in the early stages of development helps better visualize the final system and reduces the likelihood of errors.', name: 'q7' },
  { text: 'I believe that delivering a flawless product requires meticulously testing each component of the application independently before integrating them.', name: 'q8' },
  { text: 'I find theoretical subjects in software engineering to be more tedious than interesting, and prefer more hands-on or practical learning.', name: 'q9' },
  { text: 'I am excited to contribute to the development of systems that enhance efficiency and address key challenges in workplace environments.', name: 'q10' },
  { text: 'I want to learn how to use data analysis techniques to improve user experience and internal processes of organizations.', name: 'q11' },
  { text: 'I am interested in taking on the responsibility of large technical projects involving strategic planning and effective execution.', name: 'q12' },
  { text: 'I am interested in designing IT solutions that meet specific business needs and help achieve competitive excellence.', name: 'q13' },
  { text: 'I am excited to discover how advanced technology can enhance a company\'s competitive edge by improving decision-making processes.', name: 'q14' },
  { text: 'I am passionate about using data analytics to improve operations and foster innovation within the company.', name: 'q15' },
  { text: 'The potential for machines to adapt and learn independently fascinates me, and I am keen to contribute to innovations in robotics.', name: 'q16' },
  { text: 'Using statistical techniques to draw meaningful insights from complex and large datasets is a part I find exciting and fundamental in my work.', name: 'q17' },
  { text: 'The impact of technology on everyday life, especially in terms of ethical dilemmas it presents, is a crucial area of concern for me.', name: 'q18' },
];

const options = [
  { value: 5, label: 'Strongly Agree' },
  { value: 4, label: 'Agree' },
  { value: 3, label: 'Neutral' },
  { value: 2, label: 'Disagree' },
  { value: 1, label: 'Strongly Disagree' },
];

const QUESTIONS_PER_PART = 6;

const models = [
  {
    id: 'model1',
    title: 'Basic Assessment',
    description: 'General IT career path evaluation',
  },
  {
    id: 'model2',
    title: 'Detailed Analysis',
    description: 'In-depth technical assessment',
  },
  {
    id: 'model3',
    title: 'Advanced Evaluation',
    description: 'Comprehensive career analysis',
  },
];

const getQuestionsForModel = (model) => {
  switch (model) {
    case 'model1':
      return model1Questions;
    case 'model2':
      return model2Questions;
    case 'model3':
      return model3Questions;
    default:
      return [];
  }
};

const ExamPage = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const questions = getQuestionsForModel(selectedModel);
  const totalParts = Math.ceil(questions.length / QUESTIONS_PER_PART);
  const progress = selectedModel ? ((currentPart + 1) / totalParts) * 100 : 0;
  const isLastStep = currentPart === totalParts - 1;

  const getCurrentQuestions = () => {
    const start = currentPart * QUESTIONS_PER_PART;
    const end = start + QUESTIONS_PER_PART;
    return questions.slice(start, end);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setCurrentPart(0);
    setAnswers({});
    setError('');
  };

  const handleOptionChange = (qName, value) => {
    setAnswers((prev) => ({ ...prev, [qName]: value }));
    setError('');
  };

  const handleNext = () => {
    // Validate all questions in this part are answered
    const currentQs = getCurrentQuestions();
    const allAnswered = currentQs.every((q) => answers[q.name] !== undefined && answers[q.name] !== null && answers[q.name] !== '');
    if (!allAnswered) {
      setError('Please answer all questions before proceeding.');
      return;
    }
    setCurrentPart((prev) => prev + 1);
    setError('');
  };

  const handlePrev = () => {
    if (currentPart > 0) {
      setCurrentPart((prev) => prev - 1);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all questions in this part are answered
    const currentQs = getCurrentQuestions();
    const allAnswered = currentQs.every((q) => answers[q.name] !== undefined && answers[q.name] !== null && answers[q.name] !== '');
    if (!allAnswered) {
      setError('Please answer all questions before finishing.');
      return;
    }
    // Calculate total score
    const score = Object.values(answers).reduce((sum, val) => sum + Number(val), 0);
    // Pass answers and score to result page via query params
    const params = new URLSearchParams({ model: selectedModel, score: score.toString() });
    Object.entries(answers).forEach(([k, v]) => params.append(k, v));
    navigate(`/result?${params.toString()}`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 font-['Inter'] py-8 animate-fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 shadow-lg rounded-b-3xl">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Discover Your IT Career Path</h1>
          <p className="text-xl text-blue-100">Answer the following questions to find out which IT specialization suits you best.</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {!selectedModel && (
            <motion.section
              key="model-select"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Choose Your Assessment Model</h2>
              <ModelSelector models={models} onSelect={handleModelSelect} />
            </motion.section>
          )}
        </AnimatePresence>
        {selectedModel && (
          <>
            <ProgressBar percent={progress} step={currentPart + 1} totalSteps={totalParts} />
            <QuestionStepper
              questions={getCurrentQuestions()}
              answers={answers}
              options={options}
              onChange={handleOptionChange}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
              currentPart={currentPart}
              totalParts={totalParts}
              error={error}
              isLastStep={isLastStep}
            />
          </>
        )}
      </main>
    </motion.div>
  );
};

export default ExamPage; 