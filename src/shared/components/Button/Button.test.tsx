import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import Button from '../Button';
import { FaHeart } from 'react-icons/fa';

jest.mock('../Button.module.scss', () => ({
  button: 'button-base',
  primary: 'variant-primary',
  secondary: 'variant-secondary',
  danger: 'variant-danger',
  ghost: 'variant-ghost',
  medium: 'size-medium',
  small: 'size-small',
  large: 'size-large',
  iconWrapper: 'icon-wrapper',
}));

describe('Button Component', () => {
  test('should render with default variant (primary) and size (medium)', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    
    expect(buttonElement).toHaveClass('button-base');
    expect(buttonElement).toHaveClass('variant-primary');
    expect(buttonElement).toHaveClass('size-medium');
  });

  test('should apply custom variant (danger) and size (small)', () => {
    render(<Button variant="danger" size="small">Delete</Button>);
    const buttonElement = screen.getByRole('button', { name: /delete/i });

    expect(buttonElement).toHaveClass('variant-danger');
    expect(buttonElement).toHaveClass('size-small');
    expect(buttonElement).not.toHaveClass('variant-primary');
  });

  test('should apply the provided className', () => {
    const customClass = 'custom-test-class';
    render(<Button className={customClass}>Submit</Button>);
    const buttonElement = screen.getByRole('button', { name: /submit/i });

    expect(buttonElement).toHaveClass(customClass);
  });

  test('should call the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Click</Button>);
    const buttonElement = screen.getByRole('button', { name: /test click/i });

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should render the children and the icon', () => {
    render(<Button icon={<FaHeart data-testid="heart-icon" />}>Favorite</Button>);

    const buttonElement = screen.getByRole('button', { name: /favorite/i });
    const iconElement = screen.getByTestId('heart-icon');

    expect(iconElement.parentElement).toHaveClass('icon-wrapper');
    expect(buttonElement).toContainElement(iconElement);
  });
  
  test('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });

    expect(buttonElement).toBeDisabled();
  });
});
