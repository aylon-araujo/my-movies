import React from 'react';
import type { ButtonProps } from './types';
import styles from './Button.module.scss'; 

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  variant = 'primary', 
  size = 'medium',     
  className = '',      
  ...rest
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant], 
    styles[size],    
    className,       
  ].join(' ');

  return (
    <button
      className={buttonClasses}
      {...rest}
    >
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;