import React from 'react';
import { FaMapMarkerAlt, FaEllipsisH, FaChartLine } from 'react-icons/fa';
import { SMEAgent } from '../context/AppContext';

interface SMEAgentCardProps {
  agent: SMEAgent;
  onMoreClick: (agent: SMEAgent) => void;
  onPerformanceClick: (agent: SMEAgent) => void;
}

const SMEAgentCard: React.FC<SMEAgentCardProps> = ({ agent, onMoreClick, onPerformanceClick }) => {
  return (
    <div className="card overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* Agent Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Agent Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
          {agent.name}
        </h3>

        <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {agent.speciality}
        </span>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <FaMapMarkerAlt className="mr-1 flex-shrink-0" />
          <span className="truncate">{agent.location}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onPerformanceClick(agent)}
            className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2"
          >
            <FaChartLine />
            Performance
          </button>
          <button
            onClick={() => onMoreClick(agent)}
            className="btn-secondary px-4 py-2 flex items-center justify-center"
          >
            <FaEllipsisH />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SMEAgentCard;
