import logo from './logo.svg';
import './App.css';
import Title from './Components/Title.js';
import SearchBar from './Components/SearchBar.js';
import Playlist from './Components/Playlist.js';
import Results from './Components/Results.js';
import React, {useState , useEffect} from 'react';

function App() {

  const initialResults = [
    {
      id: 0,
      song: 'Billy Jean',
      artist: 'Michael Jackson',
      album: 'Thriller'
    },
    {
      id: 1,
      song: 'Mockingbird',
      artist: 'Eminem',
      album: 'Encore'
    }
  ];

  const added = [{
    id: 0,
    song: 'Waka Waka',
    artist: 'Shakira',
    album: 'Sale el Sol'
  }];

  const [results, setResults] = useState(initialResults);
  const [playlist, setPlaylist] = useState(added);
  const [search, setSearch] = useState('');
  const [tokenInfo, setTokenInfo] = useState();

  // Setting Search value to input field in searchbar
  function searchChange(event) {
    setSearch(event.target.value);
  };

  // To remove token after expires, issue to check later.
  useEffect(() => {
    if (tokenInfo) {
      alert(tokenInfo.access_token);
      const time = tokenInfo.expires_in * 1000;
      setTimeout(() => {setTokenInfo()}, time);
    };
  }, [tokenInfo]);

  return (
    <div className="App">
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
          <Playlist added={playlist} setPlaylist={setPlaylist}/>
          <Results results={results} playlist={playlist} setPlaylist={setPlaylist}/>
        </div>
      </main>
    </div>
  );
}

export default App;
