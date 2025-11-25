import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaPaperPlane,
  FaPaperclip,
  FaComments,
  FaUser,
  FaFilePdf,
  FaFileImage,
  FaFileAlt,
  FaFileCsv,
  FaFileWord,
  FaTimes
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { aiAgents } from '../data/demoData';
import Sidebar from '../components/Sidebar';

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const { currentConversation, conversations, messages, addMessage, user, isSidebarCollapsed } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [textAreaHeight, setTextAreaHeight] = useState(56);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const currentConv = conversations.find(c => c.id === currentConversation);
  const currentAgent = aiAgents.find(a => a.id === currentConv?.agentId);
  const conversationMessages = messages[currentConversation || ''] || [];

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!messageText.trim() && attachedFiles.length === 0) return;
    if (!currentConversation) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: currentConversation,
      sender: 'user' as const,
      content: messageText,
      timestamp: new Date().toISOString(),
      type: 'text' as const
    };

    addMessage(currentConversation, newMessage);
    setMessageText('');
    setAttachedFiles([]);
    setTextAreaHeight(56);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: `msg-${Date.now() + 1}`,
        conversationId: currentConversation,
        sender: 'agent' as const,
        content: `Thank you for your message! I'm ${currentAgent?.name}, and I'm here to help you with ${currentAgent?.specialization}. I've received your request and I'm analyzing it now. How can I assist you further?`,
        timestamp: new Date().toISOString(),
        type: 'text' as const
      };
      addMessage(currentConversation, agentResponse);
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 56), 200);
    setTextAreaHeight(newHeight);
    textarea.style.height = `${newHeight}px`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 text-2xl" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="text-blue-500 text-2xl" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-600 text-2xl" />;
      case 'csv':
        return <FaFileCsv className="text-green-500 text-2xl" />;
      default:
        return <FaFileAlt className="text-gray-500 text-2xl" />;
    }
  };

  if (!currentConversation || !currentAgent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaComments className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No conversation selected</h2>
          <p className="text-gray-600 mb-4">Please select a conversation from the sidebar or start a new one</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Top Navigation */}
      <div className={`bg-white shadow-md sticky top-0 z-40 transition-all duration-300 ${isSidebarOpen ? 'md:ml-80' : 'ml-0'} ${!isSidebarOpen && isSidebarCollapsed ? 'md:ml-20' : ''} ${!isSidebarOpen && !isSidebarCollapsed ? 'md:ml-80' : ''}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaComments className="text-2xl text-primary-600" />
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FaHome className="text-lg" />
                <span className="hidden sm:inline font-semibold">Home</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={currentAgent.image}
                alt={currentAgent.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-600"
              />
              <div>
                <p className="font-semibold text-gray-800">{currentAgent.name}</p>
                <p className="text-xs text-gray-600">{currentAgent.specialization}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">{user?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-80' : 'ml-0'} ${!isSidebarOpen && isSidebarCollapsed ? 'md:ml-20' : ''} ${!isSidebarOpen && !isSidebarCollapsed ? 'md:ml-80' : ''}`}>
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Agent Description (shown at start) */}
          {conversationMessages.length === 0 && (
            <div className="flex-1 flex items-center justify-center p-8 animate-fade-in">
              <div className="text-center max-w-2xl">
                <div className="relative inline-block mb-6">
                  <img
                    src={currentAgent.image}
                    alt={currentAgent.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-600 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentAgent.name}</h2>
                <p className="text-xl text-primary-600 font-semibold mb-4">{currentAgent.specialization}</p>
                <p className="text-gray-700 leading-relaxed mb-6">{currentAgent.description}</p>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">Rating:</span>
                    <span className="text-yellow-500 font-bold">{currentAgent.rating} ★</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">Cost:</span>
                    <span className="text-green-600 font-bold">${currentAgent.cost}/hr</span>
                  </div>
                </div>
                <p className="text-gray-500 mt-4 text-sm">Start typing below to begin the conversation</p>
              </div>
            </div>
          )}

          {/* Messages */}
          {conversationMessages.length > 0 && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {msg.sender === 'user' ? (
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                          <FaUser className="text-white" />
                        </div>
                      ) : (
                        <img
                          src={currentAgent.image}
                          alt={currentAgent.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                    </div>

                    {/* Message Content */}
                    <div>
                      <div
                        className={`p-4 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-white shadow-md text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            {/* Attached Files */}
            {attachedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                  >
                    {getFileIcon(file.name)}
                    <span className="text-sm text-gray-700 max-w-[150px] truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input Box */}
            <div className="flex gap-2 items-end">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt,.csv"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                title="Attach file"
              >
                <FaPaperclip className="text-xl" />
              </button>

              <textarea
                ref={textAreaRef}
                value={messageText}
                onChange={handleTextAreaChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 resize-none transition-all duration-200"
                style={{ height: `${textAreaHeight}px` }}
              />

              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() && attachedFiles.length === 0}
                className="flex-shrink-0 p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Send message"
              >
                <FaPaperPlane className="text-xl" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Supported files: PDF, Images (JPG, PNG), Documents (DOC, DOCX), Text (TXT), CSV
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
