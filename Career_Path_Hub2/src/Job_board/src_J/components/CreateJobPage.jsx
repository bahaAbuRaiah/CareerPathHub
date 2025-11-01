import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaClock, FaList, FaCheckCircle, FaUsers, FaPlus, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Confetti from 'react-confetti';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    category: 'Development',
    salary: '',
    description: '',
    requirements: [''],
    benefits: [''],
    applicationDeadline: '',
    experienceLevel: 'Mid-Level',
    skills: [''],
    workplaceType: 'On-site',
    companyLogo: null,
    companyDescription: ''
  });
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const categories = ['Development', 'Design', 'Marketing', 'Sales', 'Customer Service', 'Management', 'Data Science', 'DevOps'];
  const experienceLevels = ['Entry-Level', 'Mid-Level', 'Senior', 'Lead', 'Executive'];
  const workplaceTypes = ['On-site', 'Remote', 'Hybrid'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleArrayInput = (index, field, value) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map((item, i) => i === index ? value : item) }));
  };
  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };
  const removeArrayItem = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, companyLogo: file }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => navigate('/jobBoard'), 2500);
  };

  const steps = [
    { title: 'Basic Info', icon: <FaBriefcase />, color: 'from-blue-500 to-indigo-500' },
    { title: 'Details', icon: <FaList />, color: 'from-indigo-500 to-purple-500' },
    { title: 'Requirements', icon: <FaCheckCircle />, color: 'from-purple-500 to-pink-500' }
  ];

  const renderInput = (label, name, type = 'text', icon, placeholder, options = null) => (
    <div className="relative mb-6">
      <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 flex items-center gap-1 pointer-events-none">
        {icon} {label}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white"
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 mt-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
        />
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderInput('Job Title', 'title', 'text', <FaBriefcase className="text-indigo-500" />, 'e.g. Senior Frontend Developer')}
              {renderInput('Company Name', 'company', 'text', <FaBuilding className="text-indigo-500" />, 'e.g. Tech Solutions Inc.')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderInput('Location', 'location', 'text', <FaMapMarkerAlt className="text-indigo-500" />, 'e.g. New York, NY')}
              {renderInput('Job Type', 'type', 'select', <FaClock className="text-indigo-500" />, null, jobTypes)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative mb-6">
                <label className="absolute -top-3 left-3 bg-white px-1 text-xs font-semibold text-indigo-500 flex items-center gap-1 pointer-events-none">
                  <FaBuilding className="text-indigo-500" /> Company Logo
                </label>
                <div className="flex items-center space-x-4 mt-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-indigo-200">
                    {formData.companyLogo ? (
                      <img src={URL.createObjectURL(formData.companyLogo)} alt="Company logo" className="w-16 h-16 object-contain" />
                    ) : (
                      <FaBuilding className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200" />
                    <p className="mt-2 text-sm text-gray-500">Recommended: Square image, at least 200x200px</p>
                  </div>
                </div>
              </div>
              {renderInput('Workplace Type', 'workplaceType', 'select', <FaUsers className="text-indigo-500" />, null, workplaceTypes)}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            {renderInput('Category', 'category', 'select', <FaList className="text-indigo-500" />, null, categories)}
            {renderInput('Salary Range', 'salary', 'text', <FaDollarSign className="text-indigo-500" />, 'e.g. $80,000 - $120,000')}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2"><FaList className="text-indigo-500" />Job Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200" placeholder="Describe the role, responsibilities, and expectations..." />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2"><FaCheckCircle className="text-indigo-500" />Requirements</label>
              {formData.requirements.map((req, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" value={req} onChange={e => handleArrayInput(i, 'requirements', e.target.value)} className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="e.g. 3+ years experience" />
                  <button type="button" onClick={() => removeArrayItem('requirements', i)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('requirements')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 focus:outline-none">Add Requirement</button>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2"><FaPlus className="text-indigo-500" />Benefits</label>
              {formData.benefits.map((ben, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" value={ben} onChange={e => handleArrayInput(i, 'benefits', e.target.value)} className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="e.g. Health insurance" />
                  <button type="button" onClick={() => removeArrayItem('benefits', i)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 focus:outline-none">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('benefits')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 focus:outline-none">Add Benefit</button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 font-inter">
      <div className="max-w-3xl mx-auto w-full px-4 lg:px-8 flex flex-col items-center">
        {success && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={250} recycle={false} />}
        <motion.div
          className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 font-semibold focus:outline-none"><FaArrowLeft /> Back</button>
            <h1 className="text-2xl font-bold text-gray-800">Create a New Job</h1>
          </div>
          {/* Stepper */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex-1 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} text-white text-2xl shadow-lg mb-2 ${currentStep === idx + 1 ? 'ring-4 ring-indigo-200' : ''}`}>
                  {step.icon}
                </div>
                <span className={`text-xs font-semibold ${currentStep === idx + 1 ? 'text-indigo-700' : 'text-gray-400'}`}>{step.title}</span>
                {idx < steps.length - 1 && <div className="w-12 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 my-2 rounded-full" />}
              </div>
            ))}
          </div>
          {/* Form Steps */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <AnimatePresence mode="wait">
              {!success && renderStepContent()}
            </AnimatePresence>
            {/* Navigation Buttons */}
            {!success && (
              <div className="flex justify-between mt-10">
                <button type="button" onClick={() => setCurrentStep(s => Math.max(1, s - 1))} disabled={currentStep === 1} className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400">Previous</button>
                {currentStep < steps.length ? (
                  <button type="button" onClick={() => setCurrentStep(s => Math.min(steps.length, s + 1))} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Next</button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center gap-2">
                    {isSubmitting && <FaSpinner className="animate-spin" />} Post Job
                  </button>
                )}
              </div>
            )}
            {/* Success State */}
            {success && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16">
                <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">Job Posted Successfully!</h2>
                <p className="text-gray-700 mb-6">Your job listing is now live. You will be redirected to the job board shortly.</p>
                <button onClick={() => navigate('/jobBoard')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all text-lg">Go to Job Board</button>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJobPage;