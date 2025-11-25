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
      className="card cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in relative group overflow-hidden"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Agent Image - Circular */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <img
            src={agent.image}
            alt={agent.name}
            className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300"
            loading="lazy"
          />
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-500 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform group-hover:scale-110 transition-transform duration-300">
            <FaStar className="text-white text-sm" />
            <span className="font-bold text-white text-sm">{agent.rating}</span>
          </div>
        </div>
      </div>

      {/* Agent Info */}
      <div className="px-5 pb-5 relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-primary-700 transition-colors">{agent.name}</h3>

        {/* Expertise */}
        <p className="text-primary-600 font-bold mb-4 text-center text-sm bg-primary-50 py-2 px-3 rounded-full">
          {agent.specialization}
        </p>

        {/* Essential Info */}
        <div className="space-y-3 text-sm text-gray-700 bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <FaMapMarkerAlt className="text-primary-600 text-xs" />
            </div>
            <span className="font-medium">{agent.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FaDollarSign className="text-green-600 text-xs" />
            </div>
            <span className="font-bold text-green-700">${agent.cost}/hour</span>
          </div>
        </div>

        {/* Arrow Icon - appears on hover with zoom animation */}
        <div className="flex justify-end mt-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
            <FaArrowRight className="arrow-zoom text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
