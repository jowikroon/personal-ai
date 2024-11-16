import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Message } from './Chat/Message';
import { TypingIndicator } from './Chat/TypingIndicator';
import { ChatInput } from './Chat/ChatInput';

export const Chat: React.FC = () => {
  const { messages, addMessage } = useStore();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage = {
      id: crypto.randomUUID(),
      content,
      role: 'user' as const,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: crypto.randomUUID(),
        content: `I understand your message: "${content}". How can I help you further?

\`\`\`javascript
// Here's an example code snippet
const example = () => {
  console.log("Hello, World!");
};
\`\`\``,
        role: 'assistant' as const,
        timestamp: new Date(),
      };

      addMessage(aiMessage);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};