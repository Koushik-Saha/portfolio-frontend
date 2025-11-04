'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface TerminalCommand {
    input: string;
    output: string;
}

export default function Terminal(): JSX.Element {
    const [commands, setCommands] = useState<TerminalCommand[]>([
        { input: '', output: 'Welcome to Koushik\'s Portfolio Terminal\nType "help" for commands' }
    ]);
    const [input, setInput] = useState('');
    const terminalRef = useRef<HTMLDivElement>(null);

    const executeCommand = (cmd: string) => {
        let output = '';

        switch (cmd.toLowerCase()) {
            case 'help':
                output = `Available commands:
  whoami        - Who is Koushik?
  projects      - List all projects
  skills        - Show technical skills
  experience    - Work experience
  contact       - Contact information
  clear         - Clear terminal
  hack          - Activate matrix mode 🔥`;
                break;
            case 'whoami':
                output = 'Full Stack Engineer | System Designer | 6+ years experience | 1M+ users served';
                break;
            case 'projects':
                output = `1. PWA Powerley (1M+ users, 99.9% uptime)
2. Micro-Frontend Platform (30% cost reduction)
3. React SVG Editor ($500K contracts)
4. E-Commerce Platform ($2M+ transactions)`;
                break;
            case 'skills':
                output = `Frontend: React (95%), TypeScript (90%), Next.js (91%)
Backend: Node.js (92%), GraphQL (88%), MongoDB (90%)
DevOps: AWS (85%), Docker (87%), Kubernetes (82%)`;
                break;
            case 'experience':
                output = `2023-Present: Full Stack Engineer @ Powerley
2021-2022: Software Engineer @ Codemen
2019-2021: Junior Engineer @ MoveOn Technologies`;
                break;
            case 'contact':
                output = `Email: Koushik.saha666@gmail.com
Phone: (747) 231-8876
Location: Los Angeles, CA`;
                break;
            case 'clear':
                setCommands([]);
                return;
            case 'hack':
                output = `🔥 ENTERING MATRIX MODE 🔥
01010100 01010101 01001100 01000001
Matrix activated! Portfolio unlocked!
Access Level: MAXIMUM`;
                document.body.style.filter = 'hue-rotate(120deg) brightness(0.8)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 3000);
                break;
            default:
                output = `Command not found: ${cmd}\nType "help" for available commands`;
        }

        setCommands(prev => [...prev, { input: cmd, output }]);
        setInput('');
    };

    useEffect(() => {
        terminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [commands]);

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="terminal">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl font-bold mb-4 text-[#00D9FF]">
                        🖥️ Interactive Terminal
                    </h2>
                    <p className="text-[#F0F4FF]/60">Explore portfolio like a hacker</p>
                </motion.div>

                {/* Terminal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-black border-2 border-[#00D9FF] rounded-lg font-mono text-sm overflow-hidden shadow-2xl shadow-[#00D9FF]/30"
                >
                    {/* Terminal Header */}
                    <div className="bg-[#0F52BA] px-4 py-2 flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-[#00D9FF] ml-auto text-xs">portfolio-terminal</span>
                    </div>

                    {/* Output */}
                    <div
                        ref={terminalRef}
                        className="p-4 h-96 overflow-y-auto bg-black text-[#00D9FF] space-y-3"
                    >
                        {commands.map((cmd, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {cmd.input && (
                                    <div className="text-[#7C3AED]">$ {cmd.input}</div>
                                )}
                                <div className="text-[#00D9FF] whitespace-pre-wrap ml-4">
                                    {cmd.output}
                                </div>
                            </motion.div>
                        ))}

                        {/* Input Line */}
                        <div className="flex items-center gap-2">
                            <span className="text-[#7C3AED]">$</span>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && executeCommand(input)}
                                autoFocus
                                placeholder="Type command..."
                                className="flex-1 bg-transparent outline-none text-[#00D9FF] placeholder-[#00D9FF]/30"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Hint */}
                <p className="text-center text-[#F0F4FF]/50 text-sm mt-4">
                    💡 Type "help" to see available commands
                </p>
            </div>
        </section>
    );
}
