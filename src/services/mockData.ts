import { 
  User, 
  Course, 
  Announcement, 
  CourseMaterial, 
  Assignment, 
  CareerRole, 
  SkillGapItem, 
  JobListing, 
  LearningCourse, 
  RoadmapMilestone, 
  InterviewQuestion, 
  InterviewResultScorecard, 
  RagDocument, 
  StudentRosterItem,
  StudentSubmission
} from '../types';

export const mockUsers: Record<string, User> = {
  student: {
    id: 'usr_student_01',
    name: 'Alex Chen',
    email: 'alex.chen@college.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Department of Computer Science & Engineering',
    institution: 'Apex Institute of Technology & AI',
    registerNumber: 'CS2023-8842',
    semester: '6th Semester (Junior Year)',
    gpa: 3.88
  },
  tutor: {
    id: 'usr_tutor_01',
    name: 'Dr. Suresh Kumar',
    email: 'suresh.kumar@college.edu',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'School of Artificial Intelligence & Data Systems',
    institution: 'Apex Institute of Technology & AI',
    title: 'Professor & Head of AI Research'
  }
};

export const mockCourses: Course[] = [
  {
    id: 'crs_ml_101',
    code: 'CS602',
    title: 'Machine Learning & Neural Architectures',
    tutorName: 'Dr. Suresh Kumar',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & AI',
    semester: 'Spring 2026',
    progress: 72,
    materialsCount: 14,
    assignmentsCount: 4,
    enrolledStudentsCount: 64,
    lastActivity: '2 hours ago',
    bannerColor: 'from-[#173B63] to-[#2F9C95]',
    description: 'Comprehensive study of supervised and unsupervised learning, optimization gradients, backpropagation, and deep network architectures.'
  },
  {
    id: 'crs_ai_201',
    code: 'CS605',
    title: 'Applied Artificial Intelligence & LLM Systems',
    tutorName: 'Dr. Suresh Kumar',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & AI',
    semester: 'Spring 2026',
    progress: 68,
    materialsCount: 11,
    assignmentsCount: 3,
    enrolledStudentsCount: 58,
    lastActivity: 'Yesterday',
    bannerColor: 'from-[#234E70] to-[#7567C7]',
    description: 'Transformer architectures, prompt engineering pipelines, Retrieval Augmented Generation (RAG), and vector embeddings.'
  },
  {
    id: 'crs_dl_301',
    code: 'CS610',
    title: 'Deep Learning & Computer Vision',
    tutorName: 'Prof. Sarah Jenkins',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science',
    semester: 'Spring 2026',
    progress: 45,
    materialsCount: 9,
    assignmentsCount: 2,
    enrolledStudentsCount: 52,
    lastActivity: '3 days ago',
    bannerColor: 'from-[#1B365D] to-[#3B82C4]',
    description: 'Convolutional neural networks (CNNs), object detection with YOLO, image segmentation, and generative vision models.'
  },
  {
    id: 'crs_nlp_401',
    code: 'CS618',
    title: 'Natural Language Processing & RAG',
    tutorName: 'Dr. Michael Chang',
    tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Information Science',
    semester: 'Spring 2026',
    progress: 54,
    materialsCount: 8,
    assignmentsCount: 2,
    enrolledStudentsCount: 46,
    lastActivity: '4 days ago',
    bannerColor: 'from-[#0F2642] to-[#2F9C95]',
    description: 'Tokenization, syntax parsing, self-attention, Hugging Face transformers, and fine-tuning specialized language agents.'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann_01',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    authorName: 'Dr. Suresh Kumar',
    authorRole: 'Course Faculty',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timestamp: '2 hours ago',
    content: 'Good morning everyone! I have uploaded the complete lecture video on Deep Neural Networks and Backpropagation mechanics, along with the PDF revision notes. Please make sure to test the interactive AI Assistant in the course tab if you have questions on gradient descent derivations.',
    attachments: [
      { name: 'Lecture 7 — Backpropagation Derivation.pdf', type: 'pdf', url: '#' },
      { name: 'Neural Networks & Loss Surfaces (Recording)', type: 'video', url: '#' }
    ],
    comments: [
      {
        id: 'c_01',
        userName: 'Alex Chen',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '1 hour ago',
        content: 'Thank you Dr. Kumar! The section on vanishing gradients in deep sigmoid activations was very clear.'
      },
      {
        id: 'c_02',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        timestamp: '35 mins ago',
        content: 'Will the upcoming quiz include the Adam optimizer momentum equations?'
      }
    ]
  },
  {
    id: 'ann_02',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    authorName: 'Dr. Suresh Kumar',
    authorRole: 'Course Faculty',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timestamp: '3 days ago',
    content: 'Assignment 3: "Implementing Convolutional Kernels & Pooling Layers from Scratch" has been posted. Due date is Friday at 11:59 PM. Plagiarism checks are automated through Career Accelerator code grading engine.',
    attachments: [
      { name: 'Assignment_03_Starter_Notebook.ipynb', type: 'link', url: '#' }
    ],
    comments: []
  }
];

