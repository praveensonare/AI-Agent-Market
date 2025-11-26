import React, { useState } from 'react';
import { FaChartLine, FaRobot, FaComments, FaStar, FaChevronDown, FaPlus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import SMESidebar from '../components/SMESidebar';
import SMEAgentCard from '../components/SMEAgentCard';
import AgentDetailsModal from '../components/AgentDetailsModal';
import AgentPerformanceModal from '../components/AgentPerformanceModal';
import CreateAgentModal from '../components/CreateAgentModal';
import { SMEAgent } from '../context/AppContext';

const SMEDashboard: React.FC = () => {
  const { user, smeAgents, agentChats, isSidebarCollapsed, addSMEAgent, updateSMEAgent } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'myAgents' | 'analytics'>('dashboard');
  const [selectedAgentForChats, setSelectedAgentForChats] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAgentForDetails, setSelectedAgentForDetails] = useState<SMEAgent | null>(null);
  const [selectedAgentForPerformance, setSelectedAgentForPerformance] = useState<SMEAgent | null>(null);

  // Check if user has any agents
  const hasAgents = smeAgents.length > 0;

  // Calculate overall analytics
  const totalAgents = smeAgents.length;
  const activeAgents = smeAgents.filter(agent => agent.activeChats > 0).length;
  const totalChats = smeAgents.reduce((sum, agent) => sum + agent.totalChats, 0);
  const avgEngagement = totalAgents > 0
    ? (smeAgents.reduce((sum, agent) => sum + agent.engagementScore, 0) / totalAgents).toFixed(1)
    : '0.0';
  const avgRating = totalAgents > 0
    ? (smeAgents.reduce((sum, agent) => sum + agent.rating, 0) / totalAgents).toFixed(1)
    : '0.0';
  const totalRevenue = smeAgents.reduce((sum, agent) => sum + agent.totalRevenue, 0);

  const getAgentChats = (agentId: string) => {
    return agentChats.filter(chat => chat.agentId === agentId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SMESidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />

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
                  <FaRobot className="text-2xl text-primary-600" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">SME Dashboard</h1>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-semibold text-gray-800">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!hasAgents ? (
            /* Show empty state when no agents exist */
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="card p-12 text-center max-w-2xl">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-6">
                  <FaRobot className="text-5xl text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Agents Yet</h3>
                <p className="text-gray-600 text-lg mb-2">
                  You haven't created any agents yet.
                </p>
                <p className="text-gray-500">
                  Start by creating your first AI agent to begin engaging with users and earning revenue.
                </p>
              </div>
            </div>
          ) : (
            /* Show Dashboard when agents exist */
            <>
              {selectedView === 'dashboard' && (
                <>
                  {/* Analytics Overview */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                      <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Total Agents</p>
                          <FaRobot className="text-2xl text-primary-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{totalAgents}</p>
                      </div>

                      <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Active Agents</p>
                          <FaChartLine className="text-2xl text-green-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{activeAgents}</p>
                        {activeAgents === 0 && (
                          <p className="text-xs text-gray-500 mt-1">No active conversations</p>
                        )}
                      </div>

                      <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Total Chats</p>
                          <FaComments className="text-2xl text-blue-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{totalChats}</p>
                        {totalChats === 0 && (
                          <p className="text-xs text-gray-500 mt-1">Waiting for first chat</p>
                        )}
                      </div>

                      <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Engagement</p>
                          <FaChartLine className="text-2xl text-purple-600" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{avgEngagement}%</p>
                        {parseFloat(avgEngagement) === 0 && (
                          <p className="text-xs text-gray-500 mt-1">No data yet</p>
                        )}
                      </div>

                      <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Avg Rating</p>
                          <FaStar className="text-2xl text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{avgRating}</p>
                        {parseFloat(avgRating) === 0 && (
                          <p className="text-xs text-gray-500 mt-1">No ratings yet</p>
                        )}
                      </div>

                      <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Revenue</p>
                          <span className="text-2xl">💰</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">${totalRevenue}</p>
                        {totalRevenue === 0 && (
                          <p className="text-xs text-gray-500 mt-1">Start earning!</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Individual Agent Statistics */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Agent Performance</h2>
                    {totalChats === 0 ? (
                      <div className="card p-10 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                          <FaComments className="text-4xl text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Activity Yet</h3>
                        <p className="text-gray-600">
                          Your agents are ready and waiting for their first conversations. Share your agent profiles to start engaging with users!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                      {smeAgents.map(agent => {
                        const chats = getAgentChats(agent.id);
                        return (
                          <div key={agent.id} className="card p-6">
                            <div className="flex items-start gap-4">
                              <img
                                src={agent.image}
                                alt={agent.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-800">{agent.name}</h3>
                                    <p className="text-sm text-gray-600">{agent.speciality}</p>
                                  </div>
                                  <button
                                    onClick={() => setSelectedAgentForChats(
                                      selectedAgentForChats === agent.id ? null : agent.id
                                    )}
                                    className="btn-secondary text-sm flex items-center justify-center"
                                  >
                                    <FaComments className="mr-2" />
                                    View Chats
                                    <FaChevronDown className={`ml-2 transition-transform duration-300 ${selectedAgentForChats === agent.id ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                  <div>
                                    <p className="text-xs text-gray-600">Total Chats</p>
                                    <p className="text-lg font-bold text-gray-800">{agent.totalChats}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Active Chats</p>
                                    <p className="text-lg font-bold text-gray-800">{agent.activeChats}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Engagement</p>
                                    <p className="text-lg font-bold text-gray-800">{agent.engagementScore}%</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Rating</p>
                                    <p className="text-lg font-bold text-gray-800 flex items-center">
                                      {agent.rating} <FaStar className="text-yellow-500 ml-1 text-sm" />
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Rate</p>
                                    <p className="text-lg font-bold text-gray-800">{agent.rate} {agent.rateCurrency}/hr</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Revenue</p>
                                    <p className="text-lg font-bold text-gray-800">${agent.totalRevenue}</p>
                                  </div>
                                </div>

                                {/* Chat List */}
                                {selectedAgentForChats === agent.id && (
                                  <div className="mt-4 border-t pt-4">
                                    <h4 className="font-semibold text-gray-800 mb-3">Recent Conversations</h4>
                                    {chats.length === 0 ? (
                                      <p className="text-gray-600 text-sm">No conversations yet</p>
                                    ) : (
                                      <div className="space-y-2">
                                        {chats.map(chat => (
                                          <div key={chat.id} className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-start justify-between">
                                              <div>
                                                <p className="font-semibold text-gray-800">{chat.userName}</p>
                                                <p className="text-sm text-gray-600">
                                                  {chat.messages.length} messages
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                  Started: {new Date(chat.startedAt).toLocaleDateString()} at{' '}
                                                  {new Date(chat.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                              </div>
                                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                chat.status === 'active'
                                                  ? 'bg-green-100 text-green-800'
                                                  : 'bg-gray-100 text-gray-800'
                                              }`}>
                                                {chat.status}
                                              </span>
                                            </div>
                                            {chat.messages.length > 0 && (
                                              <div className="mt-2 p-2 bg-white rounded border-l-4 border-primary-500">
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
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    )}
                  </div>
                </>
              )}

              {selectedView === 'myAgents' && (
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">My Agents</h2>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="btn-primary px-6 py-3 flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
                    >
                      <FaPlus />
                      Create Agent
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {smeAgents.map(agent => (
                      <SMEAgentCard
                        key={agent.id}
                        agent={agent}
                        onMoreClick={(agent) => setSelectedAgentForDetails(agent)}
                        onPerformanceClick={(agent) => setSelectedAgentForPerformance(agent)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedView === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Analytics</h2>
                  {totalChats === 0 ? (
                    <div className="card p-12 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-6">
                        <FaChartLine className="text-5xl text-primary-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">No Analytics Data Yet</h3>
                      <p className="text-gray-600 text-lg mb-2">
                        Your analytics dashboard is waiting for activity!
                      </p>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Once users start interacting with your agents, you'll see detailed metrics on engagement, ratings, revenue, and performance here.
                      </p>
                      <div className="mt-8 p-6 bg-blue-50 rounded-xl max-w-lg mx-auto">
                        <h4 className="font-bold text-gray-800 mb-2">💡 Quick Tips:</h4>
                        <ul className="text-left text-sm text-gray-700 space-y-1">
                          <li>✓ Share your agent profiles to attract users</li>
                          <li>✓ Keep your agent's knowledge base updated</li>
                          <li>✓ Respond promptly to maintain high engagement</li>
                          <li>✓ Monitor your agent performance regularly</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="card p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Average Engagement</span>
                              <span className="font-bold">{avgEngagement}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${avgEngagement}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Average Rating</span>
                              <span className="font-bold">{avgRating} / 5.0</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(parseFloat(avgRating) / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Revenue:</span>
                            <span className="text-2xl font-bold text-green-600">${totalRevenue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Active Agents:</span>
                            <span className="font-semibold">{activeAgents} / {totalAgents}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Create AI-Agent Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 z-40"
          title="Create AI Agent"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>

      {/* Modals */}
      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAgent={addSMEAgent}
      />

      {selectedAgentForDetails && (
        <AgentDetailsModal
          agent={selectedAgentForDetails}
          isOpen={!!selectedAgentForDetails}
          onClose={() => setSelectedAgentForDetails(null)}
          onSave={updateSMEAgent}
        />
      )}

      {selectedAgentForPerformance && (
        <AgentPerformanceModal
          agent={selectedAgentForPerformance}
          chats={agentChats.filter(chat => chat.agentId === selectedAgentForPerformance.id)}
          isOpen={!!selectedAgentForPerformance}
          onClose={() => setSelectedAgentForPerformance(null)}
        />
      )}
    </div>
  );
};

export default SMEDashboard;
