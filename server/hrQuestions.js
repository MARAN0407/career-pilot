// Authoritative HR Interview Question Bank for Career Accelerator
// Generates diverse, shuffled behavioral and career suitability questions customized for each department

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateHrQuestions(department = 'Engineering', count = 5) {
  const basePool = [
    {
      q: `Tell me about yourself, your educational background in ${department}, and what inspired you to pursue a career in this discipline?`,
      keywords: ['education', 'background', 'passion', 'projects', 'career goal', 'skills', department.toLowerCase()],
      keypoints: [
        `Concise summary of academic background and key qualifications in ${department}`,
        'Articulates specific spark or practical project that ignited interest in the field',
        'Connects current technical competencies with professional career ambitions'
      ],
      modelAnswer: `I am an ambitious engineering graduate specializing in ${department}. During my academic coursework, I developed a strong grounding in core principles and hands-on laboratory experimentation. What truly inspired me was seeing how foundational engineering translates into tangible societal solutions. Through academic capstones and practical projects, I honed my analytical problem-solving and collaboration skills. I am eager to apply my technical foundation and rapid learning agility to contribute meaningfully to your team.`,
      explanation: 'Opening behavioral questions assess narrative clarity, personal motivation, and authentic enthusiasm for the discipline.',
      improvementTip: 'Use the Present-Past-Future framework: describe your current focus and strengths, mention pivotal past projects or realizations, and conclude with your future goals for this role.'
    },
    {
      q: `Describe a challenging engineering project or assignment in ${department} where you faced unexpected obstacles. How did you handle the situation and keep progress on track?`,
      keywords: ['challenge', 'obstacle', 'solution', 'adaptability', 'perseverance', 'outcome'],
      keypoints: [
        'Identifies a concrete technical or logistical hurdle during an engineering task',
        'Details proactive troubleshooting steps and analytical problem solving',
        'Highlights resilience, timely communication, and successful delivery'
      ],
      modelAnswer: `During a major coursework project in ${department}, our prototype suffered unexpected performance deviations right before our intermediate milestone. Rather than panicking, I systematically isolated variables, cross-referenced our theoretical calculations with experimental readings, and identified a calibration mismatch. I coordinated with my teammates to split testing duties and worked late to re-verify our parameters. We resolved the discrepancy, submitted our validated results on time, and achieved top marks.`,
      explanation: 'Assesses emotional composure, systematic debugging skills, and perseverance when plans encounter real-world resistance.',
      improvementTip: 'Focus on what YOU specifically did to diagnose and resolve the problem, quantifying the positive result wherever possible.'
    },
    {
      q: `How do you handle disagreements or conflicting perspectives with team members when working on collaborative engineering projects in ${department}?`,
      keywords: ['conflict', 'disagreement', 'communication', 'listening', 'compromise', 'collaboration', 'respect'],
      keypoints: [
        'Recognizes diverse viewpoints as an opportunity for better engineering outcomes',
        'Describes an objective, data-backed approach to resolving design or procedural debates',
        'Demonstrates professional empathy, active listening, and team alignment'
      ],
      modelAnswer: `When disagreements arise on design choices or methodologies, I focus on the shared goal and anchor the discussion in objective evidence rather than personal preferences. I listen carefully to understand my colleague's reasoning and concerns. Often, we run rapid simulations or small proof-of-concept tests to compare alternatives empirically. If trade-offs exist between cost, speed, or performance, we review the project requirements together to reach a consensus that best serves the project.`,
      explanation: 'Team friction is inevitable in engineering. Recruiters evaluate whether you are defensive or collaborative and evidence-driven.',
      improvementTip: 'Never speak negatively about past peers. Emphasize active listening, empirical testing of options, and alignment with project specs.'
    },
    {
      q: `Engineering fields like ${department} evolve rapidly. How do you stay updated with emerging industry standards, software tools, and technological advancements?`,
      keywords: ['continuous learning', 'industry standards', 'tools', 'publications', 'curiosity', 'certifications'],
      keypoints: [
        `Names specific learning channels, journals, or technical communities relevant to ${department}`,
        'Describes regular habits of self-study, reading research papers, or online upskilling',
        'Demonstrates proactive curiosity and eagerness to experiment with new tools'
      ],
      modelAnswer: `I treat continuous learning as a core professional responsibility. I actively follow IEEE publications, industry newsletters, and technical blogs relevant to ${department}. I also participate in open-source discussions, attend campus webinars, and complete specialized micro-courses to master modern simulation and CAD tools. Whenever an emerging framework or standard gains traction, I build small weekend projects to understand its practical capabilities firsthand.`,
      explanation: 'Demonstrates growth mindset and long-term viability in an industry where tools become obsolete quickly.',
      improvementTip: 'Name specific professional bodies, journals, newsletters, or online platforms you actually use to stay informed.'
    },
    {
      q: `Tell me about a time you received constructive criticism or negative feedback on your engineering work. How did you react, and what actions did you take to improve?`,
      keywords: ['feedback', 'constructive criticism', 'receptive', 'improvement', 'humility', 'action plan'],
      keypoints: [
        'Displays emotional maturity and openness when receiving performance critiques',
        'Explains concrete corrective actions taken to address identified shortcomings',
        'Shows measurable improvement in subsequent deliverables'
      ],
      modelAnswer: `During a design review in our ${department} lab, my faculty mentor pointed out that while my calculations were accurate, my documentation and error tolerance analyses were insufficiently detailed for production standards. Initially I felt disappointed, but I quickly realized the critique was invaluable for my growth. I asked clarifying questions, studied industry-standard documentation templates, and revised my entire report with comprehensive error propagation tables. My mentor praised the updated submission, and I have made rigorous documentation a standard part of my workflow ever since.`,
      explanation: 'Evaluates humility, coachability, and whether you convert critique into tangible skill improvement.',
      improvementTip: 'Acknowledge initial emotions briefly, then focus 80% of your answer on the concrete steps you took to improve and the resulting progress.'
    },
    {
      q: `Where do you see yourself professionally in 3 to 5 years within the ${department} industry?`,
      keywords: ['future goals', 'career plan', 'growth', 'expertise', 'leadership', 'technical depth'],
      keypoints: [
        `Articulates a clear, realistic growth trajectory aligned with ${department}`,
        'Balances technical mastery with emerging leadership or domain specialization',
        'Expresses commitment to adding value and mentoring others'
      ],
      modelAnswer: `In 3 to 5 years, my goal is to have developed deep domain expertise within ${department}, moving from implementing assigned modules to leading complex engineering design decisions. I see myself taking ownership of end-to-end deliverables, solving high-impact technical bottlenecks, and mentoring junior engineers. I also aim to attain relevant professional certifications and contribute to continuous process improvements within the organization.`,
      explanation: 'Ensures your career aspirations are aligned with the company\'s growth and that you have vision and ambition.',
      improvementTip: 'Balance personal ambition (learning, mastery) with organizational value (improving processes, mentoring, driving business impact).'
    },
    {
      q: `What are your greatest technical strengths, and what is one area in ${department} you are actively working to improve?`,
      keywords: ['strengths', 'weakness', 'self awareness', 'technical skills', 'growth', 'improvement'],
      keypoints: [
        'States authentic technical strengths with supporting evidence',
        'Identifies a genuine, non-critical developmental area with an active remediation plan',
        'Demonstrates self-awareness and active self-improvement habits'
      ],
      modelAnswer: `My greatest strength is my analytical problem-solving and rigorous mathematical intuition, which allows me to quickly dissect complex ${department} systems and model their behavior. An area I am actively strengthening is public speaking and presenting technical designs to non-technical stakeholders. To improve, I volunteered to present our capstone progress reports and joined campus technical debate forums, which has significantly enhanced my ability to explain complex engineering concepts simply.`,
      explanation: 'Tests genuine self-awareness without resorting to cliché answers like "I\'m a perfectionist".',
      improvementTip: 'Choose a real skill you are working on, explain why it matters, and detail the specific steps you are already taking to master it.'
    },
    {
      q: `Why do you want to work for our organization rather than other companies hiring in ${department}?`,
      keywords: ['company culture', 'mission', 'projects', 'alignment', 'contribution', 'value'],
      keypoints: [
        'Demonstrates genuine research into the organization\'s engineering projects and values',
        'Connects personal engineering philosophy with the company\'s mission',
        'Explains what unique value the candidate can bring to the team'
      ],
      modelAnswer: `Your organization stands out because of your track record of pioneering high-reliability engineering solutions in ${department}. I have followed your recent initiatives and admire your focus on innovation, sustainability, and rigorous quality standards. My academic foundation, combined with my hands-on project experience, aligns directly with the challenges your teams solve daily. I want to build my career in an environment where technical excellence and purposeful engineering are at the core of every project.`,
      explanation: 'Reveals whether the candidate is applying indiscriminately or has genuine, informed reasons for wanting to join.',
      improvementTip: 'Reference specific products, values, or initiatives of the company, and explain how your specific skills can accelerate their goals.'
    }
  ];

  const shuffled = shuffleArray(basePool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((item, idx) => ({
    id: `q_hr_${idx + 1}_${Date.now()}`,
    questionNumber: idx + 1,
    totalQuestions: selected.length,
    department,
    subject: 'HR & Behavioral Evaluation',
    difficulty: 'Intermediate',
    category: 'HR Round',
    round: 'HR Round',
    role: `${department} Candidate`,
    questionText: item.q,
    expectedKeypoints: item.keypoints,
    requiredKeywords: item.keywords,
    modelAnswer: item.modelAnswer,
    explanation: item.explanation,
    improvementTip: item.improvementTip
  }));
}
