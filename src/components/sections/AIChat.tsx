'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function AIChat(): JSX.Element {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hey! I'm Koushik's AI assistant. Ask me anything about his projects, skills, or experience!"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages
                })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again!'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] shadow-lg shadow-[#00D9FF]/50 flex items-center justify-center text-2xl z-40 hover:shadow-xl"
            >
                💬
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-96 h-[600px] rounded-2xl bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 border-2 border-[#00D9FF]/50 backdrop-blur-xl shadow-2xl z-40 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#0F52BA] to-[#7C3AED] p-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold">Koushik's AI Assistant</h3>
                                <p className="text-xs text-[#00D9FF]">Ask me anything!</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-[#00D9FF] transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-3 rounded-lg ${
                                            msg.role === 'user'
                                                ? 'bg-[#00D9FF] text-[#0A0E27] font-medium'
                                                : 'bg-[#0F52BA]/40 text-[#F0F4FF] border border-[#00D9FF]/30'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    className="text-[#00D9FF] text-sm flex items-center gap-2"
                                >
                                    <span>⚙️ Thinking...</span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-[#00D9FF]/30 p-4 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about projects..."
                                className="flex-1 bg-[#0F52BA]/20 border border-[#00D9FF]/30 rounded-lg px-3 py-2 text-[#F0F4FF] placeholder-[#F0F4FF]/40 outline-none focus:border-[#00D9FF] transition"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading}
                                className="bg-[#00D9FF] text-[#0A0E27] px-4 py-2 rounded-lg font-bold hover:bg-[#7C3AED] transition disabled:opacity-50"
                            >
                                📤
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
