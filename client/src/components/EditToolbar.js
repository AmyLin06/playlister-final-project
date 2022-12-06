import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Grid } from '@mui/material';

const editToolbarButtonStyle = {
    fontSize: '10px',
    width: '100px',
    height: '35px'
};
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    function handlePublish() {
        store.publishPlaylist()
    }
    function handleDuplicate() {
        store.duplicatePlaylist();
    }

    if(store.currentList !== null && store.currentList.publishedDate !== undefined){
        return(
            <div id="edit-toolbar">
                <Button
                    id='duplicate-playlist-button'
                    variant='contained'
                    startIcon={<ContentCopyIcon/>}
                    style={editToolbarButtonStyle}
                    onClick={handleDuplicate}>
                        Duplicate
                </Button>
            </div>
        );
    }

    return (
        <div id="edit-toolbar">
            <Grid container>
                <Grid item xs={6}>
                    <Button
                        disabled={!store.canAddNewSong() || store.currentModal !== "NONE"}
                        id='add-song-button'
                        onClick={handleAddNewSong}
                        variant="contained"
                        startIcon={<AddIcon />}
                        style={editToolbarButtonStyle}>
                        Add Song
                    </Button>
                    <Button 
                        disabled={!store.canUndo() || store.currentModal !== "NONE"}
                        id='undo-button'
                        onClick={handleUndo}
                        variant="contained"
                        startIcon={<UndoIcon />}
                        style={editToolbarButtonStyle}>
                            Undo
                    </Button>
                    <Button 
                        disabled={!store.canRedo() || store.currentModal !== "NONE"}
                        id='redo-button'
                        onClick={handleRedo}
                        variant="contained"
                        startIcon={<RedoIcon />}
                        style={editToolbarButtonStyle}>
                            Redo
                    </Button>
                    {/* <Button 
                    disabled={!store.canClose() || store.currentModal !== "NONE"}
                    id='close-button'
                    onClick={handleClose}
                    variant="contained">
                        <CloseIcon />
                    </Button> */}
                </Grid>
                {/* <Grid item xs={}></Grid> */}
                <Grid item xs={6}>
                    <Button
                        id='publish-playlist-button'
                        variant='contained'
                        startIcon={<PublishIcon/>}
                        style={editToolbarButtonStyle}
                        onClick={handlePublish}>
                            Publish
                    </Button>
                    <Button
                        id='delete-playlist-button'
                        variant="contained"
                        startIcon={<DeleteIcon/>}
                        style={editToolbarButtonStyle}>
                            Delete
                    </Button>
                    <Button
                        id='duplicate-playlist-button'
                        variant='contained'
                        startIcon={<ContentCopyIcon/>}
                        style={editToolbarButtonStyle}
                        onClick={handleDuplicate}>
                            Duplicate
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default EditToolbar;