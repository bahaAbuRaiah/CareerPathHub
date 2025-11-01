export const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Amman, Jordan",
    type: "Full-time",
    salary: "$3000-$4500",
    description: "We are looking for an experienced Frontend Developer with React expertise...",
    requirements: ["5+ years React experience", "TypeScript", "UI/UX knowledge"],
    status: "Active",
    postedDate: "2024-03-01",
    applicants: 12
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Marketing Co.",
    location: "Remote",
    type: "Full-time",
    salary: "$2500-$3500",
    description: "Seeking a creative Marketing Manager to lead our digital campaigns...",
    requirements: ["3+ years marketing experience", "Social media expertise"],
    status: "Active",
    postedDate: "2024-03-05",
    applicants: 8
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "AI Solutions Ltd",
    location: "Hybrid",
    type: "Internship",
    salary: "$800",
    description: "Great opportunity for students to learn data science in a practical environment...",
    requirements: ["Statistics knowledge", "Python basics", "Currently enrolled in university"],
    status: "Active",
    postedDate: "2024-03-10",
    applicants: 15
  }
];

export const mockApplicants = [
  {
    id: 1,
    name: "Ahmad Mohammed",
    email: "ahmad.m@email.com",
    position: "Senior Frontend Developer",
    appliedDate: "2024-03-15",
    experience: "6 years",
    status: "Under Review",
    resume: "resume_link.pdf",
    skills: ["React", "TypeScript", "Node.js"],
    coverLetter: "I am excited to apply for this position..."
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.w@email.com",
    position: "Marketing Manager",
    appliedDate: "2024-03-14",
    experience: "4 years",
    status: "Interviewed",
    resume: "resume_link.pdf",
    skills: ["Digital Marketing", "Social Media", "Content Strategy"],
    coverLetter: "With my experience in digital marketing..."
  },
  {
    id: 3,
    name: "Omar Hassan",
    email: "omar.h@email.com",
    position: "Data Science Intern",
    appliedDate: "2024-03-13",
    experience: "Student",
    status: "New",
    resume: "resume_link.pdf",
    skills: ["Python", "SQL", "Machine Learning"],
    coverLetter: "As a final year student..."
  }
];

export const mockFeedback = [
  {
    id: 1,
    user: "John Smith",
    rating: 4,
    comment: "Great platform for job posting, but could use more filtering options.",
    date: "2024-03-15",
    type: "Platform"
  },
  {
    id: 2,
    user: "Lisa Anderson",
    rating: 5,
    comment: "The application tracking system is very intuitive and helpful.",
    date: "2024-03-14",
    type: "Feature"
  },
  {
    id: 3,
    user: "Mohammed Ali",
    rating: 3,
    comment: "Would like to see more customization options for job posts.",
    date: "2024-03-13",
    type: "Feature"
  }
];

export const mockCompanyProfile = {
  name: "Tech Solutions Inc.",
  logo: "https://via.placeholder.com/150",
  industry: "Information Technology",
  size: "50-200 employees",
  location: "Amman, Jordan",
  website: "www.techsolutions.com",
  about: "Leading technology solutions provider in the Middle East...",
  socialMedia: {
    linkedin: "company/techsolutions",
    twitter: "@techsolutions",
    facebook: "TechSolutions"
  }
}; 