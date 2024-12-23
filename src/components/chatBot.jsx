// import React, { useState } from 'react';

// const Chatbot = () => {
//   const [userMessage, setUserMessage] = useState('');
//   const [messages, setMessages] = useState([
//     { text: "Bot: Hello! How can I assist you today?", sender: "bot" },
//   ]);

//   const handleMessageChange = (e) => {
//     setUserMessage(e.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (!userMessage) return;

//     // Add user message to chat
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: `You: ${userMessage}`, sender: 'user' },
//     ]);

//     // Send the message to the Flask backend
//     try {
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage }),
//       });

//       const data = await response.json();

//       // Add bot response to chat
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: `Bot: ${data.response || "Sorry, I didn't understand that."}`, sender: 'bot' },
//       ]);
//     } catch (error) {
//       console.error('Error communicating with the backend:', error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: 'Bot: Sorry, something went wrong. Please try again later.', sender: 'bot' },
//       ]);
//     }

//     // Clear input field
//     setUserMessage('');
//   };

//   return (
//     <div id="chatbox">
//       <div id="messages">
//         {messages.map((message, index) => (
//           <div key={index} className={message.sender}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <div id="user-input">
//         <input
//           type="text"
//           id="input"
//           placeholder="Type your message here..."
//           value={userMessage}
//           onChange={handleMessageChange}
//         />
//         <button id="send" onClick={handleSendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

// -------------------------------------------------------------


// import React, { useState } from 'react';
// import { MessageCircle, X, Send } from 'lucide-react';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userMessage, setUserMessage] = useState('');
//   const [messages, setMessages] = useState([
//     { text: "Hello! How can I assist you today?", sender: "bot" },
//   ]);

//   const handleMessageChange = (e) => {
//     setUserMessage(e.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (!userMessage) return;

//     // Add user message to chat
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: userMessage, sender: 'user' },
//     ]);

//     try {
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage }),
//       });
//       const data = await response.json();
      
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: data.response || "Sorry, I didn't understand that.", sender: 'bot' },
//       ]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' },
//       ]);
//     }

//     setUserMessage('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {/* Chat toggle button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
//       >
//         {isOpen ? (
//           <X className="w-6 h-6" />
//         ) : (
//           <MessageCircle className="w-6 h-6" />
//         )}
//       </button>

//       {/* Chat window */}
//       {isOpen && (
//         <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200">
//           {/* Header */}
//           <div className="bg-blue-500 text-white p-4 rounded-t-lg">
//             <h3 className="text-lg font-semibold">Chat Support</h3>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   message.sender === 'user' ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 <div
//                   className={`max-w-[80%] p-3 rounded-lg ${
//                     message.sender === 'user'
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-100 text-gray-800'
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input area */}
//           <div className="border-t p-4">
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={userMessage}
//                 onChange={handleMessageChange}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-colors duration-300"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

// ---------------------------------------------------------------------------





import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: 'user' },
    ]);

    try {
      const response = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      });
      const data = await response.json();
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response || "Sorry, I didn't understand that.", sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' },
      ]);
    }

    setUserMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed z-50 md:bottom-10 md:right-10 transition-all duration-300">
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ${
          isOpen ? 'md:block hidden' : 'block'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed md:absolute md:bottom-20 bottom-0 right-0 w-full md:w-96 h-[100vh] md:h-[500px] bg-white md:rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center md:rounded-t-lg">
            <h3 className="text-lg font-semibold">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t bg-white p-3">
            <div className="relative flex items-center space-x-2">
              <input
                type="text"
                value={userMessage}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition-colors duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 px-1">
              Press Enter to send
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;