import { render, screen, fireEvent } from '@testing-library/react';
import Tablero from './Tablero';

test('renders Tablero with cards', () => {
  render(<Tablero />);
  const cards = screen.getAllByTestId(/^card-/); // Assuming each card has data-testid="card-{index}"
  expect(cards.length).toBeGreaterThan(0);
});

test('flips a card when clicked', () => {
  render(<Tablero />);
  const firstCard = screen.getAllByTestId(/^card-/)[0];

  // Simulate flipping the card
  fireEvent.click(firstCard);

  // Check for some visual or state change (replace with a real assertion)
  expect(firstCard).not.toHaveStyle('background: hidden');
});

test('shows win message after flipping all cards', () => {
  render(<Tablero />);
  const cards = screen.getAllByTestId(/^card-/);

  cards.forEach(card => fireEvent.click(card)); // Simulate flipping all cards

  const winMessage = screen.getByText(/Felicidades, ganaste!/i);
  expect(winMessage).toBeInTheDocument();
});


