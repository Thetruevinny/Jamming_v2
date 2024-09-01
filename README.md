# Jamming

## Summary
The goal of the project was to design a website with React which enabled the user to search up songs to add to a custom playlist. This playlist could then be saved to the user's individual Spotify account. 

## Project Objectives
1. Build a Web app with React.
1. Version control your application with Git and host the repository on GitHub.
1. Integrate with the Spotify API.

## Features
### Searchbar
This is located at the top of the page and consists of an text input field and a search button. Users may type song titles into the input field and click search to see a list of songs that match.
### Results
The results field contains a list of all the songs which match the search criteria. There is an add button to add each song to the playlist which is positioned to the left of results.
### Playlist
The playlist has an input field which allows the user to type in a custom playlist name. Under this is a list of all the songs the user has added to the playlist. Each song has a remove button which can be used to remove songs from the playlist. At the bottom there is a save to Spotify button which can be used to save the playlist to the user's Spotify account.
### API interaction
The spotify API has different types of tokens which allow different types of access. The first token used in this application is client credentials access token. This is used when the user searches for songs. The second token used is the implicit grant flow token, which allows the application to save the custom playlist to the user's Spotify account. The reason I have used two types is for user experience. As the user may not want to give access to his account when he is just searching for songs and the first token call is done when the application renders without reqiuring user input.

## Future Work
- Currently when the user clicks save to Spotify, he is redirected to login to his Spotify account. When he returns to the application all work is lost. As I would like to only asks the user to login if he wants to save the playlist to Spotify, in future I will add a login button with text explaining its use or find a way to have the information retained when the user is redirected to the site.
- I will add three radio buttons to allow the user to choose between searching for tracks, albums and artists.