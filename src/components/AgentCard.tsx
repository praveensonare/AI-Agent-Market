import React from 'react';
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowRight, FaComments } from 'react-icons/fa';
import { AIAgent } from '../data/demoData';

interface AgentCardProps {
  agent: AIAgent;
  onClick: () => void;
  delay?: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick, delay = 0 }) => {
  return (
    <div
      className="card cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 animate-fade-in relative group overflow-hidden"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Agent Image - Circular */}
      <div className="flex justify-center pt-4 pb-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <img
            src={agent.image}
            alt={agent.name}
            className="relative w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg ring-2 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300"
            loading="lazy"
          />
          <div className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-yellow-500 px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 transform group-hover:scale-110 transition-transform duration-300">
            <FaStar className="text-white text-xs" />
            <span className="font-bold text-white text-xs">{agent.rating}</span>
          </div>
        </div>
      </div>

      {/* Agent Info */}
      <div className="px-4 pb-4 relative z-10">
        <h3 className="text-lg font-bold text-gray-800 mb-1.5 text-center group-hover:text-primary-700 transition-colors leading-tight">{agent.name}</h3>

        {/* Expertise */}
        <p className="text-primary-600 font-semibold mb-3 text-center text-xs bg-primary-50 py-1.5 px-3 rounded-full">
          {agent.specialization}
        </p>

        {/* Essential Info */}
        <div className="space-y-2 text-sm text-gray-700 bg-gray-50/80 rounded-lg p-2.5">
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

        {/* Arrow Icon - appears on hover with zoom animation */}
        <div className="flex justify-end mt-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
            <FaArrowRight className="arrow-zoom text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
