import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import JobDetailPage from './components/JobDetailPage';
import CreateJobPage from './components/CreateJobPage';
import Navbar from './components/Navbar';
import { FaSpinner } from 'react-icons/fa';

// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    category: "Development",
    posted: "2 days ago",
    description: "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building and maintaining high-quality web applications, collaborating with cross-functional teams, and mentoring junior developers.",
    requirements: [
      "5+ years of experience with React and modern JavaScript",
      "Strong understanding of state management (Redux, Context)",
      "Experience with responsive design and CSS frameworks",
      "Knowledge of modern frontend build tools",
      "Experience with TypeScript and testing frameworks",
      "Excellent problem-solving and communication skills"
    ]
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Agency",
    location: "New York, NY",
    type: "Full-time",
    salary: "$75,000 - $95,000",
    category: "Design",
    posted: "1 week ago",
    description: "Join our creative team as a UX/UI Designer where you'll create beautiful and intuitive user interfaces for web and mobile applications. You'll work closely with clients and developers to bring designs to life.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio showcasing web and mobile designs",
      "Experience with user research and testing",
      "Knowledge of design systems and component libraries",
      "Understanding of accessibility standards"
    ]
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Remote",
    type: "Contract",
    salary: "$100,000 - $130,000",
    category: "Infrastructure",
    posted: "3 days ago",
    description: "We're seeking a skilled DevOps Engineer to help improve our infrastructure and deployment processes. You'll work on automating deployments, managing cloud infrastructure, and optimizing our CI/CD pipelines.",
    requirements: [
      "Experience with AWS/Azure/GCP cloud platforms",
      "Strong knowledge of Docker and Kubernetes",
      "Proficiency in CI/CD pipelines (Jenkins, GitLab CI)",
      "Experience with Infrastructure as Code (Terraform)",
      "Strong scripting skills (Python, Bash)",
      "Knowledge of monitoring and logging tools"
    ]
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Innovation Labs",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    category: "Management",
    posted: "Just now",
    description: "Lead product development initiatives from conception to launch. You'll work with stakeholders to define product strategy, gather requirements, and ensure successful delivery of products that delight our customers.",
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and strategic thinking skills",
      "Experience with agile methodologies",
      "Excellent communication and leadership abilities",
      "Track record of successful product launches",
      "Data-driven decision making skills"
    ]
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Data Analytics Co",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    category: "Data Science",
    posted: "4 days ago",
    description: "Join our data science team to solve complex problems using machine learning and statistical analysis. You'll work on developing predictive models and extracting insights from large datasets.",
    requirements: [
      "MS/PhD in Computer Science, Statistics, or related field",
      "Experience with machine learning and AI",
      "Proficiency in Python, R, and SQL",
      "Knowledge of deep learning frameworks",
      "Experience with big data technologies",
      "Strong mathematical and statistical background"
    ]
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "App Innovators",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$85,000 - $115,000",
    category: "Mobile",
    posted: "1 day ago",
    description: "Develop cutting-edge mobile applications for iOS and Android platforms. You'll work on creating engaging user experiences and implementing complex features using modern mobile technologies.",
    requirements: [
      "Experience with iOS/Android development",
      "Proficiency in Swift/Kotlin",
      "Understanding of mobile UI/UX principles",
      "Experience with RESTful APIs",
      "Knowledge of mobile app security",
      "Experience with mobile testing frameworks"
    ]
  },
  {
    id: 7,
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    location: "Washington, DC",
    type: "Full-time",
    salary: "$95,000 - $120,000",
    category: "Security",
    posted: "5 days ago",
    description: "Protect our organization's digital assets by monitoring security systems, investigating incidents, and implementing security measures. You'll work with a team of security professionals to ensure our systems remain secure.",
    requirements: [
      "Security certifications (CISSP, CEH, etc.)",
      "Experience with security tools and frameworks",
      "Knowledge of network security protocols",
      "Incident response experience",
      "Understanding of compliance requirements",
      "Strong analytical and problem-solving skills"
    ]
  },
  {
    id: 8,
    title: "Full Stack Developer",
    company: "Web Solutions",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    category: "Development",
    posted: "3 days ago",
    description: "Join our team as a Full Stack Developer where you'll work on both frontend and backend development. You'll be involved in all aspects of the development lifecycle, from design to deployment.",
    requirements: [
      "Experience with full stack development",
      "Proficiency in React and Node.js",
      "Database design and management skills",
      "Knowledge of cloud services (AWS/Azure)",
      "Experience with microservices architecture",
      "Strong problem-solving abilities"
    ]
  }
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState(mockJobs);
  const location = useLocation();

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="w-8 h-8 text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HomePage jobs={jobs} />
            </motion.div>
          } />
          <Route path="job/:id" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <JobDetailPage jobs={jobs} />
            </motion.div>
          } />
          <Route path="company/create-job" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CreateJobPage onJobCreated={(newJob) => setJobs([...jobs, newJob])} />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
