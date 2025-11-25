import React, { useState } from 'react';
import { FaRobot, FaArrowRight, FaArrowLeft, FaUpload, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useApp, SMEAgent } from '../context/AppContext';

const CreateAgent: React.FC = () => {
  const { addSMEAgent } = useApp();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    location: '',
    currency: 'USD',
    image: '',
    professionalDetails: '',
    professionalDetailsFile: null as File | null,
    knowledgeBase: '',
    knowledgeBaseFiles: [] as File[],
    rate: '',
    rateCurrency: 'USD'
  });

  const currencies = ['USD', 'SGD', 'EUR', 'GBP', 'INR'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfessionalDetailsFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, professionalDetailsFile: file }));
      // In a real app, you'd read and process the file
      alert(`File "${file.name}" uploaded successfully`);
    }
  };

  const handleKnowledgeBaseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        knowledgeBaseFiles: [...prev.knowledgeBaseFiles, ...files]
      }));
      alert(`${files.length} file(s) uploaded successfully`);
    }
  };

  const isStep1Valid = () => {
    return formData.name && formData.speciality && formData.location && formData.currency && formData.image;
  };

  const isStep2Valid = () => {
    return formData.professionalDetails && formData.knowledgeBase && formData.rate && parseFloat(formData.rate) > 0;
  };

  const handleNext = () => {
    if (isStep1Valid()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinish = () => {
    if (isStep2Valid()) {
      const newAgent: SMEAgent = {
        id: `agent-${Date.now()}`,
        name: formData.name,
        speciality: formData.speciality,
        location: formData.location,
        currency: formData.currency,
        image: formData.image || 'https://robohash.org/default-agent?set=set1&size=400x400&bgset=bg1',
        professionalDetails: formData.professionalDetails,
        knowledgeBase: formData.knowledgeBase,
        knowledgeBaseFiles: formData.knowledgeBaseFiles.map(f => f.name),
        rate: parseFloat(formData.rate),
        rateCurrency: formData.rateCurrency,
        createdAt: new Date().toISOString(),
        totalChats: 0,
        activeChats: 0,
        engagementScore: 0,
        rating: 0,
        totalRevenue: 0
      };

      addSMEAgent(newAgent);
      alert('Agent created successfully!');
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All progress will be lost.')) {
      // Reset form
      setFormData({
        name: '',
        speciality: '',
        location: '',
        currency: 'USD',
        image: '',
        professionalDetails: '',
        professionalDetailsFile: null,
        knowledgeBase: '',
        knowledgeBaseFiles: [],
        rate: '',
        rateCurrency: 'USD'
      });
      setStep(1);
    }
  };

  return (
    <div className="max-w-3xl w-full">
      <div className="card p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <FaRobot className="text-3xl text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Custom Agent</h2>
          <p className="text-gray-600">Step {step} of 2</p>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input-field"
                placeholder="e.g., Dr. AI Healthcare Expert"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speciality <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.speciality}
                onChange={(e) => handleInputChange('speciality', e.target.value)}
                className="input-field"
                placeholder="e.g., Healthcare AI Specialist"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="input-field"
                placeholder="e.g., New York, USA"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Currency <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="input-field"
                required
              >
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Agent preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary-600"
                  />
                )}
                <label className="btn-secondary cursor-pointer">
                  <FaUpload className="mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              {!formData.image && (
                <p className="text-sm text-gray-500 mt-2">Please upload an image for your agent</p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="btn-cancel flex-1 flex items-center justify-center"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleNext}
                disabled={!isStep1Valid()}
                className="btn-primary flex-1 flex items-center justify-center"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Professional Details & Charges */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Details <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Role, what you do, how you do</p>
              <textarea
                value={formData.professionalDetails}
                onChange={(e) => handleInputChange('professionalDetails', e.target.value)}
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md min-h-[100px] resize-none"
                placeholder="Describe your role, expertise, and approach..."
                required
              ></textarea>
              <label className="btn-secondary cursor-pointer inline-flex items-center mt-2">
                <FaUpload className="mr-2" />
                Upload Document
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleProfessionalDetailsFile}
                  className="hidden"
                />
              </label>
              {formData.professionalDetailsFile && (
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <FaCheckCircle className="mr-1" />
                  {formData.professionalDetailsFile.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Knowledge Base <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Upload your knowledge base as text or files</p>
              <textarea
                value={formData.knowledgeBase}
                onChange={(e) => handleInputChange('knowledgeBase', e.target.value)}
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md min-h-[150px] resize-none"
                placeholder="Enter your knowledge base content here, or upload files below..."
                required
              ></textarea>
              <label className="btn-secondary cursor-pointer inline-flex items-center mt-2">
                <FaUpload className="mr-2" />
                Upload Files
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleKnowledgeBaseFiles}
                  className="hidden"
                />
              </label>
              {formData.knowledgeBaseFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-700 font-semibold">Uploaded files:</p>
                  <ul className="text-sm text-green-600">
                    {formData.knowledgeBaseFiles.map((file, idx) => (
                      <li key={idx} className="flex items-center">
                        <FaCheckCircle className="mr-1" />
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Charges <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Rate (per hour)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.rate}
                    onChange={(e) => handleInputChange('rate', e.target.value)}
                    className="input-field"
                    placeholder="e.g., 150"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Currency</label>
                  <select
                    value={formData.rateCurrency}
                    onChange={(e) => handleInputChange('rateCurrency', e.target.value)}
                    className="input-field"
                    required
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="btn-cancel flex-1 flex items-center justify-center"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleBack}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={!isStep2Valid()}
                className="btn-primary flex-1 flex items-center justify-center"
              >
                <FaCheckCircle className="mr-2" />
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAgent;
