export interface AIAgent {
  id: string;
  name: string;
  specialization: string;
  location: string;
  cost: number;
  lastUpdated: string;
  rating: number;
  requestsServed: number;
  image: string;
  description: string;
}

export interface Conversation {
  id: string;
  agentId: string;
  agentName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'chart';
  fileUrl?: string;
  fileName?: string;
}

export const aiAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialization: 'Healthcare AI Specialist',
    location: 'New York, USA',
    cost: 150,
    lastUpdated: '2024-11-20',
    rating: 4.9,
    requestsServed: 1250,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop',
    description: 'Expert AI agent specialized in healthcare diagnostics, patient care optimization, and medical research analysis. With over 5 years of experience in the medical AI field, I provide accurate and reliable healthcare solutions.'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    specialization: 'Financial Analytics AI',
    location: 'Singapore',
    cost: 200,
    lastUpdated: '2024-11-22',
    rating: 4.8,
    requestsServed: 2100,
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=600&fit=crop',
    description: 'Advanced financial AI agent specializing in market analysis, investment strategies, risk assessment, and portfolio optimization. Leveraging cutting-edge algorithms to provide data-driven financial insights.'
  },
  {
    id: '3',
    name: 'Emma Watson AI',
    specialization: 'Legal Compliance Expert',
    location: 'London, UK',
    cost: 180,
    lastUpdated: '2024-11-23',
    rating: 4.7,
    requestsServed: 890,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    description: 'Specialized in legal document analysis, compliance checking, contract review, and regulatory guidance. Trained on international law databases to ensure comprehensive legal support.'
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    specialization: 'Software Development AI',
    location: 'San Francisco, USA',
    cost: 175,
    lastUpdated: '2024-11-24',
    rating: 4.9,
    requestsServed: 3200,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    description: 'Full-stack development AI assistant proficient in multiple programming languages, frameworks, and best practices. Specialized in code review, debugging, architecture design, and technical documentation.'
  },
  {
    id: '5',
    name: 'Dr. Yuki Tanaka',
    specialization: 'Data Science & ML',
    location: 'Tokyo, Japan',
    cost: 190,
    lastUpdated: '2024-11-21',
    rating: 4.8,
    requestsServed: 1800,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop',
    description: 'Expert in machine learning, deep learning, and statistical analysis. Specialized in building predictive models, data visualization, and extracting actionable insights from complex datasets.'
  },
  {
    id: '6',
    name: 'Isabella Rossi',
    specialization: 'Marketing & Brand Strategy',
    location: 'Milan, Italy',
    cost: 140,
    lastUpdated: '2024-11-23',
    rating: 4.6,
    requestsServed: 950,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop',
    description: 'Creative marketing AI specializing in brand strategy, content creation, social media optimization, and customer engagement analytics. Helping businesses grow their digital presence.'
  },
  {
    id: '7',
    name: 'David Park',
    specialization: 'Cybersecurity Expert',
    location: 'Seoul, South Korea',
    cost: 220,
    lastUpdated: '2024-11-24',
    rating: 4.9,
    requestsServed: 1400,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
    description: 'Advanced cybersecurity AI agent specialized in threat detection, vulnerability assessment, security audits, and incident response. Protecting your digital assets with state-of-the-art security measures.'
  },
  {
    id: '8',
    name: 'Sophia Anderson',
    specialization: 'Education & Training',
    location: 'Sydney, Australia',
    cost: 120,
    lastUpdated: '2024-11-22',
    rating: 4.7,
    requestsServed: 2500,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop',
    description: 'Educational AI focused on personalized learning, curriculum development, tutoring, and skill assessment. Making learning engaging and effective for students of all ages.'
  },
  {
    id: '9',
    name: 'Mohammed Ali',
    specialization: 'Supply Chain Optimization',
    location: 'Dubai, UAE',
    cost: 165,
    lastUpdated: '2024-11-20',
    rating: 4.8,
    requestsServed: 1100,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop',
    description: 'Expert in supply chain management, logistics optimization, inventory control, and demand forecasting. Streamlining operations for maximum efficiency and cost reduction.'
  },
  {
    id: '10',
    name: 'Olivia Schmidt',
    specialization: 'HR & Recruitment AI',
    location: 'Berlin, Germany',
    cost: 135,
    lastUpdated: '2024-11-23',
    rating: 4.6,
    requestsServed: 780,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop',
    description: 'HR AI specialist focused on talent acquisition, candidate screening, employee engagement, and workforce analytics. Helping organizations build stronger teams.'
  },
  {
    id: '11',
    name: 'Carlos Martinez',
    specialization: 'Real Estate Analytics',
    location: 'Barcelona, Spain',
    cost: 155,
    lastUpdated: '2024-11-21',
    rating: 4.7,
    requestsServed: 620,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    description: 'Real estate AI providing market analysis, property valuation, investment opportunities, and trend forecasting. Making informed real estate decisions easier.'
  },
  {
    id: '12',
    name: 'Amara Johnson',
    specialization: 'Customer Service AI',
    location: 'Toronto, Canada',
    cost: 110,
    lastUpdated: '2024-11-24',
    rating: 4.9,
    requestsServed: 4200,
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=600&fit=crop',
    description: 'Customer service excellence AI specialized in support automation, sentiment analysis, ticket management, and customer satisfaction optimization. Available 24/7 for your support needs.'
  }
];