export const mockMaterials: CourseMaterial[] = [
  {
    id: 'mat_01',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    title: 'Machine Learning Comprehensive Lecture Notes (Modules 1-4)',
    description: 'Detailed derivations of cost functions, Linear Regression, Logistic Regression, Decision Trees, and Gradient Boosting algorithms.',
    type: 'pdf',
    fileSizeOrDuration: '4.8 MB',
    uploadedAt: 'Yesterday',
    url: 'https://example.com/ml-notes.pdf',
    isRagIndexed: true,
    topic: 'Supervised Learning & Regularization',
    downloadsCount: 142,
    summaryNotes: [
      'Cost functions: Mean Squared Error vs Cross-Entropy Loss',
      'L1 (Lasso) produces sparse weight vectors; L2 (Ridge) shrinks weights smoothly',
      'Gradient Descent variants: Batch, Mini-batch, and Stochastic'
    ]
  },
  {
    id: 'mat_02',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    title: 'Neural Networks & Backpropagation In-Depth',
    description: 'Full lecture recording explaining multi-layer perceptrons, forward propagation, chain rule calculation, and computational graph backpropagation.',
    type: 'video',
    fileSizeOrDuration: '42 mins',
    uploadedAt: '2 days ago',
    url: 'https://example.com/nn-video.mp4',
    isRagIndexed: true,
    topic: 'Neural Networks',
    downloadsCount: 98,
    transcript: "Welcome class to Lecture 7. Today we examine backpropagation through the lens of computational graphs. Every node represents an elementary mathematical operation. During the forward pass, we compute and cache activations. During the backward pass, we apply the chain rule of calculus to compute the partial derivative of the scalar loss with respect to each parameter matrix..."
  },
  {
    id: 'mat_03',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    title: 'ML Mid-Term Audio Revision & Key Concepts',
    description: 'Concise audio walkthrough covering high-frequency exam questions, hyperparameter tuning tricks, and interview fundamentals.',
    type: 'audio',
    fileSizeOrDuration: '18 mins',
    uploadedAt: '4 days ago',
    url: 'https://example.com/ml-audio.mp3',
    isRagIndexed: true,
    topic: 'Exam & Interview Revision',
    downloadsCount: 84,
    transcript: "Hi students. In this quick audio revision, let's review three core interview questions: First, how does bias-variance tradeoff govern model generalization? Second, why do we use ReLU instead of Sigmoid in deep hidden layers? And third, what is the role of Batch Normalization in stabilizing internal covariate shift?"
  },
  {
    id: 'mat_04',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    title: 'CNN Architecture & Feature Map Visualization',
    description: 'Interactive slide deck on LeNet, AlexNet, VGG-16, and ResNet skip connections.',
    type: 'ppt',
    fileSizeOrDuration: '12.4 MB',
    uploadedAt: '1 week ago',
    url: 'https://example.com/cnn-slides.pptx',
    isRagIndexed: true,
    topic: 'Computer Vision Architectures',
    downloadsCount: 110
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asg_01',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    title: 'Assignment 3: Implementing Neural Backpropagation from Scratch',
    description: 'Build a 3-layer fully connected neural network purely in Python using NumPy (no PyTorch/TensorFlow). Implement forward pass, cross-entropy loss, backward pass gradients, and mini-batch SGD optimizer.',
    instructions: [
      'Implement Layer class with weight initialization using He (Kaiming) normal distribution.',
      'Compute analytical gradient for Softmax with Cross Entropy loss.',
      'Verify backpropagation gradients using numerical gradient checking with tolerance epsilon 1e-7.',
      'Train on MNIST digits and achieve greater than 96.5% test accuracy.'
    ],
    dueDate: '2026-09-10T23:59:00',
    totalMarks: 100,
    obtainedMarks: 94,
    status: 'graded',
    rubric: [
      { criteria: 'Correct analytical gradient derivation & implementation', points: 40 },
      { criteria: 'Numerical gradient verification check passing', points: 20 },
      { criteria: 'Convergence & test accuracy > 96.5%', points: 25 },
      { criteria: 'Code readability, comments & modular architecture', points: 15 }
    ],
    submittedAt: '2026-09-02T18:40:00',
    submissionFile: 'AlexChen_CS602_Assignment3.zip',
    tutorFeedback: 'Excellent implementation Alex! Your gradient check was mathematically rigorous and vectorization was clean. Great attention to numeric stability in softmax calculation.'
  },
  {
    id: 'asg_02',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    title: 'Assignment 4: Hyperparameter Optimization & Regularization',
    description: 'Compare Dropout vs Weight Decay vs Early Stopping on an overfitting synthetic dataset. Visualize loss curves and confusion matrices.',
    instructions: [
      'Plot training vs validation curves over 150 epochs.',
      'Implement inverted dropout during forward and backward stages.',
      'Write a 2-page brief summarizing findings.'
    ],
    dueDate: '2026-09-18T23:59:00',
    totalMarks: 100,
    status: 'in_progress',
    rubric: [
      { criteria: 'Experimental methodology & control groups', points: 30 },
      { criteria: 'Implementation of dropout & weight decay', points: 40 },
      { criteria: 'Analytical report & conclusions', points: 30 }
    ]
  },
  {
    id: 'asg_03',
    courseId: 'crs_ai_201',
    courseTitle: 'Applied Artificial Intelligence & LLM Systems',
    title: 'RAG Pipeline with FAISS & LangChain',
    description: 'Construct an end-to-end Retrieval Augmented Generation pipeline over college syllabus documents with dense vector embeddings and chunk reranking.',
    instructions: [
      'Chunk PDFs with recursive character splitting (chunk size 500, overlap 50).',
      'Index chunks into FAISS vector database.',
      'Generate contextual answers with source citation metadata.'
    ],
    dueDate: '2026-09-25T23:59:00',
    totalMarks: 100,
    status: 'not_started',
    rubric: [
      { criteria: 'Pipeline correctness & embedding quality', points: 50 },
      { criteria: 'Response latency & hallucination mitigation', points: 50 }
    ]
  }
];

