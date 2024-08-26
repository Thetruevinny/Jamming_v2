// import resolve.fallback: { "buffer": false };
global.Buffer = require('buffer').Buffer;

const client_id = 'fa315daf73f7469191fd1b251e34917c';
const client_secret = 'e118741e68dd4649aa3e38727088ec71';

function generateRandomString(num) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let randString = '';
    for (let i = 0; i < num; i++) {
        let randomIndex = Math.floor(Math.random()*alphabet.length);
        randString += alphabet[randomIndex];
    }

    return randString;
};

async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
      },
    });
  
    return await response.json();
  };

async function SearchCall(search) {
    const URL = `https://api.spotify.com/v1/search?query=${search}&type=track&offset=0&limit=10`;
    const encoded_uri = encodeURI(URL);
    try {
        const response = await fetch(encoded_uri);
        if (response.ok) {
            const jsonResponse = await response.json();
            const resultsArray = jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    song: track.name,
                    artist: track.artists.name,
                    album: track.album.name
                };
            });
        }
    } catch (error) {
        console.log(error);
    };

};

console.log(getToken());

export default getToken;