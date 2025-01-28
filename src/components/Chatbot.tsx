import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MinusCircle, Maximize2, Bot, Trash2 } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Extended FAQ database with more comprehensive answers
const FAQ_DATABASE = [
  {
    patterns: [
      'what is this',
      'what does this do',
      'what is this website',
      'what is this application',
      'what is purpose of this website'
    ],
    response: "This is an advanced Breast Cancer Detection System that utilizes machine learning algorithms to analyze tumor characteristics and predict whether they are malignant or benign. Our system helps in early detection and diagnosis of breast cancer by processing various tumor measurements and providing quick, accurate predictions to assist healthcare professionals."
  },
  {
    patterns: [
      'how accurate is this',
      'what is accuracy',
      'how reliable is this model',
      'trust results',
      'how good is this model'
    ],
    response: "Our model achieves 95.9% accuracy on test data, with high sensitivity (97.2%) and specificity (94.8%). However, these predictions should be used as a screening tool only and not as a final diagnosis. The system has been validated using the Wisconsin Breast Cancer Dataset and cross-validated using 5-fold validation. Always consult healthcare professionals for proper medical advice."
  },
  {
    patterns: [
      'how to use it',
      'how does it work',
      'how to get prediction',
      'how tomake prediction'
    ],
    response: "To use the system: 1) Click the 'Start Prediction' button on the homepage, 2) Enter the tumor measurements provided by your healthcare provider, 3) Submit the form to receive a prediction. The system analyzes 30 different features including radius, texture, perimeter, area, smoothness, compactness, concavity, symmetry, and fractal dimension to make its prediction."
  },
  {
    patterns: [
      'what data needed',
      'what is required information',
      'what measurements needed',
      'what should i input',
      'what values to enter'
    ],
    response: "The system requires 30 different measurements of the tumor, divided into three categories: 1) Mean Values: including radius, texture, perimeter, area, smoothness, etc., 2) Standard Error Values: showing the variability of each measurement, 3) Worst Values: representing the most extreme values observed. These measurements are typically obtained through Fine Needle Aspiration (FNA) and imaging procedures."
  },
  {
    patterns: [
      'difference between benign malignant',
      'what is benign',
      'what is malignant',
      'benign vs malignant',
      'types of tumors'
    ],
    response: "Benign tumors are non-cancerous growths that: 1) Don't spread to other parts of the body, 2) Usually grow slowly, 3) Don't invade nearby tissues, 4) Often have clear boundaries. Malignant tumors are cancerous and: 1) Can spread to other parts of the body, 2) Grow more rapidly, 3) Can invade nearby tissues, 4) May have irregular boundaries. Early detection and proper diagnosis are crucial for effective treatment."
  },
  {
    patterns: [
      'what are treatment options',
      'how to treat breast cancer',
      'cancer treatment',
      'what are therapy options',
      'how to treat this'
    ],
    response: "Common breast cancer treatments include: 1) Surgery (lumpectomy or mastectomy), 2) Radiation therapy, 3) Chemotherapy, 4) Hormone therapy, 5) Targeted therapy. The specific treatment plan depends on factors like cancer stage, type, and patient health. Always consult with healthcare professionals to determine the most appropriate treatment approach."
  },
  {
    patterns: [
      'what are risk factors',
      'what causes breast cancer',
      'how to prevent breast cancer',
      'how to reduce risk'
    ],
    response: "Key breast cancer risk factors include: 1) Age (risk increases with age), 2) Family history, 3) Genetic mutations (BRCA1/BRCA2), 4) Dense breast tissue, 5) Previous radiation exposure. Prevention strategies include: 1) Regular screening, 2) Maintaining a healthy weight, 3) Regular exercise, 4) Limiting alcohol consumption, 5) Breastfeeding if possible."
  },
  {
    patterns: [
      'how to do screening',
      'what are early detection',
      'what is mammogram',
      'what is breast exam'
    ],
    response: "Recommended screening methods include: 1) Monthly breast self-exams, 2) Clinical breast exams by healthcare providers, 3) Mammograms (recommended annually for women 40+), 4) Additional imaging (ultrasound/MRI) for high-risk individuals. Early detection significantly improves treatment outcomes."
  },
  {
    patterns: [
      'what are symptoms',
      'what arewarning signs',
      'what are signs of cancer',
      'what to look for',
      'what areearly signs'
    ],
    response: "Common breast cancer symptoms include: 1) New lump in breast or underarm, 2) Thickening or swelling of breast tissue, 3) Skin irritation or dimpling, 4) Breast or nipple pain, 5) Nipple discharge other than breast milk, 6) Changes in breast size or shape, 7) Redness or flaky skin in nipple area. If you notice any of these changes, consult a healthcare provider promptly."
  },
  {
    patterns: [
      'how self examination',
      'how to self check',
      'how to check at home',
      'how to breast self exam',
      'how to examine'
    ],
    response: "Steps for breast self-examination: 1) Look at breasts in mirror with arms at sides, then raised, 2) Check for visible changes in size, shape, skin texture, or nipple position, 3) Lie down and use finger pads to examine breast tissue in circular motions, 4) Feel all breast tissue from collarbone to below breast, and from armpit to cleavage, 5) Repeat examination while standing or showering. Perform monthly, preferably at the same time of your menstrual cycle."
  },
  {
    patterns: [
      'what stages for breast cancer',
      'what are cancer stages',
      'what is progression',
      'how advanced is breast cancer',
      'what are different staging'
    ],
    response: "Breast cancer stages range from 0 to IV: Stage 0 (non-invasive/DCIS), Stage I (early-stage invasive), Stage II (cancer is growing but still contained), Stage III (locally advanced), Stage IV (metastatic - spread to other parts of body). Each stage considers: tumor size, lymph node involvement, and whether cancer has spread. Treatment plans are tailored to specific stage and cancer type."
  },
  {
    patterns: [
      'what is support groups',
      'what is emotional support',
      'what is counseling',
      'what is mental health',
      'how to cope with diagnosis'
    ],
    response: "Support resources include: 1) Professional counseling services, 2) Local support groups for patients and families, 3) Online communities and forums, 4) Cancer survivor networks, 5) Hospital-based support programs, 6) Financial assistance programs, 7) Educational workshops and seminars. Remember, seeking emotional support is as important as medical treatment for overall well-being."
  },
  {
    patterns: [
      'what is genetic testing',
      'what is brca test',
      'what is hereditary',
      'whtat is family history test',
      'what is genetic risk'
    ],
    response: "Genetic testing can identify mutations like BRCA1/BRCA2 that increase cancer risk. Consider testing if you have: 1) Close relatives with breast/ovarian cancer, 2) Family history of cancer at young age, 3) Male relatives with breast cancer, 4) Ashkenazi Jewish ancestry. Testing involves: blood/saliva sample analysis, genetic counseling sessions, and comprehensive risk assessment. Results help inform prevention strategies and screening schedules."
  },
  {
    patterns: [
      'what is diet',
      'what is nutrition',
      'what are food recommendations',
      'what is eating habits',
      'what are dietary guidelines'
    ],
    response: "Recommended dietary guidelines include: 1) Maintain a balanced diet rich in fruits, vegetables, and whole grains, 2) Limit alcohol consumption, 3) Include foods high in antioxidants and omega-3 fatty acids, 4) Reduce processed meat and saturated fat intake, 5) Stay hydrated with water, 6) Consider vitamin D and calcium supplements if recommended by doctor. A healthy diet can help reduce cancer risk and support overall health."
  },
  {
    patterns: [
      'what is reconstruction',
      'what is breast reconstruction',
      'what happen after surgery',
      'what are implants',
      'what is restoration options'
    ],
    response: "Breast reconstruction options include: 1) Immediate reconstruction during cancer surgery, 2) Delayed reconstruction after recovery, 3) Implant-based reconstruction, 4) Autologous reconstruction using own tissue, 5) Nipple-sparing procedures when possible. Factors affecting choice: cancer treatment plan, body type, personal preferences, and recovery considerations. Discuss options with plastic surgeon and oncology team."
  },
  {
    patterns: [
      'what is exercise',
      'what is physical activity',
      'what is workout',
      'how to staying active',
      'how to do fitness during treatment'
    ],
    response: "Exercise guidelines during treatment: 1) Start slowly and progress gradually, 2) Aim for 150 minutes of moderate activity weekly when possible, 3) Include flexibility and strength training exercises, 4) Listen to your body and rest when needed, 5) Consider professional guidance from physical therapist, 6) Focus on activities you enjoy, 7) Modify exercises based on treatment side effects. Regular activity can help manage fatigue and improve recovery."
  },
  {
    patterns: [
      'what are side effects',
      'what are treatment effects',
      'what is complications',
      'what are after treatment',
      'how to manage symptoms'
    ],
    response: "Common treatment side effects include: 1) Fatigue and weakness, 2) Nausea and appetite changes, 3) Hair loss during chemotherapy, 4) Skin changes from radiation, 5) Lymphedema after surgery, 6) Memory and concentration changes ('chemo brain'), 7) Mood changes. Management strategies: medications for specific symptoms, rest, proper nutrition, gentle exercise, and support from healthcare team."
  },
  {
    patterns: [
      'what is research',
      'what are new treatments',
      'what is clinical trials',
      'what is latest developments',
      'what is breakthrough'
    ],
    response: "Current breast cancer research focuses on: 1) Targeted therapies based on genetic profiles, 2) Immunotherapy approaches, 3) New drug combinations, 4) Less invasive surgical techniques, 5) Improved radiation methods, 6) Prevention strategies, 7) Quality of life studies. Clinical trials offer access to new treatments - discuss participation options with your healthcare team."
  },
  {
    patterns: [
      'what is cost',
      'how expensive is this',
      'what is insurance',
      'what is financial help',
      'what are payment options'
    ],
    response: "Financial resources include: 1) Insurance coverage review and assistance, 2) Hospital financial counseling services, 3) Government assistance programs, 4) Non-profit organization grants, 5) Prescription assistance programs, 6) Transportation and lodging support, 7) Clinical trial participation. Many hospitals have financial navigators to help explore options and create payment plans."
  },
  {
    patterns: [
      'how to manage work with this',
      'how to manage job with this',
      'how to manage employment with this',
      'how to manage career',
      'how to work during treatment'
    ],
    response: "Managing work during treatment: 1) Know your legal rights (FMLA, ADA protections), 2) Discuss flexible scheduling with employer, 3) Consider gradual return to work, 4) Communicate with HR about benefits and accommodations, 5) Plan around treatment schedule, 6) Set realistic workload expectations, 7) Consider disability benefits if needed. Many employers offer support programs for employees during treatment."
  }
];

