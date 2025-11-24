import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaStar, FaMapMarkerAlt, FaDollarSign, FaCalendar, FaUsers, FaComments } from 'react-icons/fa';
import { AIAgent } from '../data/demoData';
import { useApp } from '../context/AppContext';

interface AgentPopupProps {
  agent: AIAgent;
  onClose: () => void;
}

const AgentPopup: React.FC<AgentPopupProps> = ({ agent, onClose }) => {
  const navigate = useNavigate();
  const { setCurrentConversation, conversations, addConversation } = useApp();

  const handleAskMe = () => {
    // Check if conversation exists
    const existingConv = conversations.find(c => c.agentId === agent.id);

    if (existingConv) {
      setCurrentConversation(existingConv.id);
    } else {
      // Create new conversation
      const newConv = {
        id: `conv-${Date.now()}`,
        agentId: agent.id,
        agentName: agent.name,
        lastMessage: 'New conversation started',
        timestamp: new Date().toISOString(),
        unread: 0
      };
      addConversation(newConv);
      setCurrentConversation(newConv.id);
    }

    navigate('/chat');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          >
            <FaTimes className="text-xl text-gray-600" />
          </button>

          {/* Agent Image */}
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{agent.name}</h2>
              <p className="text-lg text-gray-200">{agent.specialization}</p>
            </div>
          </div>

          {/* Agent Details */}
          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaStar className="text-2xl text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-lg font-bold text-gray-800">{agent.rating}/5.0</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaDollarSign className="text-2xl text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Cost</p>
                  <p className="text-lg font-bold text-gray-800">${agent.cost}/hr</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-2xl text-primary-500" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-lg font-bold text-gray-800">{agent.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaUsers className="text-2xl text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Requests</p>
                  <p className="text-lg font-bold text-gray-800">{agent.requestsServed.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 p-3 bg-blue-50 rounded-lg">
              <FaCalendar className="text-blue-500" />
              <span>Knowledge base last updated: {new Date(agent.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">About This Agent</h3>
              <p className="text-gray-700 leading-relaxed">{agent.description}</p>
            </div>

            {/* Specialization Tags */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {agent.specialization.split('&').map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    {spec.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAskMe}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
              >
                <FaComments />
                Ask Me
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentPopup;
