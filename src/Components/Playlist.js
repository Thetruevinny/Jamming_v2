import React from 'react';
import Styles from './Styles/Playlist.module.css';
import Tracklist from './Tracklist';

function Playlist(props) {
    function remove(event) {
        const id = Number(event.target.id);
        props.setPlaylist(prev => prev.filter(song => song.id !== id));
    };

    return (
        <div className={Styles.playlist} data-testid='playlist-1'>
            <input 
                type='text' 
                placeholder='Playlist Name?' 
                className={Styles.name} 
                onChange={props.onChangeHandler}
                value={props.name}
            ></input>
            <hr></hr>
            <Tracklist tracks={props.added} type='playlist' remove={remove}/>
            <button className={Styles.save} onClick={props.onClickHandler}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;