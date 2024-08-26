import logo from './logo.svg';
import './App.css';
import Title from './Components/Title.js';
import SearchBar from './Components/SearchBar.js';
import Playlist from './Components/Playlist.js';
import Results from './Components/Results.js';
import React, {useState , useEffect} from 'react';
import getToken from './Components/Api.js';

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
  const [tokenInfo, setTokenInfo] = useState([]);

  function searchChange(event) {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const tokenObj = getToken();
    setTokenInfo(prev => [...prev, tokenObj]);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <Title />
      </header>
      <main className="App-body">
        <SearchBar  search={search} onChangeHandler={searchChange}/>
        <div className='Main-Content'>
          <Playlist added={playlist} setPlaylist={setPlaylist}/>
          <Results results={results} playlist={playlist} setPlaylist={setPlaylist}/>
        </div>
      </main>
    </div>
  );
}

export default App;