export const mockCareerRoles: CareerRole[] = [
  {
    id: 'role_ai_eng',
    title: 'AI Engineer',
    matchScore: 92,
    salaryRange: '₹14 - 22 LPA',
    marketDemand: 'Very High',
    description: 'Architects and deploys scalable AI agents, LLM orchestration pipelines, vector search databases, and production inference services.',
    requiredSkills: ['Python', 'Machine Learning', 'PyTorch', 'RAG / Vector DBs', 'FastAPI', 'Docker', 'Cloud (AWS/GCP)'],
    currentSkills: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'SQL'],
    missingSkills: ['Docker', 'AWS Deployment', 'RAG Vector Indexing'],
    growthRate: '+34% YoY',
    openPositionsCount: 1420
  },
  {
    id: 'role_ml_eng',
    title: 'Machine Learning Engineer',
    matchScore: 89,
    salaryRange: '₹12 - 18 LPA',
    marketDemand: 'Very High',
    description: 'Develops predictive algorithms, trains deep neural networks, optimizes model weights, and manages MLOps continuous training pipelines.',
    requiredSkills: ['Python', 'NumPy/Pandas', 'Scikit-Learn', 'Deep Learning', 'MLOps', 'Docker', 'Kubernetes'],
    currentSkills: ['Python', 'NumPy/Pandas', 'Scikit-Learn', 'Deep Learning', 'SQL'],
    missingSkills: ['MLOps (MLflow)', 'Docker', 'Kubernetes'],
    growthRate: '+29% YoY',
    openPositionsCount: 1180
  },
  {
    id: 'role_data_sci',
    title: 'Data Scientist',
    matchScore: 86,
    salaryRange: '₹10 - 16 LPA',
    marketDemand: 'High',
    description: 'Discovers actionable business insights using statistical modeling, hypothesis testing, data visualization, and predictive machine learning.',
    requiredSkills: ['Python', 'SQL', 'Statistical Modeling', 'Machine Learning', 'Tableau / PowerBI', 'Experimentation'],
    currentSkills: ['Python', 'SQL', 'Machine Learning', 'Statistical Modeling'],
    missingSkills: ['A/B Testing Frameworks', 'Tableau Dashboarding'],
    growthRate: '+22% YoY',
    openPositionsCount: 940
  },
  {
    id: 'role_nlp_eng',
    title: 'NLP / Generative AI Specialist',
    matchScore: 81,
    salaryRange: '₹16 - 25 LPA',
    marketDemand: 'Very High',
    description: 'Builds fine-tuned transformer models, tokenizers, speech-to-text systems, and conversational agents using Hugging Face and modern LLM APIs.',
    requiredSkills: ['Python', 'Transformers', 'Hugging Face', 'NLP Fundamentals', 'LoRA / QLoRA', 'LangChain'],
    currentSkills: ['Python', 'Transformers', 'NLP Fundamentals'],
    missingSkills: ['LoRA Fine-tuning', 'LangChain / LlamaIndex', 'Quantization'],
    growthRate: '+41% YoY',
    openPositionsCount: 780
  }
];

