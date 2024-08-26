import React from 'react';
import styles from './Styles/SearchBar.module.css'

function SearchBar(props) {
    return (
        <div className={styles.searchBar}>
            <input type='text' className={styles.songSearch} value={props.search} onChange={props.onChangeHandler}/>
            <button type='submit' className={styles.submit}>SEARCH</button>
        </div>
    );
}

export default SearchBar;