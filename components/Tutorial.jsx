import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';

const Tutorial = ({ onClose }) => (
    <Dialog open={true} onClose={onClose}>
        <DialogContent>
            <DialogTitle>Chess Game Tutorial</DialogTitle>
            <div>
                <p>Welcome to the Chess Game!</p>
                <p>Here are the basic rules and controls:</p>
                <ul>
                    <li>Click on a piece to select it.</li>
                    <li>Possible moves will be highlighted.</li>
                    <li>Click on a highlighted square to move the piece.</li>
                    <li>The game ends in checkmate, stalemate, or draw.</li>
                    <li>Use the buttons to reset, save, or load the game.</li>
                </ul>
            </div>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Start Game
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
);

export default Tutorial;
