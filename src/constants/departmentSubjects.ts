// Authoritative Curated Department and Subject Database for Career Accelerator (Frontend)
// Exactly 14 Engineering & Technology Departments with curated technical mock interview subjects

export interface DepartmentSubjectData {
  id: string;
  name: string;
  shortCode: string;
  subjects: string[];
}

export const DEPARTMENT_SUBJECTS: DepartmentSubjectData[] = [
  {
    id: 'agri',
    name: 'Agricultural Engineering',
    shortCode: 'AGRI',
    subjects: [
      'Crop Production – II',
      'Design of Farm Structures',
      'Fluid Mechanics and Hydraulics for Agricultural Engineering',
      'Post-Harvest Technology of Cereals, Pulses and Oil Seeds',
      'Hydrology and Irrigation Automation Engineering',
      'IoT in Agriculture',
      'Farm Tractors',
      'Soil and Water Conservation Engineering',
      'Remote Sensing and GIS',
      'Precision Farming',
      'Protected Cultivation',
      'Watershed Management'
    ]
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortCode: 'CIVIL',
    subjects: [
      'Building Planning and Architecture',
      'Engineering Geology',
      'Strength of Materials',
      'Surveying',
      'Building Materials, Construction and Machinery',
      'Theory of Structures',
      'Hydraulic Engineering',
      'Soil Mechanics',
      'Concrete Technology',
      'Structural Design – Reinforced Concrete',
      'Structural Analysis',
      'Foundation Engineering',
      'Structural Design – Steel Structures',
      'Irrigation Engineering',
      'Water Supply Engineering',
      'Estimation, Costing and Valuation Engineering',
      'Waste Water Engineering'
    ]
  },
  {
    id: 'cse',
    name: 'Computer Science and Engineering (CSE)',
    shortCode: 'CSE',
    subjects: [
      'Front End Technologies',
      'Programming in C and Data Structures',
      'Advanced Data Structures and Algorithms',
      'Object Oriented Programming',
      'Database Management Systems',
      'Design and Analysis of Algorithms',
      'Advanced Databases',
      'Advanced Java Programming',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Data Science and Analytics',
      'MERN Stack Web Development',
      'Compiler Design',
      'Cloud Computing',
      'Artificial Intelligence',
      'Machine Learning',
      'Cryptography and Network Security',
      'Software Defined Networks'
    ]
  },
  {
    id: 'eee',
    name: 'Electrical and Electronics Engineering (EEE)',
    shortCode: 'EEE',
    subjects: [
      'Elements of Electrical Engineering',
      'Network Analysis',
      'Digital Electronics',
      'Electrical Machines and Design – I',
      'Electrical Machines and Design – II',
      'Generation, Transmission and Distribution',
      'Measurements and Instrumentation',
      'Control System Engineering',
      'Power Electronics and Applications',
      'Electric Vehicles – I',
      'Power System Analysis',
      'Protection and Switchgear',
      'Power System Operation and Control',
      'High Voltage Engineering',
      'Solid State Drives',
      'Electric Vehicles – II',
      'Embedded System Design Using PIC Microcontroller'
    ]
  },
  {
    id: 'ece',
    name: 'Electronics and Communication Engineering (ECE)',
    shortCode: 'ECE',
    subjects: [
      'Basic Electronics',
      'Electronic Devices',
      'Circuit Analysis',
      'Digital Electronics',
      'Electromagnetic Fields',
      'Electronic Circuits',
      'Introduction to Embedded and VLSI',
      'Linear Integrated Circuits',
      'Signals and Systems',
      'Transmission Lines and Networks',
      'Digital Signal Processing',
      'Analog Communication',
      'Antenna and Wave Propagation',
      'Digital Communication',
      'Embedded System Design Using ARM',
      'RF and Microwave Engineering',
      'Sensors and Transducers'
    ]
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    shortCode: 'MECH',
    subjects: [
      'Introduction to Mechanical Engineering',
      'Engineering Mechanics',
      'Strength of Materials for Mechanical Engineers',
      'Manufacturing Processes and Automation',
      'Fluid Mechanics and Hydraulics',
      'Mechanisms and Machines',
      'Applied Thermal Sciences',
      'Automobile Engineering',
      'Design of Transmission Systems',
      'Engineering Materials and Metallurgy',
      'Heat and Mass Transfer',
      'Introduction to Robotics',
      'Metrology and Measurements',
      'Finite Element Analysis',
      'Additive Manufacturing',
      'Mechatronics and Image Processing',
      'Non-Traditional Machining',
      'Computer Integrated Manufacturing Systems'
    ]
  },
  {
    id: 'bme',
    name: 'Biomedical Engineering',
    shortCode: 'BME',
    subjects: [
      'Anatomy and Human Physiology',
      'Biochemistry',
      'Pathology and Microbiology',
      'Biosignals and Systems',
      'Tissue Engineering',
      'Biomedical Instrumentation I',
      'Biosensors and Transducers',
      'Biosignal Processing',
      'Biocircuit Analysis',
      'Radiological Equipments',
      'Biomedical Instrumentation II',
      'Biocontrol System',
      'Biomaterials',
      'Biomedical Image Processing',
      'Medical Optics',
      'Medical Device Design',
      'Artificial Organs and Implants',
      'Critical Care and Operation Theatre Equipment',
      'Medical Internet of Things',
      'Artificial Intelligence and Machine Learning for Healthcare',
      'Rehabilitation Engineering',
      'Telehealth Technology'
    ]
  },
  {
    id: 'it',
    name: 'Information Technology (IT)',
    shortCode: 'IT',
    subjects: [
      'Information Technology Essentials',
      'Web Programming',
      'Computational Intelligence',
      'Advanced Data Structures and Algorithms',
      'Object Oriented Programming',
      'Web Scripting',
      'Database Technology',
      'Design and Analysis of Algorithms',
      'Advanced Databases',
      'Operating Systems',
      'Advanced Java Programming',
      'Embedded Systems',
      'Software Engineering',
      'Computer Networks',
      'MERN Stack Web Development',
      'Cloud Computing',
      'Machine Learning Techniques',
      'Big Data Analytics',
      'Electronic Commerce',
      'Statistical Machine Learning'
    ]
  },
  {
    id: 'bt',
    name: 'Biotechnology',
    shortCode: 'BT',
    subjects: [
      'Basic Industrial Biotechnology',
      'Biochemistry',
      'Plant Biotechnology',
      'Molecular Biology',
      'Protein Structures and Engineering',
      'Marine Biotechnology',
      'Instrumental Methods of Analysis',
      'Bioprocess Engineering',
      'Industrial Food Processing',
      'Separation Techniques',
      'Genetic Engineering',
      'Human Genetics',
      'Biological Data Analysis',
      'Downstream Processing',
      'Molecular Pathogenesis and Disease Diagnosis',
      'Molecular Therapeutics and Diagnostics',
      'Advances in Animal Biotechnology',
      'Animal Genomics',
      'Developmental Biology'
    ]
  },
  {
    id: 'ft',
    name: 'Food Technology',
    shortCode: 'FT',
    subjects: [
      'Introduction to Food Processing and Preservation',
      'Food Chemistry',
      'Food Biochemistry and Human Nutrition',
      'Food Microbiology',
      'Unit Operations in Food Processing Industries',
      'Dairy Engineering',
      'Food Additives',
      'Food Analysis',
      'Food Grain Technology and Oilseeds',
      'Heat and Mass Transfer in Food Industries',
      'Beverage Technology',
      'Spices, Plantation and Tuber Crops Technology',
      'Fruits and Vegetable Processing Technology',
      'Baking and Confectionery Technology',
      'Total Food Quality Management Techniques',
      'Food Extrusion and Preservation Technology',
      'Food Process Equipment Design',
      'Milling Technology for Food Materials',
      'Livestock and Fish Processing Technology',
      'Food Packaging Technology',
      'Food Safety, Standards and Regulations',
      'Speciality Foods'
    ]
  },
  {
    id: 'aids',
    name: 'Artificial Intelligence and Data Science (AI & DS)',
    shortCode: 'AI & DS',
    subjects: [
      'Principles of Artificial Intelligence',
      'Principles of Data Science',
      'Statistical Methods in Data Analysis',
      'Machine Learning',
      'Big Data Management',
      'Deep Learning',
      'AI and Robotics',
      'Data Exploration and Visualization',
      'Natural Language Processing',
      'IoT Analytics',
      'Data Extract, Transform, Load and Warehousing',
      'Data Analytics and Distributed File System',
      'Data Visualization Techniques'
    ]
  },
  {
    id: 'aiml',
    name: 'Artificial Intelligence and Machine Learning (AI & ML)',
    shortCode: 'AI & ML',
    subjects: [
      'Introduction to Machine Learning',
      'Artificial Intelligence: Principles and Techniques',
      'Deep Learning',
      'Natural Language Processing',
      'Foundation of Computer Vision',
      'MLOps',
      'Reinforcement Learning',
      'Ethics and AI',
      'Artificial Neural Networks',
      'Generative AI and Prompt Engineering',
      'Data Exploration and Visualization',
      'Bioinformatics'
    ]
  },
  {
    id: 'cyber',
    name: 'Computer Science and Engineering – Cyber Security',
    shortCode: 'CYBER',
    subjects: [
      'Cryptography and Cyber Security',
      'Operating Systems and Security',
      'Database Management Systems and Security',
      'Cyber Forensics',
      'Malware Analysis and Security',
      'Network Security',
      'Vulnerability Assessment and Penetration Testing',
      'Security and Privacy in Cloud',
      'Ethical Hacking',
      'Cloud Computing and DevOps',
      'Engineering Secure Software Systems',
      'Digital and Mobile Forensics',
      'Web Application Security',
      'Machine Learning for Cyber Security'
    ]
  },
  {
    id: 'vlsi',
    name: 'Electronics Engineering – VLSI Design and Technology',
    shortCode: 'VLSI',
    subjects: [
      'VLSI Life Cycle',
      'Circuit Analysis and Network Theory',
      'Solid State Devices',
      'Digital System Design',
      'Electronic Devices',
      'Electromagnetic Fields',
      'Fundamentals of VLSI',
      'Electronic Circuits',
      'Linear Integrated Circuits',
      'Microcontroller and Computer Architecture',
      'Scripting Languages for VLSI',
      'Synthesis and STA',
      'Digital Signal Processing',
      'Embedded System Design'
    ]
  }
];

