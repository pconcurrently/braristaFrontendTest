let messageCounter = 0;
let chatHistory = [];
let currentQuiz = null;

const quizQuestions = [
  {
    question: "What's the most important factor in a well-fitting bra?",
    options: [
      "The band fits snugly",
      "The straps are tight",
      "The color matches your outfit",
      "The price is right"
    ],
    correct: 0
  },
  {
    question: "How should the band of your bra sit?",
    options: [
      "Above your breasts",
      "Parallel to the floor",
      "Loose and comfortable",
      "As tight as possible"
    ],
    correct: 1
  },
  {
    question: "When should you replace your bra?",
    options: [
      "Every 6-8 months with regular wear",
      "Once a year",
      "When it starts looking old",
      "Never if it's comfortable"
    ],
    correct: 0
  }
];

export const sendMessage = async (message: any) => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));
  
  messageCounter++;
  
  if (message.toLowerCase() === 'start quiz') {
    currentQuiz = {
      currentQuestion: 0,
      score: 0,
      completed: false
    };
    return {
      id: messageCounter,
      text: "Let's test your bra fitting knowledge!\n\n" + formatQuizQuestion(0),
      timestamp: new Date().getTime(),
      sender: 'bot',
      type: 'quiz' 
    };
  }

  if (currentQuiz && !currentQuiz.completed && /^[0-9]$/.test(message)) {
    const answer = parseInt(message) - 1;
    const question = quizQuestions[currentQuiz.currentQuestion];
    
    if (answer === question.correct) {
      currentQuiz.score++;
    }
    
    currentQuiz.currentQuestion++;
    
    if (currentQuiz.currentQuestion >= quizQuestions.length) {
      currentQuiz.completed = true;
      const response = {
        id: messageCounter,
        text: `Quiz completed! Your score: ${currentQuiz.score}/${quizQuestions.length}`,
        timestamp: new Date().getTime(),
        sender: 'bot',
        type: 'quiz-result'
      };
      currentQuiz = null;
      return response;
    }
    
    return {
      id: messageCounter,
      text: formatQuizQuestion(currentQuiz.currentQuestion),
      timestamp: new Date().getTime(),
      sender: 'bot',
      type: 'quiz'
    };
  }
  
  const response = {
    id: messageCounter,
    text: getBotResponse(message),
    timestamp: new Date().getTime(),
    sender: 'bot' as string,
    type: 'message'
  };
  
  chatHistory.push(response);
  return response;
};

export const getHistory = () => chatHistory;

function getBotResponse(message) {
  if (message.toLowerCase().includes('quiz')) {
    return "Would you like to test your knowledge? Type 'start quiz' to begin!";
  }

  if (message.toLowerCase().includes('hello')) {
    return 'Hi there! How can I help you with bra fitting today?';
  }
  
  if (message.toLowerCase().includes('size')) {
    const sizes = ['32B', '34C', '36D'];
    return `Based on what you've told me, I would recommend a ${sizes[Math.floor(Math.random() * 3)]}. Would you like to know how to measure yourself properly?`;
  }
  
  if (message.toLowerCase().includes('measure')) {
    return 'To measure yourself: 1. Wear an unlined bra 2. Measure around your ribcage 3. Measure around the fullest part of your bust. Need more details?';
  }
  
  return message.length > 20 
    ? message.includes('?') 
      ? "That's a great question! Let me help you with that."
      : "I understand. Tell me more about what you're looking for."
    : "I'm here to help! Ask me anything about bra fitting.";
}

function formatQuizQuestion(index) {
  const question = quizQuestions[index];
  return `${question.question}\n\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`;
}

export class ChatUtils {
  static formatTimestamp(timestamp: number) {
    const moment = require('moment');
    return moment(timestamp).fromNow();
  }
  
  static isBot(sender: string) {
    return sender === 'bot';
  }

  static isQuizActive() {
    return currentQuiz !== null;
  }
} 