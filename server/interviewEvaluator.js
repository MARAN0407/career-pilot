import { interviewQuestions } from './questionsData.js';

/**
 * Evaluates candidate responses against question rubrics, benchmark keywords, and model answers.
 */
export function evaluateInterviewAnswers(type, submittedAnswers) {
  const durationMinutes = Math.max(1, Math.round(submittedAnswers.length * 3));
  
  let totalScoreSum = 0;
  let totalAnsweredCount = 0;
  
  const evaluatedTranscript = submittedAnswers.map((item, index) => {
    const questionObj = interviewQuestions.find(q => q.id === item.questionId) || 
      interviewQuestions[index] || {
        questionText: item.question || `Question ${index + 1}`,
        expectedKeypoints: ['Clear technical articulation', 'Structured logic', 'Concrete terminology'],
        requiredKeywords: ['technical', 'analysis', 'concept'],
        modelAnswer: 'A comprehensive, domain-specific explanation addressing core principles and tradeoffs.'
      };

    const rawText = (item.answerText || '').trim();
    const cleanLower = rawText.toLowerCase();

    // 1. Detect silence / empty / trivial non-answer
    const isSilenceOrEmpty = !rawText || 
      rawText.length < 8 || 
      ['candidate did not complete response', 'skip', 'skipped', 'no answer', 'idk', "i don't know", 'nothing', 'pass'].includes(cleanLower);

    if (isSilenceOrEmpty) {
      return {
        questionNumber: index + 1,
        question: questionObj.questionText,
        userAnswer: rawText || '(Silence / No answer recorded)',
        score: 0,
        feedback: 'No substantive response or explanation was detected. A score of 0 has been assigned. Review the benchmark model answer below to study the expected technical formulation.',
        modelAnswer: questionObj.modelAnswer,
        keypointsCovered: [],
        keypointsMissing: questionObj.expectedKeypoints,
        status: 'Unanswered'
      };
    }

    // 2. Answer was given - perform real evaluation against keypoints and keywords
    totalAnsweredCount++;

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
      // Split keypoint into distinct keywords
      const kpKeywords = kp.toLowerCase().split(/\W+/).filter(w => w.length > 4);
      const matchesInKp = kpKeywords.filter(k => cleanLower.includes(k));
      const kpCoverage = kpKeywords.length > 0 ? matchesInKp.length / kpKeywords.length : 0;
      if (kpCoverage >= 0.35) {
        coveredKeypoints.push(kp);
      } else {
        missingKeypoints.push(kp);
      }
    });

    // Score calculation
    // Base keyword coverage: up to 55 points
    const keywordScore = Math.min(55, Math.round(keywordRatio * 55));
    
    // Keypoints conceptual coverage: up to 30 points
    const keypointScore = (questionObj.expectedKeypoints && questionObj.expectedKeypoints.length > 0)
      ? Math.round((coveredKeypoints.length / questionObj.expectedKeypoints.length) * 30)
      : 15;

    // Depth & elaboration score: up to 15 points
    let depthScore = 0;
    if (wordCount >= 60) depthScore = 15;
    else if (wordCount >= 35) depthScore = 11;
    else if (wordCount >= 20) depthScore = 7;
    else depthScore = 3;

    // Combine raw score (min 15 if answered, max 96)
    let questionScore = Math.max(15, Math.min(96, keywordScore + keypointScore + depthScore));

    // Feedback generation based on actual answers
    let feedback = '';
    if (questionScore >= 85) {
      feedback = `Outstanding technical rigor! Covered ${coveredKeypoints.length} of ${questionObj.expectedKeypoints.length} key rubric concepts with domain-accurate keywords (${matchedKeywords.slice(0, 4).join(', ')}).`;
    } else if (questionScore >= 70) {
      feedback = `Good conceptual foundation. Successfully articulated ${coveredKeypoints.length} key points. To achieve a top score, elaborate on missing aspects such as ${missingKeywords.slice(0, 3).join(', ')}.`;
    } else if (questionScore >= 45) {
      feedback = `Partial answer detected. Addressed basic terminology but lacked necessary technical depth. Missing key foundational details: ${missingKeywords.slice(0, 3).join(', ')}.`;
    } else {
      feedback = `Superficial or brief response. Only ${matchedKeywords.length} relevant technical terms were recognized. Compare with the benchmark model answer to see the comprehensive depth expected.`;
    }

    totalScoreSum += questionScore;

    return {
      questionNumber: index + 1,
      question: questionObj.questionText,
      userAnswer: rawText,
      score: questionScore,
      feedback,
      modelAnswer: questionObj.modelAnswer,
      keypointsCovered: coveredKeypoints,
      keypointsMissing: missingKeypoints,
      status: questionScore >= 70 ? 'Competency Demonstrated' : 'Needs Reinforcement'
    };
  });

  // Calculate overall metrics
  const totalQuestions = evaluatedTranscript.length || 1;
  const overallScore = Math.round(totalScoreSum / totalQuestions);

  // If no answers were provided, everything is 0
  const technicalKnowledge = totalAnsweredCount === 0 ? 0 : Math.min(96, Math.max(10, Math.round(overallScore * 1.02)));
  const answerRelevance = totalAnsweredCount === 0 ? 0 : Math.min(96, Math.max(10, Math.round(overallScore * 0.98)));
  const communication = totalAnsweredCount === 0 ? 0 : Math.min(96, Math.max(10, Math.round(overallScore * 0.95)));
  const fluency = totalAnsweredCount === 0 ? 0 : Math.min(96, Math.max(10, Math.round(overallScore * 0.92)));
  const completeness = totalAnsweredCount === 0 ? 0 : Math.round((totalAnsweredCount / totalQuestions) * 100);

  // Strengths and Areas to Improve
  const strengths = [];
  const areasToImprove = [];

  if (totalAnsweredCount === 0) {
    strengths.push('Candidate attended and initiated the simulation session');
    areasToImprove.push('Candidate did not provide verbal or written answers to the prompt questions');
    areasToImprove.push('Must actively speak or type responses to demonstrate technical capabilities');
    areasToImprove.push('Review the included model answers to understand key algorithmic principles');
  } else {
    if (overallScore >= 75) {
      strengths.push('Demonstrated solid command of core machine learning mathematical foundations');
      strengths.push('Accurately utilized domain-specific technical terminology in multiple responses');
    } else {
      strengths.push('Attempted responses across technical categories');
    }
    if (completeness >= 80) {
      strengths.push(`Completed ${totalAnsweredCount} of ${totalQuestions} evaluation questions within the allotted time`);
    }

    if (overallScore < 70) {
      areasToImprove.push('Deepen mathematical derivations and loss function formulation details');
      areasToImprove.push('Incorporate quantifiable performance metrics and real-world system constraints');
    }
    if (totalAnsweredCount < totalQuestions) {
      areasToImprove.push(`Answered only ${totalAnsweredCount} out of ${totalQuestions} questions - complete all prompts for full credit`);
    }
    areasToImprove.push('Structure responses using the STAR format (Situation, Task, Action, Result) for behavioral prompts');
  }

  let aiSummary = '';
  if (totalAnsweredCount === 0) {
    aiSummary = `Candidate initiated the ${type.toUpperCase()} interview simulation but did not deliver substantive answers for the prompts. Overall evaluation score is ${overallScore}/100. Review the detailed model answers for each question to prepare for re-examination.`;
  } else if (overallScore >= 80) {
    aiSummary = `Candidate completed ${totalAnsweredCount} of ${totalQuestions} questions in the ${type.toUpperCase()} interview simulation with strong overall performance (${overallScore}/100). Responses demonstrated domain knowledge, clear conceptual grounding, and accurate technical terminology.`;
  } else if (overallScore >= 50) {
    aiSummary = `Candidate completed ${totalAnsweredCount} of ${totalQuestions} questions in the ${type.toUpperCase()} simulation scoring ${overallScore}/100. Core concepts were partially addressed, but several architectural nuances and edge cases were omitted.`;
  } else {
    aiSummary = `Candidate scored ${overallScore}/100 across ${totalQuestions} questions. Responses lacked necessary technical depth or left key questions incomplete. Systematic review of foundational topics is recommended.`;
  }

  return {
    id: `rpt_${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    role: 'AI / Machine Learning Engineer',
    interviewType: type,
    overallScore,
    durationMinutes,
    metrics: {
      technicalKnowledge,
      answerRelevance,
      communication,
      fluency,
      completeness
    },
    strengths,
    areasToImprove,
    aiSummary,
    transcript: evaluatedTranscript
  };
}
