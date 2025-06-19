import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Database, Mail, AlertTriangle, CheckCircle, XCircle, Copy, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from "@/api/api";

// Estilos CSS para la animación del layout
const chatStyles = {
  // Estilo para el contenedor principal que envuelve toda la aplicación
  mainContainer: (isOpen) => ({
    transition: 'padding-right 0.3s ease-in-out',
    paddingRight: isOpen ? '384px' : '0',
  }),
  
  // Estilo para la animación de entrada del chat
  chatPanel: (isOpen) => ({
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    boxShadow: isOpen ? '-5px 0 25px rgba(0, 0, 0, 0.1)' : 'none',
  }),
  
  // Estilo para el botón flotante
  floatingButton: {
    transition: 'all 0.3s ease-in-out',
    transform: 'scale(1)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }
};


const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Manejar la apertura y cierre del chat con animación
  const toggleChat = (open) => {
    setIsAnimating(true);
    setIsOpen(open);
    
    // Notificar al layout principal sobre el cambio
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('chat-toggle', { detail: { isOpen: open } }));
    }
    
    // Resetear el estado de animación después de completarla
    setTimeout(() => setIsAnimating(false), 300);
  };
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '¡Hola! Soy tu asistente de IA. Puedo ayudarte con consultas de base de datos y envío de correos electrónicos. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [pendingDeleteQuery, setPendingDeleteQuery] = useState('');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (messageToSend = inputMessage, includeVerification = false) => {
    if (!messageToSend.trim() && !includeVerification) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const payload = {
        message: includeVerification ? pendingDeleteQuery : messageToSend
      };
      
      // Solo añadir userId si el usuario está autenticado
      if (user && user.id) {
        payload.userId = user.id;
      }

      if (includeVerification) {
        payload.verificationCode = verificationCode;
      }

      const response = await api.post('/ai/chat', payload);

      const data = response.data;

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.message,
        timestamp: new Date(),
        operation: data.operation || null,
        data: data.data || null,
        success: data.success,
        requiresVerification: data.type === 'verification_required'
      };

      setMessages(prev => [...prev, botMessage]);

      // Handle verification requirement
      if (data.type === 'verification_required') {
        setShowVerification(true);
        setPendingDeleteQuery(messageToSend);
      } else {
        setShowVerification(false);
        setPendingDeleteQuery('');
        setVerificationCode('');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: '❌ Error de conexión. Por favor, inténtalo de nuevo.',
        timestamp: new Date(),
        success: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = () => {
    if (!verificationCode.trim()) {
      alert('Por favor, ingresa el código de verificación');
      return;
    }
    handleSendMessage(verificationCode, true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showVerification) {
        handleVerificationSubmit();
      } else {
        handleSendMessage();
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
        timestamp: new Date()
      }
    ]);
    setShowVerification(false);
    setPendingDeleteQuery('');
    setVerificationCode('');
  };

  const renderMessageContent = (message) => {
    if (message.data && Array.isArray(message.data) && message.data.length > 0) {
      return (
        <div className="space-y-3">
          <p className="text-gray-800">{message.content}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {message.data.slice(0, 10).map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-md p-3 text-sm">
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-1 border-b last:border-b-0 border-gray-100">
                      <span className="font-medium text-gray-600 capitalize">{key}:</span>
                      <span className="text-gray-800 max-w-xs truncate">
                        {value?.formatted || value?.value || value || 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              {message.data.length > 10 && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Mostrando 10 de {message.data.length} resultados
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (message.data && typeof message.data === 'object' && !Array.isArray(message.data)) {
      return (
        <div className="space-y-3">
          <p className="text-gray-800">{message.content}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            {Object.entries(message.data).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200">
                <span className="font-medium text-gray-600 capitalize">{key}:</span>
                <span className="text-gray-800 max-w-xs truncate">
                  {value?.formatted || value?.value || value || 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>;
  };

  const getMessageIcon = (message) => {
    if (message.operation === 'database') return <Database className="w-4 h-4" />;
    if (message.operation === 'email') return <Mail className="w-4 h-4" />;
    if (message.success === false) return <XCircle className="w-4 h-4 text-red-500" />;
    if (message.success === true) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (message.requiresVerification) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <Bot className="w-4 h-4" />;
  };

  const getMessageBorderColor = (message) => {
    if (message.success === false) return 'border-red-200 bg-red-50';
    if (message.success === true) return 'border-green-200 bg-green-50';
    if (message.requiresVerification) return 'border-yellow-200 bg-yellow-50';
    return 'border-gray-200 bg-white';
  };

  return (
    <>
      {/* Contenedor principal que afecta al layout */}
      <div style={chatStyles.mainContainer(isOpen)} className="chat-layout-container">
        {/* Este div vacío es parte del truco para empujar el contenido */}
      </div>
      
      {/* Botón flotante para abrir el chat cuando está cerrado */}
      {!isOpen && (
        <button
          onClick={() => toggleChat(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center animate-pulse-slow"
          aria-label="Abrir asistente IA"
          style={chatStyles.floatingButton}
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Panel lateral del chat */}
      <div 
        style={chatStyles.chatPanel(isOpen)}
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-40 flex flex-col border-l border-gray-200`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Asistente IA</h1>
              <p className="text-xs text-blue-100">Base de datos y correos</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Limpiar chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleChat(false)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Cerrar"
              disabled={isAnimating}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl rounded-lg border p-4 ${message.type === 'user'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : `${getMessageBorderColor(message)}`
                }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${message.type === 'user' ? 'text-blue-200' : 'text-gray-600'}`}>
                  {message.type === 'user' ? <User className="w-4 h-4" /> : getMessageIcon(message)}
                </div>
                <div className="flex-1 min-w-0">
                  {message.type === 'user' ? (
                    <p className="text-white">{message.content}</p>
                  ) : (
                    renderMessageContent(message)
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                      {formatTimestamp(message.timestamp)}
                    </span>
                    {message.type === 'bot' && (
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                        title="Copiar mensaje"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-3xl">
              <div className="flex items-center space-x-3">
                <Bot className="w-4 h-4 text-gray-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>

        {/* Verification Modal */}
        {showVerification && (
          <div className="mx-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-sm text-yellow-800">Código de Verificación</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa el código"
                className="flex-1 px-3 py-2 text-sm border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleVerificationSubmit}
                disabled={isLoading}
                className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 transition-colors"
              >
                Verificar
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        {!showVerification && (
          <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
            >
              <Send className="w-3 h-3" />
              <span className="text-sm">Enviar</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-2 flex flex-wrap gap-1">
            <button
              onClick={() => setInputMessage('Muestra todos los proyectos activos')}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Ver proyectos
            </button>
            <button
              onClick={() => setInputMessage('Cuenta cuántos usuarios hay registrados')}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Contar usuarios
            </button>
            <button
              onClick={() => setInputMessage('Envía un correo a ejemplo@gmail.com')}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Enviar correo
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default AIChat;