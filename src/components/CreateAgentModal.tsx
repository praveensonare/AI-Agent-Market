import React, { useState } from 'react';
import { FaTimes, FaArrowRight, FaArrowLeft, FaRobot, FaUpload, FaCheckCircle } from 'react-icons/fa';
import { SMEAgent } from '../context/AppContext';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAgent: (agent: SMEAgent) => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ isOpen, onClose, onCreateAgent }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    location: '',
    currency: 'USD',
    image: '',
    rate: 0,
    rateCurrency: 'USD',
    professionalDetails: '',
    professionalDetailsFile: null as File | null,
    knowledgeBase: '',
    knowledgeBaseFiles: [] as File[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const currencies = ['USD', 'SGD', 'EUR', 'GBP', 'INR'];

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Agent name is required';
    }
    if (!formData.speciality.trim()) {
      newErrors.speciality = 'Specialization is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Agent image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.professionalDetails.trim()) {
      newErrors.professionalDetails = 'Professional details are required';
    }
    if (!formData.knowledgeBase.trim()) {
      newErrors.knowledgeBase = 'Knowledge base is required';
    }
    if (formData.rate <= 0) {
      newErrors.rate = 'Rate must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
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
    }
  };

  const handleKnowledgeBaseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        knowledgeBaseFiles: [...prev.knowledgeBaseFiles, ...files]
      }));
    }
  };

  const handleCreate = () => {
    if (validateStep2()) {
      const newAgent: SMEAgent = {
        id: `agent-${Date.now()}`,
        name: formData.name,
        speciality: formData.speciality,
        location: formData.location,
        currency: formData.currency,
        image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&size=200&background=6366f1&color=fff`,
        rate: formData.rate,
        rateCurrency: formData.rateCurrency,
        professionalDetails: formData.professionalDetails,
        prompts: '',
        knowledgeBase: formData.knowledgeBase,
        knowledgeBaseFiles: formData.knowledgeBaseFiles.map(f => f.name),
        createdAt: new Date().toISOString(),
        totalChats: 0,
        activeChats: 0,
        engagementScore: 0,
        rating: 0,
        totalRevenue: 0,
      };

      onCreateAgent(newAgent);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      name: '',
      speciality: '',
      location: '',
      currency: 'USD',
      image: '',
      rate: 0,
      rateCurrency: 'USD',
      professionalDetails: '',
      professionalDetailsFile: null,
      knowledgeBase: '',
      knowledgeBaseFiles: [],
    });
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Create AI Agent</h2>
              <p className="text-sm text-gray-600">Step {step} of 2</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <FaTimes className="text-gray-600 text-xl" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2">
          <div
            className="bg-primary-600 h-2 transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Agent Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Dr. AI Healthcare Expert"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Speciality *
                </label>
                <input
                  type="text"
                  value={formData.speciality}
                  onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.speciality ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Healthcare AI Specialist"
                />
                {errors.speciality && <p className="text-red-500 text-sm mt-1">{errors.speciality}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., New York, USA"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Currency *
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Agent Image *
                </label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Agent preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary-600"
                    />
                  )}
                  <label className="btn-secondary cursor-pointer flex items-center gap-2">
                    <FaUpload />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                {!formData.image && (
                  <p className="text-sm text-gray-500 mt-2">Please upload an image for your agent</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Professional Details & Charges</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Professional Details *
                </label>
                <p className="text-xs text-gray-500 mb-2">Role, what you do, how you do</p>
                <textarea
                  value={formData.professionalDetails}
                  onChange={(e) => setFormData({ ...formData, professionalDetails: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px] ${
                    errors.professionalDetails ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your role, expertise, and approach..."
                />
                {errors.professionalDetails && <p className="text-red-500 text-sm mt-1">{errors.professionalDetails}</p>}
                <label className="btn-secondary cursor-pointer inline-flex items-center gap-2 mt-2">
                  <FaUpload />
                  Upload Document
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleProfessionalDetailsFile}
                    className="hidden"
                  />
                </label>
                {formData.professionalDetailsFile && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <FaCheckCircle />
                    {formData.professionalDetailsFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Knowledge Base *
                </label>
                <p className="text-xs text-gray-500 mb-2">Upload your knowledge base as text or files</p>
                <textarea
                  value={formData.knowledgeBase}
                  onChange={(e) => setFormData({ ...formData, knowledgeBase: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[150px] ${
                    errors.knowledgeBase ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your knowledge base content here, or upload files below..."
                />
                {errors.knowledgeBase && <p className="text-red-500 text-sm mt-1">{errors.knowledgeBase}</p>}
                <label className="btn-secondary cursor-pointer inline-flex items-center gap-2 mt-2">
                  <FaUpload />
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
                    <ul className="text-sm text-green-600 space-y-1">
                      {formData.knowledgeBaseFiles.map((file, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <FaCheckCircle />
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Charges *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Rate (per hour)</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={formData.rate}
                      onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.rate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 150"
                    />
                    {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Currency</label>
                    <select
                      value={formData.rateCurrency}
                      onChange={(e) => setFormData({ ...formData, rateCurrency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {currencies.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={handleClose}
            className="btn-secondary px-6 py-2"
          >
            Cancel
          </button>

          <div className="flex gap-3">
            {step === 2 && (
              <button
                onClick={handleBack}
                className="btn-secondary px-6 py-2 flex items-center gap-2"
              >
                <FaArrowLeft />
                Back
              </button>
            )}

            {step === 1 ? (
              <button
                onClick={handleNext}
                className="btn-primary px-6 py-2 flex items-center gap-2"
              >
                Next
                <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="btn-primary px-6 py-2 flex items-center gap-2"
              >
                <FaCheckCircle />
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentModal;
