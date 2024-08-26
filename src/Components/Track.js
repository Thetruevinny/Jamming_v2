import React from 'react';
import Styles from './Styles/Track.module.css'

function Track(props) {
    const type = props.type;
    const id = props.id;

    return (
        <>
            <div className={Styles.line}>
                <button className={Styles.change} id={id} onClick={props.function} >{type === 'results' ? '+' : '-'}</button>
                <div className={Styles.track}>
                    <p className={Styles.info}>Song: {props.song}</p>
                    <p className={Styles.info}>Artist: {props.artist}</p>
                    <p className={Styles.info}>Album: {props.album}</p>
                </div>
            </div>
            <hr className={Styles.hline}></hr>
        </>
    );
}

export default Track;