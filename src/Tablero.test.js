import { render, screen, fireEvent } from '@testing-library/react';
import Tablero from './Tablero';


test('flips a card when clicked', () => {
  render(<Tablero />);
  const firstCard = screen.getAllByRole('button')[0];
  
  // Simulate flipping the card
  fireEvent.click(firstCard);
  
  // After flipping, verify card is flipped visually or logically (simplified here)
  expect(firstCard).not.toHaveStyle('background: hidden');
});

test('shows win message after flipping all cards', () => {
  render(<Tablero />);
  const cards = screen.getAllByRole('button');

  // Simulate flipping all cards to trigger win state
  cards.forEach(card => fireEvent.click(card));

  // Check for win message
  const winMessage = screen.getByText(/Felicidades, ganaste!/i);
  expect(winMessage).toBeInTheDocument();
});

