import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AIAgent, Conversation, Message, demoConversations, demoMessages } from '../data/demoData';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'consumer' | 'sme';
  avatar: string;
  wallet: number;
}

export interface SMEAgent {
  id: string;
  name: string;
  speciality: string;
  location: string;
  currency: string;
  image: string;
  professionalDetails: string;
  knowledgeBase: string;
  knowledgeBaseFiles?: string[];
  rate: number;
  rateCurrency: string;
  createdAt: string;
  totalChats: number;
  activeChats: number;
  engagementScore: number;
  rating: number;
  totalRevenue: number;
}

export interface AgentChat {
  id: string;
  agentId: string;
  userId: string;
  userName: string;
  messages: Message[];
  startedAt: string;
  lastMessageAt: string;
  status: 'active' | 'closed';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  messages: { [key: string]: Message[] };
  addMessage: (conversationId: string, message: Message) => void;
  currentConversation: string | null;
  setCurrentConversation: (id: string | null) => void;
  selectedAgent: AIAgent | null;
  setSelectedAgent: (agent: AIAgent | null) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  smeAgents: SMEAgent[];
  addSMEAgent: (agent: SMEAgent) => void;
  agentChats: AgentChat[];
  addAgentChat: (chat: AgentChat) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>(demoMessages);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [smeAgents, setSMEAgents] = useState<SMEAgent[]>([]);
  const [agentChats, setAgentChats] = useState<AgentChat[]>([]);

  const addConversation = (conversation: Conversation) => {
    setConversations(prev => [conversation, ...prev]);
  };

  const addMessage = (conversationId: string, message: Message) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), message]
    }));
  };

  const addSMEAgent = (agent: SMEAgent) => {
    setSMEAgents(prev => [...prev, agent]);
  };

  const addAgentChat = (chat: AgentChat) => {
    setAgentChats(prev => [...prev, chat]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        conversations,
        addConversation,
        messages,
        addMessage,
        currentConversation,
        setCurrentConversation,
        selectedAgent,
        setSelectedAgent,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        smeAgents,
        addSMEAgent,
        agentChats,
        addAgentChat
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
