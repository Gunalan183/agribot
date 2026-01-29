import React from 'react';

/**
 * Result card component for displaying recommendations/predictions
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {Array} props.items - Array of items to display
 * @param {string} props.type - Type of card (crop, disease, tip)
 */
const ResultCard = ({ title, subtitle, items, type = "default" }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'crop':
        return 'border-l-4 border-agri-green bg-green-50';
      case 'disease':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'tip':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      default:
        return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className={`agri-card ${getTypeStyles()} shadow-lg`}>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
            {item.name && (
              <h4 className="font-semibold text-lg text-agri-dark mb-2">{item.name}</h4>
            )}
            {item.reason && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Why:</span> {item.reason}
              </p>
            )}
            {item.description && (
              <p className="text-gray-600 mb-2">{item.description}</p>
            )}
            {item.fertilizer && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Fertilizer:</span> {item.fertilizer}
              </p>
            )}
            {item.symptoms && (
              <div className="mb-2">
                <p className="font-medium text-gray-700">Symptoms:</p>
                <p className="text-gray-600">{item.symptoms}</p>
              </div>
            )}
            {item.treatment && (
              <div className="mb-2">
                <p className="font-medium text-gray-700">Treatment:</p>
                <p className="text-gray-600">{item.treatment}</p>
              </div>
            )}
            {item.prevention && (
              <div>
                <p className="font-medium text-gray-700">Prevention:</p>
                <p className="text-gray-600">{item.prevention}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;