export const mockSkillGaps: SkillGapItem[] = [
  {
    skill: 'Python & Algorithms',
    currentLevel: 'Strong',
    requiredLevel: 'Strong',
    estimatedHours: 0,
    recommendedCourse: 'Advanced Data Structures in Python',
    difficulty: 'Intermediate'
  },
  {
    skill: 'Machine Learning Core',
    currentLevel: 'Strong',
    requiredLevel: 'Strong',
    estimatedHours: 0,
    recommendedCourse: 'Applied ML with Scikit-Learn',
    difficulty: 'Intermediate'
  },
  {
    skill: 'Deep Learning & Neural Nets',
    currentLevel: 'Intermediate',
    requiredLevel: 'Strong',
    estimatedHours: 12,
    recommendedCourse: 'Deep Neural Networks in PyTorch',
    difficulty: 'Intermediate'
  },
  {
    skill: 'SQL & Database Architecture',
    currentLevel: 'Strong',
    requiredLevel: 'Strong',
    estimatedHours: 0,
    recommendedCourse: 'PostgreSQL Advanced Query Optimization',
    difficulty: 'Intermediate'
  },
  {
    skill: 'Docker & Containerization',
    currentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    estimatedHours: 8,
    recommendedCourse: 'Docker & Containers for Data Scientists',
    difficulty: 'Beginner'
  },
  {
    skill: 'Cloud & MLOps Deployment (AWS)',
    currentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    estimatedHours: 16,
    recommendedCourse: 'Deploying PyTorch Models on AWS SageMaker',
    difficulty: 'Advanced'
  },
  {
    skill: 'Retrieval Augmented Generation (RAG)',
    currentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    estimatedHours: 10,
    recommendedCourse: 'Building Production RAG with Vector Search',
    difficulty: 'Intermediate'
  }
];

export const mockJobListings: JobListing[] = [
  {
    id: 'job_01',
    title: 'Machine Learning & AI Engineering Intern',
    company: 'Infosys AI Labs',
    companyLogo: '🤖',
    location: 'Bengaluru, Karnataka (Hybrid / On-Campus Recruiter)',
    isRemote: true,
    type: 'Internship',
    stipendOrSalary: '₹45,000/mo (PPO: 8 - 12 LPA)',
    matchPercentage: 91,
    requiredSkills: ['Python', 'Machine Learning', 'PyTorch', 'SQL', 'FastAPI'],
    missingSkills: ['Docker'],
    description: 'Join our model alignment and evaluation team. You will build test harness suites for multi-modal reasoning models and implement retrieval datasets.',
    postedDaysAgo: 2,
    whyMatch: {
      matchingScore: 91,
      alignedSkills: ['Python (Strong)', 'Machine Learning (Strong)', 'PyTorch (Intermediate)', 'SQL (Strong)'],
      strengthsNotes: 'Your coursework in Neural Architectures (CS602) and 94% score on backpropagation aligns directly with the core assessment.',
      gapSuggestions: 'Complete the 4-hour Docker basics module in the Learning Hub to bring your profile match to 98%.'
    }
  },
  {
    id: 'job_02',
    title: 'Junior AI Systems Developer',
    company: 'Tata Consultancy AI Innovation',
    companyLogo: '⚡',
    location: 'Hyderabad, Telangana (Remote Available)',
    isRemote: true,
    type: 'Full-time',
    stipendOrSalary: '₹9 - 14 LPA',
    matchPercentage: 88,
    requiredSkills: ['Python', 'Deep Learning', 'FastAPI', 'PostgreSQL', 'Docker'],
    missingSkills: ['Docker', 'AWS SageMaker'],
    description: 'Build mission-critical data pipelines and deploy real-time LLM inference services on sovereign cloud nodes.',
    postedDaysAgo: 4,
    whyMatch: {
      matchingScore: 88,
      alignedSkills: ['Python', 'Deep Learning', 'FastAPI', 'PostgreSQL'],
      strengthsNotes: 'High academic GPA (3.88) and strong resume ATS score in technical foundations.',
      gapSuggestions: 'Add cloud deployment project or AWS certified cloud practitioner badge.'
    }
  },
  {
    id: 'job_03',
    title: 'Data Science & Analytics Associate',
    company: 'Swiggy / Zepto Intelligence',
    companyLogo: '📊',
    location: 'Bengaluru, Karnataka',
    isRemote: false,
    type: 'Full-time',
    stipendOrSalary: '₹8 - 13 LPA',
    matchPercentage: 85,
    requiredSkills: ['Python', 'SQL', 'Statistical Modeling', 'Machine Learning', 'Communication'],
    missingSkills: ['Tableau', 'A/B Testing'],
    description: 'Translate complex enterprise problems into machine learning models and executive presentation dashboards.',
    postedDaysAgo: 6,
    whyMatch: {
      matchingScore: 85,
      alignedSkills: ['Python', 'SQL', 'Statistical Modeling', 'Communication (82% in Mock Interviews)'],
      strengthsNotes: 'Top 5% communication scores on technical mock interviews and solid statistical modeling foundation.',
      gapSuggestions: 'Learn A/B testing statistical significance calculations.'
    }
  },
  {
    id: 'job_04',
    title: 'Associate GenAI Developer',
    company: 'Jio Platforms AI',
    companyLogo: '🌐',
    location: 'Mumbai, Maharashtra',
    isRemote: true,
    type: 'Full-time',
    stipendOrSalary: '₹12 - 18 LPA',
    matchPercentage: 83,
    requiredSkills: ['Python', 'Transformers', 'LangChain', 'FastAPI', 'RAG'],
    missingSkills: ['Docker', 'LoRA Fine-Tuning'],
    description: 'Develop domain-specialized LLM agents and multi-lingual Indian NLP tokenizers for real-time mobile inference.',
    postedDaysAgo: 1,
    whyMatch: {
      matchingScore: 83,
      alignedSkills: ['Python', 'FastAPI', 'RAG Vector Search'],
      strengthsNotes: 'Proven hands-on experience in RAG vector search and FAISS embedding pipelines.',
      gapSuggestions: 'Complete the transformer fine-tuning module.'
    }
  }
];

