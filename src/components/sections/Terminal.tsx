'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface TerminalLine {
    id: string;
    text: string;
    isCommand: boolean;
    isOutput: boolean;
}

export default function Terminal(): JSX.Element {
    const [lines, setLines] = useState<TerminalLine[]>([
        { id: '1', text: 'Welcome to Interactive Terminal', isCommand: false, isOutput: true },
        { id: '2', text: 'Type "help" to see available commands', isCommand: false, isOutput: true },
    ]);
    const [input, setInput] = useState('');
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: Record<string, string[]> = {
        help: [
            'Available commands:',
            '  help       - Show this help message',
            '  whoami     - About me',
            '  skills     - My technical skills',
            '  projects   - My projects',
            '  contact    - Contact information',
            '  clear      - Clear terminal',
            '  matrix     - Matrix rain effect',
            '  time       - Current time',
            '  date       - Current date',
        ],
        whoami: [
            'I\'m a Full Stack Software Engineer with 6+ years of experience.',
            'Specializing in React, Node.js, TypeScript, and Cloud Architecture.',
            'Passionate about building scalable, user-centric applications.',
        ],
        skills: [
            'Frontend: React, Next.js, TypeScript, Tailwind CSS',
            'Backend: Node.js, Python, PostgreSQL, MongoDB',
            'Cloud: AWS, Docker, Kubernetes',
            'Tools: Git, CI/CD, Agile, Microservices',
        ],
        projects: [
            'Portfolio Website - React, Next.js, TailwindCSS',
            'Energy Management Platform - Micro-frontend architecture',
            'Real-time Collaboration Tool - WebSocket, React',
            'Mobile Repair System - E-commerce & Booking Platform',
        ],
        contact: [
            'Email: your@email.com',
            'GitHub: github.com/yourusername',
            'LinkedIn: linkedin.com/in/yourusername',
            'Phone: +1 (XXX) XXX-XXXX',
        ],
        time: [new Date().toLocaleTimeString()],
        date: [new Date().toLocaleDateString()],
        matrix: [
            '█████░░░░░░░░░░░░░░░░░░░░░░░░░░█████',
            '█████░░░░░░░░░░░░░░░░░░░░░░░░░░█████',
            '█████░░░░░░░░░░░░░░░░░░░░░░░░░░█████',
            '✨ WELCOME TO THE MATRIX ✨',
            '█████░░░░░░░░░░░░░░░░░░░░░░░░░░█████',
            '█████░░░░░░░░░░░░░░░░░░░░░░░░░░█████',
            '█████░░░░░░░░░░░░░░░░░░░░░░░░░░█████',
        ],
    };

    const handleCommand = () => {
        if (!input.trim()) return;

        const command = input.toLowerCase().trim();
        const newId = String(Date.now());

        // Add command to terminal
        const newLines = [...lines];
        newLines.push({
            id: newId,
            text: input,
            isCommand: true,
            isOutput: false,
        });

        // Get output
        const output = commands[command] || [`Command not found: ${command}. Type "help" for available commands.`];

        // Add output lines
        output.forEach((line, idx) => {
            newLines.push({
                id: `${newId}-${idx}`,
                text: line,
                isCommand: false,
                isOutput: true,
            });
        });

        setLines(newLines);
        setInput('');

        // Scroll to bottom ONLY (don't scroll page)
        setTimeout(() => {
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }, 0);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand();
        }
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="terminal">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#7C3AED]">
                        🖥️ Interactive Terminal
                    </h2>
                    <p className="text-[#F0F4FF]/60 text-lg">Type commands to learn more about me</p>
                </motion.div>

                {/* Terminal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full rounded-lg overflow-hidden border border-[#00D9FF]/30 bg-[#0F0F23] shadow-2xl"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0E27] border-b border-[#00D9FF]/20">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-4 text-[#00D9FF] text-sm">bash ~ terminal.sh</span>
                    </div>

                    {/* Terminal Output */}
                    <div
                        ref={terminalRef}
                        className="h-96 overflow-y-auto p-6 font-mono text-sm"
                        style={{
                            scrollBehavior: 'smooth',
                            // Don't auto-scroll page
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {lines.map((line, idx) => (
                            <motion.div
                                key={line.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`mb-2 ${
                                    line.isCommand
                                        ? 'text-[#00D9FF] font-bold'
                                        : 'text-[#7C3AED]'
                                }`}
                            >
                                {line.isCommand ? '❯ ' : '• '}
                                <span>{line.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Terminal Input */}
                    <div className="px-6 py-4 bg-[#0A0E27] border-t border-[#00D9FF]/20 flex items-center gap-2">
                        <span className="text-[#00D9FF]">❯</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter command... (try 'help')"
                            className="flex-1 bg-transparent text-[#00D9FF] outline-none placeholder-[#00D9FF]/40 font-mono"
                            // Don't auto-focus - this was causing the scroll issue!
                            autoFocus={false}
                        />
                    </div>
                </motion.div>

                {/* Command Examples */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {['help', 'whoami', 'skills', 'projects'].map((cmd) => (
                        <button
                            key={cmd}
                            onClick={() => {
                                setInput(cmd);
                                // Trigger command after state updates
                                setTimeout(() => {
                                    const newLines = [...lines];
                                    newLines.push({
                                        id: String(Date.now()),
                                        text: cmd,
                                        isCommand: true,
                                        isOutput: false,
                                    });
                                    const output = commands[cmd] || ['Unknown command'];
                                    output.forEach((line, idx) => {
                                        newLines.push({
                                            id: `${Date.now()}-${idx}`,
                                            text: line,
                                            isCommand: false,
                                            isOutput: true,
                                        });
                                    });
                                    setLines(newLines);
                                    setInput('');
                                }, 0);
                            }}
                            className="px-4 py-2 rounded border border-[#00D9FF]/50 text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-all text-sm font-mono"
                        >
                            $ {cmd}
                        </button>
                    ))}
                </motion.div>

                {/* Info Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-8 text-[#F0F4FF]/50 text-sm"
                >
                    <p>💡 Try commands: help, whoami, skills, projects, contact, time, date, matrix</p>
                </motion.div>
            </div>
        </section>
    );
}
