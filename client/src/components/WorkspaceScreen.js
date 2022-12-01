import { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar.js'
import { Grid, Typography } from '@mui/material'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    const {selectedPlaylist} = props;
    const {id} = useParams();

    // useEffect(() => {
    //     console.log("TEST" + id);
    //     if(store.currentList == null){
    //         console.log("ERROR");
    //         store.history.push('/');
    //     }
    // })

    // let modalJSX = "";
    // if (store.isEditSongModalOpen()) {
    //     modalJSX = <MUIEditSongModal />;
    // }
    // else if (store.isRemoveSongModalOpen()) {
    //     modalJSX = <MUIRemoveSongModal />;
    // }
    
    let JSX = "";
    if(store.currentList !== null){
        // console.log("ERROR");
        if(store.currentList.songs.length == 0){
            return(<div>No songs</div>)
        }

        JSX = store.currentList.songs.map((song, index) => (
            <SongCard
                id={'playlist-song-' + (index)}
                key={'playlist-song-' + (index)}
                index={index}
                song={song}
            />
        ))  

        // JSX = selectedPlaylist.songs.map((song, index) => (
        //     <SongCard
        //         id={'playlist-song-' + (index)}
        //         key={'playlist-song-' + (index)}
        //         index={index}
        //         song={song}
        //     />
        // ))
    }

    return (
        <Box 
            style={{maxHeight: 250, overflow: 'scroll'}}>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%'}}
        >
            {
                JSX
            }
        </List> 
        {/* <EditToolbar/>            */}
        {/* { modalJSX }       */}
        </Box>
    )
}

export default WorkspaceScreen;