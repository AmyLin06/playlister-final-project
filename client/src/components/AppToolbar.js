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

function AppToolbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isSortMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleSortMenuClose = () => {
        setAnchorEl(null);
    }

    const sortPlaylistMenu = 
        <Menu
            anchorEl={anchorEl}
            open={isSortMenuOpen}
            onClose={handleSortMenuClose}
        >
            <MenuItem>A-Z</MenuItem>
        </Menu>

    return(
        <div id="app-toolbar">
            <Toolbar>
                <Grid container>
                    <Grid item xs={3}>
                        <IconButton>
                            <HomeIcon />
                        </IconButton>
                        <IconButton>
                            <GroupsIcon />
                        </IconButton>
                        <IconButton>
                            <PersonIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={4}>
                        <input id="search-bar" placeholder="Search"/>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={1}>
                        Sort By
                        <IconButton
                            onClick={handleSortMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        {sortPlaylistMenu}
                    </Grid>
                </Grid>
            </Toolbar> 
        </div>      
    );
}

export default AppToolbar;