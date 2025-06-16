import { useState, useEffect, useRef } from 'react';
import { Send, X, Zap, Loader2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
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
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Añadir mensaje del usuario al chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
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
        success: aiResponse.success,
        type: aiResponse.type,
        operation: aiResponse.operation,
        model: aiResponse.model
      }]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setError('Error al comunicarse con el asistente. Inténtalo de nuevo.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Lo siento, ocurrió un error al procesar tu consulta.',
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar mensaje según su tipo
  const renderMessage = (message, index) => {
    if (message.role === 'user') {
      return (
        <div key={index} className="flex justify-end mb-3">
          <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
            <p>{message.content}</p>
          </div>
        </div>
      );
    } else {
      // Mensaje del asistente
      if (message.error) {
        return (
          <div key={index} className="flex justify-start mb-3">
            <div className="bg-error-light text-error rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
              <p>{message.content}</p>
            </div>
          </div>
        );
      }

      // Si es un resultado de base de datos
      if (message.type === 'database_result') {
        return (
          <div key={index} className="flex justify-start mb-3">
            <div className="bg-surface border border-theme-border rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] w-full">
              <div className="flex items-center mb-2">
                <Zap size={16} className={message.success ? "text-success" : "text-error"} />
                <span className="ml-2 font-medium text-theme-text">{message.operation === 'query' ? 'Consulta' : message.operation === 'create' ? 'Creación' : message.operation === 'update' ? 'Actualización' : 'Eliminación'}</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-surface-hover text-theme-text-secondary">
                  {message.model}
                </span>
              </div>
              <p className="text-theme-text mb-2">{message.content}</p>
              
              {message.data && (
                <ResultDisplay data={message.data} />
              )}
            </div>
          </div>
        );
      }

      // Mensaje normal del asistente
      return (
        <div key={index} className="flex justify-start mb-3">
          <div className="bg-surface border border-theme-border rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
            <p className="text-theme-text">{message.content}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-surface backdrop-blur-xl border-l border-theme-border shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="p-4 border-b border-theme-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="text-white" size={16} />
          </div>
          <div>
            <h2 className="font-semibold text-theme-text">Asistente IA</h2>
            <p className="text-xs text-theme-text-secondary">Consulta la base de datos</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-theme-text-secondary hover:text-theme-text p-2 rounded-lg hover:bg-surface-hover"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-140px)]">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-theme-text-secondary">
            <MessageSquare size={40} className="mb-3 opacity-50" />
            <p className="text-center">Haz una consulta sobre tus datos de excavación</p>
            <p className="text-center text-sm mt-2">Ejemplo: "Muestra los avances de excavación del último mes"</p>
          </div>
        ) : (
          messages.map((message, index) => renderMessage(message, index))
        )}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="bg-surface border border-theme-border rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center">
                <Loader2 size={16} className="animate-spin text-primary" />
                <span className="ml-2 text-theme-text-secondary">Procesando consulta...</span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-error-light text-error rounded-lg p-2 mb-3 text-sm">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-theme-border">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta..."
            className="flex-1 bg-surface-hover text-theme-text placeholder-theme-text-secondary border border-theme-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`p-2 rounded-xl ${
              isLoading || !input.trim() 
                ? 'bg-surface-hover text-theme-text-secondary' 
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente para mostrar resultados de la base de datos
const ResultDisplay = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  // Si no hay datos o es un objeto vacío
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return null;
  }

  // Si es un array de resultados
  if (Array.isArray(data)) {
    if (data.length === 0) return null;
    
    return (
      <div className="mt-2 border border-theme-border rounded-lg overflow-hidden">
        <div 
          className="bg-surface-hover p-2 flex justify-between items-center cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="text-sm font-medium text-theme-text">
            {data.length} resultado{data.length !== 1 ? 's' : ''}
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        
        {expanded && (
          <div className="p-2 max-h-60 overflow-y-auto">
            {data.slice(0, 10).map((item, idx) => (
              <div key={idx} className="p-2 border-b border-theme-border last:border-b-0">
                {Object.entries(item).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-xs font-medium text-theme-text-secondary w-1/3">{key}:</span>
                    <span className="text-xs text-theme-text">{
                      typeof value === 'object' ? JSON.stringify(value) : String(value)
                    }</span>
                  </div>
                ))}
              </div>
            ))}
            {data.length > 10 && (
              <div className="p-2 text-center text-xs text-theme-text-secondary">
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
    <div className="mt-2 border border-theme-border rounded-lg overflow-hidden">
      <div 
        className="bg-surface-hover p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-sm font-medium text-theme-text">Detalles</span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {expanded && (
        <div className="p-2">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex mb-1 last:mb-0">
              <span className="text-xs font-medium text-theme-text-secondary w-1/3">{key}:</span>
              <span className="text-xs text-theme-text">{
                typeof value === 'object' ? JSON.stringify(value) : String(value)
              }</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIChat;
