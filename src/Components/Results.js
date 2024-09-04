import React from 'react';
import Styles from './Styles/Results.module.css';
import Tracklist from './Tracklist';

function Results(props) {

    function add(event) {
        const id = event.target.id;
        const newSong = props.results.find(song => song.id == id);
        newSong.id = props.playlist.length;
        props.setPlaylist(prev => [newSong, ...prev]);
    };

    return (
        <div className={Styles.results} data-testid='results-1'>
            <h2>Results</h2>
            <hr className='Styles.line'></hr>
            <Tracklist tracks={props.results} type='results' add={add} />
        </div>
    );
};

export default Results;