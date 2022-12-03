import { IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { useContext, useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import GlobalStoreContext from "../store";
import { useHistory, useParams } from "react-router-dom";

function AppToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isSortMenuOpen = Boolean(anchorEl);
    const [searchScreen, setSearchScreen] = useState("homeScreen");

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleSortMenuClose = () => {
        setAnchorEl(null);
    }

    const handlePlaylistSort = (event, sortType) => {
        store.loadSortedPlaylist(sortType);
    }
  
    const handleSwitchScreen = (screen) => {
        if(screen == 'homeScreen'){
            store.loadIdNamePairs();
        }
        setSearchScreen(screen);
    }
    const handleKeyPress = (event) => {
        if (event.code === "Enter" && (searchScreen !== "homeScreen")) {
            store.loadSearchResults(searchScreen, event.target.value);
        }
    }

    const sortPlaylistMenu = 
        <Menu
            anchorEl={anchorEl}
            open={isSortMenuOpen}
            onClose={handleSortMenuClose}
        >
            <MenuItem onClick={(event) => {handlePlaylistSort(event, "name")}}>Name (A-Z)</MenuItem>
            <MenuItem>Publish Date (Newest)</MenuItem>
            <MenuItem>Listens (High - Low)</MenuItem>
            <MenuItem>Likes (High - Low)</MenuItem>
            <MenuItem>Dislikes (High - Low)</MenuItem>
        </Menu>

    let HomeIconHighlight = {};
    let GroupsIconHighlight = {};
    let PersonIconHighlight = {};
    
    if(searchScreen == 'homeScreen'){
        HomeIconHighlight = {color: 'white'};
    }else if(searchScreen == 'playlistNameSearchScreen'){
        GroupsIconHighlight = {color: 'white'};
    }else{
        PersonIconHighlight = {color: 'white'};
    }

    return(
        <div id="app-toolbar">
            <Toolbar>
                <Grid container>
                    <Grid item xs={3}>
                        <IconButton sx={HomeIconHighlight} onClick={(event) => {handleSwitchScreen("homeScreen")}}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton sx={GroupsIconHighlight} onClick={(event) => {handleSwitchScreen("playlistNameSearchScreen")}}>
                            <GroupsIcon />
                        </IconButton>
                        <IconButton sx={PersonIconHighlight} onClick={(event) => {handleSwitchScreen("usernameSearchScreen")}}>
                            <PersonIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={4}>
                        <input 
                            id="search-bar" 
                            placeholder="Search"
                            onKeyPress={handleKeyPress}
                        />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={1}>
                        Sort By
                        <IconButton
                            onClick={handleSortMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar> 
            {sortPlaylistMenu}
        </div>      
    );
}

export default AppToolbar;