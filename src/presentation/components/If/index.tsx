import React from 'react';

interface IfProps {
  condition: boolean | null | undefined;
  children: React.ReactNode;
}

const If: React.FC<IfProps> = ({ condition, children }) => {
  if (!condition) return null;
  return <>{children}</>;
};

export default If;
