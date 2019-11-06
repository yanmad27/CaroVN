import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Button, DialogActions } from '@material-ui/core';

export default function ResponsiveDialog(props) {

    const { open, result } = props;
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <div><span>Bạn đã {result}</span></div>
                </DialogContent>
                <DialogActions>
                    <Button>Chơi lại</Button>
                    <Button>Thoát</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}