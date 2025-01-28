import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Tablero from './Tablero';
import Card from './Card';
import Mensaje from './Mensaje';

jest.mock('./Card', () => {
  return ({ data, handler, indice }) => (
    <button 
      data-testid={`card-${indice}`} 
      onClick={() => handler(indice)} 
      style={{ background: data.state === 1 ? 'flipped' : 'hidden' }}
    >
      {data.imagen}
    </button>
  );
});

jest.mock('./Mensaje', () => {
  return ({ texto, handler }) => (
    <div data-testid="win-message">
      {texto}
      <button onClick={handler}>Restart</button>
    </div>
  );
});

describe('Tablero Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial cards', async () => {
    render(<Tablero />);
    
    // Wait for the card elements to render
    await waitFor(() => {
      const cards = screen.getAllByTestId(/^card-/);
      expect(cards.length).toBe(8); // Ensure all cards render
    });
  });

  it('flips a card when clicked', async () => {
    render(<Tablero />);
    const firstCard = await screen.findByTestId('card-0');

    expect(firstCard.style.background).toBe('hidden');

    // Flip the card
    fireEvent.click(firstCard);

    // Ensure card is flipped
    expect(firstCard.style.background).toBe('flipped');
  });

  it('shows a win message when all cards are matched', async () => {
    render(<Tablero />);
    const cards = await screen.findAllByTestId(/^card-/);

    // Simulate flipping all cards
    cards.forEach(card => fireEvent.click(card));

    // Verify win message
    const winMessage = await screen.findByTestId('win-message');
    expect(winMessage).toBeInTheDocument();
    expect(screen.getByText(/Felicidades, ganaste!/i)).toBeInTheDocument();
  });

  it('restarts the game when the win message button is clicked', async () => {
    render(<Tablero />);

    const cards = await screen.findAllByTestId(/^card-/);
    cards.forEach(card => fireEvent.click(card));

    // Click the restart button
    fireEvent.click(await screen.findByText('Restart'));

    // Assert the message disappears after restart
    expect(screen.queryByTestId('win-message')).not.toBeInTheDocument();
  });
});
