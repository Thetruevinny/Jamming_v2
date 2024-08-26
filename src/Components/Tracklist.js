import React from 'react';
import Track from './Track';
import Styles from './Styles/Tracklist.module.css'

function Tracklist(props) {
    const type = props.type;

    return (
        <ul className={Styles.tracklist}>
            {props.tracks.map((
                    { song, artist, album, id}) => 
                        <li>
                            <Track 
                                song={song} 
                                artist={artist} 
                                album={album} 
                                type={type} 
                                id = {id}
                                // add = {props.add}
                                // remove = {props.remove}
                                function={type === 'results' ? props.add : props.remove}
                            />
                        </li>
                )}
        </ul>
    );
};


export default Tracklist;