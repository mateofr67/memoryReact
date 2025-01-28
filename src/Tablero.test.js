import { render, screen, fireEvent } from '@testing-library/react';
import Tablero from './Tablero';

test('renders Tablero with cards', () => {
  render(<Tablero />);
  const cardElements = screen.getAllByRole('img'); // Assuming the cards render as images
  expect(cardElements.length).toBeGreaterThan(0);
});

test('flips a card when clicked', () => {
  render(<Tablero />);
  const firstCard = screen.getAllByRole('img')[0];

  // Simulate flipping the card
  fireEvent.click(firstCard);

  // We expect some state or visual change; placeholder logic below
  expect(firstCard).toHaveAttribute('src', expect.stringContaining('carta'));
});