export const mockLearningCourses: LearningCourse[] = [
  {
    id: 'lc_01',
    title: 'Docker & Containerization for AI Engineers',
    category: 'Skill Gap',
    instructor: 'DevOps Campus Faculty',
    level: 'Beginner',
    duration: '4.5 hours',
    rating: 4.9,
    enrollments: 1250,
    skillsTaught: ['Docker', 'Dockerfile', 'Multi-stage Builds', 'Docker Compose'],
    thumbnailColor: 'from-[#173B63] to-[#3B82C4]',
    progress: 35
  },
  {
    id: 'lc_02',
    title: 'Building Production RAG Pipelines with Vector DBs',
    category: 'Skill Gap',
    instructor: 'Dr. Suresh Kumar',
    level: 'Intermediate',
    duration: '6 hours',
    rating: 4.95,
    enrollments: 2100,
    skillsTaught: ['RAG', 'ChromaDB', 'FAISS', 'Embeddings', 'LangChain'],
    thumbnailColor: 'from-[#7567C7] to-[#2F9C95]',
    progress: 60
  },
  {
    id: 'lc_03',
    title: 'Mastering Technical AI & ML Interviews',
    category: 'Interview Prep',
    instructor: 'Industry Career Mentors',
    level: 'Intermediate',
    duration: '8 hours',
    rating: 4.88,
    enrollments: 3400,
    skillsTaught: ['ML Coding', 'System Design', 'Behavioral STAR Method', 'Math Foundations'],
    thumbnailColor: 'from-[#173B63] to-[#7567C7]',
    progress: 80
  },
  {
    id: 'lc_04',
    title: 'Executive Technical Communication & Resume Crafting',
    category: 'Career Prep',
    instructor: 'Dean of Career Development',
    level: 'Beginner',
    duration: '3 hours',
    rating: 4.92,
    enrollments: 4120,
    skillsTaught: ['ATS Optimization', 'Action Verbs', 'Interview Presence', 'Elevator Pitch'],
    thumbnailColor: 'from-[#2F9C95] to-[#3B82C4]',
    progress: 100
  }
];

