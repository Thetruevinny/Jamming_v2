import logo from './logo.svg';
import './App.css';
import Title from './Components/Title.js';
import SearchBar from './Components/SearchBar.js';
import Playlist from './Components/Playlist.js';
import Results from './Components/Results.js';
import React, {useState , useEffect} from 'react';
import { saveToSpotify, getToken, getAccessToken } from './Components/Api.js';

function App() {

  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [search, setSearch] = useState('');
  const [tokenInfo, setTokenInfo] = useState();
  const [playlistName, setPlaylistName] = useState();

  // Setting Search value to input field in searchbar
  function searchChange(event) {
    setSearch(event.target.value);
  };

  // Setting Playlist Name value to playlistName state
  function pNameChange(event) {
    setPlaylistName(event.target.value);
  };

  // Saving Playlist to Spotify account
  function savePlaylist(event) {
    event.preventDefault();
    saveToSpotify(playlistName, playlist, setPlaylist, setResults);
  };

  // To remove token after expires, issue to check later.
  useEffect(() => {
    if (tokenInfo) {
      const time = tokenInfo.expires_in * 1000;
      setTimeout(() => {setTokenInfo()}, time);
    };
  }, [tokenInfo]);

  return (
    <div className="App" data-testid='App-1'>
      <header className="App-header">
        <Title />
      </header>
      <main className="App-body">
        <SearchBar  
          search={search}
          setSearch = {setSearch}
          onChangeHandler={searchChange} 
          setTokenInfo={setTokenInfo} 
          tokenInfo={tokenInfo} 
          setResults={setResults}
        />
        <div className='Main-Content'>
          <Playlist 
            added={playlist} 
            setPlaylist={setPlaylist} 
            onChangeHandler={pNameChange} 
            name={playlistName}
            onClickHandler={savePlaylist}
          />
          <Results results={results} playlist={playlist} setPlaylist={setPlaylist}/>
        </div>
      </main>
    </div>
  );
}

export default App;