export const EXACT_14_DEPARTMENTS = DEPARTMENT_SUBJECTS.map(d => d.name);

export function getSubjectsForDepartment(departmentName?: string): string[] {
  if (!departmentName) return DEPARTMENT_SUBJECTS[0].subjects;
  const match = DEPARTMENT_SUBJECTS.find(d => 
    d.name.toLowerCase() === departmentName.toLowerCase() ||
    d.shortCode.toLowerCase() === departmentName.toLowerCase() ||
    departmentName.toLowerCase().includes(d.shortCode.toLowerCase())
  );
  return match ? match.subjects : DEPARTMENT_SUBJECTS[0].subjects;
}

export function findDepartmentData(deptName?: string): DepartmentSubjectData {
  if (!deptName) return DEPARTMENT_SUBJECTS[0];
  const normalized = deptName.toLowerCase();
  const match = DEPARTMENT_SUBJECTS.find(d => 
    d.name.toLowerCase() === normalized ||
    d.shortCode.toLowerCase() === normalized ||
    normalized.includes(d.shortCode.toLowerCase()) ||
    normalized.includes(d.name.toLowerCase())
  );
  return match || DEPARTMENT_SUBJECTS[0];
}

export function isValidDepartment(departmentName?: string): boolean {
  if (!departmentName) return false;
  const normalized = departmentName.toLowerCase().trim();
  return DEPARTMENT_SUBJECTS.some(d => 
    d.name.toLowerCase() === normalized ||
    d.shortCode.toLowerCase() === normalized ||
    normalized.includes(d.shortCode.toLowerCase()) ||
    normalized.includes(d.name.toLowerCase())
  );
}

export function isValidDepartmentSubject(departmentName: string, subjectName: string): boolean {
  if (!subjectName) return false;
  const subjects = getSubjectsForDepartment(departmentName);
  const normalized = subjectName.toLowerCase().trim();
  return subjects.some(s => s.toLowerCase().trim() === normalized);
}
