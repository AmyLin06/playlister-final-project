import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import MUIEditSongModal from './MUIEditSongModal'
import AppToolbar from './AppToolbar'
import Statusbar from './Statusbar';
import WorkspaceScreen from './WorkspaceScreen'
import YouTube from 'react-youtube';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import YouTubePlayerExample from './PlaylisterYouTubePlayer'
import ListComment from './PlaylisterComment'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [tabValue, setTabValue] = useState('player');

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    function handleTabChange(event, newValue) {
        setTabValue(newValue);
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '96%', left: '2%'}} disablePadding>
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
                    <Grid item xs={7} id="list-selector-list">
                        {listCard}                 
                    </Grid>
                    <Grid item xs={5}>     
                        <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleTabChange}>
                                    <Tab label="Player" value="player" />
                                    <Tab label="Comment" value="comment" />
                                </TabList>
                            </Box>
                            <TabPanel value="player" style={{padding: 0, height: '90%'}}><YouTubePlayerExample/></TabPanel>
                            <TabPanel value="comment" style={{padding: 0, height: '90%'}}><ListComment/></TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
                {modalJSX}
            </div>

            <Statusbar />
        </div>)
}

export default HomeScreen;