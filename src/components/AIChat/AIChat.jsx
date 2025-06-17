import { useState, useEffect, useRef } from 'react';
import { Send, X, Zap, Loader2, ChevronDown, ChevronUp, MessageSquare, Database, CheckCircle, XCircle, Search, Plus, Edit, Trash2, Info, Bot, User } from 'lucide-react';
import api from '@/api/api';

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Enfocar el input cuando se abre el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Mensaje de bienvenida
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: '¡Hola! 👋 Soy tu asistente de base de datos. Puedo ayudarte a consultar, crear, actualizar y eliminar información de tus proyectos de excavación.',
        type: 'welcome',
        suggestions: [
          'Muestra todos los proyectos',
          'Busca excavaciones en progreso',
          'Crea un nuevo proyecto',
          '¿Cuántos usuarios hay registrados?'
        ]
      }]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Añadir mensaje del usuario al chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);

    setIsLoading(true);
    try {
      // Llamada a la API del agente
      const response = await api.post('/ai/chat', { message: userMessage });

      // Procesar la respuesta según su tipo
      const aiResponse = response.data;

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse.message || 'No se obtuvo respuesta',
        data: aiResponse.data,
        rawData: aiResponse.rawData,
        summary: aiResponse.summary,
        success: aiResponse.success,
        type: aiResponse.type,
        operation: aiResponse.operation,
        model: aiResponse.model,
        userFriendly: aiResponse.userFriendly,
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setError('Error al comunicarse con el asistente. Inténtalo de nuevo.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, ocurrió un error al procesar tu consulta. Por favor, inténtalo de nuevo.',
        error: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Obtener icono según tipo de operación
  const getOperationIcon = (operation) => {
    switch (operation) {
      case 'query': return <Search size={16} className="text-blue-500" />;
      case 'create': return <Plus size={16} className="text-green-500" />;
      case 'update': return <Edit size={16} className="text-yellow-500" />;
      case 'delete': return <Trash2 size={16} className="text-red-500" />;
      default: return <Database size={16} className="text-gray-500" />;
    }
  };

  // Renderizar mensaje según su tipo
  const renderMessage = (message, index) => {
    if (message.role === 'user') {
      return (
        <div key={index} className="flex justify-end mb-4">
          <div className="flex items-start space-x-2 max-w-[85%]">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
              <p className="text-sm leading-relaxed text-black">{message.content}</p>
              {message.timestamp && (
                <p className="text-xs opacity-75 mt-1 text-slate-950">
                  {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      );
    } else {
      // Mensaje del asistente
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="flex items-start space-x-3 max-w-[90%]">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="flex-1">
              {message.error ? (
                <ErrorMessage message={message} />
              ) : message.type === 'welcome' ? (
                <WelcomeMessage message={message} onSuggestionClick={handleSuggestionClick} />
              ) : message.type === 'database_result' ? (
                <DatabaseResultMessage message={message} />
              ) : (
                <RegularMessage message={message} />
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-[420px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">Asistente IA</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gestión de Base de Datos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto h-[calc(95vh-140px)] bg-gray-50 dark:bg-gray-900">
        {messages.map((message, index) => renderMessage(message, index))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start space-x-3 max-w-[90%]">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-md px-4 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">Procesando consulta...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg p-3 mb-3 text-sm">
            <div className="flex items-center space-x-2">
              <XCircle size={16} />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white text-black dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Escribe tu consulta... (Enter para enviar, Shift+Enter para nueva línea)"
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 min-h-[48px]"
              disabled={isLoading}
              rows={2}
              style={{ height: 'auto', minHeight: '48px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 86) + 'px';
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${isLoading || !input.trim()
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente para mensaje de bienvenida
const WelcomeMessage = ({ message, onSuggestionClick }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border border-blue-200 dark:border-gray-700 rounded-2xl rounded-tl-md p-4 shadow-lg">
    <p className="text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">{message.content}</p>

    {message.suggestions && (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Sugerencias:</p>
        <div className="grid gap-2">
          {message.suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSuggestionClick(suggestion)}
              className="text-left p-2 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Componente para mensajes de error
const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl rounded-tl-md p-4 shadow-lg">
    <div className="flex items-center space-x-2 mb-2">
      <XCircle size={16} className="text-red-500" />
      <span className="font-semibold text-red-700 dark:text-red-300 text-sm">Error</span>
    </div>
    <p className="text-red-600 dark:text-red-400 text-sm leading-relaxed">{message.content}</p>
    {message.timestamp && (
      <p className="text-xs text-red-500 dark:text-red-400 mt-2 opacity-75">
        {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
      </p>
    )}
  </div>
);

// Componente para mensajes regulares
const RegularMessage = ({ message }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-md p-4 shadow-lg">
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{message.content}</p>
    </div>
    {message.timestamp && (
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 opacity-75">
        {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
      </p>
    )}
  </div>
);

// Componente para resultados de base de datos
const DatabaseResultMessage = ({ message }) => {
  const getOperationIcon = (operation) => {
    switch (operation) {
      case 'query': return <Search size={16} className="text-blue-500" />;
      case 'create': return <Plus size={16} className="text-green-500" />;
      case 'update': return <Edit size={16} className="text-orange-500" />;
      case 'delete': return <Trash2 size={16} className="text-red-500" />;
      default: return <Database size={16} className="text-gray-500" />;
    }
  };

  const getOperationColor = (operation, success) => {
    if (!success) return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';

    switch (operation) {
      case 'query': return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      case 'create': return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      case 'update': return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20';
      case 'delete': return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      default: return 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getOperationText = (operation) => {
    switch (operation) {
      case 'query': return 'Consulta';
      case 'create': return 'Creación';
      case 'update': return 'Actualización';
      case 'delete': return 'Eliminación';
      default: return 'Operación';
    }
  };

  return (
    <div className={`border rounded-2xl rounded-tl-md p-4 shadow-lg ${getOperationColor(message.operation, message.success)}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getOperationIcon(message.operation)}
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            {getOperationText(message.operation)}
          </span>
          {message.success ? (
            <CheckCircle size={16} className="text-green-500" />
          ) : (
            <XCircle size={16} className="text-red-500" />
          )}
        </div>

        {message.model && (
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
            {message.model}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* Summary */}
      {message.summary && (
        <div className="mt-3 p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
            <Info size={12} />
            <span>
              {message.summary.type === 'array' && `${message.summary.total} registros encontrados`}
              {message.summary.type === 'update' && `${message.summary.affectedRows} registros afectados`}
              {message.summary.type === 'number' && `${message.summary.value} registros procesados`}
              {message.summary.type === 'object' && 'Registro procesado'}
            </span>
          </div>
        </div>
      )}

      {/* Data Display */}
      {message.data && (
        <div className="mt-3">
          <DatabaseResultDisplay data={message.data} />
        </div>
      )}

      {/* Timestamp */}
      {message.timestamp && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 opacity-75">
          {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}
    </div>
  );
};

// Componente para mostrar resultados de la base de datos
const DatabaseResultDisplay = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  // Si no hay datos
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return null;
  }

  // Si es un array de resultados
  if (Array.isArray(data)) {
    if (data.length === 0) return null;

    return (
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <div
          className="bg-gray-50 dark:bg-gray-700 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center space-x-2">
            <Database size={16} className="text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {data.length} registro{data.length !== 1 ? 's' : ''}
            </span>
          </div>
          {expanded ? <ChevronUp size={16} className="text-gray-600 dark:text-gray-400" /> : <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" />}
        </div>

        {expanded && (
          <div className="max-h-80 overflow-y-auto">
            {data.slice(0, 10).map((item, idx) => (
              <div key={idx} className="p-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="grid gap-2">
                  {Object.entries(item).map(([key, valueObj]) => (
                    <div key={key} className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-1/3 uppercase tracking-wide">
                        {key.replace('_', ' ')}:
                      </span>
                      <span className="text-sm text-gray-800 dark:text-gray-200 flex-1">
                        {valueObj.formatted || valueObj.value || 'N/A'}
                        {valueObj.type === 'date' && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({valueObj.type})
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {data.length > 10 && (
              <div className="p-3 text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
                Mostrando 10 de {data.length} resultados
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Si es un único objeto
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <div
        className="bg-gray-50 dark:bg-gray-700 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-2">
          <Database size={16} className="text-gray-600 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200">Detalles del registro</span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-600 dark:text-gray-400" /> : <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" />}
      </div>

      {expanded && (
        <div className="p-3">
          <div className="grid gap-2">
            {Object.entries(data).map(([key, valueObj]) => (
              <div key={key} className="flex items-start">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-1/3 uppercase tracking-wide">
                  {key.replace('_', ' ')}:
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-200 flex-1">
                  {valueObj.formatted || valueObj.value || 'N/A'}
                  {valueObj.type === 'date' && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({valueObj.type})
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;