/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import * as SocketHandlers from 'reduxs/handlers/socket/index'
import './ChatBox.scss';

class ChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            currentMessage: '',
        }
        SocketHandlers.subcribeNewMessage(this.newMessageCallback);
    }

    newMessageCallback = data => {
        const { messageList } = this.state;
        const { from, message } = data;
        console.log('newMessageCallback');
        messageList.unshift({ from, message });
        this.setState(messageList);
    }



    sendMessage = event => {
        console.log(event.charCode);
        if (event.charCode === 13) {

            const { currentMessage } = this.state;
            const { SocketState } = this.props;


            const from = SocketHandlers.getSocketID();
            const { host } = SocketState;
            const message = currentMessage;

            this.setState({ currentMessage: '' });
            const dataTranfer = { from, host, message };

            console.log('dataTranfer: ', dataTranfer);
            SocketHandlers.emitNewMessage(dataTranfer);
        }
    }

    drawMessages = () => {
        const { messageList } = this.state;
        const socketId = SocketHandlers.getSocketID();

        return messageList.map((child, index) => {
            return (
                <div key={`${index}`} className={`message ${child.from === socketId ? `client` : ``}`} >
                    <div className="avatar" />
                    <div className="content">{child.message} </div>
                </div>
            )
        })
    }

    handleMessageChange = event => {
        this.setState({ currentMessage: event.target.value })
    }

    render() {
        const { historyState } = this.props;
        const { sendMessage } = this;
        const { currentMessage } = this.state;
        console.log("History is rendering...", historyState);

        return (
            <div className="chat-box">
                <div className="messages">
                    {this.drawMessages()}
                </div>

                <TextField
                    className="chat-input"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                    onKeyPress={sendMessage}
                    value={currentMessage}
                    onChange={this.handleMessageChange}
                />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        HistoryState: state.HistoryState,
        SocketState: state.SocketState,
    };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox);
