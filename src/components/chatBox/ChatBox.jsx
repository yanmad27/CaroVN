import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import './ChatBox.scss';

class ChatBox extends React.PureComponent {

    render() {
        const { historyState } = this.props;
        console.log("History is rendering...", historyState);

        return (
            <div className="chat-box">
                <div className="messages">

                    <div className="message">
                        <div className="avatar">Frie    nd</div>
                        <div className="content"> khi nao ban can may khi nao ban cai nao ban can may </div>
                    </div>

                    <div className="message">
                        <div className="avatar">Friend</div>
                        <div className="content"> khi nao ban can khi nao ban can may </div>
                    </div>

                    <div className="message" style={{ flexDirection: "row-reverse", textAlign: "right" }} >
                        <div className="avatar">You</div>
                        <div className="content"> khi nao ban can may n can may khi nao ban can may khi nao ban can may </div>
                    </div>

                    <div className="message" style={{ flexDirection: "row-reverse", textAlign: "right" }} >
                        <div className="avatar">You</div>
                        <div className="content"> khi an can may </div>
                    </div>

                    <div className="message">
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi naon can may khi nao ban can may </div>
                    </div>
                    <div className="message">
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi nao ban may khi nao ban can may </div>
                    </div>

                    <div className="message" style={{ flexDirection: "row-reverse", textAlign: "right" }} >
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi nao ban can ma </div>
                    </div>

                    <div className="message" style={{ flexDirection: "row-reverse", textAlign: "right" }} >
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi nao ban nao ban can may </div>
                    </div>
                    <div className="message">
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi nao ban cao ban can may </div>
                    </div>
                    <div className="message">
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi nao ban cann can may </div>
                    </div>

                    <div className="message" style={{ flexDirection: "row-reverse", textAlign: "right" }} >
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi nao ban caay khi nao ban can may khi nao ban can may khi nao ban can may </div>
                    </div>

                    <div className="message" style={{ flexDirection: "row-reverse", textAlign: "right" }} >
                        <div className="avatar">Avatar</div>
                        <div className="content"> khi na may </div>
                    </div>

                </div>

                <TextField
                    className="chat-input"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        HistoryState: state.HistoryState
    };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox);
