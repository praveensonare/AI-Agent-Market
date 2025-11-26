import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaWallet, FaUser, FaSignOutAlt, FaChevronDown, FaComments, FaChevronLeft, FaChevronRight, FaRobot } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { user, conversations, currentConversation, setCurrentConversation, setUser, isSidebarCollapsed, setIsSidebarCollapsed } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleConversationClick = (convId: string) => {
    setCurrentConversation(convId);
    navigate('/chat');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleWallet = () => {
    alert('Wallet feature coming soon!');
  };

  const handleProfile = () => {
    alert('Profile feature coming soon!');
  };

  const handleMyAgents = () => {
    navigate('/my-agents');
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isSidebarCollapsed ? 'md:w-20' : 'md:w-80'}
          w-80
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-600 text-white">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <FaComments className="text-2xl" />
              <h2 className="text-xl font-bold">Conversations</h2>
            </div>
          )}
          {isSidebarCollapsed && (
            <FaComments className="text-2xl mx-auto" />
          )}

          {/* Close button - mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-primary-700 rounded-lg transition-colors md:hidden"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Collapse button - desktop only */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-primary-700 rounded-lg transition-colors hidden md:block"
          >
            {isSidebarCollapsed ? <FaChevronRight className="text-xl" /> : <FaChevronLeft className="text-xl" />}
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4">
          {conversations.length === 0 ? (
            <div className={`text-center py-8 text-gray-500 ${isSidebarCollapsed ? 'hidden md:block' : ''}`}>
              <FaComments className="text-4xl mx-auto mb-3 text-gray-300" />
              {!isSidebarCollapsed && (
                <>
                  <p>No conversations yet</p>
                  <p className="text-sm mt-2">Start chatting with an AI agent</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleConversationClick(conv.id)}
                  className={`rounded-lg cursor-pointer transition-all duration-200 ${
                    currentConversation === conv.id
                      ? 'bg-primary-100 border-2 border-primary-600'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  } ${isSidebarCollapsed ? 'p-2' : 'p-3'}`}
                  title={isSidebarCollapsed ? conv.agentName : ''}
                >
                  {isSidebarCollapsed ? (
                    // Collapsed view - show only icon/initials
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                        {conv.agentName.charAt(0)}
                      </div>
                      {conv.unread > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  ) : (
                    // Expanded view - show full details
                    <>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 text-sm">{conv.agentName}</h3>
                        {conv.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-1">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(conv.timestamp).toLocaleDateString()} at{' '}
                        {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200">
          {isSidebarCollapsed ? (
            // Collapsed view - show only avatar
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex justify-center"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary-600"
                title={user?.name}
              />
            </div>
          ) : (
            // Expanded view - show full profile
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-600"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <FaChevronDown
                  className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                />
              </div>
            </div>
          )}

          {/* User Menu */}
          {showUserMenu && (
            <div className="border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleWallet}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'Wallet' : ''}
              >
                <FaWallet className="text-green-600 text-lg" />
                {!isSidebarCollapsed && (
                  <div>
                    <p className="font-semibold text-gray-800">Wallet</p>
                    <p className="text-sm text-gray-600">${user?.wallet.toLocaleString()}</p>
                  </div>
                )}
              </button>

              <button
                onClick={handleMyAgents}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'My Agents' : ''}
              >
                <FaRobot className="text-primary-600 text-lg" />
                {!isSidebarCollapsed && (
                  <span className="font-semibold text-gray-800">My Agents</span>
                )}
              </button>

              <button
                onClick={handleProfile}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'Profile' : ''}
              >
                <FaUser className="text-blue-600 text-lg" />
                {!isSidebarCollapsed && (
                  <span className="font-semibold text-gray-800">Profile</span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-left text-red-600 ${
                  isSidebarCollapsed ? 'justify-center' : ''
                }`}
                title={isSidebarCollapsed ? 'Logout' : ''}
              >
                <FaSignOutAlt className="text-lg" />
                {!isSidebarCollapsed && (
                  <span className="font-semibold">Logout</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