export const mockRoadmapMilestones: RoadmapMilestone[] = [
  {
    id: 'm_01',
    order: 1,
    title: 'Programming & CS Core (Python + OOP)',
    description: 'Master clean Pythonic code, data structures, complexity analysis, and modular software engineering.',
    skills: ['Python 3.12', 'OOP', 'Data Structures', 'Git / GitHub'],
    status: 'completed',
    completionPercentage: 100,
    recommendedResources: ['CS50 Python', 'Fluent Python', 'LeetCode Mediums']
  },
  {
    id: 'm_02',
    order: 2,
    title: 'Mathematical & Statistical Foundations',
    description: 'Linear algebra (matrix eigenvalues, SVD), multivariable calculus (gradients, Jacobians), and probability distributions.',
    skills: ['Linear Algebra', 'Multivariate Calculus', 'Probability & Stats', 'Optimization'],
    status: 'completed',
    completionPercentage: 100,
    recommendedResources: ['3Blue1Brown Linear Algebra', 'Mathematics for Machine Learning']
  },
  {
    id: 'm_03',
    order: 3,
    title: 'Machine Learning Foundations',
    description: 'Supervised & unsupervised algorithms, bias-variance tradeoff, cross-validation, Scikit-Learn.',
    skills: ['Regression', 'Classification', 'Decision Trees', 'Ensemble Methods', 'Feature Engineering'],
    status: 'completed',
    completionPercentage: 100,
    recommendedResources: ['CS602 College Course', 'Hands-on Machine Learning with Scikit-Learn']
  },
  {
    id: 'm_04',
    order: 4,
    title: 'Deep Learning & Neural Architectures',
    description: 'PyTorch deep neural nets, CNNs for computer vision, Transformers, backpropagation mechanics.',
    skills: ['PyTorch', 'CNNs', 'Attention Mechanisms', 'Loss Optimization'],
    status: 'in_progress',
    completionPercentage: 75,
    recommendedResources: ['Deep Learning Specialization', 'CS610 Vision Lectures']
  },
  {
    id: 'm_05',
    order: 5,
    title: 'Generative AI, LLMs & RAG Engineering',
    description: 'Vector databases, LangChain/LlamaIndex, prompt pipelines, embedding retrieval, and fine-tuning.',
    skills: ['RAG Pipelines', 'Vector Databases', 'Prompt Optimization', 'FastAPI Backend'],
    status: 'in_progress',
    completionPercentage: 50,
    recommendedResources: ['Applied AI & LLM Systems (CS605)', 'Production RAG Course']
  },
  {
    id: 'm_06',
    order: 6,
    title: 'MLOps, Containers & Cloud Deployment',
    description: 'Dockerize inference services, deploy to AWS/GCP, setup CI/CD pipelines, and monitor model drift.',
    skills: ['Docker', 'AWS ECS / SageMaker', 'CI/CD Pipelines', 'Model Monitoring'],
    status: 'upcoming',
    completionPercentage: 15,
    recommendedResources: ['Docker for ML Engineers', 'Full Stack Deep Learning']
  },
  {
    id: 'm_07',
    order: 7,
    title: 'AI Mock Interviews & Portfolio Capstone',
    description: 'Complete 10+ Camera and Voice AI interview simulations, polish GitHub portfolio, ATS resume audit.',
    skills: ['Technical Problem Solving', 'STAR Communication', 'System Architecture', 'Live Coding'],
    status: 'in_progress',
    completionPercentage: 65,
    recommendedResources: ['Career Accelerator Interview Center', 'Resume AI Scanner']
  },
  {
    id: 'm_08',
    order: 8,
    title: 'Job Ready & Campus Placements',
    description: 'Top-tier tech internship applications, on-campus recruiter interviews, and full-time placement offers.',
    skills: ['Offer Negotiation', 'Team Fit', 'Professional Polish'],
    status: 'upcoming',
    completionPercentage: 0,
    recommendedResources: ['Career Accelerator Job Matcher', 'College Career Fair 2026']
  }
];

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'q_01',
    questionNumber: 1,
    totalQuestions: 5,
    role: 'AI / Machine Learning Engineer',
    difficulty: 'Intermediate',
    category: 'Technical',
    questionText: 'Can you explain the mathematical difference between L1 (Lasso) and L2 (Ridge) regularization, and explain why L1 creates sparse weight matrices?',
    expectedKeypoints: [
      'L1 adds absolute value penalty sum(|w|), L2 adds squared penalty sum(w^2)',
      'L1 optimization contour has diamond sharp corners intersecting axes at zero',
      'L2 shrinks weights proportionally but rarely forces exact zeros'
    ]
  },
  {
    id: 'q_02',
    questionNumber: 2,
    totalQuestions: 5,
    role: 'AI / Machine Learning Engineer',
    difficulty: 'Intermediate',
    category: 'Technical',
    questionText: 'Explain the vanishing gradient problem in deep neural networks when using Sigmoid activation functions. How does ReLU or Batch Normalization solve it?',
    expectedKeypoints: [
      'Sigmoid derivative peaks at 0.25; chaining multiple layers causes exponential decay toward 0',
      'ReLU gradient is constant 1 for positive inputs, eliminating decay',
      'Batch Normalization keeps activations within active non-saturating regions'
    ]
  },
  {
    id: 'q_03',
    questionNumber: 3,
    totalQuestions: 5,
    role: 'AI / Machine Learning Engineer',
    difficulty: 'Advanced',
    category: 'System Design',
    questionText: 'How does self-attention in the Transformer architecture compute relationships between tokens? Describe the Query, Key, and Value dot-product calculation.',
    expectedKeypoints: [
      'Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V',
      'Division by sqrt(d_k) prevents extremely small softmax gradients in high dimensions',
      'Allows O(1) sequential path length for contextual modeling across the entire sequence'
    ]
  },
  {
    id: 'q_04',
    questionNumber: 4,
    totalQuestions: 5,
    role: 'AI / Machine Learning Engineer',
    difficulty: 'Intermediate',
    category: 'Problem Solving',
    questionText: 'If you have an imbalanced dataset where the positive class is only 1% of total samples, why is Accuracy a misleading metric? What metrics would you use instead?',
    expectedKeypoints: [
      'A trivial classifier predicting majority class gets 99% accuracy while failing completely',
      'Use Precision, Recall, F1-Score, and Precision-Recall AUC (PR-AUC)',
      'Consider techniques like SMOTE, focal loss, or threshold adjustment'
    ]
  },
  {
    id: 'q_05',
    questionNumber: 5,
    totalQuestions: 5,
    role: 'AI / Machine Learning Engineer',
    difficulty: 'Intermediate',
    category: 'Behavioral',
    questionText: 'Describe a situation where a machine learning model you built failed to perform well in validation or testing. How did you debug and resolve the issue?',
    expectedKeypoints: [
      'Structured STAR response (Situation, Task, Action, Result)',
      'Data leakage investigation or train/val distribution shift check',
      'Systematic error analysis and hyperparameter tuning iteration'
    ]
  }
];

