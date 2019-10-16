import React from 'react';
import { connect } from 'react-redux';
import { isUndefined } from 'util';

class MoveHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    drawHistory = () => {
        const { HistoryState } = this.props;
        const { moveHistory } = HistoryState;
        console.log("HistoryJSX:: draw History: ", moveHistory);
        if (isUndefined(moveHistory)) return undefined;
        return moveHistory.map((value, index) => {
            const keyId = index;
            return (<div key={keyId}>{value.row}{value.col}{value.value}</div>)
        })
    }

    render() {
        const { historyState } = this.props;
        console.log("History is rendering...", historyState);

        return (
            <div >
                {this.drawHistory()}
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
)(MoveHistory);
