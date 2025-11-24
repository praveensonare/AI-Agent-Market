import React from 'react';
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaCalendar, FaUsers, FaArrowRight } from 'react-icons/fa';
import { AIAgent } from '../data/demoData';

interface AgentCardProps {
  agent: AIAgent;
  onClick: () => void;
  delay?: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick, delay = 0 }) => {
  return (
    <div
      className="card cursor-pointer transform hover:scale-105 transition-transform duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      {/* Agent Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold text-gray-800">{agent.rating}</span>
        </div>
      </div>

      {/* Agent Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{agent.name}</h3>
        <p className="text-primary-600 font-semibold mb-3">{agent.specialization}</p>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary-500" />
            <span>{agent.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaDollarSign className="text-green-500" />
            <span className="font-semibold">${agent.cost}/hour</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendar className="text-blue-500" />
            <span>Updated: {new Date(agent.lastUpdated).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaUsers className="text-purple-500" />
            <span>{agent.requestsServed.toLocaleString()} requests served</span>
          </div>
        </div>

        {/* View Details Button */}
        <button className="w-full flex items-center justify-between px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors group">
          <span className="font-semibold">View Details</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
