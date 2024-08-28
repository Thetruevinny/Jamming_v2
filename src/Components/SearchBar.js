import React, { useEffect } from 'react';
import styles from './Styles/SearchBar.module.css';
import { getToken, SearchCall } from './Api.js';

function SearchBar(props) {

    useEffect(() => {
        getToken(props.setTokenInfo);
      }, []);
    
    function onSubmitHandler(event) {
        event.preventDefault();
        SearchCall(props.search, props.tokenInfo, props.setResults);
        props.setSearch('');

    };
    

    return (
        <div className={styles.searchBar}>
            <input type='text' className={styles.songSearch} value={props.search} onChange={props.onChangeHandler}/>
            <button type='submit' className={styles.submit} onClick={onSubmitHandler}>SEARCH</button>
        </div>
    );
}

export default SearchBar;