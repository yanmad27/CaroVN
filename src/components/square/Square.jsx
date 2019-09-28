import * as React from 'react';
import 'shared/styles/Square.css';

class Cout extends React.Component {
    static count = 0;
}

class Square extends Cout {

    constructor(props) {

        super(props);
        this.state = {
            defaultValue: this.props.defaultValue,
            value: undefined,
            isWin: undefined,
        }
    }

    clickSquare = (event) => {

        if (this.props.winner !== undefined) {
            return;
        }
        let value = this.props.defaultValue === ' ' ? this.props.defaultValue : this.state.value;
        if (value === 'x' || value === 'o') return;
        const { i, j } = this.props;

        this.setState({
            value: this.props.value,
        })
        this.props.switch(i, j);
    }

    render() {
        let value = this.props.defaultValue === ' ' ? this.props.defaultValue : this.state.value;
        return (
            <div className="Square" style={{ color: this.state.value === 'x' ? 'red' : 'blue', background: this.props.isWinSquare ? 'pink' : 'white' }} onClick={this.clickSquare} >
                {value}
            </div>

        )
    }
}

export default Square;