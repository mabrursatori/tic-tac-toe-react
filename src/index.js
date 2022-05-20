import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {

      renderSquare(i) {
        return <Square value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>;
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
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      const moves = history.map((step, move) => {
        console.log(move)
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      return (
        <div className="game">
          <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  // const root = ReactDOM.createRoot(document.getElementById("root"));
  // root.render(<Game />);
  
  //=========================================
  // const name = 'Budi';
  // const element = <h1>Halo, {name}</h1>;
  
  // ReactDOM.render(
  //   element,
  //   document.getElementById('root')
  // );

  //======================================
  // function tick() {
  //   const element = (
  //     <div>
  //       <h1>Hello, world!</h1>
  //       <h2>It is {new Date().toLocaleTimeString()}.</h2>
  //     </div>
  //   );
  //   ReactDOM.render(element, document.getElementById('root'));
  // }
  
  // setInterval(tick, 1000);

  //===============================================
  // class Toggle extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {isToggleOn: true};
  
  //     // cara binding seperti ini diperlukan untuk membuat `this` dapat berfungsi -
  //     // pada callback binding
  //    // this.handleClick = this.handleClick.bind(this);
  //   }
  //   handleClick() {
  //     console.log(this)
  //     this.setState(state => ({
  //       isToggleOn: !state.isToggleOn
  //     }));
  //   }
  
  //   render() {
  //     return (
  //       <button onClick={(e) => this.handleClick(e)}>
  //         {this.state.isToggleOn ? 'ON' : 'OFF'}
  //       </button>
  //     );
  //   }
  // }
  
  // ReactDOM.render(
  //   <Toggle />,
  //   document.getElementById('root')
  // );

  //====================================
  // function UserGreeting(props) {
  //   return <h1>Welcome back!</h1>;
  // }
  
  // function GuestGreeting(props) {
  //   return <h1>Please sign up.</h1>;
  // }

  // function Greeting(props) {
    
  //   const isLoggedIn = props.isLoggedIn;
  //   if (isLoggedIn) {
  //     return <UserGreeting />;
  //   }
  //   return <GuestGreeting />;
  // }

  // function LoginButton(props) {
  //   return (
  //     <button onClick={props.onClick}>
  //       Login
  //     </button>
  //   );
  // }
  
  // function LogoutButton(props) {
  //   return (
  //     <button onClick={props.onClick}>
  //       Logout
  //     </button>
  //   );
  // }
  // class LoginControl extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.handleLoginClick = this.handleLoginClick.bind(this);
  //     this.handleLogoutClick = this.handleLogoutClick.bind(this);
  //     this.state = {isLoggedIn: false};
  //   }
  
  //   handleLoginClick() {
  //     this.setState({isLoggedIn: true});
  //   }
  
  //   handleLogoutClick() {
  //     this.setState({isLoggedIn: false});
  //   }
  
  //   render() {
  //     const isLoggedIn = this.state.isLoggedIn;
  //     let button;
  //     if (isLoggedIn) button = <LogoutButton onClick={this.handleLogoutClick} />;
  //     else button = <LoginButton onClick={this.handleLoginClick} />;
  
  //     return (
  //       <div>
  //         <Greeting isLoggedIn={isLoggedIn} />
  //         {button}
  //       </div>
  //     );
  //   }
  // }
  
  // ReactDOM.render(
  //   <LoginControl />,
  //   document.getElementById('root')
  // );

  //==============================
  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
  
  const messages = [];
  ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
  );



  