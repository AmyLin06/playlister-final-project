import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Alert, Button } from '@mui/material';
import AuthContext from '../auth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 0
};

const buttonStyle = {
    position: 'fixed',
    top: 6,
    right: 10
}

export default function MUIErrorAlert() {
    const { auth } = useContext(AuthContext);
    
    function handleCloseErrorAlert () {
        auth.closeErrorAlert();
    }

    return (
        <Modal 
            open={auth.errorMessage !== null}
            // onClose={handleCloseErrorAlert}
        >
            <Box sx={style}>
                <Box>
                    <Alert severity='error'>
                        {auth.errorMessage}
                        <Button sx={buttonStyle} onClick={handleCloseErrorAlert}>OK</Button>
                    </Alert>
                </Box>
            </Box>
        </Modal>
    );
}