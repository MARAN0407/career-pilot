export interface DepartmentInfo {
  id: string;
  name: string;
  shortCode: string;
  iconName: string;
  defaultRole: string;
  tracks: string[];
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering (ECE)',
    shortCode: 'ECE',
    iconName: 'Cpu',
    defaultRole: 'Embedded Systems & Hardware Engineer',
    tracks: [
      'Embedded Systems & Microcontrollers',
      'VLSI & Digital Circuit Design',
      'Wireless Communications & 5G',
      'Digital Signal Processing (DSP)',
      'Hardware Protocols & Sensors'
    ]
  },
  {
    id: 'cse',
    name: 'Computer Science & Engineering (CSE)',
    shortCode: 'CSE',
    iconName: 'Code',
    defaultRole: 'Software Development Engineer (SDE)',
    tracks: [
      'Operating Systems & Concurrency',
      'Computer Networks & Distributed Systems',
      'Data Structures & Algorithms',
      'Database Systems & Storage'
    ]
  },
  {
    id: 'ai-ds',
    name: 'Artificial Intelligence & Data Science (AI & DS)',
    shortCode: 'AI & DS',
    iconName: 'Bot',
    defaultRole: 'Machine Learning & AI Engineer',
    tracks: [
      'AI & Machine Learning Foundations',
      'Generative AI & LLM Systems',
      'Deep Learning & Neural Architectures',
      'Data Engineering & MLOps'
    ]
  },
  {
    id: 'it',
    name: 'Information Technology (IT)',
    shortCode: 'IT',
    iconName: 'Server',
    defaultRole: 'Cloud & Full-Stack Systems Engineer',
    tracks: [
      'Cloud Infrastructure & DevOps',
      'Web Architectures & System Design',
      'Network Security & Protocols',
      'Database Engineering & APIs'
    ]
  },
  {
    id: 'eee',
    name: 'Electrical & Electronics Engineering (EEE)',
    shortCode: 'EEE',
    iconName: 'Zap',
    defaultRole: 'Power Systems & Electronics Engineer',
    tracks: [
      'Power Electronics & Converters',
      'Control Systems & Automation',
      'Electrical Machines & Drives',
      'Power Systems & Smart Grids'
    ]
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering (MECH)',
    shortCode: 'MECH',
    iconName: 'Wrench',
    defaultRole: 'Mechanical Design & Simulation Engineer',
    tracks: [
      'Thermodynamics & Heat Transfer',
      'Fluid Mechanics & CFD',
      'Solid Mechanics & Finite Element Analysis',
      'CAD/CAM & Precision Manufacturing'
    ]
  },
  {
    id: 'civil',
    name: 'Civil Engineering (CIVIL)',
    shortCode: 'CIVIL',
    iconName: 'Building',
    defaultRole: 'Structural & Infrastructure Engineer',
    tracks: [
      'Structural Analysis & RCC Design',
      'Geotechnical & Soil Mechanics',
      'Hydraulics & Water Resources',
      'Construction Project Management & BIM'
    ]
  },
  {
    id: 'robotics',
    name: 'Robotics & Automation',
    shortCode: 'Robotics',
    iconName: 'Compass',
    defaultRole: 'Robotics Software & Controls Engineer',
    tracks: [
      'Kinematics, Dynamics & Control',
      'Robot Operating System (ROS/ROS2)',
      'Computer Vision & SLAM Navigation',
      'Actuators, Sensors & Motor Drivers'
    ]
  },
  {
    id: 'bme',
    name: 'Biomedical Engineering (BME)',
    shortCode: 'BME',
    iconName: 'Activity',
    defaultRole: 'Biomedical Systems & Clinical Engineer',
    tracks: [
      'Bioinstrumentation & Signal Acquisition',
      'Medical Imaging Physics (MRI/CT/Ultrasound)',
      'Biomaterials & Medical Device Regulation',
      'Physiological Modeling & Biosensors'
    ]
  },
  {
    id: 'chemical',
    name: 'Chemical Engineering',
    shortCode: 'CHEM',
    iconName: 'FlaskConical',
    defaultRole: 'Process Design & Chemical Engineer',
    tracks: [
      'Mass & Heat Transfer Operations',
      'Chemical Reaction Kinetics & Reactor Design',
      'Process Dynamics & Plant Automation',
      'Petrochemical & Renewable Energy Systems'
    ]
  },
  {
    id: 'aero',
    name: 'Aerospace & Aeronautical Engineering',
    shortCode: 'AERO',
    iconName: 'Plane',
    defaultRole: 'Aerospace Systems & Aerodynamics Engineer',
    tracks: [
      'Aerodynamics & Compressible Flow',
      'Flight Mechanics & Aircraft Stability',
      'Propulsion & Gas Turbine Engines',
      'Avionics & Space Mission Trajectories'
    ]
  },
  {
    id: 'biotech',
    name: 'Biotechnology & Bioinformatics',
    shortCode: 'BIOTECH',
    iconName: 'Dna',
    defaultRole: 'Bioprocess & Computational Biology Scientist',
    tracks: [
      'Bioprocess & Fermentation Engineering',
      'Genomics & Bioinformatics Algorithms',
      'Recombinant DNA & Molecular Biology',
      'Enzyme Kinetics & Industrial Microbiology'
    ]
  },
  {
    id: 'cyber',
    name: 'Cybersecurity & Cloud Defense',
    shortCode: 'CYBER',
    iconName: 'Shield',
    defaultRole: 'Security Operations & Penetration Tester',
    tracks: [
      'Network Security & Threat Analysis',
      'Applied Cryptography & Zero Trust',
      'Cloud Security & Identity Governance',
      'Ethical Hacking & Vulnerability Assessment'
    ]
  },
  {
    id: 'mechatronics',
    name: 'Mechatronics Engineering',
    shortCode: 'MECHATRONICS',
    iconName: 'Cog',
    defaultRole: 'Mechatronics & Embedded Controls Engineer',
    tracks: [
      'Electro-Mechanical Systems & Sensors',
      'PLC Programming & Industrial SCADA',
      'Embedded Microcontrollers & Actuation',
      'Automated Testing & Smart Manufacturing'
    ]
  }
];

export const DEPARTMENT_NAMES = DEPARTMENTS.map(d => d.name);

export function getDepartmentByName(deptName?: string): DepartmentInfo {
  if (!deptName) return DEPARTMENTS[0];
  const normalized = deptName.toLowerCase();
  const matched = DEPARTMENTS.find(d => 
    normalized.includes(d.shortCode.toLowerCase()) || 
    normalized.includes(d.id.toLowerCase()) ||
    d.name.toLowerCase().includes(normalized) ||
    normalized.includes('electronics') && d.id === 'ece' ||
    normalized.includes('computer') && d.id === 'cse' ||
    normalized.includes('mechanical') && d.id === 'mech' ||
    normalized.includes('civil') && d.id === 'civil' ||
    normalized.includes('electrical') && d.id === 'eee'
  );
  return matched || DEPARTMENTS[0];
}
