import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { IconButton, Typography } from '@mui/material'
import AuthContext from '../auth';
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleCreateNewList () {
        store.createNewList();
    }

    let text ="Add List";
    if (store.currentList && auth.loggedIn)
        text = store.currentList.name;
    
    return (
        <div id="playlister-statusbar">
            {/* <Typography variant="h4">{text}</Typography> */}
            <IconButton onClick={handleCreateNewList}>
                <AddIcon />
            </IconButton>
            Add New Playlist
        </div>
    );
}

export default Statusbar;