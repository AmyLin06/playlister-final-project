import { TextField, Box, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

function ListComment() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [ comment, setComment ] = useState("");

    function handleUpdateComment(event){
        setComment(event.target.value);
    }

    function handleKeyPress(event){
        if (event.code === "Enter" && store.currentList !== null && store.currentList.publishedDate !== undefined) {
            let userComment = {
                user: auth.user.username,
                userComment: comment
            }
            store.updateListComment(userComment);
        }
    }

    function handleUsernameSearch(username){
        store.loadSearchResults("usernameSearchScreen", username);
    }

    let playlistComment = "No playlist selected.";
    if(store.currentList !== null){
        playlistComment = store.currentList.comments.map((comment, index) => (
            <div key={'playlist-comment-' + (index)} style={{border: '2px solid black', marginBottom: '1%', background: 'lightblue'}}>
                <Typography sx={{color: "darkblue"}} onClick={(event) => {handleUsernameSearch(comment.user)}}>{comment.user}</Typography>
                <Typography sx={{overflowWrap: 'break-word'}}>{comment.userComment}</Typography>
            </div>
        ))
    }

    return(
        <Box style={{height: '100%', position: 'relative'}}>
            <Box style={{height: '90%', maxHeight: 400, overflow: 'scroll'}}>{playlistComment}</Box>
            <Box style={{height: '10%', textAlign: 'center'}}>
                <input 
                    onChange={handleUpdateComment}
                    onKeyPress={handleKeyPress}
                    style={{height: '90%'}}
                />
            </Box>
        </Box>
    );
}

export default ListComment;