import React, { useState } from 'react';
import { FaRobot, FaComments, FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';

const MyAgents: React.FC = () => {
  const navigate = useNavigate();
  const { user, conversations, setCurrentConversation, isSidebarCollapsed } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get unique agents from conversations
  const myAgents = conversations.map(conv => ({
    id: conv.agentId,
    name: conv.agentName,
    conversationId: conv.id,
    lastMessage: conv.lastMessage,
    timestamp: conv.timestamp,
    unread: conv.unread,
    // Mock additional data - in real app, this would come from agent details
    specialization: 'AI Specialist',
    location: 'Remote',
    cost: 50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
  }));

  const handleAgentClick = (conversationId: string) => {
    setCurrentConversation(conversationId);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-80' : 'ml-0'} ${!isSidebarOpen && isSidebarCollapsed ? 'md:ml-20' : ''} ${!isSidebarOpen && !isSidebarCollapsed ? 'md:ml-80' : ''}`}>
        {/* Top Navigation Bar */}
        <div className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-3 rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-110 active:scale-95"
                >
                  <FaComments className="text-2xl text-primary-600" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Agents</h1>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-semibold text-gray-800">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {myAgents.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="card p-12 text-center max-w-2xl">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-6">
                  <FaRobot className="text-5xl text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Agents Yet</h3>
                <p className="text-gray-600 text-lg mb-2">
                  You haven't started chatting with any agents yet.
                </p>
                <p className="text-gray-500 mb-6">
                  Browse the marketplace to find AI agents that can help you with your tasks.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary"
                >
                  Browse Agents
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Agents You're Using</h2>
                <p className="text-gray-600">
                  You have conversations with <span className="font-semibold text-primary-600">{myAgents.length}</span> agent{myAgents.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {myAgents.map((agent, index) => (
                  <div
                    key={agent.conversationId}
                    className="card cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 animate-fade-in relative group overflow-hidden"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => handleAgentClick(agent.conversationId)}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Agent Image */}
                    <div className="flex justify-center pt-4 pb-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="relative w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg ring-2 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300"
                          loading="lazy"
                        />
                        <div className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-yellow-500 px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <FaStar className="text-white text-xs" />
                          <span className="font-bold text-white text-xs">{agent.rating}</span>
                        </div>
                        {agent.unread > 0 && (
                          <div className="absolute -bottom-1 -left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md font-bold">
                            {agent.unread}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Agent Info */}
                    <div className="px-4 pb-4 relative z-10">
                      <h3 className="text-lg font-bold text-gray-800 mb-1.5 text-center group-hover:text-primary-700 transition-colors leading-tight">
                        {agent.name}
                      </h3>

                      {/* Expertise */}
                      <p className="text-primary-600 font-semibold mb-3 text-center text-xs bg-primary-50 py-1.5 px-3 rounded-full">
                        {agent.specialization}
                      </p>

                      {/* Last Message */}
                      <div className="mb-3 bg-gray-50/80 rounded-lg p-2.5">
                        <p className="text-xs text-gray-600 font-medium mb-1">Last message:</p>
                        <p className="text-xs text-gray-700 line-clamp-2">{agent.lastMessage}</p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {new Date(agent.timestamp).toLocaleDateString()} at{' '}
                          {new Date(agent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {/* Essential Info */}
                      <div className="space-y-2 text-sm text-gray-700 bg-gray-50/80 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaMapMarkerAlt className="text-primary-600 text-xs" />
                          </div>
                          <span className="font-medium text-xs truncate">{agent.location}</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaDollarSign className="text-green-600 text-xs" />
                          </div>
                          <span className="font-bold text-green-700 text-xs">${agent.cost}/hour</span>
                        </div>
                      </div>

                      {/* Continue Chat Button */}
                      <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:scale-105">
                        <FaComments />
                        Continue Chat
                        <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAgents;
