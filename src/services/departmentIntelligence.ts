import { 
  CareerRole, 
  SkillGapItem, 
  JobListing, 
  RoadmapMilestone 
} from '../types';

export interface DepartmentData {
  roles: CareerRole[];
  skillGaps: SkillGapItem[];
  jobs: JobListing[];
  roadmap: RoadmapMilestone[];
  suggestedQuestions: string[];
}

export const DEPARTMENT_INTELLIGENCE: Record<string, DepartmentData> = {
  'Agricultural Engineering': {
    roles: [
      {
        id: 'agri-1',
        title: 'Precision Agriculture Engineer',
        matchScore: 92,
        salaryRange: '₹6.5L - ₹14.0L',
        marketDemand: 'Very High',
        description: 'Design and deploy GPS-guided tractors, drone multispectral sensors, and automated drip irrigation systems.',
        requiredSkills: ['IoT in Agriculture', 'Precision Farming & GIS', 'Hydrology & Irrigation Automation', 'Sensor Telemetry', 'Drone Mapping'],
        currentSkills: ['Crop Production – II', 'Design of Farm Structures', 'Fluid Mechanics and Hydraulics for Agricultural Engineering'],
        missingSkills: ['Precision Farming & GIS', 'Hydrology & Irrigation Automation', 'IoT in Agriculture'],
        growthRate: '+24% YoY',
        openPositionsCount: 142
      },
      {
        id: 'agri-2',
        title: 'Farm Machinery & Tractor Systems Specialist',
        matchScore: 86,
        salaryRange: '₹5.5L - ₹12.0L',
        marketDemand: 'High',
        description: 'Lead mechanical design, powertrain efficiency, and field testing for automated tractors and harvesting machinery.',
        requiredSkills: ['Farm Tractors', 'Soil Dynamics in Tillage', 'AutoCAD Agri', 'Fluid Power Systems'],
        currentSkills: ['Fluid Mechanics and Hydraulics for Agricultural Engineering', 'Design of Farm Structures'],
        missingSkills: ['Farm Tractors', 'Post-Harvest Technology of Cereals, Pulses and Oil Seeds'],
        growthRate: '+16% YoY',
        openPositionsCount: 98
      },
      {
        id: 'agri-3',
        title: 'Irrigation & Watershed Management Engineer',
        matchScore: 80,
        salaryRange: '₹5.0L - ₹11.5L',
        marketDemand: 'High',
        description: 'Model groundwater basins, automated canal networks, and soil erosion mitigation for state & private agri-corridors.',
        requiredSkills: ['Hydrology and Irrigation Automation Engineering', 'Soil and Water Conservation Engineering', 'Remote Sensing and GIS'],
        currentSkills: ['Fluid Mechanics and Hydraulics for Agricultural Engineering', 'Crop Production – II'],
        missingSkills: ['Hydrology and Irrigation Automation Engineering', 'Remote Sensing and GIS'],
        growthRate: '+19% YoY',
        openPositionsCount: 115
      }
    ],
    skillGaps: [
      { skill: 'Hydrology and Irrigation Automation Engineering', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 42, recommendedCourse: 'Automated Micro-Irrigation & SCADA Sluice Design', difficulty: 'Intermediate' },
      { skill: 'Precision Farming & GIS Telemetry', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 50, recommendedCourse: 'Multispectral UAV Crop Scouting & GIS Mapping', difficulty: 'Advanced' },
      { skill: 'Post-Harvest Technology & Cold Chain Management', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 28, recommendedCourse: 'Fluidized Drying & Controlled Atmospheric Storage', difficulty: 'Intermediate' },
      { skill: 'Farm Tractors & Power Transmission', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Tractor Powertrain Dynamics & Hydraulic Hitching', difficulty: 'Intermediate' },
      { skill: 'IoT in Agriculture & Soil Sensors', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 30, recommendedCourse: 'LoRa Soil Moisture Sensing & Solar Automated Fertigation', difficulty: 'Beginner' }
    ],
    jobs: [
      {
        id: 'job-agri-1',
        title: 'Agricultural IoT & Automation Engineer',
        company: 'John Deere Technology Center',
        companyLogo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=100&auto=format&fit=crop&q=80',
        location: 'Pune, Maharashtra',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹8.5L - ₹12.5L / yr',
        matchPercentage: 92,
        requiredSkills: ['IoT in Agriculture', 'Precision Farming', 'Hydrology Automation', 'Farm Tractors'],
        missingSkills: ['Precision Farming'],
        description: 'Build next-gen autonomous tractor guidance, yield-monitoring telemetry, and intelligent spray boom controllers.',
        postedDaysAgo: 2,
        whyMatch: {
          matchingScore: 92,
          alignedSkills: ['IoT in Agriculture', 'Hydrology Automation'],
          strengthsNotes: 'Strong foundation in hydraulics and agricultural sensor integration.',
          gapSuggestions: 'Complete hands-on telemetry projects in GIS precision farming.'
        }
      },
      {
        id: 'job-agri-2',
        title: 'Irrigation Systems Design Engineer',
        company: 'Jain Irrigation Systems',
        companyLogo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&auto=format&fit=crop&q=80',
        location: 'Jalgaon / Remote',
        isRemote: true,
        type: 'Full-time',
        stipendOrSalary: '₹6.0L - ₹9.0L / yr',
        matchPercentage: 86,
        requiredSkills: ['Hydrology and Irrigation Automation Engineering', 'Soil and Water Conservation', 'Fluid Mechanics'],
        missingSkills: ['Hydrology and Irrigation Automation Engineering'],
        description: 'Design large-scale drip irrigation networks, solar pumping stations, and watershed conservation structures.',
        postedDaysAgo: 5,
        whyMatch: {
          matchingScore: 86,
          alignedSkills: ['Soil and Water Conservation', 'Fluid Mechanics'],
          strengthsNotes: 'High marks in fluid mechanics and farm structures design.',
          gapSuggestions: 'Practice automated hydraulic valve scripting and pipe network sizing.'
        }
      }
    ],
    roadmap: [
      { id: 'agri-m1', order: 1, title: 'Fluid Mechanics & Farm Structural Integrity', description: 'Master fluid dynamics, pipe hydraulics, and reinforced farm building structures.', skills: ['Fluid Mechanics', 'Design of Farm Structures'], status: 'completed', completionPercentage: 100, recommendedResources: ['Hydraulics in Agriculture', 'Structural Farm Design Standards'] },
      { id: 'agri-m2', order: 2, title: 'Tractor Powertrains & Post-Harvest Systems', description: 'Analyze internal combustion engines, tractor chassis dynamics, and cereal preservation technology.', skills: ['Farm Tractors', 'Post-Harvest Technology'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['Tractor Engineering Handbooks', 'Grain Storage Processing Protocols'] },
      { id: 'agri-m3', order: 3, title: 'Automated Irrigation & GIS Precision Agriculture', description: 'Deploy IoT telemetry, variable-rate fertilizer applicators, and automated drip networks.', skills: ['IoT in Agriculture', 'Precision Farming', 'Remote Sensing and GIS'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['QGIS for Crop Scouting', 'Smart Fertigation Systems'] }
    ],
    suggestedQuestions: [
      'What are the core technical interview questions for Precision Farming & Irrigation Automation?',
      'How do I explain tractor PTO dynamics and 3-point hitch hydraulics in an interview?',
      'What career opportunities exist in Agri-Tech IoT startups vs multinational equipment manufacturers?',
      'How is GIS and satellite remote sensing applied in crop yield estimation?'
    ]
  },

  'Civil Engineering': {
    roles: [
      {
        id: 'civ-1',
        title: 'Structural Design & Analysis Engineer',
        matchScore: 94,
        salaryRange: '₹6.0L - ₹15.0L',
        marketDemand: 'Very High',
        description: 'Analyze RCC and steel high-rise frames, seismic wind loads, and foundation footing conforming to IS 456 and IS 1893.',
        requiredSkills: ['Structural Analysis', 'Design of Reinforced Concrete Structures', 'STAAD.Pro', 'ETABS', 'Foundation Engineering'],
        currentSkills: ['Mechanics of Solids', 'Surveying', 'Fluid Mechanics'],
        missingSkills: ['Design of Reinforced Concrete Structures', 'Design of Steel Structures'],
        growthRate: '+18% YoY',
        openPositionsCount: 220
      },
      {
        id: 'civ-2',
        title: 'Geotechnical & Foundation Engineer',
        matchScore: 84,
        salaryRange: '₹5.5L - ₹12.5L',
        marketDemand: 'High',
        description: 'Perform soil compaction tests, deep pile foundation analysis, and retaining wall stability modeling.',
        requiredSkills: ['Geotechnical Engineering', 'Foundation Engineering', 'Soil Mechanics', 'Slope Stability Analysis'],
        currentSkills: ['Mechanics of Solids', 'Fluid Mechanics'],
        missingSkills: ['Geotechnical Engineering', 'Foundation Engineering'],
        growthRate: '+14% YoY',
        openPositionsCount: 130
      },
      {
        id: 'civ-3',
        title: 'BIM & Transportation Infrastructure Modeler',
        matchScore: 82,
        salaryRange: '₹6.5L - ₹13.0L',
        marketDemand: 'High',
        description: 'Coordinate 3D BIM models for highway flyovers, metro transit tunnels, and urban arterial corridors.',
        requiredSkills: ['Transportation Engineering', 'Highway Engineering', 'Revit BIM', 'Surveying & GIS', 'AutoCAD Civil 3D'],
        currentSkills: ['Surveying', 'Building Materials and Construction Technology'],
        missingSkills: ['Transportation Engineering', 'Revit BIM'],
        growthRate: '+22% YoY',
        openPositionsCount: 165
      }
    ],
    skillGaps: [
      { skill: 'Design of Reinforced Concrete Structures', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 45, recommendedCourse: 'Limit State Design of Beams, Slabs & Columns (IS 456)', difficulty: 'Intermediate' },
      { skill: 'STAAD.Pro / ETABS Multistory Analysis', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 40, recommendedCourse: '3D Seismic & Wind Load Simulation on High-Rise RCC', difficulty: 'Advanced' },
      { skill: 'Geotechnical Engineering & Deep Foundations', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Terzaghi Bearing Capacity & Driven Pile Mechanics', difficulty: 'Intermediate' },
      { skill: 'Highway & Transportation Engineering', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 28, recommendedCourse: 'Flexible Pavement Design & IRC Code Specifications', difficulty: 'Beginner' }
    ],
    jobs: [
      {
        id: 'job-civ-1',
        title: 'Junior Structural Design Engineer',
        company: 'Larsen & Toubro (L&T Construction)',
        companyLogo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=100&auto=format&fit=crop&q=80',
        location: 'Chennai / Mumbai',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹7.0L - ₹10.5L / yr',
        matchPercentage: 91,
        requiredSkills: ['Structural Analysis', 'Design of Reinforced Concrete Structures', 'AutoCAD', 'STAAD.Pro'],
        missingSkills: ['Design of Reinforced Concrete Structures'],
        description: 'Perform structural design verification and reinforcement detailing for metro rail stations and elevated viaducts.',
        postedDaysAgo: 3,
        whyMatch: {
          matchingScore: 91,
          alignedSkills: ['Mechanics of Solids', 'Surveying'],
          strengthsNotes: 'Solid understanding of bending moment diagrams and material mechanics.',
          gapSuggestions: 'Practice seismic load calculations in accordance with IS 1893.'
        }
      },
      {
        id: 'job-civ-2',
        title: 'Highway Project Engineer',
        company: 'Afcons Infrastructure',
        companyLogo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Hyderabad',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹6.2L - ₹8.8L / yr',
        matchPercentage: 85,
        requiredSkills: ['Transportation Engineering', 'Surveying', 'Quantity Surveying', 'Highway Engineering'],
        missingSkills: ['Transportation Engineering'],
        description: 'Supervise geometric alignment, sub-base compaction, and asphalt pavement laying for national highway packages.',
        postedDaysAgo: 4,
        whyMatch: {
          matchingScore: 85,
          alignedSkills: ['Surveying', 'Building Materials'],
          strengthsNotes: 'Hands-on total station and topographic survey competency.',
          gapSuggestions: 'Review IRC:37 guidelines for flexible pavement design.'
        }
      }
    ],
    roadmap: [
      { id: 'civ-m1', order: 1, title: 'Statics, Mechanics of Solids & Surveying', description: 'Master stress-strain tensors, shear force bending moment calculations, and total station traverse.', skills: ['Mechanics of Solids', 'Surveying'], status: 'completed', completionPercentage: 100, recommendedResources: ['Timoshenko Strength of Materials', 'Surveying Principles'] },
      { id: 'civ-m2', order: 2, title: 'RCC & Geotechnical Foundation Design', description: 'Design limit state reinforced concrete columns, two-way slabs, and shallow strip footings.', skills: ['Design of Reinforced Concrete Structures', 'Geotechnical Engineering'], status: 'in_progress', completionPercentage: 60, recommendedResources: ['IS 456 Handbook', 'Soil Mechanics Fundamentals'] },
      { id: 'civ-m3', order: 3, title: 'Steel Frames, Transportation & Seismic Modeling', description: 'Model multi-bay industrial trusses, high-speed highway curves, and dynamic earthquake response.', skills: ['Design of Steel Structures', 'Transportation Engineering', 'Structural Analysis'], status: 'upcoming', completionPercentage: 25, recommendedResources: ['IS 800 Steel Design', 'STAAD.Pro Reference Manual'] }
    ],
    suggestedQuestions: [
      'What are the key differences between Working Stress Method (WSM) and Limit State Method (LSM)?',
      'How do I calculate development length and shear reinforcement for a continuous RCC beam?',
      'What are the standard soil tests used to determine safe bearing capacity (SBC)?',
      'Explain the significance of superelevation in highway geometric design.'
    ]
  },

  'Computer Science and Engineering (CSE)': {
    roles: [
      {
        id: 'cse-1',
        title: 'Backend Systems & Distributed Engineer',
        matchScore: 94,
        salaryRange: '₹10.0L - ₹26.0L',
        marketDemand: 'Very High',
        description: 'Build low-latency microservices, concurrent database pipelines, and high-throughput distributed systems in Java/Go/Python.',
        requiredSkills: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Distributed Systems'],
        currentSkills: ['Data Structures and Algorithms', 'Object-Oriented Programming', 'Database Management Systems'],
        missingSkills: ['Distributed Systems', 'Cloud Native Architecture'],
        growthRate: '+26% YoY',
        openPositionsCount: 380
      },
      {
        id: 'cse-2',
        title: 'Full Stack Software Engineer',
        matchScore: 90,
        salaryRange: '₹8.0L - ₹20.0L',
        marketDemand: 'Very High',
        description: 'Develop responsive single-page web applications with modern frontend frameworks and robust REST/GraphQL backend APIs.',
        requiredSkills: ['Full Stack Web Development', 'Database Management Systems', 'Software Engineering', 'REST APIs', 'TypeScript/React'],
        currentSkills: ['Object-Oriented Programming', 'Database Management Systems', 'Software Engineering'],
        missingSkills: ['Cloud Infrastructure', 'Docker'],
        growthRate: '+21% YoY',
        openPositionsCount: 340
      },
      {
        id: 'cse-3',
        title: 'Systems & Compilers Engineer',
        matchScore: 82,
        salaryRange: '₹12.0L - ₹28.0L',
        marketDemand: 'High',
        description: 'Optimize compiler code generation, thread scheduling, and kernel memory managers for multicore processors.',
        requiredSkills: ['Compiler Design', 'Operating Systems', 'Computer Architecture', 'C/C++', 'Linux Kernel Internals'],
        currentSkills: ['Computer Architecture', 'Operating Systems', 'Data Structures and Algorithms'],
        missingSkills: ['Compiler Design'],
        growthRate: '+15% YoY',
        openPositionsCount: 95
      }
    ],
    skillGaps: [
      { skill: 'Distributed Systems & Microservices', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 40, recommendedCourse: 'Raft Consensus, Sharding & CAP Theorem in Practice', difficulty: 'Advanced' },
      { skill: 'Compiler Design & AST Optimization', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 45, recommendedCourse: 'Lexical Parsing, LLVM IR & Code Generation', difficulty: 'Advanced' },
      { skill: 'Advanced Database Query Tuning & Sharding', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'B+ Tree Indexing & ACID Isolation Levels', difficulty: 'Intermediate' },
      { skill: 'Network Socket Programming & Protocols', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 20, recommendedCourse: 'TCP Congestion Control & Asynchronous I/O', difficulty: 'Intermediate' }
    ],
    jobs: [
      {
        id: 'job-cse-1',
        title: 'Software Development Engineer I (Backend)',
        company: 'Amazon Web Services (AWS)',
        companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Hyderabad',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹18.0L - ₹24.0L / yr',
        matchPercentage: 94,
        requiredSkills: ['Data Structures and Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks'],
        missingSkills: ['Distributed Systems'],
        description: 'Design highly scalable asynchronous distributed services supporting millions of active AWS enterprise customers.',
        postedDaysAgo: 1,
        whyMatch: {
          matchingScore: 94,
          alignedSkills: ['Data Structures', 'Operating Systems', 'DBMS'],
          strengthsNotes: 'Exceptional algorithmic foundation and core systems knowledge.',
          gapSuggestions: 'Practice multi-threaded synchronization and distributed caching problems.'
        }
      },
      {
        id: 'job-cse-2',
        title: 'Full Stack Engineer (Platform)',
        company: 'Atlassian',
        companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Remote',
        isRemote: true,
        type: 'Full-time',
        stipendOrSalary: '₹14.0L - ₹20.0L / yr',
        matchPercentage: 88,
        requiredSkills: ['Full Stack Web Development', 'Database Management Systems', 'REST APIs', 'Software Engineering'],
        missingSkills: ['Cloud Native Architecture'],
        description: 'Engineer high-throughput collaboration tools, real-time sync engines, and modular web interfaces.',
        postedDaysAgo: 3,
        whyMatch: {
          matchingScore: 88,
          alignedSkills: ['Software Engineering', 'DBMS'],
          strengthsNotes: 'Strong software engineering design patterns and clean code practices.',
          gapSuggestions: 'Build hands-on projects showcasing Docker containerization and CI/CD pipelines.'
        }
      }
    ],
    roadmap: [
      { id: 'cse-m1', order: 1, title: 'Data Structures, OOP & Computer Architecture', description: 'Master linked lists, balanced trees, graph traversal, and cache hierarchy mechanics.', skills: ['Data Structures and Algorithms', 'Computer Architecture'], status: 'completed', completionPercentage: 100, recommendedResources: ['CLRS Algorithms', 'Patterson & Hennessy Architecture'] },
      { id: 'cse-m2', order: 2, title: 'OS Internals, Database Engines & Networking', description: 'Implement process schedulers, relational normalization, and TCP socket protocols.', skills: ['Operating Systems', 'Database Management Systems', 'Computer Networks'], status: 'in_progress', completionPercentage: 75, recommendedResources: ['Silberschatz OS', 'Kurose Ross Networking'] },
      { id: 'cse-m3', order: 3, title: 'Compiler Construction, Cloud & Distributed Scale', description: 'Construct syntax trees, semantic analyzers, and distributed consensus services.', skills: ['Compiler Design', 'Distributed Systems'], status: 'upcoming', completionPercentage: 30, recommendedResources: ['Dragon Book for Compilers', 'Designing Data-Intensive Applications'] }
    ],
    suggestedQuestions: [
      'Explain virtual memory, paging, and how page faults are handled by the Operating System.',
      'How does the TCP 3-way handshake work, and what happens during connection teardown?',
      'Compare B-Tree and Hash Indexing in PostgreSQL: tradeoffs and query performance.',
      'How would you design a distributed rate limiter for high-traffic API gateways?'
    ]
  },

  'Electrical and Electronics Engineering (EEE)': {
    roles: [
      {
        id: 'eee-1',
        title: 'Power Systems & Smart Grid Engineer',
        matchScore: 92,
        salaryRange: '₹6.5L - ₹15.0L',
        marketDemand: 'Very High',
        description: 'Design substation protection networks, transmission line load flow models, and smart grid automation architectures.',
        requiredSkills: ['Transmission and Distribution', 'Power System Analysis', 'Power System Operation and Control', 'Protection and Switchgear'],
        currentSkills: ['Electric Circuit Analysis', 'Electromagnetic Fields', 'Electrical Machines – I'],
        missingSkills: ['Power System Analysis', 'Power Electronics'],
        growthRate: '+19% YoY',
        openPositionsCount: 175
      },
      {
        id: 'eee-2',
        title: 'EV Powertrain & Power Electronics Engineer',
        matchScore: 88,
        salaryRange: '₹8.0L - ₹18.0L',
        marketDemand: 'Very High',
        description: 'Design DC-DC converters, motor inverters (SVPWM), and battery management systems for electric vehicles.',
        requiredSkills: ['Power Electronics', 'Electrical Machines – II', 'Control Systems', 'MATLAB/Simulink', 'BMS'],
        currentSkills: ['Electric Circuit Analysis', 'Electrical Machines – I'],
        missingSkills: ['Power Electronics', 'Control Systems'],
        growthRate: '+31% YoY',
        openPositionsCount: 210
      },
      {
        id: 'eee-3',
        title: 'Industrial Automation & PLC/SCADA Specialist',
        matchScore: 82,
        salaryRange: '₹5.5L - ₹12.0L',
        marketDemand: 'High',
        description: 'Implement automated manufacturing lines, VFD drives, and distributed control systems (DCS).',
        requiredSkills: ['Control Systems', 'Protection and Switchgear', 'PLC Ladder Logic', 'SCADA'],
        currentSkills: ['Electric Circuit Analysis', 'Electromagnetic Fields'],
        missingSkills: ['Control Systems', 'Protection and Switchgear'],
        growthRate: '+14% YoY',
        openPositionsCount: 140
      }
    ],
    skillGaps: [
      { skill: 'Power Electronics Inverter Modulation (PWM/SVPWM)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 42, recommendedCourse: 'Switched-Mode Converters & Inverter Control Topologies', difficulty: 'Intermediate' },
      { skill: 'Power System Fault Analysis & Symmetrical Components', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 38, recommendedCourse: 'Z-Bus Formation, Short Circuit & Stability Studies', difficulty: 'Advanced' },
      { skill: 'Control Systems State-Space & Bode Stability', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 30, recommendedCourse: 'Root Locus, Nyquist Criterion & PID Tuning', difficulty: 'Intermediate' },
      { skill: 'Protection Relays & Digital Switchgear', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'Differential & Distance Relay Coordination', difficulty: 'Intermediate' }
    ],
    jobs: [
      {
        id: 'job-eee-1',
        title: 'Power Electronics Design Engineer',
        company: 'Schneider Electric R&D',
        companyLogo: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹9.0L - ₹13.5L / yr',
        matchPercentage: 90,
        requiredSkills: ['Power Electronics', 'Electric Circuit Analysis', 'Control Systems', 'Electrical Machines'],
        missingSkills: ['Power Electronics'],
        description: 'Architect high-efficiency grid-tied solar inverters, active power filters, and three-phase UPS topologies.',
        postedDaysAgo: 2,
        whyMatch: {
          matchingScore: 90,
          alignedSkills: ['Circuit Analysis', 'Machines I'],
          strengthsNotes: 'Strong foundation in electromagnetic circuit laws and transformer theory.',
          gapSuggestions: 'Simulate boost converters and H-bridge inverters in MATLAB/Simulink.'
        }
      },
      {
        id: 'job-eee-2',
        title: 'EV Traction Motor & Drive Specialist',
        company: 'Tata Motors EV Division',
        companyLogo: 'https://images.unsplash.com/photo-1558441719-8b489c634a10?w=100&auto=format&fit=crop&q=80',
        location: 'Pune / Bengaluru',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹8.5L - ₹14.0L / yr',
        matchPercentage: 86,
        requiredSkills: ['Electrical Machines – II', 'Power Electronics', 'Control Systems'],
        missingSkills: ['Control Systems'],
        description: 'Design field-oriented control (FOC) algorithms for permanent magnet synchronous motors (PMSM) in passenger EVs.',
        postedDaysAgo: 4,
        whyMatch: {
          matchingScore: 86,
          alignedSkills: ['Machines I & II'],
          strengthsNotes: 'Thorough understanding of AC machine windings and synchronous reactances.',
          gapSuggestions: 'Practice closed-loop current controller tuning for PMSM drives.'
        }
      }
    ],
    roadmap: [
      { id: 'eee-m1', order: 1, title: 'Circuits, Electromagnetics & Transformer Machines', description: 'Analyze RLC frequency response, Maxwell laws, and DC/transformer performance characteristics.', skills: ['Electric Circuit Analysis', 'Electromagnetic Fields', 'Electrical Machines – I'], status: 'completed', completionPercentage: 100, recommendedResources: ['Alexander Sadiku Circuit Analysis', 'Fitzgerald Electric Machinery'] },
      { id: 'eee-m2', order: 2, title: 'AC Machines, Power Electronics & Feedback Control', description: 'Model induction motors, synchronous generators, MOSFET/IGBT switching, and transfer functions.', skills: ['Electrical Machines – II', 'Power Electronics', 'Control Systems'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['Ned Mohan Power Electronics', 'Ogata Modern Control'] },
      { id: 'eee-m3', order: 3, title: 'Power System Operation, Relays & Grid Modernization', description: 'Execute load flow studies, numerical protection coordination, and smart grid synchronization.', skills: ['Power System Analysis', 'Protection and Switchgear'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['Nagrath Kothari Power Systems', 'Substation Automation Standards'] }
    ],
    suggestedQuestions: [
      'Explain the working principle of Space Vector Pulse Width Modulation (SVPWM) versus Sinusoidal PWM.',
      'How does back-EMF govern torque and speed characteristics in a brushless DC or PMSM motor?',
      'Describe the operation of differential protection for a 132kV power transformer.',
      'What is the purpose of Equal Area Criterion in assessing transient power system stability?'
    ]
  },

  'Electronics and Communication Engineering (ECE)': {
    roles: [
      {
        id: 'ece-1',
        title: 'Embedded Firmware & IoT Systems Engineer',
        matchScore: 92,
        salaryRange: '₹7.5L - ₹18.0L',
        marketDemand: 'Very High',
        description: 'Write bare-metal and RTOS firmware in C/C++ for ARM Cortex-M microcontrollers, BLE, and sensor integration.',
        requiredSkills: ['Microprocessors and Microcontrollers', 'Signals and Systems', 'Embedded Systems', 'Digital Electronics', 'FreeRTOS'],
        currentSkills: ['Electronic Devices', 'Digital Electronics', 'Signals and Systems'],
        missingSkills: ['Microprocessors and Microcontrollers', 'Embedded Systems'],
        growthRate: '+23% YoY',
        openPositionsCount: 290
      },
      {
        id: 'ece-2',
        title: 'RF & Wireless Communication Engineer',
        matchScore: 86,
        salaryRange: '₹8.0L - ₹19.0L',
        marketDemand: 'High',
        description: 'Design antennas, RF front-ends, and 5G cellular communication channels adhering to 3GPP protocols.',
        requiredSkills: ['Electromagnetic Fields and Waves', 'Antennas and Microwave Engineering', 'Wireless Communication', 'Digital Signal Processing'],
        currentSkills: ['Electronic Devices', 'Signals and Systems'],
        missingSkills: ['Antennas and Microwave Engineering', 'Wireless Communication'],
        growthRate: '+17% YoY',
        openPositionsCount: 180
      },
      {
        id: 'ece-3',
        title: 'DSP & Audio/Vision Processing Engineer',
        matchScore: 82,
        salaryRange: '₹8.5L - ₹20.0L',
        marketDemand: 'High',
        description: 'Implement real-time digital filtering, FFT algorithms, and acoustic beamforming on dedicated DSP chips.',
        requiredSkills: ['Digital Signal Processing', 'Signals and Systems', 'MATLAB/C++', 'Fixed-Point Arithmetic'],
        currentSkills: ['Signals and Systems', 'Digital Electronics'],
        missingSkills: ['Digital Signal Processing'],
        growthRate: '+15% YoY',
        openPositionsCount: 120
      }
    ],
    skillGaps: [
      { skill: 'Microprocessors & ARM Cortex-M Firmware', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 40, recommendedCourse: 'Bare-Metal STM32 Register-Level Drivers & Interrupts', difficulty: 'Intermediate' },
      { skill: 'Digital Signal Processing (FIR/IIR & FFT)', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Real-Time DSP Filter Design & Fixed-Point Quantization', difficulty: 'Intermediate' },
      { skill: 'Antennas & Microwave Waveguide Analysis', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 42, recommendedCourse: 'Microstrip Patch Design, S-Parameters & HFSS Simulation', difficulty: 'Advanced' },
      { skill: '5G Wireless Communication & OFDM Modulation', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 30, recommendedCourse: 'MIMO Channel Capacity, QAM Constellations & Multipath Fading', difficulty: 'Intermediate' }
    ],
    jobs: [
      {
        id: 'job-ece-1',
        title: 'Embedded Systems Engineer (Firmware)',
        company: 'Qualcomm India',
        companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Hyderabad',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹14.0L - ₹21.0L / yr',
        matchPercentage: 91,
        requiredSkills: ['Microprocessors and Microcontrollers', 'Signals and Systems', 'Embedded C', 'Digital Electronics'],
        missingSkills: ['Microprocessors and Microcontrollers'],
        description: 'Develop low-level device drivers, power-saving sleep modes, and I2C/SPI/UART interfaces for Snapdragon platforms.',
        postedDaysAgo: 2,
        whyMatch: {
          matchingScore: 91,
          alignedSkills: ['Digital Electronics', 'Signals and Systems'],
          strengthsNotes: 'Strong foundation in logic gates, state machines, and sampling theorems.',
          gapSuggestions: 'Implement FreeRTOS task synchronization queues on an STM32 development board.'
        }
      },
      {
        id: 'job-ece-2',
        title: 'RF & Antenna Design Engineer',
        company: 'Tejas Networks',
        companyLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹9.0L - ₹15.0L / yr',
        matchPercentage: 85,
        requiredSkills: ['Electromagnetic Fields and Waves', 'Antennas and Microwave Engineering', 'Wireless Communication'],
        missingSkills: ['Antennas and Microwave Engineering'],
        description: 'Design phased array antennas and RF transceiver front-ends for high-capacity 5G optical-wireless backhaul routers.',
        postedDaysAgo: 5,
        whyMatch: {
          matchingScore: 85,
          alignedSkills: ['EM Fields and Waves'],
          strengthsNotes: 'Clear mathematical grasp of wave polarization, Poynting vector, and skin depth.',
          gapSuggestions: 'Simulate microstrip return loss (S11) and Smith Chart impedance matching.'
        }
      }
    ],
    roadmap: [
      { id: 'ece-m1', order: 1, title: 'Semiconductors, Digital Logic & Signal Mathematics', description: 'Master BJT/MOSFET models, boolean simplification, and continuous-time Fourier transforms.', skills: ['Electronic Devices', 'Digital Electronics', 'Signals and Systems'], status: 'completed', completionPercentage: 100, recommendedResources: ['Sedra Smith Microelectronics', 'Oppenheim Signals and Systems'] },
      { id: 'ece-m2', order: 2, title: 'Embedded Controllers, DSP & Electromagnetics', description: 'Program microcontrollers, design IIR/FIR filters, and analyze transmission line reflection.', skills: ['Microprocessors and Microcontrollers', 'Digital Signal Processing', 'Electromagnetic Fields and Waves'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['The 8051 & ARM Architecture', 'Proakis Digital Signal Processing'] },
      { id: 'ece-m3', order: 3, title: 'Antennas, Wireless Networks & Optical Comms', description: 'Synthesize radiation patterns, simulate OFDM 5G links, and analyze fiber chromatic dispersion.', skills: ['Antennas and Microwave Engineering', 'Wireless Communication', 'Optical Communication'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['Balanis Antenna Theory', 'Rappaport Wireless Communications'] }
    ],
    suggestedQuestions: [
      'Explain the Nyquist-Shannon sampling theorem and the necessity of anti-aliasing low-pass filters.',
      'How does an I2C communication protocol handle clock stretching and multi-master bus arbitration?',
      'What is the difference between circular and linear antenna polarization in satellite links?',
      'Derive the frequency response of a bilinear transformed Butterworth IIR filter.'
    ]
  },

  'Mechanical Engineering': {
    roles: [
      {
        id: 'mech-1',
        title: 'Mechanical Design & CAE/FEA Simulation Engineer',
        matchScore: 92,
        salaryRange: '₹6.0L - ₹15.0L',
        marketDemand: 'Very High',
        description: 'Model parametric mechanical assemblies in 3D CAD and execute non-linear stress, thermal, and fatigue simulations.',
        requiredSkills: ['Design of Machine Elements', 'SolidWorks/CATIA', 'ANSYS FEA', 'Engineering Mechanics', 'Mechanics of Materials'],
        currentSkills: ['Engineering Mechanics', 'Thermodynamics', 'Fluid Mechanics and Machinery'],
        missingSkills: ['Design of Machine Elements', 'Finite Element Analysis'],
        growthRate: '+16% YoY',
        openPositionsCount: 230
      },
      {
        id: 'mech-2',
        title: 'Thermal & CFD Fluid Systems Engineer',
        matchScore: 88,
        salaryRange: '₹6.5L - ₹16.0L',
        marketDemand: 'High',
        description: 'Design heat exchangers, HVAC cooling loops, and aerodynamic flow ducting using computational fluid dynamics.',
        requiredSkills: ['Thermodynamics', 'Heat and Mass Transfer', 'Fluid Mechanics and Machinery', 'CFD Simulation (ANSYS Fluent)'],
        currentSkills: ['Thermodynamics', 'Fluid Mechanics and Machinery'],
        missingSkills: ['Heat and Mass Transfer'],
        growthRate: '+18% YoY',
        openPositionsCount: 160
      },
      {
        id: 'mech-3',
        title: 'Manufacturing & Robotics Automation Specialist',
        matchScore: 84,
        salaryRange: '₹5.5L - ₹13.0L',
        marketDemand: 'High',
        description: 'Optimize CNC machining toolpaths, GD&T tolerancing, robotic weld cells, and automotive production lines.',
        requiredSkills: ['Manufacturing Technology', 'Design of Transmission Systems', 'Mechatronics', 'GD&T', 'CNC Programming'],
        currentSkills: ['Manufacturing Technology', 'Engineering Mechanics'],
        missingSkills: ['Design of Transmission Systems', 'Mechatronics'],
        growthRate: '+15% YoY',
        openPositionsCount: 195
      }
    ],
    skillGaps: [
      { skill: 'Design of Machine Elements & Fatigue Life', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 44, recommendedCourse: 'Soderberg / Goodman Fatigue Criteria & Shaft/Bearing Sizing', difficulty: 'Intermediate' },
      { skill: 'Heat and Mass Transfer & Convective Cooling', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 38, recommendedCourse: 'Boundary Layer Convection, LMTD & NTU Heat Exchanger Sizing', difficulty: 'Intermediate' },
      { skill: 'FEA Stress Modeling in ANSYS', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 32, recommendedCourse: 'Mesh Convergence, Non-Linear Contact & Von Mises Yield Analysis', difficulty: 'Advanced' },
      { skill: 'Design of Transmission Systems (Gears & Belts)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 30, recommendedCourse: 'Spur/Helical Gear Design & Lewis Bending Equations', difficulty: 'Intermediate' }
    ],
    jobs: [
      {
        id: 'job-mech-1',
        title: 'CAE & Structural Simulation Engineer',
        company: 'Mahindra & Mahindra R&D',
        companyLogo: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=100&auto=format&fit=crop&q=80',
        location: 'Chennai / Pune',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹7.5L - ₹11.5L / yr',
        matchPercentage: 91,
        requiredSkills: ['Design of Machine Elements', 'Engineering Mechanics', 'Mechanics of Materials', 'ANSYS FEA'],
        missingSkills: ['Design of Machine Elements'],
        description: 'Perform crashworthiness, chassis structural integrity, and durability fatigue calculations for modern SUV architectures.',
        postedDaysAgo: 2,
        whyMatch: {
          matchingScore: 91,
          alignedSkills: ['Mechanics of Materials', 'Engineering Mechanics'],
          strengthsNotes: 'High marks in solid mechanics, stress tensors, and Mohr circle transformations.',
          gapSuggestions: 'Practice multi-body dynamic meshing and cyclic fatigue validation.'
        }
      },
      {
        id: 'job-mech-2',
        title: 'Thermal Systems Design Engineer',
        company: 'Thermax Limited',
        companyLogo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&auto=format&fit=crop&q=80',
        location: 'Pune, Maharashtra',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹6.5L - ₹9.5L / yr',
        matchPercentage: 86,
        requiredSkills: ['Thermodynamics', 'Heat and Mass Transfer', 'Fluid Mechanics and Machinery'],
        missingSkills: ['Heat and Mass Transfer'],
        description: 'Design industrial steam boilers, waste heat recovery shell-and-tube exchangers, and gas turbine exhaust systems.',
        postedDaysAgo: 4,
        whyMatch: {
          matchingScore: 86,
          alignedSkills: ['Thermodynamics', 'Fluid Mechanics'],
          strengthsNotes: 'Strong foundation in Rankine cycles, enthalpy balances, and fluid friction losses.',
          gapSuggestions: 'Study multiphase boiling heat transfer and NTU efficiency equations.'
        }
      }
    ],
    roadmap: [
      { id: 'mech-m1', order: 1, title: 'Mechanics, Thermodynamics & Fluid Dynamics', description: 'Analyze rigid body equilibrium, thermodynamic steam cycles, and Bernoulli pipe friction.', skills: ['Engineering Mechanics', 'Thermodynamics', 'Fluid Mechanics and Machinery'], status: 'completed', completionPercentage: 100, recommendedResources: ['Beer & Johnston Vector Mechanics', 'Cengel Thermodynamics'] },
      { id: 'mech-m2', order: 2, title: 'Machine Elements, Heat Transfer & Kinematics', description: 'Size bolted joints, compute heat exchanger surface areas, and analyze cam-follower dynamics.', skills: ['Design of Machine Elements', 'Heat and Mass Transfer', 'Kinematics of Machinery'], status: 'in_progress', completionPercentage: 60, recommendedResources: ['Shigley Mechanical Engineering Design', 'Incropera Heat Transfer'] },
      { id: 'mech-m3', order: 3, title: 'Transmission Gears, Mechatronics & FEA', description: 'Design epicyclic gear trains, implement PLC electro-pneumatics, and simulate 3D FEA stress.', skills: ['Design of Transmission Systems', 'Mechatronics'], status: 'upcoming', completionPercentage: 25, recommendedResources: ['Bhandari Design of Machine Elements', 'ANSYS Verification Guide'] }
    ],
    suggestedQuestions: [
      'Explain the difference between Von Mises and Tresca yield criteria for ductile materials.',
      'How do you calculate the critical speed of a rotating shaft subjected to gyroscopic forces?',
      'Describe the significance of the Prandtl and Nusselt dimensionless numbers in forced convection.',
      'How does GD&T True Position differ from conventional coordinate dimensioning?'
    ]
  },

  'Biomedical Engineering (BME)': {
    roles: [
      {
        id: 'bme-1',
        title: 'Medical Device R&D & Instrumentation Engineer',
        matchScore: 92,
        salaryRange: '₹6.5L - ₹15.0L',
        marketDemand: 'Very High',
        description: 'Develop patient monitoring systems, biosensor acquisition front-ends, and diagnostic medical equipment adhering to FDA/ISO 13485.',
        requiredSkills: ['Biomedical Instrumentation', 'Sensors and Measurements in Healthcare', 'Physiological Modeling', 'Medical Device Regulatory'],
        currentSkills: ['Human Anatomy and Physiology', 'Biochemistry', 'Biomedical Electronic Devices'],
        missingSkills: ['Biomedical Instrumentation', 'Diagnostic and Therapeutic Equipment'],
        growthRate: '+22% YoY',
        openPositionsCount: 155
      },
      {
        id: 'bme-2',
        title: 'Biosignal Processing & AI Diagnostics Specialist',
        matchScore: 86,
        salaryRange: '₹7.5L - ₹17.0L',
        marketDemand: 'High',
        description: 'Engineer real-time filtering, wavelet decomposition, and arrhythmia detection algorithms for ECG/EEG/EMG signals.',
        requiredSkills: ['Biosignal Processing', 'Biomedical Signal Analysis', 'Digital Signal Processing', 'MATLAB/Python'],
        currentSkills: ['Biomedical Electronic Devices', 'Human Anatomy and Physiology'],
        missingSkills: ['Biosignal Processing'],
        growthRate: '+26% YoY',
        openPositionsCount: 125
      },
      {
        id: 'bme-3',
        title: 'Biomechanics & Orthopedic Implants Designer',
        matchScore: 80,
        salaryRange: '₹6.0L - ₹13.5L',
        marketDemand: 'High',
        description: 'Design biocompatible titanium joint implants, prosthetic limbs, and surgical instruments using CAD & FEA.',
        requiredSkills: ['Biomechanics', 'Biomaterials and Artificial Organs', 'SolidWorks CAD', 'FEA Biomechanics'],
        currentSkills: ['Human Anatomy and Physiology', 'Biochemistry'],
        missingSkills: ['Biomechanics', 'Biomaterials and Artificial Organs'],
        growthRate: '+18% YoY',
        openPositionsCount: 95
      }
    ],
    skillGaps: [
      { skill: 'Biomedical Instrumentation & Analog Isolation', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 42, recommendedCourse: 'Instrumentation Amplifiers, Right-Leg Drive & Defibrillator Protection', difficulty: 'Intermediate' },
      { skill: 'Biosignal Processing & Wavelet Feature Extraction', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 38, recommendedCourse: 'Pan-Tompkins QRS Detection & Bandpass Filtering in Python', difficulty: 'Advanced' },
      { skill: 'Medical Image Processing & DICOM Segmentation', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 32, recommendedCourse: 'CT/MRI Thresholding, Morphological Operations & 3D Reconstruction', difficulty: 'Intermediate' },
      { skill: 'Biomaterials Biocompatibility & ISO 10993', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'Cytotoxicity, Hemocompatibility & Degradation Testing of Implants', difficulty: 'Beginner' }
    ],
    jobs: [
      {
        id: 'job-bme-1',
        title: 'Biomedical Systems Design Engineer',
        company: 'GE Healthcare Technologies',
        companyLogo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹9.0L - ₹14.5L / yr',
        matchPercentage: 90,
        requiredSkills: ['Biomedical Instrumentation', 'Biomedical Electronic Devices', 'Sensors and Measurements in Healthcare'],
        missingSkills: ['Biomedical Instrumentation'],
        description: 'Architect analog front-end telemetry and biosensor hardware for bedside multi-parameter patient vital sign monitors.',
        postedDaysAgo: 3,
        whyMatch: {
          matchingScore: 90,
          alignedSkills: ['Electronic Devices', 'Human Anatomy'],
          strengthsNotes: 'Deep understanding of bioelectric potentials and action potential generation.',
          gapSuggestions: 'Design a high CMRR instrumentation amplifier circuit with 50Hz notch filter.'
        }
      },
      {
        id: 'job-bme-2',
        title: 'Biosignal Algorithm Engineer',
        company: 'Philips Innovation Campus',
        companyLogo: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Remote',
        isRemote: true,
        type: 'Full-time',
        stipendOrSalary: '₹8.5L - ₹13.0L / yr',
        matchPercentage: 85,
        requiredSkills: ['Biosignal Processing', 'Medical Image Processing', 'MATLAB/Python'],
        missingSkills: ['Biosignal Processing'],
        description: 'Implement automated sleep apnea detection and SpO2 photoplethysmogram (PPG) motion artifact removal algorithms.',
        postedDaysAgo: 5,
        whyMatch: {
          matchingScore: 85,
          alignedSkills: ['Biomedical Electronics'],
          strengthsNotes: 'Good mathematical foundation in Fourier analysis and discrete signals.',
          gapSuggestions: 'Build hands-on Python scripts analyzing PhysioNet MIT-BIH arrhythmia databases.'
        }
      }
    ],
    roadmap: [
      { id: 'bme-m1', order: 1, title: 'Anatomy, Bioelectric Signals & Electronics', description: 'Master physiological systems, cellular action potentials, and operational amplifier front-ends.', skills: ['Human Anatomy and Physiology', 'Biomedical Electronic Devices'], status: 'completed', completionPercentage: 100, recommendedResources: ['Guyton Medical Physiology', 'Webster Medical Instrumentation'] },
      { id: 'bme-m2', order: 2, title: 'Biosignals, Transducers & Clinical Equipment', description: 'Design active electrode filters, ultrasound piezotransducers, and dialysis circuitry.', skills: ['Biomedical Instrumentation', 'Biosignal Processing', 'Sensors and Measurements in Healthcare'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['Rangayyan Biomedical Signal Analysis', 'Khandpur Handbook of Biomedical Instrumentation'] },
      { id: 'bme-m3', order: 3, title: 'Medical Imaging, Biomaterials & Regulatory', description: 'Process MRI/CT slices, formulate bioactive polymers, and prepare FDA 510(k) submissions.', skills: ['Medical Image Processing', 'Biomaterials and Artificial Organs', 'Diagnostic and Therapeutic Equipment'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['Bushberg Essential Physics of Medical Imaging', 'ISO 13485 Standard'] }
    ],
    suggestedQuestions: [
      'Explain how a Wilson Central Terminal (WCT) is generated in standard 12-lead electrocardiography.',
      'How does an instrumentation amplifier achieve ultra-high Common Mode Rejection Ratio (CMRR)?',
      'What are the physiological causes and mitigation techniques for motion artifacts in pulse oximetry?',
      'Describe the criteria for biocompatibility testing according to ISO 10993 standards.'
    ]
  },

  'Information Technology (IT)': {
    roles: [
      {
        id: 'it-1',
        title: 'Cloud Infrastructure & DevOps Engineer',
        matchScore: 94,
        salaryRange: '₹9.0L - ₹22.0L',
        marketDemand: 'Very High',
        description: 'Architect multi-region AWS/Azure infrastructure, automated Terraform CI/CD pipelines, and Kubernetes clusters.',
        requiredSkills: ['Cloud Computing', 'Computer Networks', 'Information Security', 'DevOps / Docker', 'Linux Administration'],
        currentSkills: ['Data Structures and Algorithms', 'Database Systems', 'Object Oriented Programming'],
        missingSkills: ['Cloud Computing', 'Information Security'],
        growthRate: '+28% YoY',
        openPositionsCount: 360
      },
      {
        id: 'it-2',
        title: 'Enterprise Web Application Architect',
        matchScore: 88,
        salaryRange: '₹8.0L - ₹19.0L',
        marketDemand: 'Very High',
        description: 'Build secure, scalable multi-tier enterprise web platforms with modern frontend frameworks and robust microservices.',
        requiredSkills: ['Web Technology', 'Database Systems', 'Software Engineering Principles', 'REST APIs', 'React/Node'],
        currentSkills: ['Object Oriented Programming', 'Database Systems', 'Data Structures and Algorithms'],
        missingSkills: ['Cloud Computing'],
        growthRate: '+22% YoY',
        openPositionsCount: 310
      },
      {
        id: 'it-3',
        title: 'Enterprise Systems & Security Administrator',
        matchScore: 82,
        salaryRange: '₹7.0L - ₹16.0L',
        marketDemand: 'High',
        description: 'Maintain zero-trust identity federation, hardened firewall configurations, and automated enterprise disaster recovery.',
        requiredSkills: ['Information Security', 'Computer Networks', 'Operating Systems Administration', 'Active Directory/IAM'],
        currentSkills: ['Operating Systems Administration', 'Computer Networks'],
        missingSkills: ['Information Security'],
        growthRate: '+19% YoY',
        openPositionsCount: 180
      }
    ],
    skillGaps: [
      { skill: 'Cloud Computing & Infrastructure as Code (Terraform)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 38, recommendedCourse: 'AWS Solutions Architect & Terraform Multi-Tier Provisioning', difficulty: 'Intermediate' },
      { skill: 'Information Security & Enterprise Identity (IAM)', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Zero-Trust Architecture, OAuth2 / OIDC & SOC Auditing', difficulty: 'Intermediate' },
      { skill: 'Docker Containerization & Kubernetes Orchestration', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 30, recommendedCourse: 'Ingress Controllers, Pod Autoscaling & Helm Charts', difficulty: 'Intermediate' },
      { skill: 'Network Load Balancing & CDN Edge Caching', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 24, recommendedCourse: 'BGP Routing, Anycast DNS & Reverse Proxy Hardening', difficulty: 'Beginner' }
    ],
    jobs: [
      {
        id: 'job-it-1',
        title: 'Cloud DevOps Engineer',
        company: 'Cisco Systems India',
        companyLogo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹12.0L - ₹18.0L / yr',
        matchPercentage: 92,
        requiredSkills: ['Cloud Computing', 'Computer Networks', 'Operating Systems Administration', 'Information Security'],
        missingSkills: ['Cloud Computing'],
        description: 'Automate continuous integration pipelines, manage hybrid Kubernetes clusters, and optimize cloud infrastructure costs.',
        postedDaysAgo: 1,
        whyMatch: {
          matchingScore: 92,
          alignedSkills: ['Networking', 'OS Admin', 'Databases'],
          strengthsNotes: 'Thorough knowledge of TCP/IP subnets, routing tables, and Linux shell automation.',
          gapSuggestions: 'Earn AWS Certified Cloud Practitioner / Solutions Architect Associate credential.'
        }
      },
      {
        id: 'job-it-2',
        title: 'Full Stack Web Engineer',
        company: 'Thoughtworks',
        companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&auto=format&fit=crop&q=80',
        location: 'Pune / Hyderabad',
        isRemote: true,
        type: 'Full-time',
        stipendOrSalary: '₹10.0L - ₹15.5L / yr',
        matchPercentage: 86,
        requiredSkills: ['Web Technology', 'Database Systems', 'Software Engineering Principles'],
        missingSkills: ['Cloud Infrastructure'],
        description: 'Design responsive enterprise web portals, resilient micro-frontends, and optimized relational database schemas.',
        postedDaysAgo: 3,
        whyMatch: {
          matchingScore: 86,
          alignedSkills: ['Web Tech', 'Database Systems'],
          strengthsNotes: 'Strong object-oriented architecture and database normalization.',
          gapSuggestions: 'Deploy a containerized full-stack application on AWS ECS or Google Cloud Run.'
        }
      }
    ],
    roadmap: [
      { id: 'it-m1', order: 1, title: 'Data Structures, OOP & Linux Administration', description: 'Master algorithmic problem solving, object hierarchies, and Linux shell management.', skills: ['Data Structures and Algorithms', 'Object Oriented Programming', 'Operating Systems Administration'], status: 'completed', completionPercentage: 100, recommendedResources: ['Linux Command Line', 'Data Structures in Practice'] },
      { id: 'it-m2', order: 2, title: 'Web Tech, Database Systems & Networking', description: 'Build full stack web endpoints, design normalized relational databases, and configure routing.', skills: ['Web Technology', 'Database Systems', 'Computer Networks'], status: 'in_progress', completionPercentage: 70, recommendedResources: ['Eloquent JavaScript', 'High Performance MySQL'] },
      { id: 'it-m3', order: 3, title: 'Cloud Infrastructure, DevOps & Cybersecurity', description: 'Deploy serverless architectures, implement CI/CD with Docker, and audit web security.', skills: ['Cloud Computing', 'Information Security'], status: 'upcoming', completionPercentage: 25, recommendedResources: ['Terraform Up and Running', 'Web Security Testing Guide'] }
    ],
    suggestedQuestions: [
      'Explain the difference between horizontal and vertical autoscaling in cloud environments.',
      'How does HTTPS establish secure encrypted sessions using TLS 1.3 handshakes?',
      'What are the advantages of containerization with Docker compared to traditional hypervisor virtualization?',
      'How do you design an automated zero-downtime blue-green deployment pipeline?'
    ]
  },

  'Biotechnology': {
    roles: [
      {
        id: 'bio-1',
        title: 'Bioprocess & Fermentation Scale-Up Engineer',
        matchScore: 92,
        salaryRange: '₹6.5L - ₹15.5L',
        marketDemand: 'Very High',
        description: 'Optimize bioreactor growth parameters, fed-batch nutrient feeding, and pilot-scale microbial fermentation for therapeutic proteins.',
        requiredSkills: ['Bioprocess Principles', 'Bioprocess Engineering', 'Downstream Processing', 'Bioreactor Design'],
        currentSkills: ['Cell Biology', 'Biochemistry', 'Microbiology'],
        missingSkills: ['Bioprocess Engineering', 'Downstream Processing'],
        growthRate: '+21% YoY',
        openPositionsCount: 165
      },
      {
        id: 'bio-2',
        title: 'Bioinformatics & Computational Genomics Scientist',
        matchScore: 86,
        salaryRange: '₹7.5L - ₹17.0L',
        marketDemand: 'High',
        description: 'Analyze next-generation sequencing (NGS) data, protein structure folding, and molecular docking simulations.',
        requiredSkills: ['Bioinformatics', 'Molecular Biology', 'Python/R', 'BLAST / AlphaFold Tools', 'Genomics'],
        currentSkills: ['Cell Biology', 'Biochemistry'],
        missingSkills: ['Bioinformatics', 'Molecular Biology'],
        growthRate: '+25% YoY',
        openPositionsCount: 135
      },
      {
        id: 'bio-3',
        title: 'Biopharmaceutical Downstream Purification Specialist',
        matchScore: 82,
        salaryRange: '₹6.0L - ₹13.0L',
        marketDemand: 'High',
        description: 'Purify monoclonal antibodies and recombinant vaccines using affinity chromatography, ultrafiltration, and lyophilization.',
        requiredSkills: ['Downstream Processing', 'Immunology', 'GLP / cGMP Compliance', 'HPLC Chromatography'],
        currentSkills: ['Biochemistry', 'Microbiology'],
        missingSkills: ['Downstream Processing', 'Immunology'],
        growthRate: '+18% YoY',
        openPositionsCount: 110
      }
    ],
    skillGaps: [
      { skill: 'Bioprocess Engineering & Bioreactor Kinetics', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 42, recommendedCourse: 'Monod Growth Modeling, Mass Transfer (kLa) & Oxygenation', difficulty: 'Intermediate' },
      { skill: 'Downstream Processing & Column Chromatography', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 38, recommendedCourse: 'Protein A Affinity, Ion Exchange & Tangential Flow Filtration', difficulty: 'Advanced' },
      { skill: 'Bioinformatics Pipeline & NGS Data Analysis', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'FASTQ Quality Trimming, BWA Alignment & Variant Calling', difficulty: 'Intermediate' },
      { skill: 'Molecular Biology Recombinant Cloning', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'Restriction Digest, Plasmid Vector Transformation & PCR Assays', difficulty: 'Beginner' }
    ],
    jobs: [
      {
        id: 'job-bio-1',
        title: 'Bioprocess Associate Scientist',
        company: 'Biocon Biologics',
        companyLogo: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹7.5L - ₹11.5L / yr',
        matchPercentage: 91,
        requiredSkills: ['Bioprocess Principles', 'Bioprocess Engineering', 'Downstream Processing', 'Microbiology'],
        missingSkills: ['Bioprocess Engineering'],
        description: 'Operate 50L and 500L pilot bioreactors, optimize dissolved oxygen parameters, and perform in-line biosafety testing.',
        postedDaysAgo: 2,
        whyMatch: {
          matchingScore: 91,
          alignedSkills: ['Cell Biology', 'Microbiology', 'Biochemistry'],
          strengthsNotes: 'Excellent understanding of cellular metabolic pathways and sterile culture techniques.',
          gapSuggestions: 'Practice volumetric mass transfer coefficient (kLa) calculations.'
        }
      },
      {
        id: 'job-bio-2',
        title: 'Computational Genomics Analyst',
        company: 'Strand Life Sciences',
        companyLogo: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Remote',
        isRemote: true,
        type: 'Full-time',
        stipendOrSalary: '₹8.0L - ₹13.0L / yr',
        matchPercentage: 85,
        requiredSkills: ['Bioinformatics', 'Molecular Biology', 'Python Data Stack'],
        missingSkills: ['Bioinformatics'],
        description: 'Analyze clinical exome sequencing panels, annotate oncological mutations, and identify therapeutic biomarker targets.',
        postedDaysAgo: 4,
        whyMatch: {
          matchingScore: 85,
          alignedSkills: ['Cell Biology', 'Biochemistry'],
          strengthsNotes: 'Strong foundation in gene expression, transcription, and translation.',
          gapSuggestions: 'Build automated Python pipelines using Biopython and SAMtools.'
        }
      }
    ],
    roadmap: [
      { id: 'bio-m1', order: 1, title: 'Cellular Biology, Microbiology & Biochemistry', description: 'Master enzyme kinetics, bacterial cultivation, and metabolic pathway stoichiometry.', skills: ['Cell Biology', 'Biochemistry', 'Microbiology'], status: 'completed', completionPercentage: 100, recommendedResources: ['Lehninger Principles of Biochemistry', 'Brock Biology of Microorganisms'] },
      { id: 'bio-m2', order: 2, title: 'Bioprocess Kinetics & Molecular Cloning', description: 'Model microbial exponential growth, design plasmid vectors, and optimize agitation.', skills: ['Bioprocess Principles', 'Molecular Biology', 'Bioprocess Engineering'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['Shuler & Kargi Bioprocess Engineering', 'Molecular Cloning Manual'] },
      { id: 'bio-m3', order: 3, title: 'Downstream Purification & Bioinformatics', description: 'Execute FPLC protein purification, run molecular dynamics, and annotate genomic FASTQ files.', skills: ['Downstream Processing', 'Bioinformatics'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['Protein Purification Principles', 'Bioinformatics Algorithms'] }
    ],
    suggestedQuestions: [
      'Explain the Monod equation and the biological meaning of maximum specific growth rate and Ks.',
      'How does tangential flow filtration (TFF) differ from normal dead-end filtration in downstream processing?',
      'What are the primary differences between local sequence alignment (Smith-Waterman) and global alignment (Needleman-Wunsch)?',
      'Describe the role of fed-batch strategy in overcoming catabolite repression in recombinant E. coli cultures.'
    ]
  },

  'Food Technology': {
    roles: [
      {
        id: 'food-1',
        title: 'Food Quality Assurance & HACCP Lead',
        matchScore: 92,
        salaryRange: '₹5.5L - ₹13.0L',
        marketDemand: 'Very High',
        description: 'Audit automated food manufacturing lines, establish critical control points (HACCP), and maintain FSSAI & ISO 22000 compliance.',
        requiredSkills: ['Food Safety and Quality Management', 'Food Microbiology', 'Food Preservation Technology', 'Regulatory Audit'],
        currentSkills: ['Food Chemistry', 'Food Microbiology', 'Principles of Food Processing'],
        missingSkills: ['Food Safety and Quality Management', 'Food Packaging Technology'],
        growthRate: '+19% YoY',
        openPositionsCount: 160
      },
      {
        id: 'food-2',
        title: 'Food Product Development & Formulation Technologist',
        matchScore: 86,
        salaryRange: '₹6.0L - ₹14.0L',
        marketDemand: 'High',
        description: 'Formulate clean-label functional foods, plant-based dairy substitutes, and optimized shelf-life beverages.',
        requiredSkills: ['Food Chemistry', 'Food Processing and Preservation', 'Sensory Evaluation', 'Nutritional Fortification'],
        currentSkills: ['Food Chemistry', 'Principles of Food Processing'],
        missingSkills: ['Food Processing and Preservation'],
        growthRate: '+22% YoY',
        openPositionsCount: 130
      },
      {
        id: 'food-3',
        title: 'Aseptic Packaging & Dairy Processing Engineer',
        matchScore: 82,
        salaryRange: '₹5.5L - ₹12.5L',
        marketDemand: 'High',
        description: 'Design modified atmosphere packaging (MAP), UHT thermal pasteurizers, and cold chain distribution systems.',
        requiredSkills: ['Food Packaging Technology', 'Dairy Plant Engineering', 'Thermal Process Calculations', 'F0 Value Modeling'],
        currentSkills: ['Principles of Food Processing', 'Food Chemistry'],
        missingSkills: ['Food Packaging Technology', 'Dairy Plant Engineering'],
        growthRate: '+16% YoY',
        openPositionsCount: 105
      }
    ],
    skillGaps: [
      { skill: 'Thermal Process Lethality Calculations (D, z & F0 Values)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Canning Autoclaves & Thermal Sterilization Kinetics', difficulty: 'Intermediate' },
      { skill: 'Modified Atmosphere Packaging (MAP) & Barrier Films', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 30, recommendedCourse: 'Gas Flush Packaging, Moisture Vapor Barrier & Shelf-Life Modeling', difficulty: 'Intermediate' },
      { skill: 'HACCP Hazard Identification & Critical Limits', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'ISO 22000 Food Safety Management System Implementation', difficulty: 'Beginner' },
      { skill: 'Sensory Texture Profile Analysis (TPA)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 20, recommendedCourse: 'Rheology, Gel Strength & Double Compression Texture Analysis', difficulty: 'Beginner' }
    ],
    jobs: [
      {
        id: 'job-food-1',
        title: 'Food Quality & Regulatory Compliance Officer',
        company: 'Nestlé India',
        companyLogo: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=100&auto=format&fit=crop&q=80',
        location: 'Moga / Gurugram',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹7.0L - ₹10.5L / yr',
        matchPercentage: 90,
        requiredSkills: ['Food Safety and Quality Management', 'Food Microbiology', 'Food Chemistry'],
        missingSkills: ['Food Safety and Quality Management'],
        description: 'Monitor factory floor CCPs, manage microbial pathogen swabbing programs, and ensure FSSAI regulatory compliance.',
        postedDaysAgo: 3,
        whyMatch: {
          matchingScore: 90,
          alignedSkills: ['Food Microbiology', 'Food Chemistry'],
          strengthsNotes: 'Thorough knowledge of water activity, lipid oxidation, and bacterial spore resistance.',
          gapSuggestions: 'Review ISO 22000 prerequisite programs and audit documentation.'
        }
      },
      {
        id: 'job-food-2',
        title: 'Dairy & Beverage Processing Engineer',
        company: 'Amul (GCMMF)',
        companyLogo: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=100&auto=format&fit=crop&q=80',
        location: 'Anand, Gujarat',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹6.2L - ₹9.2L / yr',
        matchPercentage: 85,
        requiredSkills: ['Dairy Plant Engineering', 'Food Processing and Preservation', 'Packaging Technology'],
        missingSkills: ['Dairy Plant Engineering'],
        description: 'Supervise continuous UHT milk sterilization, centrifugal cream separation, and aseptic pouch filling operations.',
        postedDaysAgo: 5,
        whyMatch: {
          matchingScore: 85,
          alignedSkills: ['Food Processing Principles'],
          strengthsNotes: 'Solid understanding of pasteurization time-temperature combinations and homogenizer mechanics.',
          gapSuggestions: 'Study clean-in-place (CIP) cycle design and thermal energy recovery.'
        }
      }
    ],
    roadmap: [
      { id: 'food-m1', order: 1, title: 'Food Chemistry, Microbiology & Processing Basics', description: 'Analyze food macromolecules, spoilage bacteria, and unit operations like drying and milling.', skills: ['Food Chemistry', 'Food Microbiology', 'Principles of Food Processing'], status: 'completed', completionPercentage: 100, recommendedResources: ['Fennema Food Chemistry', 'Frazier Food Microbiology'] },
      { id: 'food-m2', order: 2, title: 'Thermal Preservation & Quality Safety Systems', description: 'Compute F0 commercial sterility, establish HACCP plans, and prevent oxidative rancidity.', skills: ['Food Preservation Technology', 'Food Safety and Quality Management'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['Fellows Food Processing Technology', 'HACCP Guide'] },
      { id: 'food-m3', order: 3, title: 'Aseptic Packaging, Dairy & Beverage Engineering', description: 'Design modified atmosphere barrier films, UHT sterilization lines, and sensory panels.', skills: ['Food Packaging Technology', 'Dairy Plant Engineering'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['Food Packaging Materials Handbooks', 'Dairy Technology Systems'] }
    ],
    suggestedQuestions: [
      'Define decimal reduction time (D-value), z-value, and thermal lethality (F0-value) in food canning.',
      'How does water activity (aw) control microbial growth and non-enzymatic Maillard browning?',
      'What are the 7 core principles of HACCP and how do you determine a Critical Control Point (CCP)?',
      'Explain the working principle and gas ratios used in Modified Atmosphere Packaging (MAP) for fresh produce.'
    ]
  },

  'Artificial Intelligence and Data Science': {
    roles: [
      {
        id: 'aids-1',
        title: 'Data Science & Predictive Analytics Specialist',
        matchScore: 94,
        salaryRange: '₹10.0L - ₹24.0L',
        marketDemand: 'Very High',
        description: 'Build predictive machine learning pipelines, causal inference models, and automated customer behavioral models at scale.',
        requiredSkills: ['Data Science and Analytics', 'Machine Learning', 'Big Data Engineering', 'Statistical Analysis', 'Python/SQL'],
        currentSkills: ['Data Science and Analytics', 'Object-Oriented Programming', 'Database Systems'],
        missingSkills: ['Big Data Engineering', 'Machine Learning'],
        growthRate: '+29% YoY',
        openPositionsCount: 390
      },
      {
        id: 'aids-2',
        title: 'Big Data & Real-Time Analytics Engineer',
        matchScore: 88,
        salaryRange: '₹11.0L - ₹25.0L',
        marketDemand: 'Very High',
        description: 'Architect distributed data warehouses, streaming Apache Spark/Kafka pipelines, and real-time analytical dashboards.',
        requiredSkills: ['Big Data Engineering', 'Database Systems', 'Cloud Data Warehousing', 'Spark/PySpark', 'Kafka'],
        currentSkills: ['Database Systems', 'Data Structures and Algorithms'],
        missingSkills: ['Big Data Engineering'],
        growthRate: '+27% YoY',
        openPositionsCount: 310
      },
      {
        id: 'aids-3',
        title: 'Business Intelligence & Decision Scientist',
        matchScore: 84,
        salaryRange: '₹8.0L - ₹18.0L',
        marketDemand: 'High',
        description: 'Design executive KPI dashboards, conduct multivariate A/B tests, and build econometric forecasting models.',
        requiredSkills: ['Data Visualization', 'Statistical Analysis', 'SQL Query Tuning', 'Tableau / PowerBI'],
        currentSkills: ['Data Science and Analytics', 'Database Systems'],
        missingSkills: ['Data Visualization'],
        growthRate: '+19% YoY',
        openPositionsCount: 220
      }
    ],
    skillGaps: [
      { skill: 'Distributed Data Processing with Apache Spark & PySpark', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 42, recommendedCourse: 'Spark RDD, DataFrame Transformations & Catalyst Optimizer', difficulty: 'Intermediate' },
      { skill: 'Real-Time Streaming Pipelines with Apache Kafka', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Kafka Producer/Consumer Groups, Partitioning & Offset Management', difficulty: 'Advanced' },
      { skill: 'Advanced A/B Testing & Causal Inference', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'Hypothesis Testing, Power Analysis & Synthetic Controls', difficulty: 'Intermediate' },
      { skill: 'Cloud Data Warehouses (Snowflake / BigQuery)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 20, recommendedCourse: 'Partitioning, Clustering & Materialized Analytical Views', difficulty: 'Beginner' }
    ],
    jobs: [
      {
        id: 'job-aids-1',
        title: 'Data Scientist (Machine Learning)',
        company: 'Swiggy Analytics',
        companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹14.0L - ₹22.0L / yr',
        matchPercentage: 93,
        requiredSkills: ['Data Science and Analytics', 'Machine Learning', 'Big Data Engineering', 'Python/SQL'],
        missingSkills: ['Big Data Engineering'],
        description: 'Build dynamic pricing algorithms, ETA prediction models, and real-time customer recommendation engines.',
        postedDaysAgo: 1,
        whyMatch: {
          matchingScore: 93,
          alignedSkills: ['Data Science', 'DBMS', 'OOP'],
          strengthsNotes: 'Solid understanding of regression, classification, and cross-validation.',
          gapSuggestions: 'Practice building distributed PySpark pipelines on large datasets.'
        }
      },
      {
        id: 'job-aids-2',
        title: 'Big Data Platform Engineer',
        company: 'Walmart Global Tech',
        companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Chennai',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹15.0L - ₹24.0L / yr',
        matchPercentage: 88,
        requiredSkills: ['Big Data Engineering', 'Database Systems', 'Data Structures and Algorithms'],
        missingSkills: ['Big Data Engineering'],
        description: 'Scale distributed ingestion pipelines processing petabytes of global point-of-sale data with zero data loss.',
        postedDaysAgo: 3,
        whyMatch: {
          matchingScore: 88,
          alignedSkills: ['Data Structures', 'DBMS'],
          strengthsNotes: 'Strong relational modeling and index optimization skills.',
          gapSuggestions: 'Study Apache Spark internals and DAG stage partitioning.'
        }
      }
    ],
    roadmap: [
      { id: 'aids-m1', order: 1, title: 'Python Stack, Probability & Statistical Foundations', description: 'Master exploratory data analysis, hypothesis testing, and vectorized Pandas operations.', skills: ['Data Science and Analytics', 'Data Structures and Algorithms'], status: 'completed', completionPercentage: 100, recommendedResources: ['Python for Data Analysis', 'Practical Statistics for Data Scientists'] },
      { id: 'aids-m2', order: 2, title: 'Machine Learning & Relational Data Engineering', description: 'Train gradient boosted trees, tune hyperparameters, and design normalized SQL schemas.', skills: ['Machine Learning', 'Database Systems'], status: 'in_progress', completionPercentage: 70, recommendedResources: ['Hands-on ML with Scikit-Learn', 'High Performance SQL'] },
      { id: 'aids-m3', order: 3, title: 'Big Data Streaming, Spark & Cloud Warehousing', description: 'Process terabyte-scale data in PySpark, stream with Kafka, and model in Snowflake.', skills: ['Big Data Engineering'], status: 'upcoming', completionPercentage: 25, recommendedResources: ['Learning Spark 2nd Ed', 'Kafka The Definitive Guide'] }
    ],
    suggestedQuestions: [
      'Explain the difference between bagging and boosting, with specific reference to Random Forests vs XGBoost.',
      'How does Apache Spark execute lazy transformations versus actions using the Catalyst optimizer?',
      'What are the common strategies to handle severe class imbalance in fraud detection datasets?',
      'How do you calculate and interpret p-values and confidence intervals in multivariate A/B testing?'
    ]
  },

  'Artificial Intelligence and Machine Learning': {
    roles: [
      {
        id: 'aiml-1',
        title: 'Deep Learning & Neural Architectures Engineer',
        matchScore: 95,
        salaryRange: '₹12.0L - ₹28.0L',
        marketDemand: 'Very High',
        description: 'Train transformer foundations, diffusion models, and multi-spectral computer vision neural networks on multi-GPU clusters.',
        requiredSkills: ['Deep Learning', 'Machine Learning', 'Artificial Intelligence', 'PyTorch', 'TensorFlow', 'CUDA Optimization'],
        currentSkills: ['Artificial Intelligence', 'Machine Learning', 'Data Structures and Algorithms'],
        missingSkills: ['Deep Learning', 'MLOps & Inference Serving'],
        growthRate: '+34% YoY',
        openPositionsCount: 410
      },
      {
        id: 'aiml-2',
        title: 'Generative AI & LLM Systems Engineer',
        matchScore: 90,
        salaryRange: '₹14.0L - ₹32.0L',
        marketDemand: 'Very High',
        description: 'Fine-tune large language models (QLoRA), engineer retrieval-augmented generation (RAG) pipelines, and deploy agentic workflows.',
        requiredSkills: ['Generative AI', 'Deep Learning', 'Vector Databases', 'Prompt Engineering', 'LangChain / LlamaIndex'],
        currentSkills: ['Artificial Intelligence', 'Machine Learning'],
        missingSkills: ['Generative AI', 'Deep Learning'],
        growthRate: '+42% YoY',
        openPositionsCount: 350
      },
      {
        id: 'aiml-3',
        title: 'Computer Vision & Autonomous Systems Engineer',
        matchScore: 84,
        salaryRange: '₹11.0L - ₹26.0L',
        marketDemand: 'High',
        description: 'Deploy real-time object detection (YOLOv8/v10), semantic segmentation, and TensorRT edge inference models.',
        requiredSkills: ['Computer Vision', 'Deep Learning', 'OpenCV', 'TensorRT', 'Edge AI'],
        currentSkills: ['Machine Learning', 'Data Structures and Algorithms'],
        missingSkills: ['Computer Vision', 'Deep Learning'],
        growthRate: '+26% YoY',
        openPositionsCount: 190
      }
    ],
    skillGaps: [
      { skill: 'Deep Learning & Transformer Attention Mechanisms', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 45, recommendedCourse: 'Scaled Dot-Product Attention, Multi-Head Projections & PyTorch Kernels', difficulty: 'Advanced' },
      { skill: 'Large Language Model Fine-Tuning (LoRA / QLoRA)', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 38, recommendedCourse: 'Quantization, Parameter-Efficient Tuning & HuggingFace Trainer', difficulty: 'Advanced' },
      { skill: 'MLOps, Model Quantization & TensorRT Serving', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 32, recommendedCourse: 'ONNX Runtime, INT8 Quantization & Triton Inference Server', difficulty: 'Intermediate' },
      { skill: 'Vector Databases & RAG Architecture', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 24, recommendedCourse: 'Dense Embeddings, HNSW Indexing & Hybrid Search Retrival', difficulty: 'Intermediate' }
    ],
    jobs: [
      {
        id: 'job-aiml-1',
        title: 'Machine Learning Engineer (Deep Learning)',
        company: 'NVIDIA AI Tech Center',
        companyLogo: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Pune',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹20.0L - ₹32.0L / yr',
        matchPercentage: 94,
        requiredSkills: ['Deep Learning', 'Machine Learning', 'Artificial Intelligence', 'PyTorch'],
        missingSkills: ['Deep Learning'],
        description: 'Optimize high-throughput generative AI inference, multi-modal transformer architectures, and CUDA kernel pipelines.',
        postedDaysAgo: 1,
        whyMatch: {
          matchingScore: 94,
          alignedSkills: ['Artificial Intelligence', 'Machine Learning'],
          strengthsNotes: 'Exceptional mathematical grasp of gradient descent and neural loss functions.',
          gapSuggestions: 'Complete hands-on projects implementing custom attention layers and INT8 quantization.'
        }
      },
      {
        id: 'job-aiml-2',
        title: 'Generative AI Applications Engineer',
        company: 'Microsoft R&D India',
        companyLogo: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Hyderabad',
        isRemote: true,
        type: 'Full-time',
        stipendOrSalary: '₹18.0L - ₹28.0L / yr',
        matchPercentage: 89,
        requiredSkills: ['Generative AI', 'Deep Learning', 'Vector Databases', 'Python'],
        missingSkills: ['Generative AI'],
        description: 'Build enterprise Copilot agent architectures, grounded RAG search engines, and multi-turn conversational agents.',
        postedDaysAgo: 2,
        whyMatch: {
          matchingScore: 89,
          alignedSkills: ['AI Fundamentals', 'Data Structures'],
          strengthsNotes: 'Strong programming hygiene and algorithm complexity analysis.',
          gapSuggestions: 'Build and deploy a full-scale LangChain/LlamaIndex RAG application with evaluation metrics.'
        }
      }
    ],
    roadmap: [
      { id: 'aiml-m1', order: 1, title: 'Linear Algebra, Calculus & Classical Machine Learning', description: 'Master matrix decompositions, gradient backpropagation, and regression/classification.', skills: ['Machine Learning', 'Data Structures and Algorithms'], status: 'completed', completionPercentage: 100, recommendedResources: ['Mathematics for Machine Learning', 'Bishop Pattern Recognition'] },
      { id: 'aiml-m2', order: 2, title: 'Deep Neural Networks, CNNs & PyTorch Training', description: 'Train convolutional classifiers, residual connections, and custom PyTorch autograd functions.', skills: ['Artificial Intelligence', 'Deep Learning'], status: 'in_progress', completionPercentage: 70, recommendedResources: ['Deep Learning by Goodfellow', 'PyTorch Official Documentation'] },
      { id: 'aiml-m3', order: 3, title: 'Transformers, Generative AI & MLOps Deployment', description: 'Fine-tune LLMs with QLoRA, build RAG vector search, and optimize latency with TensorRT.', skills: ['Generative AI', 'MLOps'], status: 'upcoming', completionPercentage: 25, recommendedResources: ['Attention Is All You Need Paper', 'Chip Huyen Designing Machine Learning Systems'] }
    ],
    suggestedQuestions: [
      'Explain the mathematical intuition behind Scaled Dot-Product Attention in Transformers.',
      'How does Low-Rank Adaptation (LoRA) enable parameter-efficient fine-tuning of billions-scale models?',
      'What are the key differences between Vanishing Gradients and Exploding Gradients, and how do ResNets mitigate them?',
      'Describe how Retrieval-Augmented Generation (RAG) mitigates hallucination in generative language models.'
    ]
  },

  'Computer Science and Engineering (Cyber Security)': {
    roles: [
      {
        id: 'cyber-1',
        title: 'Penetration Tester & Ethical Hacker',
        matchScore: 94,
        salaryRange: '₹8.0L - ₹20.0L',
        marketDemand: 'Very High',
        description: 'Execute black-box and white-box penetration tests on web applications, internal networks, and cloud APIs.',
        requiredSkills: ['Ethical Hacking', 'Network Security', 'Web Application Security', 'Burp Suite / Metasploit', 'Cryptography'],
        currentSkills: ['Cryptography and Network Security', 'Computer Networks', 'Operating Systems'],
        missingSkills: ['Ethical Hacking', 'Web Application Security'],
        growthRate: '+31% YoY',
        openPositionsCount: 260
      },
      {
        id: 'cyber-2',
        title: 'SOC Analyst & Incident Responder',
        matchScore: 88,
        salaryRange: '₹7.0L - ₹17.0L',
        marketDemand: 'Very High',
        description: 'Triage SIEM alert queues, analyze malware signatures, and contain active enterprise cyber breaches.',
        requiredSkills: ['Security Operations Center (SOC)', 'SIEM / Splunk', 'Malware Analysis', 'Digital Forensics', 'Incident Response'],
        currentSkills: ['Computer Networks', 'Operating Systems'],
        missingSkills: ['Security Operations Center (SOC)', 'Digital Forensics'],
        growthRate: '+25% YoY',
        openPositionsCount: 290
      },
      {
        id: 'cyber-3',
        title: 'Cloud Security & DevSecOps Engineer',
        matchScore: 82,
        salaryRange: '₹9.5L - ₹22.0L',
        marketDemand: 'High',
        description: 'Integrate automated vulnerability scanning (SAST/DAST) into CI/CD pipelines and configure AWS/Azure zero-trust guards.',
        requiredSkills: ['Cloud Security', 'DevSecOps', 'Identity and Access Management', 'Container Security (Trivy)'],
        currentSkills: ['Cryptography and Network Security', 'Computer Networks'],
        missingSkills: ['Cloud Security', 'DevSecOps'],
        growthRate: '+29% YoY',
        openPositionsCount: 195
      }
    ],
    skillGaps: [
      { skill: 'Web Application Security & OWASP Top 10 Exploitation', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 40, recommendedCourse: 'SQL Injection, XSS, SSRF & Broken Access Control Mastery', difficulty: 'Intermediate' },
      { skill: 'SIEM Incident Detection with Splunk / ELK', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Correlation Rules, Log Parsing & MITRE ATT&CK Matrix Mapping', difficulty: 'Intermediate' },
      { skill: 'Binary Reverse Engineering & Malware Analysis', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 45, recommendedCourse: 'Ghidra / x64dbg Disassembly, Sandboxing & Shellcode Analysis', difficulty: 'Advanced' },
      { skill: 'Cloud Security Posture Management (CSPM)', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'AWS IAM Policy Hardening & Least Privilege Architecture', difficulty: 'Intermediate' }
    ],
    jobs: [
      {
        id: 'job-cyber-1',
        title: 'Security Operations & Penetration Testing Analyst',
        company: 'Palo Alto Networks',
        companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹11.0L - ₹17.5L / yr',
        matchPercentage: 92,
        requiredSkills: ['Ethical Hacking', 'Cryptography and Network Security', 'Web Application Security', 'Burp Suite'],
        missingSkills: ['Ethical Hacking'],
        description: 'Conduct red-team penetration testing across enterprise firewalls, cloud platforms, and internal network endpoints.',
        postedDaysAgo: 2,
        whyMatch: {
          matchingScore: 92,
          alignedSkills: ['Cryptography', 'Networks', 'Operating Systems'],
          strengthsNotes: 'Thorough understanding of symmetric/asymmetric ciphers, TCP/IP, and Linux kernels.',
          gapSuggestions: 'Practice Capture The Flag (CTF) challenges on Hack The Box or TryHackMe.'
        }
      },
      {
        id: 'job-cyber-2',
        title: 'Cybersecurity Threat Hunter / SOC Analyst',
        company: 'CrowdStrike India',
        companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=80',
        location: 'Pune / Remote',
        isRemote: true,
        type: 'Full-time',
        stipendOrSalary: '₹10.5L - ₹16.0L / yr',
        matchPercentage: 86,
        requiredSkills: ['Security Operations Center (SOC)', 'Computer Networks', 'Digital Forensics'],
        missingSkills: ['Security Operations Center (SOC)'],
        description: 'Analyze telemetry from global endpoint sensors, investigate indicators of compromise (IoC), and contain malware outbreaks.',
        postedDaysAgo: 4,
        whyMatch: {
          matchingScore: 86,
          alignedSkills: ['Computer Networks', 'OS Internals'],
          strengthsNotes: 'Strong foundation in network packet inspection and process tree forensics.',
          gapSuggestions: 'Master Splunk Search Processing Language (SPL) and event correlation.'
        }
      }
    ],
    roadmap: [
      { id: 'cyber-m1', order: 1, title: 'Networks, OS Internals & Classical Cryptography', description: 'Analyze packet protocols with Wireshark, audit Linux permissions, and compute RSA/AES keys.', skills: ['Computer Networks', 'Operating Systems', 'Cryptography and Network Security'], status: 'completed', completionPercentage: 100, recommendedResources: ['Kurose Ross Networking', 'Stallings Cryptography and Network Security'] },
      { id: 'cyber-m2', order: 2, title: 'Ethical Hacking & Web Exploitation', description: 'Perform manual vulnerability scanning, exploit OWASP Top 10 vulnerabilities, and intercept requests.', skills: ['Ethical Hacking', 'Web Application Security'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['Web Application Hacker’s Handbook', 'TryHackMe CompTIA Path'] },
      { id: 'cyber-m3', order: 3, title: 'SOC Monitoring, Malware Analysis & DevSecOps', description: 'Write Splunk correlation rules, disassemble binary malware, and secure container registries.', skills: ['Security Operations Center (SOC)', 'Digital Forensics', 'Cloud Security'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['Practical Malware Analysis', 'Blue Team Handbook'] }
    ],
    suggestedQuestions: [
      'Explain the difference between Symmetric (AES) and Asymmetric (RSA/ECC) encryption and how TLS combines both.',
      'How does a Cross-Site Request Forgery (CSRF) attack work, and what are SameSite cookie protections?',
      'Describe the steps in the Incident Response Lifecycle according to the NIST SP 800-61 guidelines.',
      'How does an attacker exploit a Server-Side Request Forgery (SSRF) vulnerability to exfiltrate cloud metadata?'
    ]
  },

  'Electronics Engineering (VLSI Design and Technology)': {
    roles: [
      {
        id: 'vlsi-1',
        title: 'RTL Design & Microarchitecture Engineer',
        matchScore: 94,
        salaryRange: '₹12.0L - ₹28.0L',
        marketDemand: 'Very High',
        description: 'Write synthesizable Verilog/SystemVerilog for high-speed CPU/GPU blocks and achieve clean timing closure in EDA tools.',
        requiredSkills: ['VLSI Design', 'Digital CMOS Design', 'Verilog / SystemVerilog', 'Static Timing Analysis', 'Synopsys Design Compiler'],
        currentSkills: ['Digital Electronics', 'Solid State Devices', 'Signals and Systems'],
        missingSkills: ['VLSI Design', 'Static Timing Analysis'],
        growthRate: '+28% YoY',
        openPositionsCount: 280
      },
      {
        id: 'vlsi-2',
        title: 'Design Verification (DV) Engineer (UVM)',
        matchScore: 90,
        salaryRange: '₹11.0L - ₹26.0L',
        marketDemand: 'Very High',
        description: 'Architect constrained-random verification testbenches in SystemVerilog using Universal Verification Methodology (UVM).',
        requiredSkills: ['SystemVerilog UVM', 'Constrained Random Testing', 'Functional Coverage', 'Assertions (SVA)'],
        currentSkills: ['Digital Electronics', 'Data Structures and Algorithms'],
        missingSkills: ['SystemVerilog UVM', 'VLSI Design'],
        growthRate: '+30% YoY',
        openPositionsCount: 320
      },
      {
        id: 'vlsi-3',
        title: 'Physical Design & STA Closure Engineer',
        matchScore: 84,
        salaryRange: '₹10.5L - ₹25.0L',
        marketDemand: 'High',
        description: 'Execute floorplanning, clock tree synthesis (CTS), routing, and DRC/LVS clearance on advanced sub-7nm silicon nodes.',
        requiredSkills: ['Physical Design', 'Static Timing Analysis (PrimeTime)', 'Clock Tree Synthesis', 'Cadence Innovus / Synopsys ICC2'],
        currentSkills: ['Digital CMOS Design', 'Solid State Devices'],
        missingSkills: ['Physical Design', 'Static Timing Analysis'],
        growthRate: '+24% YoY',
        openPositionsCount: 190
      }
    ],
    skillGaps: [
      { skill: 'Static Timing Analysis (Setup, Hold & Multicycle Paths)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 42, recommendedCourse: 'Clock Jitter, Skew, OCV & PrimeTime Timing Reports', difficulty: 'Advanced' },
      { skill: 'SystemVerilog UVM Testbench Architecture', currentLevel: 'Missing', requiredLevel: 'Strong', estimatedHours: 45, recommendedCourse: 'UVM Driver, Monitor, Sequencer & Scoreboard Construction', difficulty: 'Advanced' },
      { skill: 'Physical Design Floorplanning & Clock Tree Synthesis (CTS)', currentLevel: 'Intermediate', requiredLevel: 'Strong', estimatedHours: 35, recommendedCourse: 'Power Mesh Planning, Congestion Mitigation & RC Extraction', difficulty: 'Intermediate' },
      { skill: 'Low-Power Design Techniques (UPF & Power Gating)', currentLevel: 'Beginner', requiredLevel: 'Strong', estimatedHours: 25, recommendedCourse: 'Multi-Vt Cells, Level Shifters & State Retention Registers', difficulty: 'Intermediate' }
    ],
    jobs: [
      {
        id: 'job-vlsi-1',
        title: 'RTL Design Engineer (Silicon IP)',
        company: 'Intel Technology India',
        companyLogo: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru, Karnataka',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹16.0L - ₹25.0L / yr',
        matchPercentage: 93,
        requiredSkills: ['VLSI Design', 'Digital CMOS Design', 'Verilog / SystemVerilog', 'Static Timing Analysis'],
        missingSkills: ['Static Timing Analysis'],
        description: 'Design high-speed interconnect and cache controller RTL blocks for next-generation server processor architectures.',
        postedDaysAgo: 1,
        whyMatch: {
          matchingScore: 93,
          alignedSkills: ['Digital Electronics', 'CMOS Design'],
          strengthsNotes: 'Thorough understanding of flip-flop propagation delays, fanout, and gate capacitance.',
          gapSuggestions: 'Practice writing SDC timing constraints and analyzing PrimeTime reports.'
        }
      },
      {
        id: 'job-vlsi-2',
        title: 'Design Verification Engineer (UVM)',
        company: 'Synopsys India',
        companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=80',
        location: 'Bengaluru / Hyderabad',
        isRemote: false,
        type: 'Full-time',
        stipendOrSalary: '₹14.0L - ₹22.0L / yr',
        matchPercentage: 88,
        requiredSkills: ['SystemVerilog UVM', 'VLSI Design', 'Functional Coverage'],
        missingSkills: ['SystemVerilog UVM'],
        description: 'Build reusable UVM verification components, write covergroups, and achieve 100% functional and code coverage on PCIe IP.',
        postedDaysAgo: 3,
        whyMatch: {
          matchingScore: 88,
          alignedSkills: ['Digital Electronics', 'Data Structures'],
          strengthsNotes: 'Strong object-oriented programming foundation and finite state machine modeling.',
          gapSuggestions: 'Build a complete UVM testbench verifying an asynchronous FIFO.'
        }
      }
    ],
    roadmap: [
      { id: 'vlsi-m1', order: 1, title: 'CMOS Physics, Logic Design & Verilog Foundations', description: 'Master NMOS/PMOS transfer curves, setup/hold times, and synthesizable RTL modules.', skills: ['Digital Electronics', 'Solid State Devices', 'Digital CMOS Design'], status: 'completed', completionPercentage: 100, recommendedResources: ['Weste & Harris CMOS VLSI Design', 'Samir Palnitkar Verilog HDL'] },
      { id: 'vlsi-m2', order: 2, title: 'Static Timing Analysis, Synthesis & FPGA Verification', description: 'Generate gate-level netlists with Synopsys DC, write SDC constraints, and test on Xilinx FPGAs.', skills: ['VLSI Design', 'Static Timing Analysis'], status: 'in_progress', completionPercentage: 65, recommendedResources: ['J. Bhasker Static Timing Analysis', 'Advanced ASIC Chip Synthesis'] },
      { id: 'vlsi-m3', order: 3, title: 'SystemVerilog UVM & Sub-7nm Physical Layout', description: 'Construct UVM scoreboards, execute CTS clock tree routing, and sign off DRC/LVS clean tapeouts.', skills: ['SystemVerilog UVM', 'Physical Design'], status: 'upcoming', completionPercentage: 20, recommendedResources: ['UVM Primer by Ray Salemi', 'Physical Design Essentials'] }
    ],
    suggestedQuestions: [
      'Define Setup Time and Hold Time for a flip-flop and explain how to fix a hold time violation.',
      'How does Clock Skew affect minimum cycle time and hold margins in synchronous sequential circuits?',
      'Explain the difference between blocking (=) and non-blocking (<=) procedural assignments in Verilog.',
      'What are the core components of a UVM Verification Component (UVC) and how do phases work in UVM?'
    ]
  }
};

/**
 * Retrieves department-specific data with fallback to Computer Science if unspecified
 */
export function getDepartmentData(department?: string): DepartmentData {
  if (department && DEPARTMENT_INTELLIGENCE[department]) {
    return DEPARTMENT_INTELLIGENCE[department];
  }
  return DEPARTMENT_INTELLIGENCE['Computer Science and Engineering (CSE)'];
}
