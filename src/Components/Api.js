global.Buffer = global.Buffer || require('buffer').Buffer;

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

// Generating Access Token when user starts the session.
async function getToken(setTokenInfo) {
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

    if (response.ok) {
        const tokenObj = await response.json();
        setTokenInfo(tokenObj);
    }
  };

async function SearchCall(search, tokenInfo, setResults) {
    search = search.replace(' ', '+');
    const URL = `https://api.spotify.com/v1/search?query=${search}&type=track&offset=0&limit=10`;
    // const encoded_uri = encodeURI(URL);
    alert(tokenInfo.access_token);
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokenInfo.access_token
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            const resultsArray = jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    song: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name
                };
            });
            alert(resultsArray);
            setResults(resultsArray);
        }
    } catch (error) {
        console.log(error);
    };

};

export { getToken, SearchCall };