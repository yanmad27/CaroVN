import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Button, DialogActions } from '@material-ui/core';

export default function ResponsiveDialog(props) {

    const { open } = props;
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
                    <div><span>Cho em xin hòa nha anh!!!</span></div>
                </DialogContent>
                <DialogActions>
                    <Button>Chấp nhận</Button>
                    <Button>Không</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}