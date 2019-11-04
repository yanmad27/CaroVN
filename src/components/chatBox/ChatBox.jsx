import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import io from 'socket.io-client';
import './ChatBox.scss';

class ChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            clientId: null,
            partnerId: null,
            roomId: null,
            message: [],
            currentMessage: '',
        }
    }

    componentWillMount() {
        const socket = io('http://localhost:8013/');
        this.setState({ socket })
        socket.on('clientId', res => {
            console.log('clientId: ', res);
            this.setState({ clientId: res })
            console.log(this.state);
        })
        socket.on('roomInfo', res => {
            console.log('roomInfo: ', res);
            const { clientId } = this.state;
            const { id1, id2 } = res;
            this.setState({
                partnerId: id1 === clientId ? id2 : id1,
                roomId: id1,
            });
            console.log(this.state);
        })

        socket.on('newMessage', response => {
            const { message, clientId } = this.state;
            console.log("recieve newMessage: ", response);
            message.unshift({ client: response.from === clientId, message: response.message })
            this.setState({ message });
        });
    }




    sendMessage = event => {
        if (event.charCode === 13) {
            const { value: newMessage } = event.target;
            const { socket, clientId, partnerId, roomId } = this.state;
            console.log(newMessage);
            this.setState({ currentMessage: '' });
            socket.emit('newMessage', { room: roomId, from: clientId, to: partnerId, message: newMessage });
        }
    }


    onMessageChange = event => {
        this.setState({ currentMessage: event.target.value });
    }

    drawMessages = () => {
        const { message } = this.state;

        return message.map(child => {
            return (
                <div className={`message ${child.client ? `client` : ``}`} >
                    <div className="avatar" />
                    <div className="content">{child.message} </div>
                </div>
            )
        })
    }

    render() {
        const { historyState } = this.props;
        const { sendMessage, onMessageChange } = this;
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
                    value={currentMessage}
                    onChange={onMessageChange}
                    onKeyPress={sendMessage}
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
