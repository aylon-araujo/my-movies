import { fireEvent,render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputSearch } from './index';

jest.mock('./styles.module.scss', () => ({
  inputSearchWrapper: 'inputSearchWrapper',
  inputSearch: 'inputSearch',
}));

describe('InputSearch Component', () => {
  const mockOnInputChange = jest.fn();
  const inputPlaceHolder = 'Buscar filmes...';
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the input with correct attributes', () => {
    render(<InputSearch onInputChange={mockOnInputChange} value="" />);

    const inputElement = screen.getByPlaceholderText(inputPlaceHolder);
    
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('id', 'input-search');
    expect(inputElement).toHaveValue('');
  });

  it('should display the initial value correctly', () => {
    const initialValue = 'Avengers';
    render(<InputSearch onInputChange={mockOnInputChange} value={initialValue} />);

    const inputElement = screen.getByDisplayValue(initialValue);
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onInputChange when user types in the input', async () => {
    const user = userEvent.setup();

    render(<InputSearch onInputChange={mockOnInputChange} value="" />);

    const inputElement = screen.getByPlaceholderText(inputPlaceHolder);
    const testValue = 'Inception';

    await user.type(inputElement, testValue);
    
    expect(mockOnInputChange).toHaveBeenCalledTimes(testValue.length);
    
    const lastCall = mockOnInputChange.mock.lastCall[0];
    expect(lastCall).toMatchObject({
      type: 'change',
      target: expect.any(Object)
    });
  });

  it('should update when value prop changes', () => {
    const { rerender } = render(<InputSearch onInputChange={mockOnInputChange} value="Initial" />);

    expect(screen.getByDisplayValue('Initial')).toBeInTheDocument();

    rerender(<InputSearch onInputChange={mockOnInputChange} value="Updated" />);

    expect(screen.getByDisplayValue('Updated')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Initial')).not.toBeInTheDocument();
  });

  it('should have the correct placeholder text', () => {
    render(<InputSearch onInputChange={mockOnInputChange} value="" />);

    const inputElement = screen.getByPlaceholderText(inputPlaceHolder);
    expect(inputElement).toBeInTheDocument();
  });

  it('should render within the wrapper div with correct classes', () => {
    render(<InputSearch onInputChange={mockOnInputChange} value="" />);

    const wrapperDiv = screen.getByPlaceholderText(inputPlaceHolder).parentElement;
    expect(wrapperDiv).toHaveClass('inputSearchWrapper');
    expect(screen.getByPlaceholderText(inputPlaceHolder)).toHaveClass('inputSearch');
  });

  it('should handle multiple change events', async () => {
    const user = userEvent.setup();
    render(<InputSearch onInputChange={mockOnInputChange} value="" />);

    const inputElement = screen.getByPlaceholderText(inputPlaceHolder);

    await user.type(inputElement, 'Hi');
    
    expect(mockOnInputChange).toHaveBeenCalledTimes(2);

    mockOnInputChange.mock.calls.forEach(call => {
      const event = call[0];
      expect(event).toMatchObject({
        type: 'change',
        target: inputElement
      });
    });
  });

  it('should pass the correct event object to onInputChange', () => {
    render(<InputSearch onInputChange={mockOnInputChange} value="" />);

    const inputElement = screen.getByPlaceholderText(inputPlaceHolder);
    
    fireEvent.change(inputElement, { target: { value: 'Test Movie' } });

    expect(mockOnInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'change',
        target: inputElement,
        bubbles: true,
        cancelable: false
      })
    );
  });
});