export const mockInterviewReport: InterviewResultScorecard = {
  id: 'rpt_2026_0902',
  date: 'September 2, 2026',
  role: 'AI / Machine Learning Engineer',
  interviewType: 'camera',
  overallScore: 84,
  durationMinutes: 18,
  metrics: {
    technicalKnowledge: 88,
    answerRelevance: 86,
    communication: 82,
    fluency: 80,
    completeness: 84
  },
  strengths: [
    'Strong mathematical grasp of gradient optimization and cost surfaces',
    'Structured responses following logical flow from fundamental principles to applied code',
    'Accurate identification of transformer attention formulas and scaling factors',
    'Maintained strong eye contact and professional academic composure'
  ],
  areasToImprove: [
    'Reduce minor filler words ("um", "like") during initial question structuring',
    'Provide more concrete real-world production examples (e.g., latency constraints, memory bounds)',
    'Increase answer conciseness on metric evaluation tradeoffs'
  ],
  aiSummary: 'Alex demonstrated remarkable technical competence in core machine learning and transformer architectures. His mathematical explanations were rigorous and directly answered the prompts. With a slight reduction in filler words and addition of real-world deployment considerations, his interview performance is at the top 10th percentile for junior engineering candidates.',
  transcript: [
    {
      questionNumber: 1,
      question: 'Explain the difference between L1 (Lasso) and L2 (Ridge) regularization and why L1 produces sparsity.',
      userAnswer: 'L1 adds the sum of absolute weights to the loss function, while L2 adds the sum of squared weights. Geometrically, L1 has sharp diamond-shaped constraint boundaries that intersect the error contours directly on parameter axes, setting weights exactly to zero. L2 shrinks weights asymptotically toward zero.',
      feedback: 'Flawless geometrical and mathematical explanation. Directly hit all evaluation criteria.',
      score: 95
    },
    {
      questionNumber: 2,
      question: 'Explain the vanishing gradient problem with Sigmoid activations.',
      userAnswer: 'The derivative of the sigmoid function peaks at 0.25. When we multiply these small fractions backwards across 10 or 20 hidden layers using the chain rule, the gradient vanishes exponentially, stopping early layers from updating. ReLU solves this because its derivative is 1 for positive inputs.',
      feedback: 'Very clear explanation of chain rule multiplication and ReLU benefits.',
      score: 88
    },
    {
      questionNumber: 3,
      question: 'Describe the self-attention formula in Transformers.',
      userAnswer: 'Self-attention calculates attention as softmax of Q times K transpose divided by the square root of key dimension d_k, all multiplied by V. The division prevents dot products from growing too large in high dimensions which would cause vanishing softmax gradients.',
      feedback: 'Accurate formula and correctly noted the variance scaling factor.',
      score: 92
    },
    {
      questionNumber: 4,
      question: 'Why is Accuracy misleading on 1% imbalanced classification datasets?',
      userAnswer: 'A model that predicts 0 for every sample would achieve 99% accuracy while detecting zero frauds or diseases. Instead, we should evaluate Precision, Recall, F1-Score, and PR-AUC, and adjust classification decision thresholds.',
      feedback: 'Spot on. Good mention of PR-AUC vs ROC-AUC under severe skew.',
      score: 90
    },
    {
      questionNumber: 5,
      question: 'Tell me about an instance when your model failed and how you resolved it.',
      userAnswer: 'In our coursework project for medical image classification, my CNN achieved 98% training accuracy but only 64% validation accuracy. I analyzed the error cases and found data leakage between patient splits. I isolated patients into strict distinct folds, added data augmentation and dropout, and validation accuracy recovered to 89%.',
      feedback: 'Solid STAR format example demonstrating practical debugging acumen.',
      score: 86
    }
  ]
};

export const mockInterviewHistoryList: InterviewResultScorecard[] = [
  mockInterviewReport,
  {
    id: 'rpt_2026_0825',
    date: 'August 25, 2026',
    role: 'AI / Machine Learning Engineer',
    interviewType: 'voice',
    overallScore: 78,
    durationMinutes: 14,
    metrics: {
      technicalKnowledge: 82,
      answerRelevance: 79,
      communication: 74,
      fluency: 76,
      completeness: 79
    },
    strengths: ['Good foundational definitions', 'Clear voice tone'],
    areasToImprove: ['Hesitation on system design questions', 'Expand on architectural tradeoffs'],
    aiSummary: 'Good performance with steady improvement in technical vocabulary.',
    transcript: []
  },
  {
    id: 'rpt_2026_0812',
    date: 'August 12, 2026',
    role: 'Junior Data Scientist',
    interviewType: 'text',
    overallScore: 74,
    durationMinutes: 22,
    metrics: {
      technicalKnowledge: 76,
      answerRelevance: 78,
      communication: 72,
      fluency: 70,
      completeness: 74
    },
    strengths: ['Accurate SQL knowledge', 'Clean formatting'],
    areasToImprove: ['Deeper explanation of statistical significance testing'],
    aiSummary: 'Initial baseline interview session. Showed strong potential.',
    transcript: []
  }
];

