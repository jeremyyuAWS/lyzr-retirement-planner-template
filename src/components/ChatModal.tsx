import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, User, Play, RefreshCw, Settings, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sleep } from '@/lib/utils';

// Import chat flows
import chatFlows from '@/data/chat_flows.json';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentType?: string;
}

const ChatModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string>('email');
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Active agent name mapping
  const agentNames: Record<string, string> = {
    email: 'Email Outreach Agent',
    sms: 'SMS Outreach Agent',
    linkedin: 'LinkedIn Outreach Agent',
    voice: 'Voice Agent',
    dashboard: 'Analytics Agent'
  };
  
  // Ensure messages scroll into view
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add a greeting message when the modal first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      const initialMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'agent',
        content: `Hello! I'm the ${agentNames[activeAgent]}. How can I help you with your webinar outreach today?`,
        timestamp: new Date(),
        agentType: activeAgent
      };
      
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length, activeAgent, agentNames]);

  // Handle tab change
  const handleTabChange = (agentType: string) => {
    setActiveAgent(agentType);
    setMessages([]);
    setAutoPlayEnabled(false);
  };
  
  const sendMessage = () => {
    if (input.trim() === '') return;
    
    // Create new message object
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: input,
      timestamp: new Date()
    };
    
    // Add message to chat
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing time
    setTimeout(() => {
      // Generate a response
      const responseMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        content: generateResponse(input, activeAgent),
        timestamp: new Date(),
        agentType: activeAgent
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Generate a contextual response based on the user input and active agent
  const generateResponse = (userInput: string, agentType: string): string => {
    const userMessage = userInput.toLowerCase();
    
    // Generic responses if nothing specific matches
    let genericResponses = [
      "I understand you're interested in optimizing your webinar outreach. Could you provide more specific details about what you need help with?",
      "That's a great question. In a real implementation, I would analyze your audience data to provide a tailored response.",
      "I'm designed to help you increase webinar registrations through personalized outreach. Let me know what specific aspect you'd like to focus on."
    ];
    
    // Agent-specific responses
    if (agentType === 'email') {
      if (userMessage.includes('subject line') || userMessage.includes('subject lines')) {
        return "For webinar subject lines, I recommend using urgency and value propositions. Our A/B testing shows that 'Last Chance: [Benefit] Webinar (Limited Seats)' outperforms other formats by 23%. Would you like me to generate some examples based on your webinar topic?";
      } else if (userMessage.includes('open rate') || userMessage.includes('click through')) {
        return "Our data shows that for webinar promotions, emails sent on Tuesday or Wednesday mornings (9-11am) have 28% higher open rates. Personalized subject lines improve open rates by an additional 22%, and clear CTAs with contrasting button colors increase click-through rates by 18%.";
      } else if (userMessage.includes('follow up') || userMessage.includes('followup')) {
        return "For webinar follow-ups, I recommend a 3-email sequence: (1) Same day reminder sent 3 hours before, (2) 15-minute reminder, and (3) 'Starting now' notification. For non-responders, a 'Sorry we missed you' email with recording access within 24 hours converts 15% of no-shows into content viewers.";
      }
    } else if (agentType === 'sms') {
      if (userMessage.includes('length') || userMessage.includes('too long')) {
        return "For SMS webinar invitations, keep messages under 160 characters to avoid splitting. Our data shows that SMS messages with 100-120 characters have the highest engagement rate. Include only essential information: webinar title, primary benefit, date/time, and a shortened registration link.";
      } else if (userMessage.includes('timing') || userMessage.includes('when to send')) {
        return "For SMS webinar promotions, optimal sending times are 11:30-12:30 (lunch break) and 5:30-6:30pm (commute time) on weekdays. Avoid early mornings, late evenings, and weekends unless your topic specifically relates to weekend activities. Would you like me to help schedule your campaign?";
      } else if (userMessage.includes('response') || userMessage.includes('reply')) {
        return "For SMS campaigns, we see about 15-20% response rates for webinar invitations. Common responses include 'How do I register?', 'Can't make it, send recording', and 'Please remove me'. I can help set up automated responses to each of these scenarios if you'd like.";
      }
    } else if (agentType === 'linkedin') {
      if (userMessage.includes('inmail') || userMessage.includes('message')) {
        return "LinkedIn InMail for webinar promotion should reference shared connections, groups, or interests. Our data shows that messages mentioning a specific insight from the recipient's profile have 34% higher response rates. Keep InMails under 500 characters with a clear, low-friction CTA like 'Would this topic interest you?'";
      } else if (userMessage.includes('connection request') || userMessage.includes('connect')) {
        return "When sending connection requests before webinar invitations, include a brief personal note (max 300 characters). Mention the specific reason for connecting related to professional interests, not just the webinar. Allow 1-3 days after connection acceptance before sending the webinar invitation for 26% higher conversion rates.";
      } else if (userMessage.includes('posting') || userMessage.includes('content')) {
        return "For promoting webinars on LinkedIn, create 3-4 teaser posts in the 2 weeks prior. Posts containing original data/insights from the upcoming webinar generate 2.8x more engagement than generic announcements. Including presenter LinkedIn handles also improves reach by leveraging their networks.";
      }
    } else if (agentType === 'voice') {
      if (userMessage.includes('script') || userMessage.includes('say')) {
        return "Voice outreach scripts should begin with a pattern interrupt: 'Hi [Name], I'm calling about the [Topic] webinar—is this a good time?' Then provide value: 'We'll be covering [3 key benefits] with [notable presenter].' End with a soft call-to-action: 'Would you like me to text you the registration link?' rather than pushing for immediate registration.";
      } else if (userMessage.includes('voicemail') || userMessage.includes('message')) {
        return "For webinar voicemails, keep messages under 30 seconds. Structure it as: (1) Clear identification, (2) Purpose of webinar with one key benefit, (3) Date and time mention, (4) Call-to-action with mobile-friendly registration method. Our testing shows mentioning scarcity ('limited seats') increases callback rates by 17%.";
      } else if (userMessage.includes('timing') || userMessage.includes('when to call')) {
        return "For B2B webinar voice outreach, Wednesdays and Thursdays between 10-11:30am and 1:30-3:30pm local time yield the highest answer rates. For B2C audiences, 6-7:30pm on Tuesdays and Wednesdays performs best. Avoid Mondays and Fridays when possible as they show 22% and 18% lower conversion rates respectively.";
      }
    } else if (agentType === 'dashboard') {
      if (userMessage.includes('conversion') || userMessage.includes('rates')) {
        return "Average webinar registration conversion rates by channel: Email (direct list): 15-30%, LinkedIn (organic): 2-8%, LinkedIn (paid): 5-12%, SMS (opt-in list): 15-25%, Cold calling: 2-5%. Your current campaign is performing at 22% overall, which is 4.5% above industry average. The Email + SMS combination shows the highest ROI at 28% conversion rate.";
      } else if (userMessage.includes('improve') || userMessage.includes('optimize')) {
        return "Based on your current campaign data, I recommend: (1) Adjust email sending time to 10am instead of 8am for a projected 7% lift, (2) Add social proof elements to LinkedIn messages based on early registrants, (3) Increase SMS character count from 95 to 115 characters to include one additional benefit. These optimizations could yield approximately 12-15% higher conversion rate based on our analysis.";
      } else if (userMessage.includes('report') || userMessage.includes('export')) {
        return "I can generate a comprehensive campaign report with channel-specific metrics, A/B test results, conversion funnels, and ROI calculations. Would you like this as a PDF, interactive dashboard, Google Sheets, or CSV export? The report can also include AI-recommended optimizations for your next campaign based on this data.";
      }
    }
    
    // Return a generic response if no specific match is found
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const startAutomaticDemo = async () => {
    setMessages([]);
    setAutoPlayEnabled(true);
    
    // Find the chat flow for the current agent
    const flow = chatFlows.find(f => f.agent === activeAgent);
    if (!flow) return;
    
    for (const message of flow.messages) {
      // Wait for the specified delay or default to 1000ms
      await sleep(message.delay || 1000);
      
      // Add the message to the chat
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: message.sender,
        content: message.content,
        timestamp: new Date(),
        agentType: message.sender === 'agent' ? activeAgent : undefined
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // If agent is responding, simulate typing
      if (message.sender === 'agent') {
        setIsTyping(true);
        await sleep(1500);
        setIsTyping(false);
      }
    }
    
    // Demo completed
    setAutoPlayEnabled(false);
  };

  const resetChat = () => {
    setMessages([]);
    setAutoPlayEnabled(false);
    
    // Add initial greeting
    const initialMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      content: `Hello! I'm the ${agentNames[activeAgent]}. How can I help you with your webinar outreach today?`,
      timestamp: new Date(),
      agentType: activeAgent
    };
    
    setMessages([initialMessage]);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-20 bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      
      {/* Chat modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col h-[600px] max-h-[90vh]">
            {/* Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">{agentNames[activeAgent]}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startAutomaticDemo()}
                  disabled={autoPlayEnabled}
                  className={cn(
                    "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium",
                    autoPlayEnabled 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  )}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Auto Demo
                </button>
                <button
                  onClick={resetChat}
                  className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Agent selection tabs */}
            <div className="px-4 py-2 border-b bg-gray-50 flex overflow-x-auto">
              <button
                onClick={() => handleTabChange('email')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md mr-2 whitespace-nowrap ${
                  activeAgent === 'email'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                Email Agent
              </button>
              <button
                onClick={() => handleTabChange('sms')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md mr-2 whitespace-nowrap ${
                  activeAgent === 'sms'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                SMS Agent
              </button>
              <button
                onClick={() => handleTabChange('linkedin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md mr-2 whitespace-nowrap ${
                  activeAgent === 'linkedin'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                LinkedIn Agent
              </button>
              <button
                onClick={() => handleTabChange('voice')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md mr-2 whitespace-nowrap ${
                  activeAgent === 'voice'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                Voice Agent
              </button>
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md mr-2 whitespace-nowrap ${
                  activeAgent === 'dashboard'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                Analytics Agent
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                      <Bot className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white ml-2'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Sample questions */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {activeAgent === 'email' && (
                  <>
                    <button 
                      onClick={() => setInput("What subject lines work best for webinar emails?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Best subject lines?
                    </button>
                    <button 
                      onClick={() => setInput("How can I increase open rates for our webinar emails?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Increase open rates
                    </button>
                    <button 
                      onClick={() => setInput("What's a good follow-up sequence after inviting?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Follow-up strategy
                    </button>
                  </>
                )}
                
                {activeAgent === 'sms' && (
                  <>
                    <button 
                      onClick={() => setInput("How long should SMS webinar invites be?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Optimal SMS length
                    </button>
                    <button 
                      onClick={() => setInput("When is the best time to send SMS invitations?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Best timing
                    </button>
                    <button 
                      onClick={() => setInput("What response rate should we expect for SMS campaigns?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Expected response rate
                    </button>
                  </>
                )}
                
                {activeAgent === 'linkedin' && (
                  <>
                    <button 
                      onClick={() => setInput("How should I structure LinkedIn InMail for webinar promotion?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      InMail structure
                    </button>
                    <button 
                      onClick={() => setInput("What to include in connection requests before webinar invitation?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Connection requests
                    </button>
                    <button 
                      onClick={() => setInput("How to use content posting alongside direct outreach?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Content strategy
                    </button>
                  </>
                )}
                
                {activeAgent === 'voice' && (
                  <>
                    <button 
                      onClick={() => setInput("What should our cold calling script include for webinars?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Call script elements
                    </button>
                    <button 
                      onClick={() => setInput("How to structure an effective voicemail for webinar promotion?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Voicemail best practices
                    </button>
                    <button 
                      onClick={() => setInput("When is the best time to make webinar invitation calls?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Optimal calling times
                    </button>
                  </>
                )}
                
                {activeAgent === 'dashboard' && (
                  <>
                    <button 
                      onClick={() => setInput("What are average conversion rates for webinar outreach channels?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Average conversion rates
                    </button>
                    <button 
                      onClick={() => setInput("How can we improve our current campaign performance?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Optimization suggestions
                    </button>
                    <button 
                      onClick={() => setInput("Can you generate a campaign performance report?")}
                      className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700"
                    >
                      Generate report
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Input area */}
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isTyping || autoPlayEnabled}
                />
                <button
                  onClick={sendMessage}
                  disabled={input.trim() === '' || isTyping || autoPlayEnabled}
                  className={`px-4 py-2 rounded-md ${
                    input.trim() === '' || isTyping || autoPlayEnabled
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Send
                </button>
              </div>
              
              <div className="mt-3 flex items-start text-xs text-gray-500">
                <Info className="h-3 w-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                <p>
                  This is a simulated AI agent conversation. In a production environment, 
                  the agent would have access to your campaign data, audience information, 
                  and outreach templates.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;