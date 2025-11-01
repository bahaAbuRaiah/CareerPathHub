import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "./components/Stepper";
import PersonalInfoForm from "./components/PersonalInfoForm";
import EducationForm from "./components/EducationForm";
import ExperienceForm from "./components/ExperienceForm";
import SkillsForm from "./components/SkillsForm";
import CertificationsForm from "./components/CertificationsForm";
import JobDescriptionForm from "./components/JobDescriptionForm";
import KeywordSuggestions from "./components/KeywordSuggestions";
import TemplateSelector from "./components/TemplateSelector";
import LivePreview from "./components/LivePreview";

const steps = [
  "Personal Info",
  "Education",
  "Experience",
  "Skills",
  "Certifications",
  "Job Description",
  "Preview"
];

const initialFormData = {
  personal: {},
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  jobDescription: ""
};

const CVBuilderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [finished, setFinished] = useState(false);

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // Render the form for the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm data={formData.personal} setData={(d) => setFormData(f => ({ ...f, personal: d }))} onNext={handleNext} />;
      case 1:
        return <EducationForm data={formData.education} setData={(d) => setFormData(f => ({ ...f, education: d }))} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <ExperienceForm data={formData.experience} setData={(d) => setFormData(f => ({ ...f, experience: d }))} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <SkillsForm data={formData.skills} setData={(d) => setFormData(f => ({ ...f, skills: d }))} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <CertificationsForm data={formData.certifications} setData={(d) => setFormData(f => ({ ...f, certifications: d }))} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <JobDescriptionForm data={formData.jobDescription} setData={(d) => setFormData(f => ({ ...f, jobDescription: d }))} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <KeywordSuggestions jobDescription={formData.jobDescription} skills={formData.skills} onBack={handleBack} onFinish={() => setFinished(true)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-2 md:px-8 flex flex-col items-center font-inter">
      {finished && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">CV Completed!</h2>
            <p className="mb-4">You have finished building your CV. You can now download, save, or print it.</p>
            <button onClick={() => setFinished(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Close</button>
          </div>
        </div>
      )}
      <motion.div className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 relative z-10">
        {/* Left: Stepper and Form */}
        <div className="flex-1 min-w-[320px] max-w-lg">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="mt-8">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>
        </div>
        {/* Right: Live Preview and Template Selector */}
        <div className="flex-1 min-w-[320px]">
          <div className="mb-4">
            <TemplateSelector selected={selectedTemplate} setSelected={setSelectedTemplate} />
          </div>
          <LivePreview formData={formData} template={selectedTemplate} />
        </div>
      </motion.div>
    </div>
  );
};

export default CVBuilderPage; 