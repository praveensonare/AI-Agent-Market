import React, { useState } from 'react';
import { FaTimes, FaArrowRight, FaArrowLeft, FaRobot } from 'react-icons/fa';
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
    prompts: '',
    knowledgeBase: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (formData.rate <= 0) {
      newErrors.rate = 'Rate must be greater than 0';
    }
    if (!formData.professionalDetails.trim()) {
      newErrors.professionalDetails = 'Professional details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.prompts.trim()) {
      newErrors.prompts = 'Agent prompts are required';
    }
    if (!formData.knowledgeBase.trim()) {
      newErrors.knowledgeBase = 'Knowledge base is required';
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
        prompts: formData.prompts,
        knowledgeBase: formData.knowledgeBase,
        knowledgeBaseFiles: [],
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
      prompts: '',
      knowledgeBase: '',
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
                  placeholder="e.g., Dr. Smith"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Specialization *
                </label>
                <input
                  type="text"
                  value={formData.speciality}
                  onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.speciality ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Medical Consultant"
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
                  Rate per Hour *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })}
                    className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.rate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <select
                    value={formData.rateCurrency}
                    onChange={(e) => setFormData({ ...formData, rateCurrency: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
                {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Agent Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Leave empty to use a default avatar based on the agent's name
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Professional Details *
                </label>
                <textarea
                  value={formData.professionalDetails}
                  onChange={(e) => setFormData({ ...formData, professionalDetails: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.professionalDetails ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your agent's professional background, expertise, and qualifications..."
                />
                {errors.professionalDetails && <p className="text-red-500 text-sm mt-1">{errors.professionalDetails}</p>}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Agent Configuration</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Agent Prompts *
                </label>
                <textarea
                  value={formData.prompts}
                  onChange={(e) => setFormData({ ...formData, prompts: e.target.value })}
                  rows={8}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm ${
                    errors.prompts ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter system prompts and instructions for your AI agent..."
                />
                {errors.prompts && <p className="text-red-500 text-sm mt-1">{errors.prompts}</p>}
                <p className="text-sm text-gray-600 mt-2">
                  Define how your agent should behave, respond, and interact with users.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Knowledge Base *
                </label>
                <textarea
                  value={formData.knowledgeBase}
                  onChange={(e) => setFormData({ ...formData, knowledgeBase: e.target.value })}
                  rows={8}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.knowledgeBase ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter knowledge base information, FAQs, and reference materials..."
                />
                {errors.knowledgeBase && <p className="text-red-500 text-sm mt-1">{errors.knowledgeBase}</p>}
                <p className="text-sm text-gray-600 mt-2">
                  Add domain-specific knowledge, FAQs, and information your agent should reference.
                </p>
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
                <FaRobot />
                Create Agent
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgentModal;
