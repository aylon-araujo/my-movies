import React from 'react';

import type { IfProps } from './If.types';

export const If: React.FC<IfProps> = ({ condition, children }) => {
  if (!condition) return null;
  return <>{children}</>;
};
