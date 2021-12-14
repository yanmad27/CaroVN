import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Spiner from 'shared/components/spiner/Spiner';
import { DialogContent } from '@material-ui/core';

export default function ResponsiveDialog(props) {

    const { open, ispared, turn } = props;
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                {!ispared ?
                    <DialogContent style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <Spiner />
                        <div><span>Đang tìm kiếm người chơi ...</span></div>
                    </DialogContent> :
                    <DialogContent>
                        <div><span>Bạn đánh {turn}</span></div>
                    </DialogContent>
                }
            </Dialog>
        </div >
    );
}