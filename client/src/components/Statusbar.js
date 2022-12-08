import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { IconButton, Typography } from '@mui/material'
import AuthContext from '../auth';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
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

    let text = 
        <Box>
            <IconButton onClick={handleCreateNewList}>
                <AddIcon />
            </IconButton>
            Add List
        </Box>

    if(auth.user.email == "guestaccount@gmail.com"){
        text = "";
    }

    if (store.currentList && auth.loggedIn)
        text = store.currentList.name
     
    return (
        <div id="playlister-statusbar">
            {/* <Typography variant="h4">{text}</Typography> */}
            {text}
        </div>
    );
}

export default Statusbar;