const findBestMatch = (input: string): string => {
  const normalizedInput = input.toLowerCase().trim();
  
  // First try exact matches
  for (const faq of FAQ_DATABASE) {
    if (faq.patterns.includes(normalizedInput)) {
      return faq.response;
    }
  }

  // Then try partial matches
  let bestMatch = {
    response: '',
    score: 0
  };

  for (const faq of FAQ_DATABASE) {
    for (const pattern of faq.patterns) {
      const words = pattern.split(' ');
      const inputWords = normalizedInput.split(' ');
      
      let matchScore = 0;
      for (const word of inputWords) {
        if (words.includes(word)) {
          matchScore++;
        }
      }
      
      if (matchScore > bestMatch.score) {
        bestMatch = {
          response: faq.response,
          score: matchScore
        };
      }
    }
  }

  return bestMatch.score > 0 
    ? bestMatch.response 
    : "I apologize, but I don't have specific information about that. Please ask about breast cancer detection, risk factors, treatment options, or screening methods.";
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant for breast cancer detection. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showClearNotification, setShowClearNotification] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate a brief delay for more natural interaction
    setTimeout(() => {
      const response = findBestMatch(input);
      const botResponse: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  const handleMinimize = () => setIsMinimized(!isMinimized);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  
   // Clear chat function
   const handleClearChat = () => {
    setShowClearNotification(true);
    
    // Show notification for 2.5 seconds
    setTimeout(() => {
      setShowClearNotification(false);
      setMessages([
        {
          text: "Hello! I'm your AI assistant for breast cancer detection. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }, 2500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-4 right-4 bg-[#5a67d8] text-white p-4 rounded-full shadow-lg hover:bg-[#4c51bf] transition-all duration-300 hover:scale-110 flex items-center space-x-2 z-50"
      >
        <Bot className="h-6 w-6" />
        <span className="hidden sm:inline">Ask AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 flex items-end justify-end">
      <div 
        className={`
          w-full sm:w-96 
          bg-white 
          rounded-lg 
          shadow-xl 
          transition-all 
          duration-300 
          ${isMinimized ? 'h-14' : 'h-[calc(100vh-2rem)]'} 
          max-h-[80vh]
          relative
          flex
          flex-col
        `}
      >
        {/* Clear Notification */}
        {showClearNotification && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in-down">
              Clearing chat history...
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-[#5a67d8]" />
            <h3 className="font-semibold text-gray-700">AI Health Assistant</h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleClearChat}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded hover:bg-gray-100"
              title="Clear chat"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleMinimize}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded hover:bg-gray-100"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="h-5 w-5" /> : <MinusCircle className="h-5 w-5" />}
            </button>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded hover:bg-gray-100"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.isUser 
                        ? 'bg-[#5a67d8] text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="text-sm">AI is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about breast cancer..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a67d8] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-[#5a67d8] text-white p-2 rounded-lg hover:bg-[#4c51bf] transition-colors disabled:opacity-50"
                  disabled={isTyping}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;