import React from 'react';

/**
 * Chat message bubble component
 * @param {Object} props - Component props
 * @param {string} props.text - Message content
 * @param {boolean} props.isBot - Whether message is from bot (true) or user (false)
 * @param {string} props.timestamp - Message timestamp
 */
const ChatBubble = ({ text, isBot, timestamp }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${isBot ? 'bg-gray-200 text-gray-800' : 'bg-agri-green text-white'}`}>
        <p className="text-sm">{text}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-agri-light opacity-80'}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;