import { render, screen, cleanup } from '@testing-library/react';
import Playlist from '../Playlist';

// Rendering Playlist
test('Render Playlist Component', () => {
    const playlist = [{
        id: 1,
        song: "Waka Waka",
        artist: 'Shakira',
        album: 'Sol de Sol'
    }];

    render(<Playlist added={playlist} />);
    const playlistElement = screen.getByTestId('playlist-1');
    expect(playlistElement).toBeInTheDocument();
})