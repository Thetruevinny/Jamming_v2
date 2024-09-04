import { render, screen, cleanup } from '@testing-library/react';
import Results from '../Results';

// Rendering Results
test('Redner Results Component', () => {
    const results = [{
        id: 1,
        song: "Not Afraid",
        artist: 'Eminem',
        album: 'Not Afraid'
    }];

    render(<Results results={results} />);
    const playlistElement = screen.getByTestId('results-1');
    expect(playlistElement).toBeInTheDocument();
});