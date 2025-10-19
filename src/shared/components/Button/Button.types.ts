export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'; 
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  variant?: ButtonVariant; 
  size?: ButtonSize;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}