import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import MUIEditSongModal from './MUIEditSongModal'
import AppToolbar from './AppToolbar'
import Statusbar from './Statusbar';
import WorkspaceScreen from './WorkspaceScreen'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

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
            <List sx={{ width: '90%', left: '5%'}} disablePadding>
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

    // if (store.currentList !== null){
    //     listCard = <WorkspaceScreen />
    // }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }else if(store.isDeleteListModalOpen()) {
        modalJSX = <MUIDeleteModal />;
    }

    return (
        <div id="home-screen" >
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
                        {/* <Tabs>
                            <Tab label="Player"/>
                            <Tab label="Comment"/>
                        </Tabs> */}
                    </Grid>
                </Grid>
                {modalJSX}
            </div>

            <Statusbar />
        </div>)
}

export default HomeScreen;