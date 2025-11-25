import React from 'react';
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import { AIAgent } from '../data/demoData';

interface AgentCardProps {
  agent: AIAgent;
  onClick: () => void;
  delay?: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick, delay = 0 }) => {
  return (
    <div
      className="card cursor-pointer transform hover:scale-105 transition-transform duration-300 animate-fade-in relative group"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      {/* Agent Image - Circular */}
      <div className="flex justify-center pt-6 pb-3">
        <div className="relative">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary-100 shadow-lg"
            loading="lazy"
          />
          <div className="absolute -top-2 -right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center gap-1">
            <FaStar className="text-yellow-500 text-xs" />
            <span className="font-bold text-gray-800 text-sm">{agent.rating}</span>
          </div>
        </div>
      </div>

      {/* Agent Info */}
      <div className="px-4 pb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">{agent.name}</h3>

        {/* Expertise */}
        <p className="text-primary-600 font-semibold mb-3 text-center text-sm">{agent.specialization}</p>

        {/* Essential Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
            <span>{agent.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaDollarSign className="text-green-500 flex-shrink-0" />
            <span className="font-semibold">${agent.cost}/hour</span>
          </div>
        </div>

        {/* Arrow Icon - appears on hover with zoom animation */}
        <div className="flex justify-end mt-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all">
            <FaArrowRight className="arrow-zoom" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
