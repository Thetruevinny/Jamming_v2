import { render, screen, cleanup } from '@testing-library/react';
import App from '../../App';

// Rendering Playlist
test('Render App Component', () => {

    render(<App />);
    const playlistElement = screen.getByTestId('App-1');
    expect(playlistElement).toBeInTheDocument();
})