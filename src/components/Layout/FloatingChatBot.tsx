import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot,
  User
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Dr. AI Assistant. How can I help you today? 🩺',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const botResponses = [
    "Tell me your symptoms and I'll help you find the right specialist.",
    "Would you prefer a morning or evening appointment?",
    "I recommend seeing a cardiologist for your symptoms. Shall I book an appointment?",
    "Based on your condition, Dr. Sarah Johnson would be perfect. She's available this week.",
    "I've found 3 specialists near you. Would you like to see their profiles?",
    "Your symptoms suggest you should see a doctor within 24 hours. Shall I book an urgent consultation?"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 z-50 shadow-glow animate-fade-in">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="gradient-hero text-primary-foreground p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dr. AI Assistant</h3>
                    <p className="text-xs opacity-90">Medical Chatbot</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-secondary-foreground" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-secondary rounded-full">
                      <Bot className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="gradient-accent text-accent-foreground hover:shadow-accent"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-hero shadow-glow hover:shadow-accent animate-pulse-glow z-40"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageSquare className="h-6 w-6 text-primary-foreground animate-bounce" />
        )}
      </Button>
    </>
  );
};

export default FloatingChatBot;