import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Bot,
  Stethoscope,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MoreVertical,
  Search,
  Download,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  agentType: 'patient' | 'examiner' | 'assistant' | 'system';
  timestamp: Date;
  isTyping?: boolean;
  audioUrl?: string;
  confidence?: number;
}

interface AgentInfo {
  type: 'patient' | 'examiner' | 'assistant' | 'system';
  name: string;
  avatar?: string;
  color: string;
  role: string;
}

interface ConversationDisplayProps {
  messages: Message[];
  activeAgent?: string;
  isRecording?: boolean;
  isPlaying?: boolean;
  onToggleRecording?: () => void;
  onTogglePlayback?: () => void;
  showTimestamps?: boolean;
  showConfidence?: boolean;
  compact?: boolean;
  onExportConversation?: () => void;
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  messages,
  activeAgent = 'examiner',
  isRecording = false,
  isPlaying = false,
  onToggleRecording,
  onTogglePlayback,
  showTimestamps = true,
  showConfidence = false,
  compact = false,
  onExportConversation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agents: Record<string, AgentInfo> = {
    patient: {
      type: 'patient',
      name: 'Patient',
      color: 'bg-blue-500',
      role: 'Simulierter Patient'
    },
    examiner: {
      type: 'examiner',
      name: 'Prüfer',
      color: 'bg-green-500',
      role: 'Facharztprüfer'
    },
    assistant: {
      type: 'assistant',
      name: 'KI-Assistent',
      color: 'bg-purple-500',
      role: 'Unterstützung'
    },
    system: {
      type: 'system',
      name: 'System',
      color: 'bg-gray-500',
      role: 'Systemnachricht'
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter messages based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter(message =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [messages, searchTerm]);

  const getAgentIcon = (agentType: string) => {
    switch (agentType) {
      case 'patient':
        return <User className="w-5 h-5" />;
      case 'examiner':
        return <Stethoscope className="w-5 h-5" />;
      case 'assistant':
        return <Bot className="w-5 h-5" />;
      case 'system':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getAgentColor = (agentType: string) => {
    return agents[agentType]?.color || 'bg-gray-500';
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return '';
    if (confidence >= 0.8) return 'text-green-600 dark:text-green-400';
    if (confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const TypingIndicator = () => (
    <motion.div
      className="typing-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {agents[activeAgent]?.name || 'Agent'} tippt...
        </span>
      </div>
    </motion.div>
  );

  if (compact) {
    return (
      <div className="conversation-display-compact">
        <div className="conversation-messages-compact">
          <AnimatePresence>
            {messages.slice(-5).map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`message-compact ${message.agentType}`}
              >
                <div className={`message-avatar-compact ${getAgentColor(message.agentType)}`}>
                  {getAgentIcon(message.agentType)}
                </div>
                <div className="message-content-compact">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    {agents[message.agentType]?.name || message.agentType}
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    {message.content.length > 50
                      ? `${message.content.substring(0, 50)}...`
                      : message.content
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="conversation-display">
      {/* Header */}
      <div className="conversation-header">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Gesprächsverlauf
          </h3>

          <div className="flex items-center space-x-2">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Recording Toggle */}
            {onToggleRecording && (
              <button
                onClick={onToggleRecording}
                className={`p-2 rounded-md ${
                  isRecording
                    ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            {/* Playback Toggle */}
            {onTogglePlayback && (
              <button
                onClick={onTogglePlayback}
                className={`p-2 rounded-md ${
                  isPlaying
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            {/* Export Button */}
            {onExportConversation && (
              <button
                onClick={onExportConversation}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
              >
                <Download className="w-4 h-4" />
              </button>
            )}

            {/* Active Agent Indicator */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">
              <div className={`w-2 h-2 rounded-full ${getAgentColor(activeAgent)}`}></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {agents[activeAgent]?.name || activeAgent}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <input
                type="text"
                placeholder="Nachrichten durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messages Container */}
      <div className="conversation-messages">
        <AnimatePresence>
          {filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`message ${message.agentType}`}
            >
              {/* Agent Avatar */}
              <div className={`message-avatar ${getAgentColor(message.agentType)}`}>
                {getAgentIcon(message.agentType)}
              </div>

              {/* Message Content */}
              <div className="message-content">
                <div className="message-header">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {agents[message.agentType]?.name || message.agentType}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {agents[message.agentType]?.role}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {showConfidence && message.confidence && (
                      <span className={`text-xs ${getConfidenceColor(message.confidence)}`}>
                        {Math.round(message.confidence * 100)}%
                      </span>
                    )}

                    {showTimestamps && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimestamp(message.timestamp)}
                      </span>
                    )}

                    {message.audioUrl && (
                      <button
                        onClick={() => {/* Play audio */}}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="message-text">
                  {message.isTyping ? (
                    <TypingIndicator />
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      {message.content.split('\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-2 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Actions */}
                <div className="message-actions">
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator for Active Agent */}
        {messages.length > 0 && messages[messages.length - 1]?.isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="message typing"
          >
            <div className={`message-avatar ${getAgentColor(activeAgent)}`}>
              {getAgentIcon(activeAgent)}
            </div>
            <div className="message-content">
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="conversation-footer">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-4">
            <span>{messages.length} Nachrichten</span>
            {searchTerm && (
              <span>{filteredMessages.length} Treffer</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isRecording && (
              <div className="flex items-center space-x-1 text-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Aufnahme läuft</span>
              </div>
            )}

            {isPlaying && (
              <div className="flex items-center space-x-1 text-blue-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Wiedergabe</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationDisplay;

