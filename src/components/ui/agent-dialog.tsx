import React, { useState } from 'react';
import { X, MessageSquare, FileText, Users, GraduationCap, Send, Mic, MicOff } from 'lucide-react';

interface AgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  examPart: 'teil1' | 'teil2' | 'teil3' | 'vollprufung';
  title: string;
  description: string;
}

const AgentDialog: React.FC<AgentDialogProps> = ({
  isOpen,
  onClose,
  examPart,
  title,
  description
}) => {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'agent', content: string}>>([
    { type: 'agent', content: `Hallo! Ich bin Ihr FSP-Agent für ${title}. Wie kann ich Ihnen helfen?` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
      setInputMessage('');

      // Simulate agent response
      setTimeout(() => {
        let agentResponse = '';
        switch (examPart) {
          case 'teil1':
            agentResponse = 'Ich höre Ihnen zu. Können Sie mir bitte mehr über Ihre Beschwerden erzählen?';
            break;
          case 'teil2':
            agentResponse = 'Für die Dokumentation benötige ich folgende Informationen: Diagnose, Therapie und Verlauf.';
            break;
          case 'teil3':
            agentResponse = 'Als Kollege würde ich vorschlagen, dass wir die Therapieoptionen gemeinsam besprechen.';
            break;
          case 'vollprufung':
            agentResponse = 'Willkommen zur kompletten FSP-Prüfungssimulation! Wir beginnen mit Teil 1: Anamnese & Patientengespräche. Wie kann ich Ihnen als Patient helfen?';
            break;
        }
        setMessages(prev => [...prev, { type: 'agent', content: agentResponse }]);
      }, 1000);
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
  };

  const getAgentIcon = () => {
    switch (examPart) {
      case 'teil1':
        return MessageSquare;
      case 'teil2':
        return FileText;
      case 'teil3':
        return Users;
      case 'vollprufung':
        return GraduationCap;
      default:
        return MessageSquare;
    }
  };

  const getAgentColor = () => {
    switch (examPart) {
      case 'teil1':
        return 'bg-blue-500';
      case 'teil2':
        return 'bg-green-500';
      case 'teil3':
        return 'bg-purple-500';
      case 'vollprufung':
        return 'bg-indigo-500';
      default:
        return 'bg-blue-500';
    }
  };

  if (!isOpen) return null;

  const AgentIcon = getAgentIcon();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${getAgentColor()} flex items-center justify-center`}>
              <AgentIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                FSP-Agent: {title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto max-h-96">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <button
              onClick={handleVoiceToggle}
              className={`p-3 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Schreiben Sie Ihre Nachricht..."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`p-3 rounded-full transition-colors ${
                inputMessage.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Agent Capabilities */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              Sprachverständnis
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              Feedback geben
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
              Fachwissen
            </span>
            {examPart === 'teil1' && (
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                Empathie
              </span>
            )}
            {examPart === 'teil2' && (
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium">
                Dokumentation
              </span>
            )}
            {examPart === 'teil3' && (
              <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-xs font-medium">
                Teamarbeit
              </span>
            )}
            {examPart === 'vollprufung' && (
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                Vollprüfung
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDialog;
