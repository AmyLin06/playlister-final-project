import { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    const {id} = useParams();

    useEffect(() => {
        console.log("TEST" + id);
        if(store.currentList == null){
            console.log("ERROR");
            store.history.push('/');
        }
    })

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    
    let JSX = "";
    if(store.currentList !== null){
        console.log("ERROR");
        JSX = store.currentList.songs.map((song, index) => (
            <SongCard
                id={'playlist-song-' + (index)}
                key={'playlist-song-' + (index)}
                index={index}
                song={song}
            />
        ))  
    }

    return (
        <Box>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {
                // store.currentList.songs.map((song, index) => (
                //     <SongCard
                //         id={'playlist-song-' + (index)}
                //         key={'playlist-song-' + (index)}
                //         index={index}
                //         song={song}
                //     />
                // ))  
                JSX
            }
         </List>            
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;