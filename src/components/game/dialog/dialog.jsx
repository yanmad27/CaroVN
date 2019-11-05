import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

export default function ResponsiveDialog(props) {

    const { open, handleClose, handleAccept } = props;
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogActions>
                    <Button autoFocus onClick={handleAccept} color="primary">
                        Play
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Play Again
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}