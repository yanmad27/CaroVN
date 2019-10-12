import React from 'react';
import { connect } from 'react-redux';

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
 
        return (
            <div />
        )
    }
}

const mapStateToProps = state => {
    return {
        moveHistory: state.HistoryState.moveHistory,
    };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(History);
