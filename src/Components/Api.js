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


// Function to pull track data from spotify
async function SearchCall(search, tokenInfo, setResults) {
    search = search.replace(' ', '+');
    const URL = `https://api.spotify.com/v1/search?query=${search}&type=track&offset=0&limit=10`;
    
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
                    album: track.album.name,
                    uri: track.uri
                };
            });
            setResults(resultsArray);
        }
    } catch (error) {
        console.log(error);
    };

};

const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;
let userId;
let randState = generateRandomString(16);

function getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}&state=${randState}`;
      window.location = accessUrl;
    }
};

// Function to retrieve clientID from Spotify API
async function saveToSpotify(playlistName, playlist, setPlaylist, setResults) {

    let url = 'https://api.spotify.com/v1/me';

    // Get access token which allows to acces user Info
    accessToken = getAccessToken();
    let playlistId;

    // Obtain user ID
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });


        if (response.ok) {
            const clientObj = await response.json();
            userId = clientObj.id;
        }

    } catch (error) {
        console.log(error);
    };

    url = `https://api.spotify.com/v1/users/${userId}/playlists`;


    // Creating the Playlist
    try {
        const responseCreatePL = await fetch(url, {
            method: 'POST',
            headers: {
               'Authorization': 'Bearer ' + accessToken,
               'Content-type': 'application/json' 
            },
            body: JSON.stringify({
                'name': playlistName,
                'description': 'Playlist Created from Jamming Web Application',
            })
        });

        if (responseCreatePL.ok) {
            const playlistObj = await responseCreatePL.json();
            playlistId = playlistObj.id;
        };

    } catch (error) {
        console.log(error);
    };

    const uri_list = playlist.map(track => track.uri);


    url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
        const trackResponse = await fetch(url, {
            method: 'POST',
            headers: {
               'Authorization': 'Bearer ' + accessToken,
               'Content-type': 'application/json' 
            },
            body: JSON.stringify({
                uris: uri_list
            })
        });

        if (trackResponse.ok) {
            setPlaylist([]);
            setResults([]);
        };

    } catch (error) {
        console.log(error);
    };
};

export { getToken, SearchCall, saveToSpotify, getAccessToken };