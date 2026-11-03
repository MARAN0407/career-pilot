// Expansive benchmark questions bank, rubrics, and comprehensive benchmark model answers for interview evaluation

export const interviewQuestions = [
  // ==========================================
  // 1. AI & MACHINE LEARNING
  // ==========================================
  {
    id: 'q_ml_01',
    role: 'AI / Machine Learning Engineer',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    questionText: 'Explain the difference between L1 (Lasso) and L2 (Ridge) regularization and why L1 produces sparsity in model weights.',
    expectedKeypoints: [
      'L1 adds sum of absolute values penalty (|w|), L2 adds sum of squared weights penalty (w^2)',
      'L1 cost contour has diamond sharp corners that intersect coordinate axes at zero, forcing redundant weights to zero',
      'L2 shrinks weights asymptotically towards zero without setting them strictly to zero',
      'L1 performs feature selection, while L2 is effective against multicollinearity'
    ],
    requiredKeywords: ['l1', 'l2', 'lasso', 'ridge', 'absolute', 'squared', 'sparsity', 'zero', 'penalty', 'contour', 'diamond'],
    modelAnswer: 'L1 regularization (Lasso) adds a penalty proportional to the sum of absolute values of the coefficients (lambda * sum(|w|)), whereas L2 regularization (Ridge) adds a penalty proportional to the sum of squared coefficients (lambda * sum(w^2)). Geometrically, the constraint region for L1 is a diamond/polytope with sharp vertices on the coordinate axes. When the loss function contours expand, they are most likely to hit these sharp corners on the axes first, causing non-essential weights to become exactly zero, which achieves feature sparsity. In contrast, L2 has a smooth circular/spherical constraint region, which scales down weights smoothly without forcing them to zero.'
  },
  {
    id: 'q_ml_02',
    role: 'AI / Machine Learning Engineer',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    questionText: 'Explain the vanishing gradient problem in deep neural networks when using Sigmoid activation functions. How does ReLU or Batch Normalization solve it?',
    expectedKeypoints: [
      'The derivative of the Sigmoid function has a maximum value of 0.25',
      'During backpropagation across multiple layers, multiplying many values <= 0.25 causes gradients to exponentially decay toward zero',
      'Early layer weights receive negligible gradients and fail to learn',
      'ReLU solves this because its derivative is a constant 1 for positive inputs',
      'Batch Normalization standardizes activations to prevent inputs from saturating in the tails'
    ],
    requiredKeywords: ['vanishing gradient', 'sigmoid', 'derivative', '0.25', 'backpropagation', 'chain rule', 'exponential', 'relu', 'batch normalization', 'saturation'],
    modelAnswer: 'The vanishing gradient problem occurs because the first derivative of the sigmoid function peaks at 0.25 and approaches 0 for large positive or negative inputs. By the chain rule, gradients backpropagating through N layers require computing products of these derivatives. Multiplying fractions smaller than 0.25 across dozens of layers causes the gradient to shrink exponentially toward zero, preventing earlier layers from updating. ReLU solves this because its gradient is constantly 1 for all positive inputs, eliminating decay. Batch Normalization normalizes pre-activation distributions, preventing inputs from shifting into saturated non-linear tail zones.'
  },
  {
    id: 'q_ml_03',
    role: 'AI / Machine Learning Engineer',
    category: 'AI & Machine Learning',
    difficulty: 'Advanced',
    questionText: 'How do residual connections (skip connections) in ResNet architectures prevent degradation in very deep networks?',
    expectedKeypoints: [
      'Skip connections reformulate layers as learning residual mapping H(x) = F(x) + x instead of unreferenced H(x)',
      'Allows gradients to backpropagate directly through the identity shortcut (+x) without diminishing',
      'If additional layers are redundant, the network can easily learn to drive F(x) to zero, preserving identity mapping',
      'Solves optimization degradation where deeper models had higher training errors than shallower counterparts'
    ],
    requiredKeywords: ['residual', 'skip connection', 'resnet', 'identity', 'f(x) + x', 'gradient', 'backpropagation', 'degradation', 'shortcut'],
    modelAnswer: 'Residual connections bypass one or more layers by performing an element-wise addition: H(x) = F(x) + x, where x is the input and F(x) is the residual mapping to be learned. Mathematically, during backpropagation, the gradient of the loss with respect to x includes a "+ 1" term from the derivative of x: dLoss/dx = dLoss/dH * (dF/dx + 1). This ensures gradients can flow unimpeded directly back to early layers even if dF/dx is small. Furthermore, if a layer is unnecessary, the optimizer can easily set F(x) = 0, falling back to an identity function, which guarantees deeper networks perform at least as well as shallower ones.'
  },
  {
    id: 'q_ml_04',
    role: 'AI / Machine Learning Engineer',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    questionText: 'What is the Bias-Variance tradeoff in Machine Learning, and how do techniques like Cross-Validation, Regularization, and Ensemble methods help manage it?',
    expectedKeypoints: [
      'High Bias causes underfitting by making overly simplistic assumptions about data',
      'High Variance causes overfitting by being excessively sensitive to small fluctuations and noise in training data',
      'Total Expected Error = Bias^2 + Variance + Irreducible Error',
      'Regularization and pruning reduce variance by constraining model complexity',
      'Bagging (e.g. Random Forests) reduces variance, while Boosting (e.g. XGBoost) reduces bias'
    ],
    requiredKeywords: ['bias', 'variance', 'tradeoff', 'underfitting', 'overfitting', 'regularization', 'cross-validation', 'ensemble', 'bagging', 'boosting'],
    modelAnswer: 'The Bias-Variance tradeoff describes the tension between two sources of error in supervised learning. Bias is error caused by overly simplistic model assumptions (leading to underfitting), while Variance is error caused by high sensitivity to noise in the training set (leading to overfitting). Total expected error is composed of Bias squared plus Variance plus irreducible noise. To manage this tradeoff, k-fold cross-validation is used to detect overfitting early; L1/L2 regularization penalizes extreme weights to constrain variance; and ensemble methods like Bagging aggregate diverse high-variance models to reduce variance, while Boosting iteratively fits residual errors to reduce bias.'
  },
  {
    id: 'q_ml_05',
    role: 'AI / Machine Learning Engineer',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    questionText: 'Compare the Adam optimizer with standard Stochastic Gradient Descent with Momentum (SGD-M). When would you choose one over the other?',
    expectedKeypoints: [
      'SGD-M adds an exponentially decaying moving average of past gradients to accelerate through ravines',
      'Adam combines momentum (first moment / mean) with RMSProp (second moment / uncentered variance) for adaptive per-parameter learning rates',
      'Adam handles sparse gradients and non-stationary objectives with minimal hyperparameter tuning',
      'SGD-M often generalizes slightly better on vision models when tuned with an optimal learning rate schedule'
    ],
    requiredKeywords: ['adam', 'sgd', 'momentum', 'learning rate', 'adaptive', 'first moment', 'second moment', 'rmsprop', 'generalization', 'hyperparameter'],
    modelAnswer: 'SGD with Momentum accelerates gradient descent by adding a fraction of the previous velocity vector to the current gradient update, which dampens oscillations across ravines. Adam (Adaptive Moment Estimation) combines momentum with adaptive learning rates by tracking both the exponentially decaying average of past gradients (first raw moment) and past squared gradients (second uncentered moment), including bias correction for early iterations. Adam works exceptionally well out-of-the-box on NLP and complex transformers due to per-parameter adaptive steps. However, carefully scheduled SGD-M is often preferred in computer vision because empirical studies show it finds flatter, better-generalizing local minima.'
  },

  // ==========================================
  // 2. GENERATIVE AI & LLM SYSTEMS
  // ==========================================
  {
    id: 'q_genai_01',
    role: 'AI / Machine Learning Engineer',
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
    requiredKeywords: ['rag', 'retrieval', 'generation', 'chunking', 'embedding', 'vector', 'similarity', 'reranking', 'context', 'llm', 'hallucination'],
    modelAnswer: 'A RAG architecture grounds LLM generation in external authoritative data. In the indexing pipeline: documents are partitioned into chunked segments (e.g., 512 tokens with 10% overlap to preserve context across boundaries) and encoded into vector embeddings using models like text-embedding-3 or BGE. These vectors are indexed in a vector store using approximate nearest neighbor algorithms like HNSW. At inference time: the user query is embedded, and top-K candidate chunks are retrieved via cosine similarity or dot product. A cross-encoder reranker rescores these candidates to rank the most contextually relevant excerpts. Finally, these retrieved chunks are formatted into the LLM system prompt context, allowing the model to generate accurate, verifiable answers with citations and zero hallucinations.'
  },
  {
    id: 'q_genai_02',
    role: 'AI / Machine Learning Engineer',
    category: 'Generative AI & LLMs',
    difficulty: 'Intermediate',
    questionText: 'When should an engineering team choose Fine-Tuning versus Retrieval-Augmented Generation (RAG) when building an enterprise LLM solution?',
    expectedKeypoints: [
      'RAG is ideal for dynamic, frequently updated factual knowledge, private docs, and verifiable source citations',
      'Fine-Tuning is ideal for altering output style, tone, format, domain jargon, or teaching specialized procedural reasoning',
      'RAG has lower training costs and prevents catastrophic forgetting',
      'Fine-Tuning reduces prompt token counts and latency for specialized tasks',
      'Hybrid approach: Fine-tuning for style/task-adaptation combined with RAG for up-to-date facts'
    ],
    requiredKeywords: ['fine-tuning', 'rag', 'knowledge', 'latency', 'hallucination', 'citations', 'cost', 'style', 'catastrophic forgetting', 'tokens'],
    modelAnswer: 'RAG is the preferred choice when dealing with dynamic, private, or frequently evolving factual knowledge, because updating the vector index requires no model retraining and provides transparent source attribution. Fine-tuning modifies the model weights and is best suited for teaching specialized vocabulary, structured response formats (like JSON schemas), domain tone, or complex downstream reasoning tasks where prompt tokens must be conserved. Fine-tuning alone fails at memorizing new facts reliably and suffers from hallucinations and catastrophic forgetting. Therefore, modern enterprise systems employ a hybrid strategy: fine-tuning smaller open-weight models for task execution efficiency and combining them with RAG for factual grounding.'
  },
  {
    id: 'q_genai_03',
    role: 'AI / Machine Learning Engineer',
    category: 'Generative AI & LLMs',
    difficulty: 'Advanced',
    questionText: 'How does self-attention in the Transformer architecture compute relationships between tokens? Describe the Query, Key, and Value dot-product calculation.',
    expectedKeypoints: [
      'Formula: Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V',
      'Query represents the current token looking for context, Key represents keys of other tokens to match against, and Value holds token information',
      'Dot product Q * K^T computes similarity/relevance scores between all token pairs',
      'Division by sqrt(d_k) stabilizes variance and prevents softmax from entering regions with vanishing gradients',
      'Softmax normalizes scores into attention weights that weight the Value vectors'
    ],
    requiredKeywords: ['self-attention', 'transformer', 'query', 'key', 'value', 'q', 'k', 'v', 'dot product', 'softmax', 'sqrt', 'd_k', 'dimension', 'weights'],
    modelAnswer: 'In Transformers, self-attention computes pairwise affinities between tokens in a sequence. Input embeddings are linearly projected into three distinct representations: Query (Q), Key (K), and Value (V). The dot product Q * K^T produces an unscaled attention matrix representing affinities between all token pairs. Because dot products grow large in high dimensions (d_k), they are scaled by 1/sqrt(d_k) to prevent the softmax function from saturating into regions with near-zero gradients. A row-wise softmax normalizes the scores into probabilities summing to 1. Finally, these attention weights are multiplied by V to generate a context-aware representation for each token.'
  },
  {
    id: 'q_genai_04',
    role: 'AI / Machine Learning Engineer',
    category: 'Generative AI & LLMs',
    difficulty: 'Intermediate',
    questionText: 'What strategies and guardrails can you implement in production to mitigate LLM hallucinations and ensure deterministic structured outputs?',
    expectedKeypoints: [
      'Grounding with verified context through RAG and strict system prompt constraints',
      'Enforcing structured outputs using JSON schemas, Pydantic validation, or grammar-constrained sampling',
      'Lowering temperature (e.g. 0.0 or 0.2) to reduce stochastic randomness',
      'Implementing automated evaluation guardrails (e.g., NeMo Guardrails, hallucination detectors)',
      'Human-in-the-loop verification and citation attribution'
    ],
    requiredKeywords: ['hallucination', 'guardrails', 'temperature', 'json', 'structured', 'schema', 'grounding', 'rag', 'pydantic', 'deterministic'],
    modelAnswer: 'To eliminate hallucinations in production: First, ground the model using RAG with an explicit prompt instruction stating: "Answer solely using the provided context; if unknown, state that clearly." Second, set temperature to 0.0 for deterministic, greedy decoding. Third, enforce rigid output structures using constrained decoding tools (such as OpenAI Structured Outputs or Outlines/Pydantic) to guarantee valid JSON formatting at the token generation level. Fourth, run automated post-generation guardrail filters (such as semantic similarity checks between output claims and source chunks). Fifth, require verbatim source citations so users and systems can verify statements.'
  },

  // ==========================================
  // 3. FULL-STACK & SYSTEM DESIGN
  // ==========================================
  {
    id: 'q_sys_01',
    role: 'Software Engineer',
    category: 'System Design & Backend',
    difficulty: 'Intermediate',
    questionText: 'How do database indexes (such as B-Tree and Hash indexes) work internally, and what are the tradeoffs of indexing every column?',
    expectedKeypoints: [
      'B-Tree indexes maintain self-balancing balanced tree structures supporting range queries and logarithmic lookups O(log N)',
      'Hash indexes offer O(1) equality lookups but do not support range scans or ordering',
      'Read performance significantly improves by avoiding expensive sequential full table scans',
      'Write performance degrades because every INSERT, UPDATE, and DELETE must synchronously rebalance and update indexes',
      'Increased disk and memory footprint from storing secondary index pages'
    ],
    requiredKeywords: ['index', 'b-tree', 'hash', 'lookup', 'o(log n)', 'table scan', 'write', 'insert', 'tradeoff', 'overhead', 'disk'],
    modelAnswer: 'A B-Tree index is a balanced, multi-way search tree that maintains sorted keys across leaf pages linked in order. This enables O(log N) point lookups, prefix searches, and range scans. A Hash index maps keys to buckets, offering O(1) lookups but failing on range queries. While indexing high-cardinality query columns dramatically accelerates SELECT queries by avoiding full table scans, indexing every column introduces severe drawbacks: every INSERT, UPDATE, or DELETE requires updating both the base table and all corresponding index trees, causing significant write latency. Additionally, secondary indexes consume substantial disk space and RAM, displacing working data from the buffer pool.'
  },
  {
    id: 'q_sys_02',
    role: 'Software Engineer',
    category: 'System Design & Backend',
    difficulty: 'Advanced',
    questionText: 'Explain the CAP theorem and describe how an architect designs for high availability versus strong consistency in distributed systems.',
    expectedKeypoints: [
      'CAP stands for Consistency (all nodes see same data simultaneously), Availability (every request receives a response), and Partition Tolerance (system continues functioning despite network splits)',
      'Because network partitions (P) are inevitable in real-world distributed networks, systems must choose between CP and AP',
      'CP Systems (e.g. Google Spanner, etcd, MongoDB) reject writes or fail availability during splits to prevent split-brain',
      'AP Systems (e.g. Cassandra, DynamoDB) accept local writes during network splits, resolving conflicts later using Eventual Consistency or CRDTs'
    ],
    requiredKeywords: ['cap', 'consistency', 'availability', 'partition tolerance', 'network split', 'eventual consistency', 'distributed', 'cp', 'ap', 'tradeoff'],
    modelAnswer: 'The CAP theorem asserts that a distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance. In real-world physical networks, network partitions (delays, dropped packets) are inevitable; thus, distributed systems must trade off between Consistency (CP) and Availability (AP). A CP system guarantees that reads return the latest write across all nodes; during a network partition, it will reject requests or block until nodes sync, sacrificing availability to avoid stale data. An AP system guarantees that every non-failing node returns a response; during partitions, divergent writes are accepted locally, and the system relies on Eventual Consistency, vector clocks, or CRDTs for asynchronous reconciliation.'
  },
  {
    id: 'q_sys_03',
    role: 'Software Engineer',
    category: 'System Design & Backend',
    difficulty: 'Intermediate',
    questionText: 'Describe various caching patterns (Cache-Aside, Write-Through, Write-Behind) and how you mitigate cache stampedes and invalidation issues.',
    expectedKeypoints: [
      'Cache-Aside (Lazy Loading): Application reads from cache; on miss, fetches from database and writes back to cache',
      'Write-Through: Application writes to cache, which synchronously updates the database before completing',
      'Write-Behind (Write-Back): Application writes to cache, which asynchronously batches writes to database',
      'Cache Stampede (Thundering Herd): Addressed via mutual exclusion locks (mutex) or probabilistic early expiration (XFetch)',
      'TTL (Time-to-Live) and event-driven invalidation via database CDC (Change Data Capture) or message brokers'
    ],
    requiredKeywords: ['caching', 'cache-aside', 'write-through', 'write-behind', 'ttl', 'invalidation', 'cache stampede', 'thundering herd', 'redis', 'database'],
    modelAnswer: 'Caching strategies optimize read latency and database load. In Cache-Aside (Lazy Loading), the application checks the cache first; on a miss, it queries the DB and repopulates the cache. In Write-Through, updates are written to the cache and DB synchronously. In Write-Behind, writes are saved immediately to the cache and flushed asynchronously to the database in batches, maximizing write throughput. To prevent a Cache Stampede (when many concurrent requests hit a cold/expired key simultaneously), use distributed mutex locks so only one worker queries the DB while others wait, or implement probabilistic early background recomputation. Finally, combine time-to-live (TTL) limits with event-driven invalidation via database change streams.'
  },
  {
    id: 'q_sys_04',
    role: 'Software Engineer',
    category: 'System Design & Backend',
    difficulty: 'Intermediate',
    questionText: 'Compare REST APIs with GraphQL. What problems does GraphQL solve, and what challenges does it introduce regarding caching and security?',
    expectedKeypoints: [
      'REST organizes endpoints around resources; GraphQL uses a single endpoint with client-specified schema queries',
      'GraphQL solves Over-fetching (getting unused fields) and Under-fetching (requiring N+1 sequential round-trips)',
      'GraphQL challenges: Standard HTTP/CDN caching (like Cache-Control on URLs) is harder because queries use POST requests',
      'GraphQL challenges: Malicious deeply nested queries require query complexity analysis and depth limiting',
      'N+1 database query problem in resolvers solved using DataLoader batching'
    ],
    requiredKeywords: ['rest', 'graphql', 'over-fetching', 'under-fetching', 'caching', 'schema', 'endpoint', 'dataloader', 'n+1', 'query complexity'],
    modelAnswer: 'REST exposes fixed endpoints for each resource, which often leads to over-fetching (downloading unneeded fields) or under-fetching (requiring multiple waterfall requests to assemble related data). GraphQL solves this by allowing clients to request exactly the nested fields they require in a single POST request. However, GraphQL introduces architectural complexities: because requests are dynamic POST bodies to a single endpoint, edge HTTP caching via CDNs is non-trivial compared to standard REST GET URLs. Additionally, unbounded nested queries can cause Denial-of-Service attacks, requiring server-side query depth limiting, cost analysis, and DataLoader batching to resolve N+1 database queries.'
  },

  // ==========================================
  // 4. DATA STRUCTURES & ALGORITHMS
  // ==========================================
  {
    id: 'q_dsa_01',
    role: 'Software Engineer',
    category: 'Algorithms & Data Structures',
    difficulty: 'Intermediate',
    questionText: 'How does a Hash Table achieve O(1) average lookup time, and what collision resolution strategies (Chaining vs Open Addressing) are used?',
    expectedKeypoints: [
      'Hash function maps arbitrary keys to bounded integer indices in an internal bucket array',
      'Collision Resolution - Separate Chaining: Each bucket holds a linked list or self-balancing tree (e.g., Red-Black tree in Java HashMap)',
      'Collision Resolution - Open Addressing: Finds next open slot using Linear Probing, Quadratic Probing, or Double Hashing',
      'Load Factor (n/k): When threshold (e.g. 0.75) is exceeded, table dynamically resizes (doubles) and rehashes keys',
      'Worst-case lookup is O(N) if all keys hash to the same bucket'
    ],
    requiredKeywords: ['hash table', 'o(1)', 'hash function', 'collision', 'separate chaining', 'open addressing', 'linear probing', 'load factor', 'rehashing'],
    modelAnswer: 'A Hash Table uses a deterministic hash function to convert a key into an integer hash code, which is mapped modulo the array capacity to an array index for O(1) average time access. When different keys map to the same bucket index (a collision), two primary resolution strategies are used: Separate Chaining stores colliding entries in a linked list or balanced binary tree at that index; Open Addressing probes for an empty array slot using linear probing, quadratic probing, or double hashing. To prevent performance from degrading to O(N), hash tables maintain a load factor (number of elements / capacity, typically 0.75); once crossed, the array doubles in size and all existing keys are rehashed.'
  },
  {
    id: 'q_dsa_02',
    role: 'Software Engineer',
    category: 'Algorithms & Data Structures',
    difficulty: 'Intermediate',
    questionText: 'Describe the design and implementation of an LRU (Least Recently Used) Cache with O(1) get and put time complexity.',
    expectedKeypoints: [
      'Data structure combination: Hash Map paired with a Doubly Linked List',
      'Hash Map stores Key -> Node reference for O(1) lookup',
      'Doubly Linked List maintains access order: Head stores Most Recently Used (MRU), Tail stores Least Recently Used (LRU)',
      'get(key): Check map, move accessed node to Head of list, return value in O(1)',
      'put(key, value): If key exists, update value and move to Head; if new, insert at Head. If capacity exceeded, remove node at Tail and delete from Map in O(1)'
    ],
    requiredKeywords: ['lru', 'cache', 'doubly linked list', 'hash map', 'o(1)', 'head', 'tail', 'get', 'put', 'eviction', 'capacity'],
    modelAnswer: 'An LRU Cache with O(1) get and put operations is built by combining a Hash Map with a Doubly Linked List. The Hash Map stores key-to-node references for instantaneous O(1) lookup. The Doubly Linked List maintains recency ordering with dummy head and tail sentinel nodes: the node directly following head is Most Recently Used (MRU), and the node preceding tail is Least Recently Used (LRU). On get(key): if present, we detach the node and re-insert it at the head, returning its value in O(1). On put(key, value): if the key exists, we update its value and move it to the head; if it is new, we insert a new node at the head and add it to the map. If the cache exceeds capacity, we evict the tail node and delete its key from the map in O(1).'
  },
  {
    id: 'q_dsa_03',
    role: 'Software Engineer',
    category: 'Algorithms & Data Structures',
    difficulty: 'Intermediate',
    questionText: 'If you have an imbalanced dataset where the positive class is only 1% of total samples, why is Accuracy a misleading metric? What metrics would you use instead?',
    expectedKeypoints: [
      'A trivial classifier predicting majority class gets 99% accuracy while failing completely',
      'Use Precision, Recall, F1-Score, and Precision-Recall AUC (PR-AUC)',
      'Precision = TP / (TP + FP); Recall = TP / (TP + FN)',
      'F1-score is the harmonic mean of Precision and Recall',
      'Consider techniques like SMOTE, class weights, focal loss, or threshold adjustment'
    ],
    requiredKeywords: ['imbalanced', 'accuracy', 'misleading', 'precision', 'recall', 'f1', 'f1-score', 'majority', 'minority', 'pr-auc', 'false positive', 'false negative'],
    modelAnswer: 'On a dataset with 99% negative and 1% positive examples, standard Accuracy is deceptive because a naive model that predicts "negative" for every single sample trivially achieves 99% accuracy, despite having 0% recall on the critical class (e.g., fraud or disease). Instead, we evaluate using Precision (TP / (TP + FP)), Recall (TP / (TP + FN)), and the F1-Score (harmonic mean of Precision and Recall). Additionally, the Precision-Recall Area Under Curve (PR-AUC) is much more informative than ROC-AUC when dealing with heavily skewed distributions. Tuning classification decision thresholds and applying class weighting or focal loss also ensures the minority class is prioritized.'
  },
  {
    id: 'q_dsa_04',
    role: 'Software Engineer',
    category: 'Algorithms & Data Structures',
    difficulty: 'Intermediate',
    questionText: 'Explain Breadth-First Search (BFS) versus Depth-First Search (DFS) on graphs. In which scenarios is BFS strictly superior to DFS?',
    expectedKeypoints: [
      'BFS explores level-by-level using a FIFO Queue; DFS explores branches deeply using a LIFO Stack or recursion',
      'Both have time complexity O(V + E) where V is vertices and E is edges',
      'BFS is strictly optimal for finding the shortest path in unweighted graphs',
      'DFS uses less memory O(D) where D is max depth, whereas BFS memory can be O(B^D) storing the widest layer',
      'DFS is ideal for topological sorting, cycle detection, and maze/puzzle exploration'
    ],
    requiredKeywords: ['bfs', 'dfs', 'queue', 'stack', 'graph', 'shortest path', 'unweighted', 'time complexity', 'space complexity', 'vertices', 'edges'],
    modelAnswer: 'Breadth-First Search (BFS) and Depth-First Search (DFS) are fundamental graph traversal algorithms with O(V + E) time complexity. BFS visits nodes level by level using a FIFO Queue, whereas DFS traverses deeply down a branch using recursion or an explicit LIFO Stack. BFS is strictly superior when finding the shortest path (minimum number of edges) between two nodes in an unweighted graph, as it guarantees reaching the target at the earliest level. Conversely, DFS is preferred when searching deep paths, detecting cycles in directed graphs, topological sorting, or when graph branching factors are large, since DFS memory footprint O(depth) is often much lower than BFS storing an entire level O(branching^depth).'
  },

  // ==========================================
  // 5. BEHAVIORAL & STAR LEADERSHIP
  // ==========================================
  {
    id: 'q_beh_01',
    role: 'Software Engineer',
    category: 'Behavioral & Leadership',
    difficulty: 'Intermediate',
    questionText: 'Describe a situation where a machine learning model or software system you built failed to perform well in validation or production. How did you debug and resolve the issue?',
    expectedKeypoints: [
      'Follows structured STAR method (Situation, Task, Action, Result)',
      'Identifies clear failure symptom (e.g. overfitting, data leakage, distribution shift, label noise, production memory leak)',
      'Methodical diagnostic steps (confusion matrix, error analysis, validation splits, logs inspection)',
      'Actionable resolution (feature engineering, data cleaning, regularization, refactoring)',
      'Quantified improvement in final metric'
    ],
    requiredKeywords: ['situation', 'task', 'action', 'result', 'validation', 'debug', 'metric', 'improved', 'root cause', 'star'],
    modelAnswer: 'A strong behavioral answer follows the STAR framework. For instance: Situation: During an image classification project, my ResNet model attained 98% training accuracy but stalled at 61% validation accuracy. Task: I was tasked with identifying the root cause and boosting generalization without buying more data. Action: I conducted systematic error analysis, checking loss curves and confusion matrices. I discovered subtle data leakage in the initial random train/val split because multiple augmented frames from the same video were present in both sets. I restructured the split by unique patient/video IDs, added heavy data augmentation (mixup and random crop), and applied Dropout (0.3). Result: Overfitting was resolved, and test accuracy stabilized at 88.5%, successfully meeting project production requirements.'
  },
  {
    id: 'q_beh_02',
    role: 'Software Engineer',
    category: 'Behavioral & Leadership',
    difficulty: 'Intermediate',
    questionText: 'Tell me about a time when you had a strong technical disagreement with a teammate or lead. How did you handle the situation and reach an alignment?',
    expectedKeypoints: [
      'STAR methodology with objective, professional composure',
      'Focus on objective data, benchmarks, and tradeoffs rather than personal ego',
      'Willingness to listen actively and understand the other perspective',
      'Ran proof-of-concept (PoC) or A/B experiment to gather empirical evidence',
      'Successful team alignment and post-decision commitment'
    ],
    requiredKeywords: ['disagreement', 'teammate', 'compromise', 'data', 'benchmark', 'star', 'alignment', 'listen', 'proof of concept', 'teamwork'],
    modelAnswer: 'In a microservices architecture redesign, a senior engineer advocated for synchronous REST communication between our analytics service and main billing service, while I proposed asynchronous event messaging using Apache Kafka to prevent cascading failures. Instead of arguing theoretical points, I scheduled a design review and built a small proof-of-concept benchmarking both approaches under simulated network latency. The benchmark demonstrated that under peak load, the synchronous REST calls increased p99 response times by 320% and caused timeout retries. We walked through the trade-offs together, agreed on the asynchronous pub/sub model with a dead-letter queue, and delivered the pipeline without production incidents.'
  },
  {
    id: 'q_beh_03',
    role: 'Software Engineer',
    category: 'Behavioral & Leadership',
    difficulty: 'Intermediate',
    questionText: 'Describe how you manage tight deadlines when project scope is unclear or technical requirements change unexpectedly.',
    expectedKeypoints: [
      'STAR structure demonstrating prioritization and communication',
      'Proactive stakeholder alignment and clarifying minimal viable scope (MVP)',
      'Decomposing complex tasks into agile milestones and identifying critical path',
      'Transparent status updates and managing technical debt responsibly',
      'Delivered core functional value on time without compromising quality'
    ],
    requiredKeywords: ['deadline', 'priority', 'scope', 'mvp', 'communication', 'stakeholder', 'agile', 'timeline', 'star', 'tradeoff'],
    modelAnswer: 'Two weeks before our product launch, stakeholders requested an unexpected feature: real-time CSV analytics exports with multi-factor authentication. With our timeline fixed, I immediately organized a scope triage meeting. Using an MoSCoW prioritization matrix, I separated the "Must-Haves" from "Nice-to-Haves". I proposed delivering the essential core analytics and auth verification in phase 1, while scheduling advanced export formatting for a patch release five days post-launch. I broke the critical path into daily deliverable milestones, maintained transparent daily updates in standup, and delivered the core release on schedule with zero critical defects.'
  }
];
