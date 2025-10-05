import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

const Card: React.FC<CardProps> = ({ children, className = '', as: Component = 'div', ...props }) => {
  return (
    <Component
      className={`bg-white rounded-3xl shadow-soft p-6 card-tilt ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
