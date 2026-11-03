// Subject-Specific Question Generation Engine for Career Accelerator
// Authoritative curriculum questions for all 14 Engineering Departments

import { DEPARTMENT_SUBJECTS, getSubjectsForDepartment, isValidDepartment, isValidDepartmentSubject } from './departmentSubjects.js';

// Deep curated question banks for high-frequency benchmark subjects across departments
const CURATED_SUBJECT_QUESTIONS = {
  // EEE: Power Electronics and Applications
  'Power Electronics and Applications': [
    {
      difficulty: 'Beginner',
      questionText: 'What is a rectifier, and how does a half-wave rectifier differ from a full-wave bridge rectifier in terms of rectification efficiency and ripple factor?',
      requiredKeywords: ['rectifier', 'ac to dc', 'diode', 'ripple factor', 'efficiency', 'bridge'],
      expectedKeypoints: [
        'Defines rectifier as circuit converting AC to DC',
        'Half-wave utilizes one half cycle with 40.6% max theoretical efficiency and ripple factor of 1.21',
        'Full-wave bridge utilizes both half cycles with 81.2% max theoretical efficiency and ripple factor of 0.48',
        'Bridge rectifier uses 4 diodes without requiring center-tapped transformer'
      ],
      modelAnswer: 'A rectifier is an electrical circuit that converts alternating current (AC) into pulsating direct current (DC) using diodes. A half-wave rectifier conducts during only one half-cycle of the AC input, yielding a maximum theoretical efficiency of 40.6% and a ripple factor of 1.21. In contrast, a full-wave bridge rectifier utilizes four diodes in a bridge topology to conduct during both half-cycles, achieving up to 81.2% theoretical efficiency and a lower ripple factor of 0.48.',
      explanation: 'Rectification is fundamental in power conversion. Bridge rectifiers double the output ripple frequency (2*fin), which substantially reduces the size and cost of the required smoothing filter compared to half-wave topologies.',
      improvementTip: 'State the formal definition first, then provide exact comparison metrics: conduction angle, maximum theoretical efficiency, ripple factor, and peak inverse voltage (PIV).'
    },
    {
      difficulty: 'Intermediate',
      questionText: 'Explain the working principle of a DC-DC Buck converter and derive its ideal voltage transfer ratio in continuous conduction mode (CCM).',
      requiredKeywords: ['buck', 'step-down', 'duty cycle', 'inductor', 'capacitor', 'switch', 'ccm'],
      expectedKeypoints: [
        'Buck converter steps down DC voltage to lower DC voltage',
        'Composed of controllable switch (MOSFET/IGBT), freewheeling diode, inductor, and filter capacitor',
        'During switch ON, inductor charges; during switch OFF, inductor discharges through freewheeling diode',
        'Volt-second balance across inductor yields Vout = D * Vin, where D is duty cycle (0 < D < 1)'
      ],
      modelAnswer: 'A Buck converter is a step-down switch-mode DC-DC converter. In Continuous Conduction Mode (CCM), when the active switch is ON for time DT, the diode is reverse-biased and energy is stored in the inductor while supplying the load. When the switch is OFF for (1-D)T, the inductor voltage reverses and current freewheels through the diode. By applying inductor volt-second balance over one switching cycle: (Vin - Vout)*D*T = Vout*(1-D)*T, simplifying to Vout = D * Vin, where D is the duty ratio between 0 and 1.',
      explanation: 'Switch-mode power supplies achieve efficiencies exceeding 90% by operating semiconductors strictly in saturation or cut-off, avoiding the resistive heat losses of linear regulators.',
      improvementTip: 'Clearly state the two operational states (switch ON vs switch OFF) and invoke the inductor volt-second balance principle to justify the output voltage equation.'
    },
    {
      difficulty: 'Advanced',
      questionText: 'Analyze the commutation failure mechanisms in line-commutated thyristor inverters and explain how extinction angle (gamma) control prevents it.',
      requiredKeywords: ['thyristor', 'commutation failure', 'extinction angle', 'gamma', 'overlap angle', 'reverse bias'],
      expectedKeypoints: [
        'Thyristors need sufficient reverse bias time (tq) after current drops to zero to regain forward blocking capability',
        'Commutation failure occurs when extinction angle gamma is less than the thyristor turn-off angle omega*tq',
        'Causes include sudden AC voltage dips, excessive DC current, or late firing angles (alpha near 180 degrees)',
        'Constant extinction angle (CEA) controllers dynamically regulate firing angle to preserve a safe safety margin gamma_min'
      ],
      modelAnswer: 'Commutation failure in line-commutated inverters occurs when an outgoing thyristor fails to recover its forward blocking capability before its anode-to-cathode voltage turns positive again. The extinction angle gamma equals 180° - (alpha + u), where alpha is firing angle and u is overlap angle. If gamma is less than omega*tq (turn-off time of the thyristor), commutation fails, causing a short circuit across the DC side. Closed-loop extinction angle (gamma) controllers maintain gamma at or above a minimum safety threshold (typically 15°-18°) despite AC grid voltage fluctuations or load transients.',
      explanation: 'In HVDC transmission and grid-tie regenerative drives, line-commutated converters rely on AC bus voltage for natural commutation. Commutation failure collapses DC link voltage and causes dangerous overcurrents.',
      improvementTip: 'Include the mathematical relationship between firing angle alpha, overlap angle u, and extinction angle gamma, and explain the physical necessity of reverse-recovery carrier recombination.'
    }
  ],

  // AI & ML: Deep Learning
  'Deep Learning': [
    {
      difficulty: 'Beginner',
      questionText: 'What is an artificial neural network, and what is the specific role of non-linear activation functions such as ReLU and Sigmoid?',
      requiredKeywords: ['neural network', 'activation function', 'relu', 'sigmoid', 'non-linearity', 'linear combination'],
      expectedKeypoints: [
        'Neural networks compose layers of linear combinations (W*x + b) passed through activation functions',
        'Without non-linear activations, multi-layer networks collapse mathematically to a single linear transformation',
        'Sigmoid maps values to (0, 1) but suffers from vanishing gradients at saturation regions',
        'ReLU (max(0, x)) introduces non-linearity without saturating in positive domain, allowing faster gradient propagation'
      ],
      modelAnswer: 'An artificial neural network is a computational architecture inspired by biological neurons, consisting of interconnected layers that apply learned weights and biases to input features. Activation functions introduce non-linearity into the network. Without non-linear activations, composing multiple dense layers would simply result in a single linear transformation W_total * x, preventing the network from learning complex non-linear decision boundaries. ReLU (f(x)=max(0,x)) is widely favored because its gradient is 1 for positive inputs, combating vanishing gradients during backpropagation.',
      explanation: 'Non-linear activations grant deep neural networks the universal function approximation capability, enabling them to represent arbitrary continuous functions on compact subsets of Rn.',
      improvementTip: 'Explicitly explain the mathematical consequence of omitting activation functions (collapse into a single matrix multiplication) and contrast ReLU with Sigmoid.'
    },
    {
      difficulty: 'Intermediate',
      questionText: 'Explain how the backpropagation algorithm works using the chain rule of calculus, and discuss why the vanishing gradient problem occurs in deep networks.',
      requiredKeywords: ['backpropagation', 'chain rule', 'gradient', 'vanishing gradient', 'loss function', 'partial derivative'],
      expectedKeypoints: [
        'Backpropagation computes gradients of the scalar loss with respect to all trainable weights using the chain rule',
        'Gradients propagate backward from output layer to earlier layers',
        'Vanishing gradient occurs when continuous multiplication of small derivatives (e.g. Sigmoid derivative max 0.25) shrinks gradients exponentially',
        'Mitigations include ReLU activations, residual connections, proper weight initialization (He/Xavier), and Batch Normalization'
      ],
      modelAnswer: 'Backpropagation computes the gradient of the loss function with respect to every weight in the network by applying the calculus chain rule backward from the output layer to the input. For weight w_ij in layer l, dL/dw_ij = (dL/da_l) * (da_l/dz_l) * (dz_l/dw_ij). In deep networks with saturating activations like sigmoid, the derivative da/dz is bounded by 0.25. Repeatedly multiplying these fractional terms across many layers causes the gradient to decay exponentially toward zero, preventing early layers from updating. Solutions include ReLU activations, He initialization, Batch Normalization, and skip connections.',
      explanation: 'Backpropagation is an efficient reverse-mode automatic differentiation algorithm with O(weights) complexity rather than O(weights^2) forward perturbation.',
      improvementTip: 'Write down the chain rule decomposition symbolically (dL/dw = dL/dy * dy/dz * dz/dw) and outline at least three standard architectural mitigations.'
    },
    {
      difficulty: 'Advanced',
      questionText: 'Detail the architecture of the Transformer Scaled Dot-Product Attention mechanism and explain why multi-head attention outperforms single-head attention.',
      requiredKeywords: ['transformer', 'attention', 'query', 'key', 'value', 'softmax', 'multi-head', 'scaled dot-product'],
      expectedKeypoints: [
        'Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V',
        'Scaling factor 1/sqrt(d_k) prevents dot products from growing large where softmax gradient vanishes',
        'Multi-head attention projects Q, K, V into h distinct representation subspaces with learned linear projections',
        'Enables model to jointly attend to information from different representation subspaces and positions simultaneously'
      ],
      modelAnswer: 'The Transformer Scaled Dot-Product Attention computes attention weights between Query (Q) and Key (K) matrices as Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V. The scaling factor 1/sqrt(d_k) counteracts the growth of dot product magnitudes in high dimensions, preventing the softmax function from saturating into regions with near-zero gradients. Multi-head attention projects queries, keys, and values into h lower-dimensional subspaces using independent learned parameter matrices W_i^Q, W_i^K, W_i^V. This allows the model to jointly attend to different types of semantic and syntactic relationships at multiple positions simultaneously, which a single attention head averaging all signals cannot resolve.',
      explanation: 'Multi-head attention replaces recurrent recurrence with parallelizable token-to-token associative retrieval, forming the bedrock of modern LLMs such as GPT, BERT, and LLaMA.',
      improvementTip: 'State the exact equation including the scaling denominator, explain why dot products saturate softmax without scaling, and discuss subspace specialization.'
    }
  ],

  // Biomedical Engineering: Biosignal Processing
  'Biosignal Processing': [
    {
      difficulty: 'Beginner',
      questionText: 'What is a biosignal? Describe the electrical origin and diagnostic significance of the P-Q-R-S-T wave complex in an electrocardiogram (ECG).',
      requiredKeywords: ['biosignal', 'ecg', 'p wave', 'qrs complex', 't wave', 'depolarization', 'repolarization'],
      expectedKeypoints: [
        'Biosignals are electrical, mechanical, or chemical signals originating from biological physiological processes',
        'ECG records cardiac electrical activity on the body surface',
        'P wave represents atrial depolarization (atrial contraction)',
        'QRS complex represents ventricular depolarization (ventricular contraction), masking atrial repolarization',
        'T wave represents ventricular repolarization (ventricular relaxation and recovery)'
      ],
      modelAnswer: 'A biosignal is a measurable signal produced by living physiological systems, carrying diagnostic information about biological state. An electrocardiogram (ECG) records the spatial sum of action potentials generated by cardiac myocytes. The P wave corresponds to atrial depolarization preceding atrial contraction. The sharp QRS complex represents rapid ventricular depolarization, which masks concurrent atrial repolarization. Finally, the T wave signifies ventricular repolarization, where ventricles relax and recharge for the next cardiac cycle.',
      explanation: 'ECG morphology timing and amplitudes serve as primary diagnostic criteria for arrhythmias, myocardial infarction, bundle branch blocks, and electrolyte imbalances.',
      improvementTip: 'Trace each segment chronologically through the cardiac cycle, linking each waveform to its specific anatomical event (depolarization vs repolarization of atria and ventricles).'
    },
    {
      difficulty: 'Intermediate',
      questionText: 'Explain the spectral characteristics and clinical states associated with the four major EEG rhythms (Delta, Theta, Alpha, and Beta).',
      requiredKeywords: ['eeg', 'delta', 'theta', 'alpha', 'beta', 'frequency', 'hertz', 'brain waves'],
      expectedKeypoints: [
        'Electroencephalogram (EEG) captures postsynaptic potential oscillations from cortical pyramidal neurons',
        'Delta (0.5 - 4 Hz): High amplitude, associated with deep slow-wave sleep (stage 3/4) and pathological encephalopathy in awake adults',
        'Theta (4 - 8 Hz): Associated with drowsiness, light sleep, meditation, and creative problem solving',
        'Alpha (8 - 13 Hz): Dominant over occipital region during awake, relaxed state with closed eyes; blocks upon eye opening (Berger effect)',
        'Beta (13 - 30 Hz): Low amplitude, fast rhythm associated with active concentration, alert cognition, and motor planning'
      ],
      modelAnswer: 'EEG waveforms reflect rhythmic postsynaptic potential sums of synchronized cortical pyramidal neurons, divided into four classical frequency bands: 1) Delta (0.5-4 Hz): highest amplitude, characteristic of deep stage-3/4 NREM sleep and brain lesions in awake adults. 2) Theta (4-8 Hz): prominent in drowsiness, light sleep, childhood, and meditative focus. 3) Alpha (8-13 Hz): posterior dominant rhythm in awake individuals resting with eyes closed; exhibits alpha blocking upon visual or sensory stimulus. 4) Beta (13-30 Hz): low-amplitude desynchronized activity characteristic of alert cognitive processing, focused calculation, and active motor control.',
      explanation: 'Quantitative EEG (qEEG) applies FFT or Wavelet decomposition to quantify spectral power density across these bands for epilepsy mapping, sleep staging, and coma monitoring.',
      improvementTip: 'State the precise frequency ranges in Hertz for all four bands and pair each with its typical cognitive or physiological state.'
    },
    {
      difficulty: 'Advanced',
      questionText: 'How do you design an adaptive noise canceler based on the Least Mean Squares (LMS) algorithm to eliminate 50/60 Hz power-line interference from a raw ECG signal without distorting the ST segment?',
      requiredKeywords: ['adaptive filter', 'lms', 'power line interference', '50 hz', 'reference input', 'error signal', 'st segment'],
      expectedKeypoints: [
        'Fixed notch filters distort clinical ECG waveforms (e.g. ST segment elevation) when powerline harmonics or cardiac frequency components overlap',
        'Adaptive LMS filter uses primary input (ECG + noise) and reference input (correlated synthetic or measured power-line sine/cosine)',
        'Filter weights adapt iteratively: w(n+1) = w(n) + 2 * mu * e(n) * x(n)',
        'The error signal e(n) converges to the clean, undistorted ECG as the estimated noise component is subtracted'
      ],
      modelAnswer: 'Standard IIR/FIR notch filters produce ringing artifacts and phase distortions that can falsely alter ST-segment elevation or depression, misleading myocardial infarction diagnoses. An adaptive LMS noise canceler uses a primary channel containing the corrupted ECG d(n) = s(n) + n0(n) and a reference input x(n) containing a synthetic 50/60 Hz reference correlated with the power-line interference. An FIR transversal filter produces noise estimate y(n) = w^T * x(n). The error signal e(n) = d(n) - y(n) represents the cleaned ECG. Weights are updated via w(n+1) = w(n) + 2*mu*e(n)*x(n). Because the cardiac signal s(n) is uncorrelated with power-line frequency x(n), minimizing E[e^2(n)] forces y(n) to converge to the noise, leaving the clinical ECG morphology completely preserved.',
      explanation: 'Adaptive filtering dynamically tracks small power-line frequency fluctuations (e.g. 49.8 Hz to 50.2 Hz) while maintaining zero group-delay distortion over the physiological passband.',
      improvementTip: 'Contrast the adaptive approach against fixed notch filters, write out the LMS weight update rule, and justify why the error signal represents the cleaned physiological output.'
    }
  ],

  // Civil Engineering: Structural Analysis
  'Structural Analysis': [
    {
      difficulty: 'Beginner',
      questionText: 'What is the difference between a determinate and an indeterminate structure? How is the static indeterminacy (degree of indeterminacy) calculated for a planar frame?',
      requiredKeywords: ['determinate', 'indeterminate', 'static indeterminacy', 'equilibrium equations', 'reactions', 'joints'],
      expectedKeypoints: [
        'Determinate structures can be fully solved using equations of static equilibrium alone (Sum Fx=0, Sum Fy=0, Sum M=0)',
        'Indeterminate structures require additional compatibility equations relating deflections and boundary conditions',
        'Degree of static indeterminacy D_s = D_se (external) + D_si (internal)',
        'For a 2D frame: D_s = 3m + r - 3j (where m is members, r is reaction components, j is joints)'
      ],
      modelAnswer: 'A statically determinate structure is one where all support reactions and internal member forces can be uniquely determined using the basic equations of static equilibrium alone (Sum Fx = 0, Sum Fy = 0, Sum M = 0). A statically indeterminate structure has more unknown forces than independent equilibrium equations, necessitating compatibility conditions based on deformation and material elasticity. For a rigid planar frame, the total degree of static indeterminacy is given by D_s = 3m + r - 3j, where m is number of members, r is number of external support reactions, and j is number of rigid joints.',
      explanation: 'Indeterminate structures generally offer higher stiffness, smaller deflections, and alternative load paths during member damage, but are susceptible to secondary stresses from temperature changes and support settlements.',
      improvementTip: 'State the equilibrium condition criteria clearly and provide the exact formula for planar frames, defining every variable explicitly.'
    },
    {
      difficulty: 'Intermediate',
      questionText: 'Explain the Moment Distribution Method developed by Hardy Cross. Define distribution factor, carry-over factor, and fixed-end moments.',
      requiredKeywords: ['moment distribution', 'hardy cross', 'distribution factor', 'carry over factor', 'fixed end moments', 'stiffness'],
      expectedKeypoints: [
        'Iterative displacement method for continuous beams and non-sway/sway frames without solving simultaneous equations',
        'Fixed-End Moments (FEM) represent moments developed at clamped ends due to applied span loads',
        'Member stiffness k = 4EI/L (far end fixed) or 3EI/L (far end hinged)',
        'Distribution Factor DF_i = k_i / Sum(k) at a joint',
        'Carry-over factor is +0.5 for prismatic member with far end fixed'
      ],
      modelAnswer: 'The Moment Distribution Method is an iterative displacement method for analyzing indeterminate continuous beams and frames. It begins by artificially locking all joints to compute Fixed-End Moments (FEM) from span loads. Each joint is then sequentially unlocked: the unbalanced moment at the joint is distributed among connected members proportional to their relative flexural stiffness k (where k=4EI/L for far-end fixed, k=3EI/L for far-end pinned) using the Distribution Factor DF = k / Sum(k). A carry-over moment equal to 50% (carry-over factor = +0.5 for prismatic members) of the distributed moment is transferred to the opposite fixed support. Joints are locked and balanced repeatedly until unbalanced moments become negligible.',
      explanation: 'Hardy Cross method converted complex matrix structural analysis into simple manual balancing operations, dominating structural engineering before computer FEA.',
      improvementTip: 'Walk through the 3 phases of the algorithm: locking/FEM, joint release/distribution, and carry-over transfer to adjacent supports.'
    },
    {
      difficulty: 'Advanced',
      questionText: 'Compare the Flexibility (Force) Method and the Stiffness (Displacement) Method in matrix structural analysis. Why is the stiffness method universally preferred for finite element computer software?',
      requiredKeywords: ['flexibility method', 'stiffness method', 'matrix analysis', 'force method', 'displacement', 'finite element', 'fea'],
      expectedKeypoints: [
        'Flexibility method treats redundant forces as primary unknowns: [F]{Q} = {Delta}',
        'Stiffness method treats nodal displacements and rotations as primary unknowns: [K]{u} = {P}',
        'Flexibility method requires subjective selection of a primary determinate structure and release of redundants',
        'Stiffness method uses standardized element stiffness matrices [k_e] that assemble automatically via direct stiffness method into banded, symmetric global [K]',
        'Boundary conditions in stiffness method are applied simply by row-column elimination or penalty methods'
      ],
      modelAnswer: 'In matrix structural analysis, the Flexibility (Force) Method takes unknown redundant forces as primary unknowns, expressing nodal compatibility via flexibility coefficients [f]{X} + {D_0} = {0}. The Stiffness (Displacement) Method takes joint degrees of freedom (translations and rotations) as primary unknowns, formulating equilibrium as [K]{U} = {P}. The Stiffness Method is universally preferred in commercial FEA software because: 1) It generates a systematically assembled, symmetric, sparse, positive-definite banded global stiffness matrix [K] through the direct stiffness assembly method without human intervention; 2) It does not require selecting which redundants to release or finding a stable primary determinate structure; 3) Geometric boundary conditions are easily enforced by constraining specific degrees of freedom.',
      explanation: 'The direct stiffness assembly algorithm maps element stiffnesses to global degrees of freedom using simple topological connectivity tables, scaling seamlessly to millions of degrees of freedom.',
      improvementTip: 'Contrast the primary unknowns of both methods ([F] vs [K]), explain the human intervention bottleneck in force methods, and cite the automated assembly and banded structure advantages of [K].'
    }
  ],

  // Cyber Security: Ethical Hacking
  'Ethical Hacking': [
    {
      difficulty: 'Beginner',
      questionText: 'What is ethical hacking, and how do white-hat, black-hat, and gray-hat hackers differ under legal authorization frameworks?',
      requiredKeywords: ['ethical hacking', 'white-hat', 'black-hat', 'gray-hat', 'authorization', 'scope', 'penetration testing'],
      expectedKeypoints: [
        'Ethical hacking is authorized testing of systems to uncover vulnerabilities and improve security posture',
        'White-hat hackers have explicit written authorization (Rules of Engagement/Scope) and disclose findings responsibly',
        'Black-hat hackers penetrate systems illegally without consent for financial gain, extortion, or espionage',
        'Gray-hat hackers access systems without prior permission but without malicious intent, often disclosing flaws publicly or demanding bounties'
      ],
      modelAnswer: 'Ethical hacking involves authorized, systematic security evaluation of computer systems, networks, and applications to discover vulnerabilities before malicious actors exploit them. White-hat hackers operate with explicit written consent, adhering strictly to defined Rules of Engagement (RoE) and nondisclosure agreements to strengthen defense. Black-hat hackers breach security boundaries illegally without permission for theft, disruption, or personal gain. Gray-hat hackers find vulnerabilities without prior authorization, but without malicious intent, though their unauthorized probing remains legally prohibited under statutes like the Computer Fraud and Abuse Act (CFAA).',
      explanation: 'Authorization and scope are the absolute legal dividing lines. Without formal signed authorization, any unauthorized intrusion is a criminal offense regardless of intent.',
      improvementTip: 'Highlight the critical importance of legal authorization and Rules of Engagement (RoE) as the defining distinction between ethical and illegal hacking.'
    },
    {
      difficulty: 'Intermediate',
      questionText: 'Describe the 5 phases of a penetration test: Reconnaissance, Scanning, Gaining Access, Maintaining Access, and Analysis/Reporting.',
      requiredKeywords: ['reconnaissance', 'scanning', 'gaining access', 'maintaining access', 'reporting', 'penetration test', 'osint'],
      expectedKeypoints: [
        '1. Reconnaissance: Passive and active intelligence gathering (OSINT, DNS, WHOIS, employee OSINT)',
        '2. Scanning: Port discovery, service enumeration, vulnerability scanning (Nmap, Nessus)',
        '3. Gaining Access: Exploitation of identified vulnerabilities (buffer overflows, SQLi, privilege escalation, Metasploit)',
        '4. Maintaining Access: Persistence mechanisms (backdoors, web shells, scheduled tasks, rootkits)',
        '5. Analysis/Reporting: Documenting vulnerabilities, CVSS risk scores, proof of concepts, and remediation guidance'
      ],
      modelAnswer: 'A structured penetration test follows five sequential phases: 1) Reconnaissance: Gathering intelligence about the target using passive OSINT (DNS records, Shodan, LinkedIn) and active reconnaissance. 2) Scanning & Enumeration: Using tools like Nmap and vulnerability scanners to discover live hosts, open ports, service versions, and misconfigurations. 3) Gaining Access: Exploiting identified vulnerabilities (such as web flaws, memory corruption, or credential stuffing) to breach the perimeter. 4) Maintaining Access: Establishing persistent footholds via web shells, scheduled tasks, or secondary administrative accounts to assess lateral movement potential. 5) Covering Tracks & Reporting: Cleaning up test artifacts and producing a detailed executive and technical report detailing vulnerabilities, CVSS severity ratings, and actionable remediation steps.',
      explanation: 'Professional penetration testing adheres to standards like PTES (Penetration Testing Execution Standard) and NIST SP 800-115 to ensure safe, reproducible findings.',
      improvementTip: 'Walk through each phase in strict chronological order and cite at least one standard industry tool or technique for each phase.'
    },
    {
      difficulty: 'Advanced',
      questionText: 'Explain how a Blind SQL Injection attack is executed using Boolean-based and Time-based inferential techniques. How should developers secure applications against it?',
      requiredKeywords: ['blind sql injection', 'boolean-based', 'time-based', 'inferential', 'parameterized queries', 'prepared statements', 'sleep'],
      expectedKeypoints: [
        'Blind SQLi occurs when the application is vulnerable to SQL injection but does not return database error messages or query results in HTTP response',
        'Boolean-based blind SQLi injects conditions (e.g., AND (SELECT SUBSTRING(password,1,1)=\'a\')) and infers values by observing binary application behavior (page load differences)',
        'Time-based blind SQLi injects delay functions (e.g., SLEEP(5) or WAITFOR DELAY \'0:0:5\') and infers truth based on server response latency',
        'Remediation requires parameterized queries (Prepared Statements), ORMs, least-privilege DB accounts, and input validation'
      ],
      modelAnswer: 'Blind SQL Injection occurs when user input is concatenated into a database query without input sanitization, but the application suppresses database error messages and does not echo back record data in HTTP responses. In Boolean-based Blind SQLi, the attacker injects conditional expressions such as "AND (ASCII(SUBSTRING((SELECT password FROM users LIMIT 1),1,1)) > 75)--". By observing whether the page returns a "True" response (e.g. content rendered) or "False" response, characters can be extracted bit-by-bit using binary search. In Time-based Blind SQLi, when page content remains identical, attackers inject delay functions like "AND IF(1=1, SLEEP(5), 0)". If the response latency is delayed by 5 seconds, the condition evaluated to true. Defense requires parameterized queries (Prepared Statements) where the SQL engine treats input strictly as data parameters rather than executable SQL code, combined with stored procedures, input validation, and least-privilege database user permissions.',
      explanation: 'Parameterized queries eliminate SQL injection entirely by precompiling the SQL statement execution plan before user parameters are bound, preventing parameter content from altering query semantics.',
      improvementTip: 'Contrast Boolean-based vs Time-based extraction techniques, describe the binary search / character-by-character inference process, and emphasize Prepared Statements as the primary defense.'
    }
  ]
};

