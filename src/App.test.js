import { render, screen } from '@testing-library/react';
import App from './App';
import Tablero from './Tablero';

jest.mock('./Tablero', () => {
  return function MockTablero() {
    return <div data-testid="tablero-mock">Mock Tablero Component</div>;
  };
});

test('renders Memory Game title', () => {
  render(<App />);
  const titleElement = screen.getByText(/memory game/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Tablero component', () => {
  render(<App />);
  const tableroElement = screen.getByTestId('tablero-mock');
  expect(tableroElement).toBeInTheDocument();
});
