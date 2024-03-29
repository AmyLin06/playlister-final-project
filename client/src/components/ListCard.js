import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import WorkspaceScreen from './WorkspaceScreen';
import EditToolbar from './EditToolbar';

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Button, Grid, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AuthContext from '../auth'

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    // const [dropDownActive, setDropDownActive] = useState(false);
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleArrowDown(event) {
        event.stopPropagation();
        // let newActive = !dropDownActive;
        // if(newActive) {
            handleLoadList(event, idNamePair._id);
            // if(store.currentList !== null && store.currentList.publishedDate !== undefined){
            //     store.incPlaylistListens();
            // }
        // }else{
        //     store.closeCurrentList();
        // }
        // console.log("dropdown state" + newActive);
        // setDropDownActive(newActive);
    }

    function handleArrowUp(event) {
        store.closeCurrentList();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        // event.preventDefault();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLikePlaylist() {
        if(auth.user.email !== "guestaccount@gmail.com"){
            store.likePlaylist(idNamePair);
        }
    }
    function handleDislikePlaylist() {
        if(auth.user.email !== "guestaccount@gmail.com"){
            store.dislikePlaylist(idNamePair);
        }
    }

    function handleUsernameSearch() {
        store.loadSearchResults("usernameSearchScreen", idNamePair.ownerUsername);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }


    let expandedListContent = "";
    let arrow = <IconButton onClick={handleArrowDown} style={{padding: 0}}><KeyboardDoubleArrowDownIcon/></IconButton>

    if(store.currentList !== null){
        if(store.currentList._id == idNamePair._id){
            expandedListContent = 
                <Grid container>
                    <Grid item xs={12}>
                            <WorkspaceScreen selectedPlaylist={idNamePair} />
                    </Grid>
                    <Grid item xs={12}>
                        <EditToolbar/>
                    </Grid>
                </Grid>
            arrow = <IconButton onClick={handleArrowUp}><KeyboardDoubleArrowUpIcon /></IconButton>
        }
    }

    let likes = "";
    let dislikes="";
    let publishedDate="";
    let listens="";
    let editIcon = 
        <IconButton onClick={handleToggleEdit} aria-label='edit'>
            <EditIcon style={{fontSize:'20pt'}} />
        </IconButton>
    let publishedListColorStyle="white";
    
    if(idNamePair.publishedDate !== undefined){
        likes = <IconButton onClick={handleLikePlaylist}><ThumbUpIcon/>{idNamePair.likes}</IconButton>
        dislikes = <IconButton onClick={handleDislikePlaylist}><ThumbDownIcon/>{idNamePair.dislikes}</IconButton>
        publishedDate = <Typography sx={{fontSize: 15}}>Published: {idNamePair.publishedDate}</Typography>
        listens = <Typography>Listens: {idNamePair.listens}</Typography>
        editIcon = "";
        publishedListColorStyle = "lightblue";
    }

    let deleteIcon = 
        <IconButton onClick={(event) => {handleDeleteList(event, idNamePair._id)}} aria-label='delete'>
            <DeleteIcon style={{fontSize:'20pt'}} />
        </IconButton>
    if(auth.user.username !== idNamePair.ownerUsername){
        deleteIcon = "";
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{display: 'flex', p: 1 , flexDirection: 'column'}}
            style={{ width: '100%', fontSize: '48pt', border: '2px solid black', marginBottom: '1%', padding: 0, background: publishedListColorStyle }}
            // button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
        >
            <Grid container>
                <Grid item xs={7}>
                    <Box sx={{ p: 1, flexGrow: 1, fontSize: 30, padding: 0}}>
                        <Typography sx={{fontSize: 30, display: 'inline', overflowWrap: 'break-word'}}>{idNamePair.name}</Typography>
                        {editIcon}
                        {deleteIcon}
                    </Box>  
                    <Typography sx={{fontSize: 15}}>By: <Box style={{display: 'inline'}} onClick={handleUsernameSearch}>{idNamePair.ownerUsername}</Box></Typography>    
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    {likes}
                    {dislikes}
                </Grid>
                
                {expandedListContent}

                <Grid item xs={7}>{publishedDate}</Grid>
                <Grid item xs={4}>{listens}</Grid>
                <Grid item xs={1}><Typography>{arrow}</Typography></Grid>
                
                

                {/* <Grid item xs={11}></Grid>
                <Grid item xs={1} >
                    <Typography>
                        {arrow}
                    </Typography>
                </Grid> */}
            </Grid>
        </ListItem>


    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />       
    }

    return (
        cardElement
    );
}

export default ListCard;