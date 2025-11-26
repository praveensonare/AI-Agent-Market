import React from 'react';
import { FaTimes, FaComments, FaStar, FaUsers, FaChartLine, FaDollarSign } from 'react-icons/fa';
import { SMEAgent, AgentChat } from '../context/AppContext';

interface AgentPerformanceModalProps {
  agent: SMEAgent;
  chats: AgentChat[];
  isOpen: boolean;
  onClose: () => void;
}

const AgentPerformanceModal: React.FC<AgentPerformanceModalProps> = ({ agent, chats, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Calculate unique users
  const uniqueUsers = new Set(chats.map(chat => chat.userId)).size;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="flex items-center gap-4">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{agent.name}</h2>
              <p className="text-gray-600">{agent.speciality}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <FaTimes className="text-gray-600 text-xl" />
          </button>
        </div>

        {/* Performance Metrics */}
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-600">Total Chats</p>
                <FaComments className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{agent.totalChats}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-600">Active Chats</p>
                <FaChartLine className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{agent.activeChats}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-600">Users</p>
                <FaUsers className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{uniqueUsers}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-600">Rating</p>
                <FaStar className="text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{agent.rating}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-600">Engagement</p>
                <FaChartLine className="text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{agent.engagementScore}%</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-600">Revenue</p>
                <FaDollarSign className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">${agent.totalRevenue}</p>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Conversations ({chats.length})
          </h3>

          {chats.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FaComments className="text-4xl text-gray-400" />
              </div>
              <p className="text-gray-600">No conversations yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {chats.map((chat) => (
                <div key={chat.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-800">{chat.userName}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          chat.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {chat.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaComments className="text-xs" />
                          {chat.messages.length} messages
                        </span>
                        <span>
                          Started: {new Date(chat.startedAt).toLocaleDateString()} at{' '}
                          {new Date(chat.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Last Message Preview */}
                  {chat.messages.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                      <p className="text-xs text-gray-600 mb-1">Last message:</p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {chat.messages[chat.messages.length - 1].content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="btn-primary px-6 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentPerformanceModal;