// Generates 3-tier deep curriculum questions for any subject in any of the 14 departments
function synthesizeQuestionsForSubject(department, subject, difficulty, count = 5) {
  const collected = [];

  // Check if subject has curated pre-written bank
  if (CURATED_SUBJECT_QUESTIONS[subject]) {
    const curated = CURATED_SUBJECT_QUESTIONS[subject];
    // Prioritize exact difficulty matches first
    const matched = curated.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    const otherCurated = curated.filter(q => q.difficulty.toLowerCase() !== difficulty.toLowerCase());
    
    [...matched, ...otherCurated].forEach(q => {
      if (collected.length < count) {
        collected.push({
          q: q.questionText,
          keywords: q.requiredKeywords,
          keypoints: q.expectedKeypoints,
          modelAnswer: q.modelAnswer,
          explanation: q.explanation,
          improvementTip: q.improvementTip,
          difficulty: q.difficulty || difficulty
        });
      }
    });

    if (collected.length >= count) {
      return collected.map((item, idx) => ({
        id: `q_${department.replace(/\W+/g, '_')}_${subject.replace(/\W+/g, '_')}_${idx + 1}`,
        questionNumber: idx + 1,
        totalQuestions: count,
        department,
        subject,
        difficulty: item.difficulty,
        category: subject,
        role: `${department} Engineer`,
        questionText: item.q,
        expectedKeypoints: item.keypoints,
        requiredKeywords: item.keywords,
        modelAnswer: item.modelAnswer,
        explanation: item.explanation,
        improvementTip: item.improvementTip
      }));
    }
  }

  // Domain-specific keyword heuristics for synthesis
  const subjectLower = subject.toLowerCase();
  const deptLower = department.toLowerCase();

  // Create tailored prompt templates based on engineering principles
  const beginnerQuestions = [
    {
      q: `What are the fundamental principles and engineering objectives of ${subject}? Explain the core problem it solves in modern ${department}.`,
      keywords: [subject.split(' ')[0].toLowerCase(), 'fundamental', 'principles', 'engineering', 'application', 'system'],
      keypoints: [
        `Defines the foundational concepts and scope of ${subject}`,
        `Identifies the primary operating principles and methodologies used in this domain`,
        `Explains its practical relevance and integration within modern ${department} workflows`
      ],
      modelAnswer: `${subject} is a core discipline within ${department} focused on systematic analysis, design, and optimization of specialized processes and systems. Its primary objective is providing standardized frameworks for modeling physical or computational behaviors, ensuring operational efficiency, reliability, and safety across practical engineering applications.`,
      explanation: `Understanding the foundational principles of ${subject} enables engineers to establish rigorous design constraints and evaluate trade-offs before implementing complex systems.`,
      improvementTip: `Begin with a concise formal definition, state the primary physical or architectural laws involved, and give a concrete engineering example.`
    },
    {
      q: `In the study of ${subject}, what are the essential terminology, standard classification models, and key performance parameters engineers evaluate?`,
      keywords: ['classification', 'parameters', 'metrics', 'standards', 'performance', 'efficiency'],
      keypoints: [
        `Enumerates key domain terminology and standard analytical taxonomies in ${subject}`,
        `Describes standard performance metrics (e.g. efficiency, throughput, precision, stability)`,
        `Distinguishes between standard operational modes and edge condition constraints`
      ],
      modelAnswer: `In ${subject}, key performance parameters include operating efficiency, throughput or load capacity, signal-to-noise ratio or tolerance margins, and steady-state stability. Engineers classify systems into categorical operating regimes to select appropriate analytical models and verify compliance with industry standards.`,
      explanation: `Standardized classifications allow engineers to benchmark diverse implementations under identical testing conditions.`,
      improvementTip: `Group terminology into logical categories (inputs, internal state, outputs) and cite specific units of measurement or industry benchmarks.`
    }
  ];

  const intermediateQuestions = [
    {
      q: `Analyze the primary working mechanism and mathematical or architectural governing laws utilized in ${subject}. How do parameters interact during dynamic operations?`,
      keywords: ['governing', 'equations', 'mechanism', 'dynamics', 'interaction', 'tradeoff'],
      keypoints: [
        `Articulates the mathematical equations or architectural workflow governing ${subject}`,
        `Explains how varying primary parameters affects system output and operational stability`,
        `Identifies common trade-offs between performance, resource consumption, and reliability`
      ],
      modelAnswer: `Systems in ${subject} are governed by fundamental conservation laws, constitutive equations, or algorithmic state transitions. Dynamic operation requires balancing control inputs with load demands, where increasing throughput often incurs trade-offs such as elevated thermal dissipation, latency, or reduced safety margins. Engineers tune damping and feedback parameters to maintain stability.`,
      explanation: `Rigorous analysis of dynamic interactions reveals nonlinearities and feedback loops that static approximations fail to capture.`,
      improvementTip: `State the governing equations or block diagrams clearly, explain the physical meaning of each variable, and describe the sensitivity of the output to parameter variations.`
    },
    {
      q: `Describe the standard diagnostic, measurement, or simulation workflows used to validate designs in ${subject}. How do you detect and isolate operational anomalies?`,
      keywords: ['validation', 'simulation', 'testing', 'diagnostic', 'anomaly', 'calibration'],
      keypoints: [
        `Outlines standard testing, measurement, and validation procedures in ${subject}`,
        `Explains diagnostic workflows for identifying failure modes or performance degradation`,
        `Describes verification methodologies against theoretical specifications and safety thresholds`
      ],
      modelAnswer: `Validation in ${subject} follows a structured protocol: baseline calibration, experimental measurement or numerical simulation, stress testing under boundary conditions, and spectral or statistical error analysis. Anomalies are isolated by comparing sensor telemetry or state logs against expected nominal transfer functions.`,
      explanation: `Systematic diagnostic workflows minimize mean time to detection (MTTD) and prevent catastrophic field failures.`,
      improvementTip: `Walk through the diagnostic protocol sequentially: initial calibration -> stress testing -> telemetry logging -> root cause isolation.`
    }
  ];

  const advancedQuestions = [
    {
      q: `Examine the complex failure modes, non-ideal behaviors, and optimization challenges encountered in ${subject}. How do modern engineers engineer resilient solutions under extreme constraints?`,
      keywords: ['failure modes', 'optimization', 'resilience', 'non-ideal', 'constraints', 'robustness'],
      keypoints: [
        `Analyzes critical failure mechanisms, parasitic effects, or algorithmic divergence in ${subject}`,
        `Discusses multi-objective optimization strategies (e.g., cost, power, speed, safety)`,
        `Presents fault-tolerant architectures, redundant control loops, or adaptive mitigations`
      ],
      modelAnswer: `Advanced challenges in ${subject} stem from non-ideal physical effects, environmental fluctuations, parasitic impedances, and nonlinear saturation. Engineers implement robust optimization frameworks using stochastic modeling, adaptive feedback controllers, and automated fail-safe interlocks to maintain performance within tight tolerances under extreme conditions.`,
      explanation: `Real-world engineering requires mitigating higher-order parasitic phenomena that theoretical models typically assume to be negligible.`,
      improvementTip: `Detail at least two specific non-ideal failure mechanisms, describe their underlying physical or mathematical cause, and explain the corresponding engineering mitigation.`
    },
    {
      q: `Discuss state-of-the-art technological advancements and emerging research paradigms in ${subject}. How are automation, digital twins, and AI transforming this field in ${department}?`,
      keywords: ['state of the art', 'advancements', 'automation', 'digital twin', 'modern', 'integration'],
      keypoints: [
        `Surveys current research frontiers and emerging industrial methodologies in ${subject}`,
        `Evaluates how predictive modeling, machine learning, and automation augment traditional techniques`,
        `Identifies future scalability, sustainability, and technological integration hurdles`
      ],
      modelAnswer: `Modern ${subject} is undergoing a paradigm shift driven by digital twin modeling, sensor integration, and machine learning predictive control. By continuously assimilating real-time telemetry into high-fidelity models, engineers can forecast component degradation, dynamically optimize operations, and automate complex calibration tasks with unprecedented precision.`,
      explanation: `Digital twin and AI integration transforms reactive maintenance and static design into proactive, continuously optimized lifecycle engineering.`,
      improvementTip: `Synthesize traditional engineering principles with modern data-driven methodologies, identifying both the concrete benefits and practical implementation hurdles.`
    }
  ];

  // Pool questions according to requested difficulty
  let targetPool = [];
  if (difficulty.toLowerCase() === 'beginner') {
    targetPool = [...beginnerQuestions, ...intermediateQuestions];
  } else if (difficulty.toLowerCase() === 'advanced') {
    targetPool = [...advancedQuestions, ...intermediateQuestions];
  } else {
    // Intermediate
    targetPool = [intermediateQuestions[0], beginnerQuestions[0], advancedQuestions[0], intermediateQuestions[1], advancedQuestions[1]];
  }

  // Combine curated collected questions with synthesized questions
  const finalItems = [...collected];
  for (const item of targetPool) {
    if (finalItems.length < count) {
      finalItems.push(item);
    }
  }

  // Pad pool if still needed to satisfy count
  const allAvailable = [...beginnerQuestions, ...intermediateQuestions, ...advancedQuestions];
  while (finalItems.length < count) {
    finalItems.push(allAvailable[finalItems.length % allAvailable.length]);
  }

  // Return formatted array of exact requested count
  return finalItems.slice(0, count).map((item, idx) => ({
    id: `q_${department.replace(/\W+/g, '_')}_${subject.replace(/\W+/g, '_')}_${idx + 1}`,
    questionNumber: idx + 1,
    totalQuestions: count,
    department,
    subject,
    difficulty,
    category: subject,
    role: `${department} Engineer`,
    questionText: item.q,
    expectedKeypoints: item.keypoints,
    requiredKeywords: item.keywords,
    modelAnswer: item.modelAnswer,
    explanation: item.explanation,
    improvementTip: item.improvementTip
  }));
}

/**
 * Main Question Generation Endpoint
 */
export function generateSubjectQuestions(department, subject, difficulty = 'Intermediate', count = 5) {
  // Validate department
  if (!department || !isValidDepartment(department)) {
    throw new Error(`Invalid department '${department}'. Please select one of the 14 authorized engineering departments.`);
  }

  // Validate subject
  if (!subject || !isValidDepartmentSubject(department, subject)) {
    throw new Error(`Subject '${subject}' does not belong to department '${department}'. Please select a valid subject from the curriculum.`);
  }

  const validDiff = ['Beginner', 'Intermediate', 'Advanced'].includes(difficulty) ? difficulty : 'Intermediate';
  const qCount = Math.min(12, Math.max(3, parseInt(count, 10) || 5));

  return synthesizeQuestionsForSubject(department, subject, validDiff, qCount);
}
