import { useEffect } from 'react';

export const useKeyboardShortcuts = () => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K = Command palette
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('Command palette');
                // Implement command palette here
            }

            // Ctrl/Cmd + / = Show shortcuts
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                alert(`⌨️ Keyboard Shortcuts:
Cmd/Ctrl + K → Command Palette
Cmd/Ctrl + / → Show Shortcuts
G + H → Go to Home
G + P → Go to Projects
G + S → Go to Skills
? → Toggle this help`);
            }

            // G + H = Go Home
            if (e.key === 'g') {
                setTimeout(() => {
                    if (e.key === 'h') {
                        window.location.hash = '#hero';
                    }
                }, 100);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);
};
