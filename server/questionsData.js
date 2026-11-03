// Comprehensive benchmark question bank categorized by Academic Department & Professional Engineering Tracks
// Includes technical rubrics, essential domain keywords, and full model answers for accredited AI evaluation

export const interviewQuestions = [
  // =========================================================================
  // 1. ELECTRONICS & COMMUNICATION ENGINEERING (ECE)
  // =========================================================================
  {
    id: 'q_ece_01',
    department: 'ECE',
    departmentName: 'Electronics & Communication Engineering',
    role: 'Electronics & Embedded Systems Engineer',
    category: 'Embedded Systems & Microcontrollers',
    difficulty: 'Intermediate',
    questionText: 'What is an Interrupt Service Routine (ISR)? Explain interrupt latency, and describe why blocking calls or dynamic memory allocation must be avoided inside an ISR.',
    expectedKeypoints: [
      'An ISR is an event-driven callback function invoked immediately by hardware when an interrupt signal triggers',
      'Interrupt latency is the duration between the hardware interrupt signal being asserted and the execution of the first ISR instruction',
      'Blocking calls (sleep, delay, waiting on semaphores) lock the CPU, preventing higher/same priority interrupts from being serviced',
      'Dynamic memory allocation (malloc/free) is non-deterministic and can cause heap fragmentation, deadlocks, and severe latency spikes in real-time execution'
    ],
    requiredKeywords: ['isr', 'interrupt', 'latency', 'hardware', 'blocking', 'malloc', 'non-deterministic', 'heap', 'real-time', 'context switch'],
    modelAnswer: 'An Interrupt Service Routine (ISR) is a specialized routine executed by the CPU upon receiving an asynchronous hardware interrupt, pausing normal thread execution to handle high-priority events. Interrupt latency refers to the elapsed time from hardware assertion to the execution of the first instruction in the ISR, consisting of pipeline flushing, register context saving, and vector fetching. Blocking operations (such as delay, busy waiting, or mutex locks) must never be used inside an ISR because they stall the processor and cause deadline misses for other peripheral interrupts. Dynamic memory allocation (like malloc) is non-reentrant, non-deterministic in execution time, and can lead to heap corruption or fragmentation in memory-constrained microcontrollers.'
  },
  {
    id: 'q_ece_02',
    department: 'ECE',
    departmentName: 'Electronics & Communication Engineering',
    role: 'VLSI & Digital Circuit Engineer',
    category: 'VLSI & Digital Circuit Design',
    difficulty: 'Advanced',
    questionText: 'Explain Setup Time and Hold Time in sequential digital circuits. What is metastability, and how do designers resolve Setup and Hold time violations during Static Timing Analysis (STA)?',
    expectedKeypoints: [
      'Setup time (T_setup) is the minimum time data must be stable BEFORE the active clock edge',
      'Hold time (T_hold) is the minimum time data must remain stable AFTER the active clock edge',
      'Metastability is an indeterminate logic state occurring when setup or hold times are violated, causing output to oscillate or settle unpredictably',
      'Setup violations are fixed by reducing combinational delay, sizing up driver gates, or lowering clock frequency',
      'Hold violations are independent of clock frequency and are fixed by inserting buffer delay chains in data paths'
    ],
    requiredKeywords: ['setup time', 'hold time', 'metastability', 'flip-flop', 'clock edge', 'static timing analysis', 'sta', 'buffer', 'combinational delay'],
    modelAnswer: 'In digital flip-flops, Setup Time (T_setup) is the minimum duration the data input must remain valid and stable before the arrival of the active clock edge. Hold Time (T_hold) is the duration data must remain stable after the clock edge. Violating either condition can trap internal bistable latches in an indeterminate state called Metastability, where the output voltage oscillates between VDD and GND for an unpredictable period before resolving. Setup violations occur when the combinational path is too slow (T_launch + T_comb + T_setup > T_period + T_capture); they are fixed by optimizing logic, upsizing gates, or reducing the clock frequency. Hold violations occur when data changes too quickly before the hold window closes (T_launch + T_min < T_hold + T_skew); they are frequency-independent and fixed by inserting delay buffers on the data path.'
  },
  {
    id: 'q_ece_03',
    department: 'ECE',
    departmentName: 'Electronics & Communication Engineering',
    role: 'Wireless & RF Communications Engineer',
    category: 'Wireless Communications & 5G',
    difficulty: 'Advanced',
    questionText: 'How does Orthogonal Frequency Division Multiplexing (OFDM) eliminate Intersymbol Interference (ISI) in multipath wireless channels? Why is a Cyclic Prefix (CP) necessary?',
    expectedKeypoints: [
      'OFDM splits a high-rate serial data stream into multiple orthogonal low-rate parallel narrowband subcarriers',
      'Each subcarrier has a longer symbol duration, significantly exceeding channel delay spread',
      'A Cyclic Prefix copies the end of the OFDM symbol to the beginning, acting as a guard interval against multipath delay',
      'The Cyclic Prefix converts linear channel convolution into circular convolution, enabling simple frequency-domain equalization via single-tap multipliers'
    ],
    requiredKeywords: ['ofdm', 'isi', 'intersymbol interference', 'orthogonal', 'subcarrier', 'cyclic prefix', 'multipath', 'delay spread', 'circular convolution', 'fft'],
    modelAnswer: 'OFDM divides a wideband frequency-selective fading channel into many narrow, orthogonal, flat-fading subcarriers. By transmitting symbols in parallel across these subcarriers, the symbol period is elongated to be much greater than the channel delay spread, dramatically attenuating Intersymbol Interference (ISI). To completely eliminate residual ISI caused by multipath echoes, a Cyclic Prefix (CP) is inserted as a guard interval. The CP duplicates the tail portion of the time-domain symbol at the front. Beyond preventing adjacent symbol overlap, it transforms linear channel convolution into circular convolution, allowing the receiver to use an FFT followed by simple single-tap frequency-domain equalizers to restore the transmitted signal.'
  },
  {
    id: 'q_ece_04',
    department: 'ECE',
    departmentName: 'Electronics & Communication Engineering',
    role: 'Digital Signal Processing Engineer',
    category: 'Digital Signal Processing (DSP)',
    difficulty: 'Intermediate',
    questionText: 'Compare Finite Impulse Response (FIR) and Infinite Impulse Response (IIR) digital filters. Discuss linear phase response, stability, and computational complexity.',
    expectedKeypoints: [
      'FIR filters have no feedback (all-zero system) and are inherently unconditionally stable',
      'IIR filters use feedback (poles and zeros) and can become unstable if poles lie outside the unit circle in the Z-plane',
      'FIR filters can easily achieve strictly linear phase, preventing phase distortion across frequency bands',
      'IIR filters achieve sharper cutoff roll-offs with significantly fewer coefficients/lower order than FIR filters, saving memory and CPU cycles',
      'FIR filters require higher order (more taps and multipliers) to achieve steep transition bands'
    ],
    requiredKeywords: ['fir', 'iir', 'linear phase', 'stability', 'poles', 'zeros', 'feedback', 'unit circle', 'taps', 'filter order'],
    modelAnswer: 'FIR (Finite Impulse Response) filters rely purely on feedforward tapped delay lines with no recursive feedback. Because they have only zeros, FIR filters are unconditionally stable and can be designed with exact linear phase (symmetric coefficients), preserving pulse shapes without group delay distortion. However, they require higher filter orders (many taps) to achieve sharp cutoff characteristics. In contrast, IIR (Infinite Impulse Response) filters utilize feedback loops containing both poles and zeros. This allows IIR filters to achieve steep roll-off slopes with far fewer coefficients, drastically reducing computational overhead. However, IIR filters have non-linear phase response and risk instability if round-off quantization moves poles outside the unit circle in the Z-plane.'
  },
  {
    id: 'q_ece_05',
    department: 'ECE',
    departmentName: 'Electronics & Communication Engineering',
    role: 'Embedded Hardware Protocols Engineer',
    category: 'Embedded Protocols & Hardware Interfaces',
    difficulty: 'Intermediate',
    questionText: 'Compare I2C, SPI, and UART serial communication protocols in terms of pin count, transmission speed, multi-master capability, and synchronous vs asynchronous clocking.',
    expectedKeypoints: [
      'I2C is a 2-wire synchronous protocol (SDA, SCL) with open-drain pull-ups, supporting multi-master arbitration and hardware addressing',
      'SPI is a 4-wire synchronous protocol (MOSI, MISO, SCK, CS/SS) operating in full-duplex with push-pull outputs and high speeds (10-50+ MHz)',
      'UART is an asynchronous 2-wire protocol (TX, RX) requiring predefined matching baud rates, start/stop bits, and no shared clock line',
      'SPI offers the highest throughput but requires dedicated Chip Select lines per slave',
      'I2C is pin-efficient for many devices on a single bus but slower (100 kHz - 3.4 MHz)'
    ],
    requiredKeywords: ['i2c', 'spi', 'uart', 'synchronous', 'asynchronous', 'baud rate', 'clock', 'chip select', 'open-drain', 'pull-up', 'full-duplex'],
    modelAnswer: 'I2C, SPI, and UART differ substantially in architecture. I2C is a synchronous, half-duplex 2-wire bus (SDA for data, SCL for clock) utilizing open-drain outputs with pull-up resistors; it supports multi-master topologies and addressing up to 127 devices, operating at standard speeds from 100 kHz to 3.4 MHz. SPI is a synchronous, full-duplex 4-wire interface (MOSI, MISO, SCK, CS); it achieves much higher speeds (often 20-50+ MHz) with simple shift registers, but requires a separate Chip Select line for each peripheral, increasing PCB routing. UART is an asynchronous, point-to-point 2-wire protocol (TX, RX) requiring no clock wire; instead, both ends must agree on matching baud rates, data framing, and start/stop/parity bits, making it best for direct terminal debug and GPS/modem links.'
  },
  {
    id: 'q_ece_06',
    department: 'ECE',
    departmentName: 'Electronics & Communication Engineering',
    role: 'Analog & RF Circuit Design Engineer',
    category: 'Analog & Circuit Design',
    difficulty: 'Intermediate',
    questionText: 'What is Common Mode Rejection Ratio (CMRR) in Operational Amplifiers? Why is high CMRR critical when amplifying bio-signals or sensor outputs in noisy environments?',
    expectedKeypoints: [
      'CMRR is the ratio of differential-mode gain (A_d) to common-mode gain (A_cm), typically expressed in decibels (dB)',
      'Differential signals represent the desired measurement between two inputs, while common-mode noise affects both lines equally (e.g. 50/60 Hz mains hum)',
      'High CMRR ensures the op-amp rejects electromagnetic interference and ground noise, amplifying only the minuscule sensor potential',
      'Instrumentation amplifiers use 3-op-amp topologies with laser-trimmed resistors to achieve CMRR > 100 dB'
    ],
    requiredKeywords: ['cmrr', 'op-amp', 'differential gain', 'common mode', 'noise', 'rejection', 'interference', 'instrumentation amplifier', 'decibels'],
    modelAnswer: 'Common Mode Rejection Ratio (CMRR) quantifies an operational amplifier ability to amplify the desired differential voltage between its inverting and non-inverting terminals while rejecting unwanted signals common to both inputs: CMRR = 20 * log10(|A_d / A_cm|). In real-world sensor interfaces (such as strain gauges, thermocouples, and ECG electrodes), long lead wires pick up substantial common-mode electromagnetic interference (like 50/60 Hz power grid hum and RF noise) that may be thousands of times larger than the microvolt bio-signal. A high CMRR (e.g., > 100 dB) is vital to attenuate common-mode noise to negligible levels, ensuring clean signal extraction and high Signal-to-Noise Ratio (SNR).'
  },

  // =========================================================================
  // 2. COMPUTER SCIENCE & ENGINEERING (CSE) & INFORMATION TECHNOLOGY (IT)
  // =========================================================================
  {
    id: 'q_cse_01',
    department: 'CSE',
    departmentName: 'Computer Science & Engineering',
    role: 'Software Development Engineer (SDE)',
    category: 'Operating Systems & Concurrency',
    difficulty: 'Intermediate',
    questionText: 'What are the four Coffman conditions necessary for a Deadlock to occur in an operating system? How can an OS detect, prevent, or recover from deadlocks?',
    expectedKeypoints: [
      '1. Mutual Exclusion: At least one resource is held in non-shareable mode',
      '2. Hold and Wait: A process holds resources while requesting additional locked resources',
      '3. No Preemption: Resources cannot be forcibly taken from a process holding them',
      '4. Circular Wait: A closed chain of processes exists where each waits for a resource held by the next',
      'Prevention breaks one of the four conditions (e.g., total resource ordering to eliminate circular wait)',
      'Banker Algorithm is used for deadlock avoidance using safe state matrices',
      'Detection uses Resource Allocation Graphs (RAG) and recovers via process termination or preemption'
    ],
    requiredKeywords: ['deadlock', 'coffman', 'mutual exclusion', 'hold and wait', 'no preemption', 'circular wait', 'resource allocation graph', 'banker algorithm'],
    modelAnswer: 'A deadlock occurs when processes are blocked permanently waiting for resources held by one another. The four necessary Coffman conditions are: 1) Mutual Exclusion (resources cannot be shared concurrently); 2) Hold and Wait (processes hold existing allocations while requesting new ones); 3) No Preemption (resources can only be released voluntarily); 4) Circular Wait (a circular dependency chain of processes and requests exists). To prevent deadlocks, system designers invalidate at least one condition—most commonly eliminating Circular Wait by enforcing a strict global ordering on resource acquisition. For avoidance, the Banker Algorithm verifies that resource requests keep the system in a provably safe state. Detection algorithms inspect Resource Allocation Graphs for cycles, and recovery involves terminating deadlocked threads or preempting resources.'
  },
  {
    id: 'q_cse_02',
    department: 'CSE',
    departmentName: 'Computer Science & Engineering',
    role: 'Backend & Distributed Systems Engineer',
    category: 'Computer Networks & Protocols',
    difficulty: 'Intermediate',
    questionText: 'Explain the TCP 3-way handshake and 4-way termination process. Why is the TIME_WAIT state necessary at the end of a TCP connection?',
    expectedKeypoints: [
      'Handshake: SYN (client to server) -> SYN-ACK (server to client) -> ACK (client to server) establishing sequence numbers',
      'Termination: FIN -> ACK -> FIN -> ACK closing both unidirectional transmission channels',
      'TIME_WAIT state lasts for 2 * MSL (Maximum Segment Lifetime)',
      'Prevents delayed duplicate segments from an old connection from interfering with a new socket reuse',
      'Ensures the final ACK is acknowledged so the peer does not retransmit the FIN'
    ],
    requiredKeywords: ['tcp', 'handshake', 'syn', 'ack', 'fin', '3-way', 'time_wait', 'msl', 'sequence number', 'termination'],
    modelAnswer: 'The TCP three-way handshake establishes a reliable, bidirectional connection: 1) Client sends SYN with an initial sequence number (ISN); 2) Server responds with SYN-ACK, acknowledging client ISN and providing its own; 3) Client sends ACK. Connection teardown requires four steps because TCP is full-duplex: Client sends FIN, Server replies with ACK; Server subsequently sends its own FIN, and Client replies with final ACK. The client then enters the TIME_WAIT state, lingering for 2 * MSL (typically 1 to 2 minutes). TIME_WAIT is essential for two reasons: first, to ensure the final ACK reached the server (if lost, the server will retransmit FIN, which the client can still acknowledge); second, to allow any delayed, lingering packets in the network to expire so they cannot corrupt subsequent connections using the same IP and port tuple.'
  },
  {
    id: 'q_cse_03',
    department: 'CSE',
    departmentName: 'Computer Science & Engineering',
    role: 'Systems Software Engineer',
    category: 'Data Structures & Algorithms',
    difficulty: 'Advanced',
    questionText: 'How is a Least Recently Used (LRU) Cache implemented to achieve O(1) time complexity for both get() and put() operations? Which data structures are combined?',
    expectedKeypoints: [
      'Combines a Hash Map (Hash Table) with a Doubly Linked List',
      'Hash Map stores Key -> Node pointer for O(1) constant time lookup',
      'Doubly Linked List maintains temporal usage order: Most Recently Used at Head, Least Recently Used at Tail',
      'When an item is accessed (get or put), its node is spliced out and moved to the Head in O(1)',
      'When capacity is exceeded, the Tail node is removed from both the list and the hash map in O(1)'
    ],
    requiredKeywords: ['lru', 'cache', 'doubly linked list', 'hash map', 'o(1)', 'constant time', 'head', 'tail', 'eviction', 'node'],
    modelAnswer: 'An optimal LRU Cache achieves O(1) time complexity for both get() and put() by pairing a Hash Map with a Doubly Linked List. The Hash Map maps each cache key to its corresponding node memory pointer in the linked list, guaranteeing O(1) search. The Doubly Linked List tracks order of recency: newly inserted or accessed nodes are placed at the Head (MRU), while the oldest elements naturally migrate to the Tail (LRU). When get(key) is invoked, the node is retrieved via the map and spliced to the Head in O(1) pointer updates. When put(key, value) is called at capacity, the Tail node is decoupled in O(1), deleted from the Hash Map, and the new item is pushed to the Head.'
  },
  {
    id: 'q_cse_04',
    department: 'CSE',
    departmentName: 'Computer Science & Engineering',
    role: 'Database & Systems Engineer',
    category: 'Database Systems & Storage',
    difficulty: 'Advanced',
    questionText: 'Explain the difference between clustered and non-clustered database indexes. Why are B+ Trees preferred over Binary Search Trees or Hash Tables for disk-based storage engines?',
    expectedKeypoints: [
      'Clustered index physically sorts and stores data rows on disk in index order (one per table)',
      'Non-clustered index creates a separate structure storing keys with pointers to physical row locations (multiple allowed)',
      'B+ Trees have high fan-out (wide branching factor), minimizing disk I/O seek operations compared to deep BSTs',
      'B+ Trees store all actual record pointers in leaf nodes linked as a sequential doubly linked list, enabling fast range scans',
      'Hash tables only support O(1) equality searches and cannot perform range queries (e.g., BETWEEN, <, >)'
    ],
    requiredKeywords: ['clustered', 'non-clustered', 'b+ tree', 'b-tree', 'fan-out', 'disk i/o', 'range query', 'leaf node', 'binary search tree'],
    modelAnswer: 'A clustered index determines the actual physical on-disk storage order of table rows; hence, a table can have only one clustered index (typically the Primary Key). A non-clustered index stores sorted index keys alongside pointers (row IDs) back to the underlying physical data pages, allowing multiple non-clustered indexes per table. Database engines (like InnoDB) utilize B+ Trees instead of Binary Search Trees because B+ Trees have a high branching factor (fan-out of hundreds), keeping tree height low (typically 3 to 4 levels) and requiring minimal expensive disk I/O operations per query. Furthermore, B+ Trees store all actual data pointers strictly in leaf nodes that are linked together as a bidirectional list, making sequential range scans (e.g., WHERE age BETWEEN 20 AND 30) extremely efficient, which Hash Tables cannot do.'
  },

  // =========================================================================
  // 3. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (AI & ML / AI & DS)
  // =========================================================================
  {
    id: 'q_ai_01',
    department: 'AI & ML',
    departmentName: 'Artificial Intelligence & Data Science',
    role: 'AI / Machine Learning Engineer',
    category: 'Machine Learning Foundations',
    difficulty: 'Intermediate',
    questionText: 'Explain the difference between L1 (Lasso) and L2 (Ridge) regularization and why L1 produces sparsity in model weights.',
    expectedKeypoints: [
      'L1 adds sum of absolute values penalty (|w|), L2 adds sum of squared weights penalty (w^2)',
      'L1 cost contour has diamond sharp corners that intersect coordinate axes at zero, forcing redundant weights to zero',
      'L2 shrinks weights asymptotically towards zero without setting them strictly to zero',
      'L1 performs feature selection, while L2 is effective against multicollinearity'
    ],
    requiredKeywords: ['l1', 'l2', 'lasso', 'ridge', 'absolute', 'squared', 'sparsity', 'zero', 'penalty', 'contour', 'diamond'],
    modelAnswer: 'L1 regularization (Lasso) adds a penalty proportional to the sum of absolute values of coefficients, whereas L2 regularization (Ridge) penalizes the sum of squared coefficients. Geometrically, the constraint region for L1 is a diamond/polytope with sharp vertices on the coordinate axes. When the loss function contours expand, they are most likely to hit these sharp corners on the axes first, causing non-essential weights to become exactly zero, achieving feature sparsity. In contrast, L2 has a smooth circular/spherical constraint region, which scales down weights smoothly without forcing them to zero.'
  },
  {
    id: 'q_ai_02',
    department: 'AI & ML',
    departmentName: 'Artificial Intelligence & Data Science',
    role: 'Generative AI & LLM Engineer',
    category: 'Generative AI & LLMs',
    difficulty: 'Advanced',
    questionText: 'Describe the complete architecture of a Retrieval-Augmented Generation (RAG) system. How do chunking, vector embedding, similarity search, and reranking work together?',
    expectedKeypoints: [
      'Document Ingestion & Chunking: Breaking raw knowledge bases into semantically coherent overlapping segments',
      'Vector Embedding: Passing chunks through embedding models to project text into high-dimensional latent space',
      'Vector Index & Similarity Search: Storing in databases (FAISS, Chroma, Pinecone) using Cosine Similarity or HNSW index',
      'Reranking: Cross-encoder reranker models score top candidates for precision before prompt injection',
      'Generation: Augmenting LLM context with top chunks alongside system prompts to eliminate hallucinations'
    ],
    requiredKeywords: ['rag', 'retrieval-augmented generation', 'chunking', 'embedding', 'vector database', 'cosine similarity', 'hnsw', 'reranking', 'hallucination'],
    modelAnswer: 'A production RAG system bridges LLMs with dynamic external knowledge. It starts with Document Processing, where documents are cleaned and split into overlapping chunks to preserve local context. Each chunk is passed through a dense embedding model, generating high-dimensional vectors stored in a Vector DB with HNSW indexing. At runtime, user queries are embedded and compared using Cosine Similarity to retrieve candidate chunks. A Cross-Encoder Reranker then computes fine-grained query-chunk relevance scores, filtering down to the top-K chunks. Finally, these validated snippets are injected into the LLM system prompt as verified context, enabling the model to generate accurate, citation-backed answers while preventing hallucinations.'
  },
  {
    id: 'q_ai_03',
    department: 'AI & ML',
    departmentName: 'Artificial Intelligence & Data Science',
    role: 'Deep Learning Research Engineer',
    category: 'Deep Learning & Neural Architectures',
    difficulty: 'Advanced',
    questionText: 'How does self-attention in the Transformer architecture compute relationships between tokens? Describe the Query, Key, and Value dot-product calculation.',
    expectedKeypoints: [
      'Formula: Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V',
      'Query represents the current token looking for context, Key represents keys of other tokens to match against, and Value holds token information',
      'Dot product Q * K^T computes similarity/relevance scores between all token pairs',
      'Division by sqrt(d_k) stabilizes variance and prevents softmax from entering regions with vanishing gradients',
      'Softmax normalizes scores into attention weights that weight the Value vectors'
    ],
    requiredKeywords: ['self-attention', 'transformer', 'query', 'key', 'value', 'softmax', 'dot product', 'scaled dot-product', 'd_k'],
    modelAnswer: 'Self-attention allows every token in an input sequence to dynamically weight and attend to every other token based on contextual relevance. The input embeddings are linearly projected into three matrices: Queries (Q), Keys (K), and Values (V). The dot product Q * K^T measures semantic compatibility between all token pairs, producing an unnormalized attention matrix. This is scaled by dividing by sqrt(d_k) to counteract large dot products that would push the Softmax function into regions of vanishing gradients. Softmax is then applied row-wise to generate attention distribution weights summing to 1. Finally, these weights are multiplied by V to produce a context-rich output representation.'
  },

  // =========================================================================
  // 4. ELECTRICAL & ELECTRONICS ENGINEERING (EEE)
  // =========================================================================
  {
    id: 'q_eee_01',
    department: 'EEE',
    departmentName: 'Electrical & Electronics Engineering',
    role: 'Power Systems & Electrical Engineer',
    category: 'Power Systems & Grids',
    difficulty: 'Intermediate',
    questionText: 'What is Power Factor in AC electrical circuits? Why is low power factor disadvantageous to utility grids and industrial consumers, and how is it corrected?',
    expectedKeypoints: [
      'Power Factor is the ratio of Real Power (kW, doing useful work) to Apparent Power (kVA, total drawn from grid): PF = cos(theta)',
      'Inductive loads (motors, transformers, ballasts) draw lagging reactive power (kVAR) to maintain magnetic fields',
      'Low power factor causes higher current draw for the same real power, leading to increased I^2 * R transmission line losses and voltage drops',
      'Utilities impose severe financial penalties on industrial plants with PF < 0.90 to 0.95',
      'Power factor is corrected by installing shunt capacitor banks or synchronous condensers to supply lagging reactive power locally'
    ],
    requiredKeywords: ['power factor', 'real power', 'apparent power', 'reactive power', 'lagging', 'capacitors', 'transmission losses', 'kvar', 'kw', 'kva'],
    modelAnswer: 'Power Factor (PF) is the ratio of Real Power (P in kW) performing real mechanical/thermal work to Apparent Power (S in kVA) supplied by the electrical grid: PF = cos(theta). Industrial inductive loads (such as induction motors and transformers) require magnetizing current, causing current to lag behind voltage and drawing non-productive Reactive Power (kVAR). A low power factor demands significantly higher line currents to deliver the same active power, resulting in higher I^2 * R heating losses across generators, transformers, and cables, as well as poor voltage regulation. Grid utilities penalize industrial customers for low PF. It is corrected by connecting static Shunt Capacitor Banks or Automatic Power Factor Correction (APFC) panels in parallel with loads to supply the required leading reactive current locally.'
  },
  {
    id: 'q_eee_02',
    department: 'EEE',
    departmentName: 'Electrical & Electronics Engineering',
    role: 'Power Electronics Engineer',
    category: 'Power Electronics & Converters',
    difficulty: 'Advanced',
    questionText: 'Explain the working principle of a DC-DC Buck-Boost Converter. How does pulse-width modulation (PWM) regulate output voltage, and why is the polarity inverted?',
    expectedKeypoints: [
      'Buck-Boost converts input DC voltage to a higher or lower magnitude output DC voltage depending on Duty Cycle (D)',
      'When switch is ON: Inductor charges from source and stores energy in magnetic field; diode is reverse-biased; load is powered by capacitor',
      'When switch is OFF: Inductor magnetic field collapses, reversing its polarity (L * di/dt), forward-biasing the diode and transferring energy to load and capacitor',
      'Voltage transfer ratio: V_out / V_in = -D / (1 - D); D < 0.5 operates in Buck mode, D > 0.5 operates in Boost mode',
      'The output voltage polarity is inverted with respect to the input ground due to inductor flywheel discharge direction'
    ],
    requiredKeywords: ['buck-boost', 'dc-dc converter', 'duty cycle', 'pwm', 'inductor', 'diode', 'polarity inversion', 'switching', 'continuous conduction'],
    modelAnswer: 'A DC-DC Buck-Boost converter produces an output voltage that can be higher or lower in magnitude than the input voltage, governed by duty ratio D: V_out = -V_in * (D / (1 - D)). During the ON state (switch closed), current flows through the inductor, storing energy in its magnetic field while the diode is reverse-biased and the output capacitor sustains the load. During the OFF state (switch open), the inductor opposes current interruption by reversing its terminal voltage polarity (flywheel action). This forward-biases the freewheeling diode, dumping stored energy into the output filter capacitor and load. Because the inductor discharges current into ground and pulls from the output terminal, the resulting output voltage is intrinsically inverted in polarity relative to the input.'
  },
  {
    id: 'q_eee_03',
    department: 'EEE',
    departmentName: 'Electrical & Electronics Engineering',
    role: 'Control Systems & Automation Engineer',
    category: 'Control Systems & Stability',
    difficulty: 'Intermediate',
    questionText: 'Explain the role of Proportional, Integral, and Derivative (PID) controllers in feedback loops. How does each term influence rise time, steady-state error, and overshoot?',
    expectedKeypoints: [
      'Proportional (P): Produces output proportional to error (Kp * e(t)); reduces rise time but cannot eliminate steady-state error without offset',
      'Integral (I): Accumulates past error over time (Ki * integral e(t) dt); drives steady-state error strictly to zero, but can cause overshoot and windup',
      'Derivative (D): Responds to rate of error change (Kd * de(t)/dt); anticipates future errors, dampens oscillations, and improves transient stability',
      'Tuning methods like Ziegler-Nichols balance stability margins with fast settling time'
    ],
    requiredKeywords: ['pid', 'proportional', 'integral', 'derivative', 'rise time', 'steady-state error', 'overshoot', 'damping', 'feedback', 'controller'],
    modelAnswer: 'A PID controller calculates an error value as the difference between a desired setpoint and measured process variable, applying corrections across three terms: 1) Proportional (P) generates a response proportional to current error, speeding up system rise time and reducing sluggishness, though high Kp induces oscillations and leaves residual steady-state error; 2) Integral (I) integrates cumulative error over time, continuously increasing output until steady-state error is eliminated completely, though excessive Ki leads to overshoot and integrator windup; 3) Derivative (D) tracks the rate of change of error, acting as a predictive damper that counters rapid fluctuations, suppresses overshoot, and accelerates settling time.'
  },

  // =========================================================================
  // 5. MECHANICAL ENGINEERING (MECH)
  // =========================================================================
  {
    id: 'q_mech_01',
    department: 'MECH',
    departmentName: 'Mechanical Engineering',
    role: 'Mechanical Design & Thermal Engineer',
    category: 'Thermodynamics & Heat Transfer',
    difficulty: 'Intermediate',
    questionText: 'State the Second Law of Thermodynamics (Kelvin-Planck and Clausius statements). Why can no heat engine achieve 100% thermal efficiency, and what defines Carnot efficiency?',
    expectedKeypoints: [
      'Kelvin-Planck statement: Impossible for a heat engine operating in a cycle to convert all absorbed heat entirely into work without rejecting some heat to a low-temperature sink',
      'Clausius statement: Impossible for heat to flow spontaneously from a colder body to a hotter body without external work input',
      'Second Law implies total entropy of an isolated system must increase (delta S >= 0)',
      'Carnot efficiency represents maximum theoretical limit between two thermal reservoirs: eta_Carnot = 1 - (T_cold / T_hot)',
      '100% efficiency would require T_cold = 0 Kelvin (absolute zero), which is physically unattainable by the Third Law'
    ],
    requiredKeywords: ['thermodynamics', 'second law', 'kelvin-planck', 'clausius', 'carnot', 'thermal efficiency', 'entropy', 'reservoir', 'heat engine'],
    modelAnswer: 'The Second Law of Thermodynamics dictates the direction of thermal processes and energy degradation. The Kelvin-Planck statement asserts that it is impossible to construct a cyclically operating engine whose sole effect is to extract heat from a reservoir and convert it completely into equivalent mechanical work—some heat must always be rejected to a colder sink. The Clausius statement establishes that heat cannot spontaneously transfer from a cooler to a warmer medium without external work input. The Carnot cycle defines the upper thermodynamic efficiency limit between two absolute temperatures: eta = 1 - (T_cold / T_hot). Achieving 100% efficiency would require an absolute zero cold sink (T_cold = 0 K), which is physically impossible, proving that thermal engines must always discharge waste heat.'
  },
  {
    id: 'q_mech_02',
    department: 'MECH',
    departmentName: 'Mechanical Engineering',
    role: 'Fluids & Aerodynamics Engineer',
    category: 'Fluid Mechanics & Hydraulics',
    difficulty: 'Intermediate',
    questionText: 'State Bernoulli Equation and the key assumptions required for its application. Explain the physical significance of each head term (pressure head, velocity head, elevation head).',
    expectedKeypoints: [
      'Equation: P / (rho * g) + V^2 / (2 * g) + z = Constant along a streamline',
      'Assumptions: Incompressible fluid, steady flow, inviscid (frictionless/zero viscosity), and flow along a streamline',
      'Pressure Head (P / rho*g): Energy stored per unit weight due to static fluid pressure',
      'Velocity Head (V^2 / 2*g): Kinetic energy per unit weight of fluid moving at velocity V',
      'Elevation/Datum Head (z): Potential energy per unit weight due to height above reference datum',
      'Represents total conservation of mechanical energy in ideal fluid flow'
    ],
    requiredKeywords: ['bernoulli', 'fluid mechanics', 'streamline', 'incompressible', 'steady flow', 'inviscid', 'pressure head', 'velocity head', 'elevation head', 'conservation of energy'],
    modelAnswer: 'Bernoulli Equation is an expression of the conservation of mechanical energy for flowing fluids: P / (rho * g) + V^2 / (2 * g) + z = H_total (constant). It rests on four key assumptions: 1) Steady flow (conditions do not vary with time); 2) Incompressible fluid (constant density); 3) Inviscid fluid (shear stresses and viscous dissipation are negligible); 4) Flow strictly along a streamline. Physically, P/(rho*g) is the Pressure Head, representing flow work and internal pressure energy per unit weight; V^2/(2*g) is the Velocity Head, quantifying kinetic energy per unit weight; and z is the Elevation Head, denoting gravitational potential energy per unit weight.'
  },
  {
    id: 'q_mech_03',
    department: 'MECH',
    departmentName: 'Mechanical Engineering',
    role: 'Structural Mechanics & CAD Engineer',
    category: 'Mechanics of Materials & Strength',
    difficulty: 'Advanced',
    questionText: 'Explain the Von Mises Yield Criterion and how it differs from the Maximum Shear Stress (Tresca) criterion. When should an engineer apply Von Mises in finite element analysis?',
    expectedKeypoints: [
      'Von Mises criterion states yielding begins when the distortion energy per unit volume equals that at yield in a simple uniaxial tension test',
      'Also known as Maximum Distortion Energy Theory or Octahedral Shear Stress theory',
      'Tresca criterion predicts yielding when maximum shear stress reaches shear stress at yield (tau_max = sigma_y / 2)',
      'Tresca is more conservative (predicts yielding earlier at lower stress states)',
      'Von Mises aligns much closer with experimental physical test data for ductile metals (steel, aluminum) and is standard in FEA software'
    ],
    requiredKeywords: ['von mises', 'tresca', 'yield criterion', 'distortion energy', 'ductile', 'shear stress', 'finite element analysis', 'fea', 'uniaxial tension'],
    modelAnswer: 'The Von Mises Yield Criterion states that yielding in ductile materials occurs when the second invariant of deviatoric stress (equivalent to distortion energy per unit volume) reaches the distortion energy at yield in simple uniaxial tension: sigma_vm >= sigma_yield. Unlike hydrostatic stress which causes volumetric deformation without plastic yield, Von Mises evaluates pure shear shape distortion. In contrast, the Tresca (Maximum Shear Stress) criterion predicts yield when maximum shear stress tau_max = (sigma_1 - sigma_3)/2 reaches sigma_yield / 2. Geometrically in principal stress space, Tresca forms a hexagonal cylinder inscribed inside the smooth elliptical cylinder of Von Mises. Tresca is more conservative by up to 15%, whereas Von Mises correlates far more accurately with actual experimental failure data for ductile alloys and is the default metric in modern FEA solvers.'
  },

  // =========================================================================
  // 6. CIVIL ENGINEERING (CIVIL)
  // =========================================================================
  {
    id: 'q_civil_01',
    department: 'CIVIL',
    departmentName: 'Civil Engineering',
    role: 'Structural & Concrete Design Engineer',
    category: 'Structural Analysis & RCC Design',
    difficulty: 'Intermediate',
    questionText: 'Explain the Limit State Method (LSM) of reinforced concrete design. Contrast Limit State of Collapse with Limit State of Serviceability.',
    expectedKeypoints: [
      'Limit State Method designs structures to ensure acceptable safety margins against collapse while guaranteeing service performance under working loads',
      'Applies partial safety factors for materials (gamma_m: 1.5 for concrete, 1.15 for steel) and loads (gamma_f: 1.5 for Dead + Live Load)',
      'Limit State of Collapse addresses ultimate structural failure: flexure, shear, compression, torsion, and buckling',
      'Limit State of Serviceability governs everyday usability and user comfort: deflection limits, crack widths, and vibration control'
    ],
    requiredKeywords: ['limit state', 'rcc', 'collapse', 'serviceability', 'partial safety factor', 'deflection', 'cracking', 'concrete', 'reinforcement'],
    modelAnswer: 'The Limit State Method (LSM) is a probabilistic, performance-based structural design philosophy that ensures a structure remains safe against collapse throughout its lifespan while meeting day-to-day usability criteria. It applies partial safety factors to both loads (factoring up loads to account for unpredicted load surges) and material strengths (factoring down concrete by 1.5 and steel by 1.15 to account for construction defects). The Limit State of Collapse safeguards against ultimate failure modes that could lead to loss of life—including catastrophic flexure, shear, axial compression, and torsion. The Limit State of Serviceability ensures satisfactory everyday function, preventing excessive deflection that could crack plaster, limiting surface crack widths to prevent rebar corrosion, and controlling dynamic vibrations for human comfort.'
  },
  {
    id: 'q_civil_02',
    department: 'CIVIL',
    departmentName: 'Civil Engineering',
    role: 'Geotechnical & Foundation Engineer',
    category: 'Geotechnical & Soil Mechanics',
    difficulty: 'Advanced',
    questionText: 'What is Terzaghi Bearing Capacity Theory for shallow foundations? Explain the three terms in Terzaghi equation: cohesion (c), surcharge (q), and unit weight (gamma).',
    expectedKeypoints: [
      'Equation: q_ult = c * N_c + q * N_q + 0.5 * gamma * B * N_gamma',
      'c * N_c represents the shear strength contribution from soil cohesion (clay/fine-grained soil)',
      'q * N_q represents the surcharge contribution from soil overburden above foundation level (q = gamma * D_f)',
      '0.5 * gamma * B * N_gamma represents the self-weight resistance of soil wedge beneath foundation width B',
      'N_c, N_q, and N_gamma are dimensionless bearing capacity factors dependent solely on soil internal friction angle (phi)'
    ],
    requiredKeywords: ['terzaghi', 'bearing capacity', 'shallow foundation', 'cohesion', 'surcharge', 'friction angle', 'soil mechanics', 'foundation width', 'overburden'],
    modelAnswer: 'Karl Terzaghi bearing capacity equation determines the ultimate load-bearing capacity (q_ult) of shallow strip footings before shear failure occurs in the supporting ground: q_ult = c * N_c + q * N_q + 0.5 * gamma * B * N_gamma. The first term, c * N_c, represents the shear strength derived from internal soil cohesion (critical in cohesive clays). The second term, q * N_q, captures the surcharge effect of the soil overburden weight above foundation footing depth (q = gamma * D_f), which provides confinement pressure against upward soil heave. The third term, 0.5 * gamma * B * N_gamma, accounts for the gravitational self-weight and frictional resistance of the failure wedge directly beneath footing width B (vital in granular sands). N_c, N_q, and N_gamma are dimensionless bearing capacity factors determined by the internal friction angle phi.'
  },

  // =========================================================================
  // 7. HR, BEHAVIORAL & STAR LEADERSHIP (UNIVERSAL ACROSS ALL DEPARTMENTS)
  // =========================================================================
  {
    id: 'q_hr_01',
    department: 'COMMON',
    departmentName: 'All Engineering Disciplines',
    role: 'Engineering Candidate',
    category: 'HR & Behavioral Leadership (STAR)',
    difficulty: 'Intermediate',
    questionText: 'Describe a situation where a major engineering component or project phase you developed failed unexpectedly. How did you diagnose the root cause and resolve it under pressure?',
    expectedKeypoints: [
      'Situation: Clear context regarding a critical technical failure, deployment outage, or hardware test breakdown',
      'Task: Responsibility for containing impact and identifying root cause under tight deadlines',
      'Action: Systematic debugging, log/telemetry analysis, unit isolation, team communication, and implementing a hotfix',
      'Result: Concrete outcome, post-mortem root-cause documentation, and permanent preventive regression testing added'
    ],
    requiredKeywords: ['star', 'situation', 'task', 'action', 'result', 'failure', 'root cause', 'debugging', 'post-mortem', 'prevention'],
    modelAnswer: 'Using the STAR framework: During my final semester capstone project, our hardware integration test failed 48 hours before an industry audit because an SPI communication bus was intermittently locking up. As lead firmware engineer, I stayed calm and connected an oscilloscope and logic analyzer to capture real-time clock and data waveforms. I discovered that a high-current motor driver on the same PCB was inducing electromagnetic ground bounce on the shared bus. I immediately isolated the SPI clock line with an optocoupler and rewrote the driver to add an automatic bus timeout watchdog. The system passed 500 consecutive test cycles without error, achieving a 98% audit score. I documented the noise mitigation guidelines for future batch revisions.'
  },
  {
    id: 'q_hr_02',
    department: 'COMMON',
    departmentName: 'All Engineering Disciplines',
    role: 'Engineering Candidate',
    category: 'HR & Behavioral Leadership (STAR)',
    difficulty: 'Intermediate',
    questionText: 'How do you handle a significant technical disagreement with a team member or senior engineer regarding system design or methodology?',
    expectedKeypoints: [
      'Focus on objective data, measurable trade-offs, and project goals rather than personal ego',
      'Active listening to thoroughly understand the peer rationale and constraints',
      'Building a lightweight prototype, benchmark, or proof-of-concept (PoC) to validate both hypotheses empirically',
      'Aligning with team standards and maintaining complete commitment once a final decision is made'
    ],
    requiredKeywords: ['disagreement', 'compromise', 'proof of concept', 'benchmark', 'active listening', 'data-driven', 'collaboration', 'alignment'],
    modelAnswer: 'When technical disagreements arise, I decouple the technical problem from personal ego and anchor the discussion in objective metrics like latency, scalability, maintainability, and delivery timelines. For instance, when debating between using a relational database versus a document store for our project analytics module, my colleague favored MongoDB for rapid schema flexibility, while I advocated PostgreSQL for relational integrity. Instead of arguing theoretically, I built a quick benchmark measuring query latency for our target reporting queries. The data showed PostgreSQL with JSONB indexing gave us both schema agility and 4x faster joins. We reviewed the data together, agreed on Postgres, and shipped on time.'
  },
  {
    id: 'q_hr_03',
    department: 'COMMON',
    departmentName: 'All Engineering Disciplines',
    role: 'Engineering Candidate',
    category: 'HR & Behavioral Leadership (STAR)',
    difficulty: 'Intermediate',
    questionText: 'Tell me about a time you had to meet a tight deadline with incomplete specifications or shifting requirements. How did you prioritize tasks and deliver quality work?',
    expectedKeypoints: [
      'Deconstructed the project into Must-Have (MVP) vs Nice-to-Have deliverables using MoSCoW prioritization',
      'Proactively communicated with stakeholders to clarify ambiguities and confirm critical assumptions',
      'Maintained modular architecture and automated testing to avoid technical debt during rapid iteration',
      'Delivered core functionality on schedule with clean documentation for subsequent phases'
    ],
    requiredKeywords: ['prioritization', 'tight deadline', 'mvp', 'ambiguity', 'communication', 'trade-offs', 'quality', 'agile'],
    modelAnswer: 'During our hackathon championship, our problem statement parameters were revised with only 12 hours remaining before jury presentation. I gathered my team to perform MoSCoW prioritization, isolating the core end-to-end user workflow that demonstrated maximum impact while deferring secondary cosmetic features. I established regular 2-hour mini-syncs to verify interface compatibility across our frontend and backend modules. By adhering to test-driven design for critical algorithms and maintaining open communication, we delivered a robust working MVP that won first place for system reliability and real-world execution.'
  }
];

// Helper to normalize department strings for flexible matching
export function normalizeDeptCode(deptString) {
  if (!deptString) return 'ECE';
  const s = deptString.toUpperCase();
  if (s.includes('ELECTRONIC') || s.includes('ECE') || s.includes('COMMUNICATION')) return 'ECE';
  if (s.includes('COMPUTER') || s.includes('CSE') || s.includes('SOFTWARE')) return 'CSE';
  if (s.includes('AI') || s.includes('ARTIFICIAL') || s.includes('DATA SCIENCE') || s.includes('MACHINE LEARNING')) return 'AI & ML';
  if (s.includes('ELECTRICAL') || s.includes('EEE') || s.includes('POWER')) return 'EEE';
  if (s.includes('MECHANICAL') || s.includes('MECH')) return 'MECH';
  if (s.includes('CIVIL') || s.includes('STRUCT')) return 'CIVIL';
  if (s.includes('INFO') || s.includes('IT')) return 'CSE';
  return 'ECE';
}
