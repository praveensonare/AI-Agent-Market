import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import { SMEAgent } from '../context/AppContext';

interface AgentDetailsModalProps {
  agent: SMEAgent;
  isOpen: boolean;
  onClose: () => void;
  onSave: (agentId: string, updates: Partial<SMEAgent>) => void;
}

type TabType = 'info' | 'prompts' | 'knowledge';

const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ agent, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [formData, setFormData] = useState({
    name: agent.name,
    speciality: agent.speciality,
    location: agent.location,
    rate: agent.rate,
    rateCurrency: agent.rateCurrency,
    professionalDetails: agent.professionalDetails,
    prompts: agent.prompts || '',
    knowledgeBase: agent.knowledgeBase,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: agent.name,
        speciality: agent.speciality,
        location: agent.location,
        rate: agent.rate,
        rateCurrency: agent.rateCurrency,
        professionalDetails: agent.professionalDetails,
        prompts: agent.prompts || '',
        knowledgeBase: agent.knowledgeBase,
      });
    }
  }, [agent, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(agent.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Agent Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-600 text-xl" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 px-6 py-3 font-semibold transition-colors ${
              activeTab === 'info'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Information
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`flex-1 px-6 py-3 font-semibold transition-colors ${
              activeTab === 'prompts'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Prompts
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex-1 px-6 py-3 font-semibold transition-colors ${
              activeTab === 'knowledge'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Knowledge Base
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.speciality}
                    onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rate
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.rate}
                      onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Professional Details
                </label>
                <textarea
                  value={formData.professionalDetails}
                  onChange={(e) => setFormData({ ...formData, professionalDetails: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe your agent's professional background and expertise..."
                />
              </div>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Agent Prompts
              </label>
              <textarea
                value={formData.prompts}
                onChange={(e) => setFormData({ ...formData, prompts: e.target.value })}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                placeholder="Enter system prompts and instructions for your AI agent..."
              />
              <p className="text-sm text-gray-600 mt-2">
                Define how your agent should behave, respond, and interact with users.
              </p>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Knowledge Base
              </label>
              <textarea
                value={formData.knowledgeBase}
                onChange={(e) => setFormData({ ...formData, knowledgeBase: e.target.value })}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter knowledge base information, FAQs, and reference materials..."
              />
              <p className="text-sm text-gray-600 mt-2">
                Add domain-specific knowledge, FAQs, and information your agent should reference.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="btn-secondary px-6 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary px-6 py-2 flex items-center gap-2"
          >
            <FaSave />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsModal;