export const mockRagDocuments: RagDocument[] = [
  {
    id: 'rag_doc_01',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    fileName: 'Machine_Learning_Comprehensive_Notes_Modules_1_4.pdf',
    fileType: 'pdf',
    uploadDate: '2026-09-01',
    status: 'indexed',
    chunkCount: 184,
    vectorDimension: 1536,
    size: '4.8 MB'
  },
  {
    id: 'rag_doc_02',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    fileName: 'Lecture_07_Neural_Networks_Backpropagation.mp4 (Transcript)',
    fileType: 'video',
    uploadDate: '2026-09-02',
    status: 'indexed',
    chunkCount: 92,
    vectorDimension: 1536,
    size: '1.2 MB'
  },
  {
    id: 'rag_doc_03',
    courseId: 'crs_ml_101',
    courseTitle: 'Machine Learning & Neural Architectures',
    fileName: 'Midterm_Audio_Revision_Lecture.mp3 (Transcript)',
    fileType: 'audio',
    uploadDate: '2026-08-30',
    status: 'indexed',
    chunkCount: 46,
    vectorDimension: 1536,
    size: '840 KB'
  },
  {
    id: 'rag_doc_04',
    courseId: 'crs_ai_201',
    courseTitle: 'Applied Artificial Intelligence & LLM Systems',
    fileName: 'Transformers_Attention_Mechanism_Syllabus.pdf',
    fileType: 'pdf',
    uploadDate: '2026-09-02',
    status: 'processing',
    chunkCount: 120,
    vectorDimension: 1536,
    size: '6.2 MB'
  }
];

export const mockStudentRoster: StudentRosterItem[] = [
  {
    id: 's_01',
    name: 'Alex Chen',
    registerNumber: 'CS2023-8842',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    course: 'Machine Learning & Neural Architectures',
    attendancePercentage: 96,
    assignmentProgress: 94,
    interviewScore: 84,
    careerReadiness: 78,
    status: 'Exceptional'
  },
  {
    id: 's_02',
    name: 'Priya Sharma',
    registerNumber: 'CS2023-8850',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    course: 'Machine Learning & Neural Architectures',
    attendancePercentage: 92,
    assignmentProgress: 88,
    interviewScore: 81,
    careerReadiness: 75,
    status: 'On Track'
  },
  {
    id: 's_03',
    name: 'Marcus Brody',
    registerNumber: 'CS2023-8819',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    course: 'Machine Learning & Neural Architectures',
    attendancePercentage: 84,
    assignmentProgress: 72,
    interviewScore: 68,
    careerReadiness: 62,
    status: 'Needs Attention'
  },
  {
    id: 's_04',
    name: 'Elena Rostova',
    registerNumber: 'CS2023-8874',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    course: 'Machine Learning & Neural Architectures',
    attendancePercentage: 98,
    assignmentProgress: 96,
    interviewScore: 89,
    careerReadiness: 85,
    status: 'Exceptional'
  },
  {
    id: 's_05',
    name: 'David Kim',
    registerNumber: 'CS2023-8831',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    course: 'Machine Learning & Neural Architectures',
    attendancePercentage: 88,
    assignmentProgress: 80,
    interviewScore: 76,
    careerReadiness: 70,
    status: 'On Track'
  }
];

export const mockStudentSubmissions: StudentSubmission[] = [
  {
    id: 'sub_01',
    assignmentId: 'asg_01',
    studentId: 'usr_student_01',
    studentName: 'Alex Chen',
    studentRegisterNo: 'CS2023-8842',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-02T18:40:00',
    fileName: 'AlexChen_CS602_Assignment3.zip',
    fileUrl: '#',
    status: 'graded',
    marksAwarded: 94,
    totalMarks: 100,
    feedback: 'Excellent implementation Alex! Your gradient check was mathematically rigorous and vectorization was clean.'
  },
  {
    id: 'sub_02',
    assignmentId: 'asg_01',
    studentId: 's_02',
    studentName: 'Priya Sharma',
    studentRegisterNo: 'CS2023-8850',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-02T19:15:00',
    fileName: 'PriyaSharma_CS602_Backprop.ipynb',
    fileUrl: '#',
    status: 'graded',
    marksAwarded: 91,
    totalMarks: 100,
    feedback: 'Very neat documentation. Good handling of learning rate decay.'
  },
  {
    id: 'sub_03',
    assignmentId: 'asg_01',
    studentId: 's_03',
    studentName: 'Marcus Brody',
    studentRegisterNo: 'CS2023-8819',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    submittedAt: '2026-09-03T02:10:00',
    fileName: 'Marcus_Assignment3.zip',
    fileUrl: '#',
    status: 'submitted',
    totalMarks: 100
  }
];
