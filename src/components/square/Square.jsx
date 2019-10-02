import * as React from 'react';
import '../../shared/styles/Square.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: undefined
    };
  }

  clickSquare = () => {
    const { winner, defaultValue, value, switchValue } = this.props;
    const { currentValue } = this.state;
    if (winner !== undefined) {
      return;
    }

    const displayedValue = defaultValue === ' ' ? defaultValue : currentValue;
    if (displayedValue === 'x' || displayedValue === 'o') return;
    const { i, j } = this.props;

    this.setState({
      currentValue: value
    });
    switchValue(i, j);
  };

  render() {
    const { defaultValue, isWinSquare } = this.props;
    const { currentValue } = this.state;
    const displayValue = defaultValue === ' ' ? defaultValue : currentValue;
    return (
      <div
        className="Square"
        role="button"
        tabIndex="0"
        onKeyPress={() => {}}
        style={{
          color: currentValue === 'x' ? 'red' : 'blue',
          background: isWinSquare ? 'pink' : 'white'
        }}
        onClick={this.clickSquare}
      >
        {displayValue}
      </div>
    );
  }
}

export default Square;
