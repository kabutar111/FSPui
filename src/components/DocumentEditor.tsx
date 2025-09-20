import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  FileText,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Undo,
  Redo,
  Download,
  Eye,
  Edit3,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  required: boolean;
  completed: boolean;
}

interface DocumentTemplate {
  id: string;
  name: string;
  sections: DocumentSection[];
}

interface EvaluationResult {
  score: number;
  maxScore: number;
  feedback: string[];
  suggestions: string[];
  categories: {
    structure: number;
    content: number;
    language: number;
  };
}

interface DocumentEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  onSave?: (content: string) => void;
  readOnly?: boolean;
  showEvaluation?: boolean;
  evaluationResult?: EvaluationResult;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
  initialContent = '',
  onContentChange,
  onSave,
  readOnly = false,
  showEvaluation = false,
  evaluationResult
}) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('arztbrief_standard');
  const [sections, setSections] = useState<DocumentSection[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Medical document templates
  const templates: Record<string, DocumentTemplate> = {
    arztbrief_standard: {
      id: 'arztbrief_standard',
      name: 'Standard Arztbrief',
      sections: [
        {
          id: 'kopfdaten',
          title: 'Kopfdaten',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'anamnese',
          title: 'Anamnese',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'befunde',
          title: 'Befunde',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'diagnose',
          title: 'Diagnose',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'therapie',
          title: 'Therapie',
          content: '',
          required: true,
          completed: false
        }
      ]
    },
    arztbrief_notfall: {
      id: 'arztbrief_notfall',
      name: 'Notfall Arztbrief',
      sections: [
        {
          id: 'kopfdaten',
          title: 'Kopfdaten',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'notfallanamnese',
          title: 'Notfallanamnese',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'vitalzeichen',
          title: 'Vitalzeichen',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'diagnostik',
          title: 'Erstversorgung & Diagnostik',
          content: '',
          required: true,
          completed: false
        },
        {
          id: 'weiterbehandlung',
          title: 'Weiterbehandlung',
          content: '',
          required: true,
          completed: false
        }
      ]
    }
  };

  // Initialize template
  useEffect(() => {
    const template = templates[selectedTemplate];
    if (template) {
      setSections(template.sections);
      setActiveSection(template.sections[0]?.id || '');
    }
  }, [selectedTemplate]);

  // Update word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharacterCount(content.length);
  }, [content]);

  // Auto-save functionality
  const handleAutoSave = useCallback(async () => {
    if (!onSave || readOnly) return;

    setIsSaving(true);
    try {
      await onSave(content);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [content, onSave, readOnly]);

  useEffect(() => {
    const interval = setInterval(handleAutoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [handleAutoSave]);

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent);

    // Update section completion status
    const currentSection = sections.find(s => s.id === activeSection);
    if (currentSection) {
      const updatedSections = sections.map(section =>
        section.id === activeSection
          ? { ...section, content: newContent, completed: newContent.trim().length > 50 }
          : section
      );
      setSections(updatedSections);
    }
  };

  // Format text
  const formatText = (command: string) => {
    if (readOnly || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = '';
    switch (command) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
        break;
      case 'ordered-list':
        formattedText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    handleContentChange(newContent);
  };

  // Export document
  const exportDocument = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arztbrief_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Calculate completion percentage
  const completionPercentage = sections.length > 0
    ? Math.round((sections.filter(s => s.completed).length / sections.length) * 100)
    : 0;

  return (
    <div className="document-editor-container">
      {/* Header */}
      <div className="document-editor-header">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Arztbrief Editor
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Template Selector */}
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              {Object.values(templates).map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>

            {/* Mode Toggle */}
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center space-x-2 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              {isPreviewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isPreviewMode ? 'Bearbeiten' : 'Vorschau'}</span>
            </button>

            {/* Export Button */}
            <button
              onClick={exportDocument}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              <span>Exportieren</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Dokument vervollständigt
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="bg-green-500 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-4">
            <span>{wordCount} Wörter</span>
            <span>{characterCount} Zeichen</span>
            {lastSaved && (
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Gespeichert {lastSaved.toLocaleTimeString()}</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isSaving && (
              <span className="flex items-center space-x-1">
                <div className="animate-spin w-3 h-3 border border-slate-300 border-t-slate-600 rounded-full"></div>
                <span>Speichere...</span>
              </span>
            )}
            {lastSaved && !isSaving && (
              <span className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>Gespeichert</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="document-editor-content">
        {/* Section Navigation */}
        <div className="document-sections-sidebar">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
            Dokumentabschnitte
          </h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{section.title}</span>
                  <div className="flex items-center space-x-1">
                    {section.required && (
                      <span className="text-red-500">*</span>
                    )}
                    {section.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="document-editor-main">
          {!isPreviewMode && !readOnly && (
            <div className="document-toolbar">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => formatText('bold')}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  title="Fett"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('italic')}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  title="Kursiv"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('underline')}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  title="Unterstrichen"
                >
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2" />
                <button
                  onClick={() => formatText('list')}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  title="Aufzählung"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => formatText('ordered-list')}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                  title="Nummerierte Liste"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {isPreviewMode ? (
            <div className="document-preview">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              readOnly={readOnly}
              placeholder="Beginnen Sie mit der Dokumentation..."
              className="document-textarea"
              rows={20}
            />
          )}
        </div>

        {/* Evaluation Panel */}
        {showEvaluation && evaluationResult && (
          <div className="document-evaluation-panel">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
              Echtzeit-Bewertung
            </h3>

            <div className="evaluation-score">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {evaluationResult.score}/{evaluationResult.maxScore}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Gesamtpunkte
              </div>
            </div>

            <div className="evaluation-categories">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {evaluationResult.categories.structure}/20
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Struktur
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {evaluationResult.categories.content}/20
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Inhalt
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {evaluationResult.categories.language}/20
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Sprache
                  </div>
                </div>
              </div>
            </div>

            <div className="evaluation-feedback">
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                Verbesserungsvorschläge
              </h4>
              <ul className="space-y-1">
                {evaluationResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;

