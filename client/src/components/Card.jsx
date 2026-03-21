import React from 'react';

const Card = ({ children, className = '', title = '', icon: Icon = null }) => {
  return (
    <div className={`card overflow-hidden ${className}`}>
      {(title || Icon) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center space-x-3 bg-gray-50/50">
          {Icon && <Icon className="h-5 w-5 text-primary-600" />}
          {title && <h3 className="font-bold text-gray-800">{title}</h3>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