export const demoConversations: Conversation[] = [
  {
    id: 'conv-1',
    agentId: '1',
    agentName: 'Dr. Sarah Mitchell',
    lastMessage: 'Based on the symptoms, I recommend...',
    timestamp: '2024-11-24T10:30:00',
    unread: 0
  },
  {
    id: 'conv-2',
    agentId: '2',
    agentName: 'Marcus Chen',
    lastMessage: 'The market analysis shows...',
    timestamp: '2024-11-23T15:45:00',
    unread: 2
  },
  {
    id: 'conv-3',
    agentId: '4',
    agentName: 'Alex Rodriguez',
    lastMessage: 'Here\'s the code review feedback...',
    timestamp: '2024-11-22T09:20:00',
    unread: 0
  }
];

export const demoMessages: { [key: string]: Message[] } = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      sender: 'user',
      content: 'Hello, I need help with patient diagnosis recommendations.',
      timestamp: '2024-11-24T10:00:00',
      type: 'text'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      sender: 'agent',
      content: 'Hello! I\'d be happy to help with diagnosis recommendations. Could you please provide me with the patient\'s symptoms and medical history?',
      timestamp: '2024-11-24T10:01:00',
      type: 'text'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      sender: 'user',
      content: 'Patient has persistent headaches and fatigue for the past two weeks.',
      timestamp: '2024-11-24T10:05:00',
      type: 'text'
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      sender: 'agent',
      content: 'Based on the symptoms, I recommend the following diagnostic approach:\n\n1. **Blood Tests**: Complete blood count (CBC) to check for anemia or infection\n2. **Blood Pressure Monitoring**: Rule out hypertension\n3. **Sleep Quality Assessment**: Evaluate sleep patterns\n4. **Neurological Examination**: If symptoms persist\n\nWould you like me to provide more detailed information about any of these recommendations?',
      timestamp: '2024-11-24T10:30:00',
      type: 'text'
    }
  ],
  'conv-2': [
    {
      id: 'msg-5',
      conversationId: 'conv-2',
      sender: 'user',
      content: 'Can you analyze the tech sector performance this quarter?',
      timestamp: '2024-11-23T15:00:00',
      type: 'text'
    },
    {
      id: 'msg-6',
      conversationId: 'conv-2',
      sender: 'agent',
      content: 'The market analysis shows strong performance in the tech sector. Here are the key findings:\n\n- **Overall Growth**: +12.5% this quarter\n- **AI/ML Companies**: Leading with +18.3% growth\n- **Cloud Services**: Steady at +10.2%\n- **Semiconductor Industry**: +15.7%\n\nWould you like a detailed breakdown of specific companies or sub-sectors?',
      timestamp: '2024-11-23T15:45:00',
      type: 'text'
    }
  ]
};

export const specializations = [
  'All Specializations',
  'Healthcare',
  'Financial Analytics',
  'Legal Compliance',
  'Software Development',
  'Data Science',
  'Marketing',
  'Cybersecurity',
  'Education',
  'Supply Chain',
  'HR & Recruitment',
  'Real Estate',
  'Customer Service'
];

export const locations = [
  'All Locations',
  'North America',
  'Europe',
  'Asia',
  'Middle East',
  'Australia'
];
