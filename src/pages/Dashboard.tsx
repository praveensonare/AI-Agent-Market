import React, { useState, useMemo } from 'react';
import { FaHome, FaSearch, FaStar, FaTimes, FaComments } from 'react-icons/fa';
import { aiAgents, specializations, locations } from '../data/demoData';
import { useApp } from '../context/AppContext';
import AgentCard from '../components/AgentCard';
import Sidebar from '../components/Sidebar';
import AgentPopup from '../components/AgentPopup';

const Dashboard: React.FC = () => {
  const { user, selectedAgent, setSelectedAgent, isSidebarCollapsed } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialization: 'All Specializations',
    location: 'All Locations',
    minRating: 0,
    maxCost: 1000
  });

  // Filter agents based on search and filters
  const filteredAgents = useMemo(() => {
    return aiAgents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agent.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization = filters.specialization === 'All Specializations' ||
                                   agent.specialization.toLowerCase().includes(filters.specialization.toLowerCase());

      const matchesLocation = filters.location === 'All Locations' ||
                             agent.location.includes(filters.location);

      const matchesRating = agent.rating >= filters.minRating;
      const matchesCost = agent.cost <= filters.maxCost;

      return matchesSearch && matchesSpecialization && matchesLocation && matchesRating && matchesCost;
    });
  }, [searchTerm, filters]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
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
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaComments className="text-2xl text-primary-600" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <FaHome className="text-lg" />
                  <span className="hidden sm:inline font-semibold">Home</span>
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">AI Agent Marketplace</h1>

              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-semibold text-gray-800">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or specialization..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Specialization Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold text-gray-700 min-w-[3rem]">
                    {filters.minRating.toFixed(1)} <FaStar className="inline text-yellow-500" />
                  </span>
                </div>
              </div>

              {/* Cost Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Cost ($/hr)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={filters.maxCost}
                    onChange={(e) => handleFilterChange('maxCost', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold text-gray-700 min-w-[4rem]">
                    ${filters.maxCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.specialization !== 'All Specializations' && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  {filters.specialization}
                  <button onClick={() => handleFilterChange('specialization', 'All Specializations')}>
                    <FaTimes className="hover:text-primary-900" />
                  </button>
                </span>
              )}
              {filters.location !== 'All Locations' && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  {filters.location}
                  <button onClick={() => handleFilterChange('location', 'All Locations')}>
                    <FaTimes className="hover:text-primary-900" />
                  </button>
                </span>
              )}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                  Rating ≥ {filters.minRating}
                  <button onClick={() => handleFilterChange('minRating', 0)}>
                    <FaTimes className="hover:text-primary-900" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <p className="text-gray-600">
              Found <span className="font-semibold text-primary-600">{filteredAgents.length}</span> AI agents
            </p>
          </div>

          {filteredAgents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No agents found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAgents.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => setSelectedAgent(agent)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agent Popup */}
      {selectedAgent && (
        <AgentPopup
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
