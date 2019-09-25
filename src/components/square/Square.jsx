import * as React from 'react';
import 'shared/styles/Square.css';

class Cout extends React.Component {
    static count = 0;
}

class Square extends Cout {

    constructor(props) {

        super(props);
        this.state = {
            value: undefined,
            isWin: undefined,
        }
    }

    clickSquare = (event) => {
        
        if (this.props.winner!==undefined) {
            return;
        }

        const { i, j } = this.props;
        if (!this.state.value) {

            this.setState({
                value: this.props.value,
            })
            this.props.switch(i, j);
        }
    }

    render() {

        return (
            <div className="Square" style={{color:this.state.value==='x'?'red':'blue', background:this.props.isWinSquare?'pink':'white'}} onClick={this.clickSquare} >
                {this.state.value}
            </div>

        )
    }
}

export default Square;