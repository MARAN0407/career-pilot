import { interviewQuestions } from './questionsData.js';

/**
 * Evaluates candidate responses against department and subject question rubrics,
 * benchmark keywords, and correct model answers.
 */
export function evaluateInterviewAnswers(type, submittedAnswers) {
  const durationMinutes = Math.max(1, Math.round(submittedAnswers.length * 2.5));
  
  let totalScoreSum = 0;
  let correctCount = 0;
  let partiallyCorrectCount = 0;
  let incorrectCount = 0;
  const missingTopicSet = new Set();
  
  const evaluatedTranscript = submittedAnswers.map((item, index) => {
    // Check if the question metadata was supplied directly with the answer submission
    // or look it up in questionsData.js
    const questionObj = {
      questionText: item.question || item.questionText || `Question ${index + 1}`,
      expectedKeypoints: item.expectedKeypoints || ['Clear technical articulation', 'Core principles and definitions', 'Concrete terminology and applications'],
      requiredKeywords: item.requiredKeywords || ['principle', 'system', 'operation', 'engineering'],
      modelAnswer: item.modelAnswer || item.correctAnswer || 'A comprehensive, domain-accurate technical explanation addressing the core principles, working mechanisms, and practical applications.',
      explanation: item.explanation || 'This fundamental engineering concept establishes the governing principles and operational boundaries for this subject.',
      improvementTip: item.improvementTip || 'Structure your answer by stating the formal definition first, detailing the physical/mathematical mechanism, and concluding with a concrete application or tradeoff.',
      department: item.department || 'Engineering',
      subject: item.subject || 'Technical Core'
    };

    // If matching ID found in static interviewQuestions, take model details if not present
    const staticMatch = interviewQuestions.find(q => q.id === item.questionId);
    if (staticMatch) {
      if (!item.modelAnswer) questionObj.modelAnswer = staticMatch.modelAnswer;
      if (!item.requiredKeywords) questionObj.requiredKeywords = staticMatch.requiredKeywords;
      if (!item.expectedKeypoints) questionObj.expectedKeypoints = staticMatch.expectedKeypoints;
    }

    const rawText = (item.answerText || '').trim();
    const cleanLower = rawText.toLowerCase();

    // 1. Detect silence / empty / trivial non-answer
    const isSilenceOrEmpty = !rawText || 
      rawText.length < 5 || 
      ['candidate did not complete response', 'skip', 'skipped', 'no answer', 'idk', "i don't know", 'nothing', 'pass', 'blank'].includes(cleanLower);

    if (isSilenceOrEmpty) {
      incorrectCount++;
      missingTopicSet.add(questionObj.subject);
      (questionObj.expectedKeypoints || []).slice(0, 2).forEach(kp => missingTopicSet.add(kp));

      return {
        questionNumber: index + 1,
        question: questionObj.questionText,
        userAnswer: rawText || '(No answer provided)',
        correctAnswer: questionObj.modelAnswer,
        result: 'Incorrect',
        explanation: questionObj.explanation,
        feedback: `No substantive response or explanation was detected for this prompt. Review the correct answer and governing explanation below to master this concept. Tip: ${questionObj.improvementTip}`,
        score: 0,
        department: questionObj.department,
        subject: questionObj.subject
      };
    }

    // 2. Answer was given - perform semantic keyword and rubric analysis
    const words = cleanLower.split(/\W+/).filter(w => w.length > 2);
    const wordCount = words.length;

    // Check keyword hits
    const matchedKeywords = [];
    const missingKeywords = [];
    (questionObj.requiredKeywords || []).forEach(kw => {
      if (cleanLower.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordRatio = (questionObj.requiredKeywords && questionObj.requiredKeywords.length > 0)
      ? matchedKeywords.length / questionObj.requiredKeywords.length
      : 0.5;

    // Check keypoints coverage
    const coveredKeypoints = [];
    const missingKeypoints = [];
    (questionObj.expectedKeypoints || []).forEach(kp => {
      const kpKeywords = kp.toLowerCase().split(/\W+/).filter(w => w.length > 4);
      const matchesInKp = kpKeywords.filter(k => cleanLower.includes(k));
      const kpCoverage = kpKeywords.length > 0 ? matchesInKp.length / kpKeywords.length : 0;
      if (kpCoverage >= 0.3) {
        coveredKeypoints.push(kp);
      } else {
        missingKeypoints.push(kp);
      }
    });

    // Score calculation:
    // Keyword coverage: up to 50 points
    const keywordScore = Math.min(50, Math.round(keywordRatio * 50));
    
    // Keypoints conceptual coverage: up to 35 points
    const keypointScore = (questionObj.expectedKeypoints && questionObj.expectedKeypoints.length > 0)
      ? Math.round((coveredKeypoints.length / questionObj.expectedKeypoints.length) * 35)
      : 20;

    // Depth & elaboration score: up to 15 points
    let depthScore = 0;
    if (wordCount >= 45) depthScore = 15;
    else if (wordCount >= 25) depthScore = 10;
    else if (wordCount >= 12) depthScore = 6;
    else depthScore = 2;

    // Combine raw score (bounded 15 - 98)
    let questionScore = Math.max(15, Math.min(98, keywordScore + keypointScore + depthScore));

    // Classify into exact Result: Correct / Partially Correct / Incorrect
    let result = 'Incorrect';
    if (questionScore >= 75) {
      result = 'Correct';
      correctCount++;
    } else if (questionScore >= 42) {
      result = 'Partially Correct';
      partiallyCorrectCount++;
      missingKeywords.slice(0, 2).forEach(kw => missingTopicSet.add(kw));
    } else {
      result = 'Incorrect';
      incorrectCount++;
      missingKeywords.slice(0, 3).forEach(kw => missingTopicSet.add(kw));
      missingTopicSet.add(questionObj.subject);
    }

    // Specific constructive feedback on how user's answer can be improved
    let feedback = '';
    if (result === 'Correct') {
      feedback = `Strong technical articulation! You accurately conveyed the core principles and integrated domain-specific concepts (${matchedKeywords.slice(0, 4).join(', ')}). To excel further: ${questionObj.improvementTip}`;
    } else if (result === 'Partially Correct') {
      const missingHint = missingKeywords.length > 0 ? `Key terminology omitted: ${missingKeywords.slice(0, 3).join(', ')}. ` : '';
      feedback = `Good conceptual foundation, but your answer lacked full technical depth. ${missingHint}How to improve: ${questionObj.improvementTip}`;
    } else {
      const missingHint = missingKeywords.length > 0 ? `Essential terms not addressed: ${missingKeywords.slice(0, 4).join(', ')}. ` : '';
      feedback = `Your answer was too brief or missed the primary governing mechanisms of this subject. ${missingHint}How to improve: ${questionObj.improvementTip}`;
    }

    totalScoreSum += questionScore;

    return {
      questionNumber: index + 1,
      question: questionObj.questionText,
      userAnswer: rawText,
      correctAnswer: questionObj.modelAnswer,
      result, // 'Correct' | 'Partially Correct' | 'Incorrect'
      explanation: questionObj.explanation,
      feedback,
      score: questionScore,
      department: questionObj.department,
      subject: questionObj.subject
    };
  });

  // Calculate overall metrics
  const totalQuestions = evaluatedTranscript.length || 1;
  const overallScore = Math.round(totalScoreSum / totalQuestions);

  // Performance feedback summary
  let performanceFeedback = '';
  if (overallScore >= 80) {
    performanceFeedback = `Outstanding performance! You demonstrated rigorous domain knowledge across ${correctCount} of ${totalQuestions} questions with clear conceptual grasp and relevant terminology.`;
  } else if (overallScore >= 60) {
    performanceFeedback = `Solid foundational understanding demonstrated with ${correctCount} correct and ${partiallyCorrectCount} partially correct answers. Focus on expanding technical depth and incorporating precise analytical formulations.`;
  } else if (overallScore >= 35) {
    performanceFeedback = `Developing competency. Several key engineering principles were missing or left incomplete (${incorrectCount} incorrect/unanswered questions). Review the recommended topics and detailed model explanations.`;
  } else {
    performanceFeedback = `Sub-threshold score. Most responses were missing or brief (${incorrectCount} of ${totalQuestions} questions incomplete). Study the benchmark model answers and retake this subject drill.`;
  }

  // Recommended topics for improvement
  const recommendedTopics = Array.from(missingTopicSet).filter(t => t && t.length > 3).slice(0, 5);
  if (recommendedTopics.length === 0) {
    recommendedTopics.push('Advanced dynamic modeling', 'System boundary tradeoffs', 'Real-world industrial telemetry');
  }

  // Sub-scores
  const technicalKnowledge = Math.min(98, Math.max(0, Math.round(overallScore * 1.02)));
  const answerRelevance = Math.min(98, Math.max(0, Math.round(overallScore * 0.98)));
  const communication = Math.min(98, Math.max(0, Math.round(overallScore * 0.95)));
  const fluency = Math.min(98, Math.max(0, Math.round(overallScore * 0.92)));
  const completeness = Math.round(((correctCount + partiallyCorrectCount) / totalQuestions) * 100);

  return {
    id: `rpt_${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    role: submittedAnswers[0]?.subject ? `${submittedAnswers[0].subject} Specialist` : 'Engineering Technical Assessment',
    department: submittedAnswers[0]?.department || 'Engineering',
    subject: submittedAnswers[0]?.subject || 'Core Engineering',
    interviewType: type,
    overallScore,
    durationMinutes,
    totalQuestions,
    correctCount,
    partiallyCorrectCount,
    incorrectCount,
    performanceFeedback,
    recommendedTopics,
    metrics: {
      technicalKnowledge,
      answerRelevance,
      communication,
      fluency,
      completeness
    },
    transcript: evaluatedTranscript
  };
}
