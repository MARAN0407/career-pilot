// Authoritative STAR Leadership Interview Question Bank for Career Accelerator
// Generates diverse, shuffled Situation-Task-Action-Result leadership and crisis handling questions

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateStarQuestions(department = 'Engineering', count = 5) {
  const basePool = [
    {
      q: `Using the STAR method (Situation, Task, Action, Result), describe a time when an engineering project or lab experiment in ${department} was failing or severely delayed. What was your role, and how did you lead the team to a successful delivery?`,
      keywords: ['situation', 'task', 'action', 'result', 'leadership', 'delay', 'deadline', 'resolution', department.toLowerCase()],
      keypoints: [
        'Situation: Sets clear context regarding the project scope, technical deadline, and nature of the delay',
        'Task: Clearly outlines specific ownership responsibilities and goals under time pressure',
        'Action: Details methodical troubleshooting, work delegation, and tactical engineering decisions',
        'Result: Quantifies final delivery success, metrics improved, and key lessons learned'
      ],
      modelAnswer: `Situation: During our final semester capstone project in ${department}, our system failed integration tests 10 days before the deadline due to an unexpected signal incompatibility between modules. 
Task: As the project technical lead, my responsibility was to diagnose the root cause, realign the team, and deliver a fully compliant prototype on schedule. 
Action: I scheduled an emergency triage session, mapped all signal flows, and isolated the offending interface. I redistributed tasks so two teammates worked on re-calibrating the interface while I redesigned the filtering stage. I established daily 15-minute syncs to track progress. 
Result: We resolved the bottleneck within 4 days, completed validation testing with 99.2% signal fidelity, and received the Best Technical Design award in our department symposium.`,
      explanation: 'Evaluates executive function under intense project pressure, root-cause diagnosis, and situational leadership.',
      improvementTip: 'Explicitly label or guide the interviewer through Situation, Task, Action, and Result, ensuring the Action highlights your personal leadership decisions and the Result includes a measurable metric.'
    },
    {
      q: `Walk me through a situation (using STAR) where you had to make an important engineering design decision in ${department} with incomplete data or conflicting technical specifications.`,
      keywords: ['situation', 'task', 'action', 'result', 'decision making', 'ambiguity', 'tradeoff', 'risk mitigation'],
      keypoints: [
        'Situation: Explains ambiguous requirements or incomplete experimental/vendor data',
        'Task: Explains the critical decision deadline and risks of inaction',
        'Action: Describes risk-weighted analysis, benchmarking, conservative safety factors, and consulting experts',
        'Result: Documents successful outcome, absence of critical failures, and organizational validation'
      ],
      modelAnswer: `Situation: When sizing system components for a ${department} build, the vendor could not provide certified thermal dissipation curves under high duty-cycles before procurement closed. 
Task: I needed to finalize component selection within 48 hours to avoid a 6-week supply chain delay without risking thermal throttling. 
Action: I performed conservative theoretical thermodynamic calculations using worst-case ambient assumptions and cross-referenced historical test logs from similar legacy assemblies. I incorporated a 25% safety margin in heat sinking and designed modular airflow baffles as a contingency. 
Result: The procured hardware operated safely with temperatures remaining 14°C below critical thresholds during thermal stress tests, and our project stayed on schedule.`,
      explanation: 'Senior engineering roles require sound judgment when full information is unobtainable. Recruiters look for structured risk management.',
      improvementTip: 'Explain your analytical mental model: how you bounded the unknowns, applied safety factors, and designed contingency fallback options.'
    },
    {
      q: `Give an example using STAR where you identified a significant safety hazard, ethical dilemma, or operational inefficiency in an engineering workflow in ${department} and championed a corrective solution.`,
      keywords: ['situation', 'task', 'action', 'result', 'safety', 'ethics', 'initiative', 'compliance', 'process improvement'],
      keypoints: [
        'Situation: Identifies unaddressed safety risk, procedural shortcut, or compliance gap',
        'Task: Expresses personal duty of care and commitment to engineering integrity',
        'Action: Details proactive communication, data collection, and constructive remediation proposal',
        'Result: Quantifies improved safety, reduced error rates, and formal policy/workflow updates'
      ],
      modelAnswer: `Situation: During laboratory sessions in ${department}, I observed that team members were skipping secondary ground verification checks to expedite test cycles, posing an electrical hazard and risking sensor damage. 
Task: I felt a duty to eliminate the risk without creating resentment or reducing overall testing throughput. 
Action: I compiled data showing that 3 previous sensor failures were attributable to ground bounce. I designed a visual, 3-point checklist laminated at each bench and built an automated interlocking check into our test script that verified ground presence before energizing the circuit. 
Result: Zero sensor damages occurred for the remainder of the semester, testing cycle time actually dropped by 12% due to fewer setup errors, and the department head adopted the checklist across all undergraduate labs.`,
      explanation: 'Integrity and safety consciousness are paramount engineering qualities. Shows constructive initiative over passive compliance.',
      improvementTip: 'Highlight how you persuaded others through data and positive process design rather than policing or confrontation.'
    },
    {
      q: `Describe a situation using the STAR framework where you had to persuade skeptical peers or stakeholders in ${department} to adopt your proposed technical solution over an established approach.`,
      keywords: ['situation', 'task', 'action', 'result', 'persuasion', 'stakeholders', 'data-driven', 'prototype', 'influence'],
      keypoints: [
        'Situation: Explains resistance to a modern or more efficient engineering methodology',
        'Task: Demonstrates necessity to upgrade while respecting stakeholder concerns',
        'Action: Built low-cost prototype or proof-of-concept, gathered quantitative metrics, and presented clear trade-offs',
        'Result: Successfully achieved consensus, executed transition smoothly, and proved measurable efficiency gain'
      ],
      modelAnswer: `Situation: For our ${department} semester project, our team planned to use a traditional manual calibration methodology that took 4 hours per trial, while I proposed adopting an automated scripted calibration approach. 
Task: My peers were skeptical, worried that building the script would consume too much upfront time. 
Action: Over the weekend, I built a lightweight proof-of-concept script for one subsystem and benchmarked it against manual calibration. I presented side-by-side data demonstrating a 75% reduction in trial time and 3x higher repeatability. I offered to pair-program with teammates to ensure everyone felt comfortable with the code. 
Result: The team unanimously approved the new pipeline, saving over 30 hours of lab time across our trials and allowing us to complete double the planned test iterations.`,
      explanation: 'Evaluates technical influence without authority. Great engineers lead through empirical prototypes and inclusive collaboration.',
      improvementTip: 'Focus on how you addressed their legitimate fears (e.g. risk of time loss) through quick prototyping and collaborative support.'
    },
    {
      q: `Tell me about a time (using STAR) when you mentored or coached a less experienced teammate in ${department} who was struggling with a complex engineering concept or software tool.`,
      keywords: ['situation', 'task', 'action', 'result', 'mentorship', 'empathy', 'coaching', 'knowledge transfer'],
      keypoints: [
        'Situation: Identifies a teammate struggling with technical concepts or toolchains',
        'Task: Takes ownership of peer success and overall team cohesion',
        'Action: Employs patient pedagogical techniques: diagrams, code reviews, and scaffolded practice',
        'Result: Demonstrates the mentee gaining independence and contributing high-quality deliverables'
      ],
      modelAnswer: `Situation: A junior teammate joining our ${department} research cohort struggled with complex numerical simulation software and was falling behind on their simulation deadlines. 
Task: As senior peer lead, I stepped in to help them overcome the learning curve without doing their work for them. 
Action: I scheduled three 45-minute whiteboard sessions breaking the simulation physics down into intuitive modular stages. I created a reusable starter template with step-by-step comments and had them drive the software while I guided. I encouraged them to ask questions without fear of judgment. 
Result: Within two weeks, they were independently configuring complex boundary conditions and delivered their assignment 2 days early with accurate convergence. They later went on to co-author our conference submission.`,
      explanation: 'True leaders elevate the capabilities of everyone around them. Tests empathy, teaching ability, and commitment to collective success.',
      improvementTip: 'Emphasize your coaching methodology: breaking concepts down, active listening, and empowering them to build self-confidence.'
    },
    {
      q: `Using STAR, describe a project in ${department} where you had to balance strict budget, component scarcity, or resource constraints while still meeting high performance criteria.`,
      keywords: ['situation', 'task', 'action', 'result', 'budget', 'resource constraints', 'optimization', 'efficiency'],
      keypoints: [
        'Situation: Clarifies tight financial, computational, or component constraints',
        'Task: Defines non-negotiable performance targets that could not be sacrificed',
        'Action: Explores value engineering, open-source alternatives, component substitutions, or algorithmic efficiency',
        'Result: Achieved all performance metrics within budget, documenting the cost-benefit analysis'
      ],
      modelAnswer: `Situation: Our student robotics team in ${department} had a strict $300 component budget for our autonomous guidance system, whereas commercial off-the-shelf industrial LiDAR sensors cost over $1,200. 
Task: My task as hardware lead was to achieve reliable 2D obstacle detection at 5Hz without exceeding our financial cap. 
Action: I researched cost-effective alternatives and architected a stereo vision camera setup using two calibrated $25 camera modules paired with an optimized OpenCV edge-detection pipeline running on an existing single-board computer. I optimized memory buffers to maintain a 15fps frame rate without hardware upgrades. 
Result: The system successfully mapped obstacle distances within 3cm accuracy up to 8 meters, cost only $78 total (74% under budget), and qualified our team for the national finals.`,
      explanation: 'Demonstrates resourceful value-engineering and creative problem solving when lavish resources are unavailable.',
      improvementTip: 'Clearly contrast the high cost of standard solutions with the ingenuity of your optimized approach, quantifying the savings.'
    }
  ];

  const shuffled = shuffleArray(basePool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((item, idx) => ({
    id: `q_star_${idx + 1}_${Date.now()}`,
    questionNumber: idx + 1,
    totalQuestions: selected.length,
    department,
    subject: 'STAR Leadership & Behavioral Assessment',
    difficulty: 'Advanced',
    category: 'Star Leadership Round',
    round: 'Star Leadership Round',
    role: `${department} Technical Leader`,
    questionText: item.q,
    expectedKeypoints: item.keypoints,
    requiredKeywords: item.keywords,
    modelAnswer: item.modelAnswer,
    explanation: item.explanation,
    improvementTip: item.improvementTip
  }));
}
