import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import AppToolbar from './AppToolbar'
import Statusbar from './Statusbar';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="home-screen" >
            {/* <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div> */}

            <AppToolbar />
            <div id="playlist-youtube-container">
                <Grid container>
                    {/* <Grid item xs={12} id="app-toolbar">
                        <AppToolbar />
                    </Grid> */}
                    <Grid item xs={8} id="list-selector-list">
                        {listCard}                 
                    </Grid>
                    <Grid item xs={4}>
                        SPACE FOR YOUTUBE
                    </Grid>
                </Grid>
                <MUIDeleteModal />
            </div>

            <Statusbar />
        </div>)
}

export default HomeScreen;