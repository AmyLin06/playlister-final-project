import React from 'react';
import YouTube from 'react-youtube';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';

export default function YouTubePlayerExample() {
    const { store } = useContext(GlobalStoreContext);
    const [currentSong, setCurrentSong] = useState(0);

    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    // let playlist = [
    //     "mqmxkGjow1A",
    //     "8RbXIMZmVv8",
    //     "8UbNbor3OqQ"
    // ];
    
    

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    // let currentSong = store.currentYTSong;

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        if((currentSong + 1) > playlist.length){
            setCurrentSong(0);
            console.log("reached here");
        }
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        // currentSong++
        // currentSong = currentSong % playlist.length;
        // store.incYouTubeSongIndex(currentSong);
        setCurrentSong((currentSong + 1) % playlist.length);
    }
    function decSong() {
        setCurrentSong(Math.abs((currentSong - 1)) % playlist.length)
    }

    let player;
    function onPlayerReady(event) {
        player = event.target;
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function handlePrevButton () {
        decSong();
        player.playVideo();
    }
    function handlePauseButton () {
        player.pauseVideo();
    }
    function handlePlayButton() {
        player.playVideo();
    }
    function handleNextButton() {
        incSong();
        player.playVideo();
    }

    let playlist = [];
    if(store.currentList !== null && store.currentList.publishedDate !== undefined){
        playlist = store.currentList.songs.map((song) => (song.youTubeId));
    }
    
    let playlistPlayingName = "";
    let currentSongNum = "";
    let currentSongTitle = "";
    let currentSongArtist = "";
    if(store.currentList !== null && store.currentList.publishedDate !== undefined && store.currentList.songs.length > 0){
        if((currentSong + 1) > playlist.length){
            setCurrentSong(0);
            console.log("reached here");
        }else{
        playlistPlayingName = store.currentList.name;
        currentSongNum = currentSong + 1;
        currentSongTitle = store.currentList.songs[currentSong].title;
        currentSongArtist = store.currentList.songs[currentSong].artist;
        }
    }

    return (
        <Box style={{height: '100%', position: 'relative'}}>
            <YouTube
                videoId={playlist[currentSong]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} />
            <div id = 'youtubePlayerInfoBox'>
                <Typography style={{textAlign: "center"}}>Now Playing</Typography>
                <Typography>Playlist: {playlistPlayingName}</Typography>
                <Typography>Song #: {currentSongNum}</Typography>
                <Typography>Title: {currentSongTitle}</Typography>
                <Typography>Artist: {currentSongArtist}</Typography>

                <Box style={{textAlign: "center"}}>
                    <IconButton onClick={handlePrevButton}><FastRewindIcon/></IconButton>
                    <IconButton onClick={handlePauseButton}><StopIcon/></IconButton>
                    <IconButton onClick={handlePlayButton}><PlayArrowIcon/></IconButton>
                    <IconButton onClick={handleNextButton}><FastForwardIcon/></IconButton>
                </Box>
            </div>
        </Box> 
    );
}