import { render, screen } from '@testing-library/react';

import If from './index'

describe('If Component', () => {
  it('should render children when condition is true', () => {
    render(
      <If condition={true}>
        <div data-testid="content">Rendered content</div>
      </If>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Rendered content')).toBeInTheDocument();
  });

  it('should not render children when condition is false', () => {
    render(
      <If condition={false}>
        <div data-testid="content">Content not rendered</div>
      </If>
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    expect(screen.queryByText('Content not rendered')).not.toBeInTheDocument();
  });

  it('should not render children when condition is null', () => {
    render(
      <If condition={null}>
        <div data-testid="content">Content with null condition</div>
      </If>
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should not render children when condition is undefined', () => {
    render(
      <If condition={undefined}>
        <div data-testid="content">Content with undefined condition</div>
      </If>
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should render multiple children when condition is true', () => {
    render(
      <If condition={true}>
        <div>First child</div>
        <div>Second child</div>
        <span>Third child</span>
      </If>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('should work with string children', () => {
    render(
      <If condition={true}>
        Direct text as children
      </If>
    );

    expect(screen.getByText('Direct text as children')).toBeInTheDocument();
  });

  it('should work with number children', () => {
    render(
      <If condition={true}>
        {42}
      </If>
    );

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should handle complex JSX children when condition is true', () => {
    const MockComponent = () => <button>Click here</button>;

    render(
      <If condition={true}>
        <div className="container">
          <h1>Title</h1>
          <MockComponent />
          <p>Paragraph text</p>
        </div>
      </If>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Click here')).toBeInTheDocument();
    expect(screen.getByText('Paragraph text')).toBeInTheDocument();
  });

  it('should render nothing when condition is false with complex children', () => {
    render(
      <If condition={false}>
        <div className="complex-structure">
          <header>Header</header>
          <main>Main content</main>
          <footer>Footer</footer>
        </div>
      </If>
    );

    expect(screen.queryByText('Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Main content')).not.toBeInTheDocument();
    expect(screen.queryByText('Footer')).not.toBeInTheDocument();
  });

  it('should render component children when condition is true', () => {
    const TestComponent = () => <span>Test Component</span>;
    
    render(
      <If condition={true}>
        <TestComponent />
      </If>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('should not render component children when condition is false', () => {
    const TestComponent = () => <span>Test Component</span>;
    
    render(
      <If condition={false}>
        <TestComponent />
      </If>
    );

    expect(screen.queryByText('Test Component')).not.toBeInTheDocument();
  });
});
