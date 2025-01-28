import { render, screen, fireEvent, act } from '@testing-library/react';
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
  it('renders without crashing', () => {
    render(<Tablero />);
    expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();
  });

  it('flips a card when clicked', () => {
    render(<Tablero />);
    const firstCard = screen.getByTestId('card-0');
    
    // Initially card is hidden
    expect(firstCard.style.background).toBe('hidden');

    // Flip the card
    fireEvent.click(firstCard);

    // Verify card is flipped
    expect(firstCard.style.background).toBe('flipped');
  });

  it('shows a win message when all cards are matched', () => {
    render(<Tablero />);

    // Simulate flipping all cards (mocked flipping)
    const cards = screen.getAllByTestId(/^card-/);
    act(() => {
      cards.forEach(card => fireEvent.click(card));
    });

    // Verify win message
    expect(screen.getByTestId('win-message')).toBeInTheDocument();
    expect(screen.getByText(/Felicidades, ganaste!/i)).toBeInTheDocument();
  });

  it('restarts the game when the win message button is clicked', () => {
    render(<Tablero />);
    
    // Simulate winning condition
    const cards = screen.getAllByTestId(/^card-/);
    act(() => {
      cards.forEach(card => fireEvent.click(card));
    });

    // Click the restart button
    fireEvent.click(screen.getByText('Restart'));

    // Assert the message disappears after restart
    expect(screen.queryByTestId('win-message')).not.toBeInTheDocument();
  });
});
