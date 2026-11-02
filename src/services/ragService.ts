import { RagDocument } from '../types';
import { mockRagDocuments } from './mockData';
import { ApiService, delay } from './api';

const RAG_DOCS_KEY = 'rag_documents_list';

export interface RagQueryResponse {
  answer: string;
  sourceDocuments: {
    title: string;
    pageOrTimestamp: string;
    similarityScore: number;
    chunkSnippet: string;
  }[];
  confidence: number;
}

export const ragService = {
  async getDocuments(courseId?: string): Promise<RagDocument[]> {
    await delay(150);
    const list = ApiService.getItem<RagDocument[]>(RAG_DOCS_KEY, mockRagDocuments);
    return courseId ? list.filter(d => d.courseId === courseId) : list;
  },

  async reindexDocument(docId: string): Promise<RagDocument> {
    await delay(600);
    const docs = await this.getDocuments();
    const updated = docs.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: 'indexed' as const,
          chunkCount: d.chunkCount + 8
        };
      }
      return d;
    });
    ApiService.setItem(RAG_DOCS_KEY, updated);
    return updated.find(d => d.id === docId)!;
  },

  async deleteDocument(docId: string): Promise<void> {
    await delay(200);
    const docs = await this.getDocuments();
    const updated = docs.filter(d => d.id !== docId);
    ApiService.setItem(RAG_DOCS_KEY, updated);
  },

  async queryCourseRag(courseTitle: string, query: string): Promise<RagQueryResponse> {
    await delay(500); // Simulate embedding search + generation
    const qLower = query.toLowerCase();

    if (qLower.includes('backpropagation') || qLower.includes('gradient')) {
      return {
        answer: `According to Dr. Suresh Kumar's lecture notes (*Machine Learning Lecture Notes, Module 2, Page 14*), **Backpropagation** is an efficient application of the multivariable calculus chain rule to compute partial derivatives of the scalar loss $L$ with respect to every weight tensor $W^{[l]}$ in the network.\n\nIn Dr. Kumar's Lecture 7 video, he specifically emphasizes:\n1. The forward pass caches layer pre-activations $Z^{[l]} = W^{[l]}A^{[l-1]} + b^{[l]}$.\n2. The backward pass recursively propagates error signals $\\delta^{[l]} = \\delta^{[l+1]} (W^{[l+1]})^T \\odot \\sigma'(Z^{[l]})$.\n3. ReLU activations avoid vanishing gradients in hidden layers.`,
        sourceDocuments: [
          {
            title: 'Machine_Learning_Comprehensive_Notes_Modules_1_4.pdf',
            pageOrTimestamp: 'Page 14-16',
            similarityScore: 0.94,
            chunkSnippet: '...The computational graph formulation of backpropagation allows linear time gradient calculation proportional to the number of edges...'
          },
          {
            title: 'Lecture 7: Neural Networks & Backpropagation (Video)',
            pageOrTimestamp: 'Timestamp 14:32',
            similarityScore: 0.91,
            chunkSnippet: '...Notice how the cached pre-activation vector Z is reused directly during the backward gradient matrix multiplication...'
          }
        ],
        confidence: 0.96
      };
    }

    if (qLower.includes('regularization') || qLower.includes('l1') || qLower.includes('l2') || qLower.includes('lasso')) {
      return {
        answer: `In Module 3 (*Supervised Learning & Regularization, Page 22*), Dr. Kumar distinguishes L1 (Lasso) and L2 (Ridge):\n- **L1 Penalty:** Adds $\\lambda \\sum |w_i|$, driving non-informative feature weights strictly to zero due to sharp diamond corners on parameter axes.\n- **L2 Penalty:** Adds $\\lambda \\sum w_i^2$, which smoothly decays large weights without forcing exact sparsity.\n\nRecommended study material: Review Slide 18 on Weight Decay in Assignment 4 preparation.`,
        sourceDocuments: [
          {
            title: 'Machine_Learning_Comprehensive_Notes_Modules_1_4.pdf',
            pageOrTimestamp: 'Page 22',
            similarityScore: 0.92,
            chunkSnippet: '...L1 regularization acts as an automatic feature selection mechanism in high-dimensional feature spaces...'
          }
        ],
        confidence: 0.93
      };
    }

    // Default grounded answer
    return {
      answer: `Based on your course materials in **${courseTitle}**:\n\nThe concept related to "${query}" is covered across the uploaded lecture notes and slide decks. The syllabus highlights systematic mathematical formulation, algorithmic implementation in Python, and validation against standardized benchmarks.\n\nWould you like me to extract sample code or flashcards from the lecture documents?`,
      sourceDocuments: [
        {
          title: 'Machine_Learning_Comprehensive_Notes_Modules_1_4.pdf',
          pageOrTimestamp: 'Section 3.1',
          similarityScore: 0.88,
          chunkSnippet: '...Core mathematical foundations and algorithmic workflows for deep neural representations...'
        }
      ],
      confidence: 0.89
    };
  }
};
