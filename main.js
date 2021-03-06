import { ToyReact, Component } from './ToyReact'

class Square extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: null
    }
  }
  render () {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.props.value}
      </button>
    )
  }
}

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={i}
        // onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

let a = <Board name="Board" />

ToyReact.render(
  a,
  document.body
)