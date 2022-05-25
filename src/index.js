import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import './basic'
import Basic from './basic';

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
  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // cara binding seperti ini diperlukan untuk membuat `this` dapat berfungsi -
      // pada callback binding
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }
  
  // ReactDOM.render(
  //   <Toggle />,
  //   document.getElementById('root')
  // );

  //====================================
  function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }

  function Greeting(props) {
    
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }

  function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }
  class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) button = <LogoutButton onClick={this.handleLogoutClick} />;
      else button = <LoginButton onClick={this.handleLoginClick} />;
  
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  }
  
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
  
  // const messages = [];
  // ReactDOM.render(
  //   <Mailbox unreadMessages={messages} />,
  //   document.getElementById('root')
  // );

  //========================
  class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form>
          <label>
            Is going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }

  //========================
  function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }

  function WelcomeDialog() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Selamat Datang
        </h1>
        <p className="Dialog-message">
          Terima kasih telah mengunjungi pesawat luar angkasa kami!
        </p>
      </FancyBorder>
    );
  }

  function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
    );
  }

  function App() {
    return (
      <SplitPane
        left={
          <h1>Contact</h1>
        }
        right={
          <h1>Call</h1>
        } />
    );
  }


  class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
      // Buat ref untuk menyimpan elemen DOM textInput
      this.textInput = React.createRef();
    }

    focus() {
      console.log("test")
      // Fokuskan pada input teks secara eksplisit menggunakan API DOM mentah
      // Catatan: kita mengakses “current” untuk mendapatkan simpul DOM
      this.textInput.current.focus();
    }

    render() {
    // Gunakan callback `ref` untuk menyimpan referensi ke elemen 
    // DOM input teks dalam field instans (misalnya, this.textInput).
      return (
        <div>
          <input
          type="text"
          ref={this.textInput}
        />
        <button onClick={() => {this.focus()}}>Test</button>
        </div>
      );
    }
  }


  class OuterClickExample extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { isOpen: false };
      this.toggleContainer = React.createRef();
  
      this.onClickHandler = this.onClickHandler.bind(this);
      this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
    }
  
    componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
    }
  
    onClickHandler() {
      this.setState(currentState => ({
        isOpen: !currentState.isOpen
      }));
    }
  
    onClickOutsideHandler(event) {
      console.log(event.target)
      console.log(this.toggleContainer.current)
      if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
        this.setState({ isOpen: false });
      }
    }
  
    render() {
      return (
        <div ref={this.toggleContainer}>
          <button onClick={this.onClickHandler}>Pilih salah satu opsi</button>
          {this.state.isOpen ? (
            <ul>
              <li>Opsi 1</li>
              <li>Opsi 2</li>
              <li>Opsi 3</li>
            </ul>
          ) : ""}
        </div>
      );
    }
  }

  class BlurExample extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { isOpen: false };
      this.timeOutId = null;
  
      this.onClickHandler = this.onClickHandler.bind(this);
      this.onBlurHandler = this.onBlurHandler.bind(this);
      this.onFocusHandler = this.onFocusHandler.bind(this);
    }
  
    onClickHandler() {
      this.setState(currentState => ({
        isOpen: !currentState.isOpen
      }));
    }
  
    // Kita menutup popover pada detik selanjutnya menggunakan setTimeout.
    // Ini perlu, karena kita harus memeriksa terlebih dahulu 
    // apakah ada anak lain dari elemen ini yang telah menerima 
    // fokus saat event blur diluncurkan sebelum event fokus yang baru.
    onBlurHandler() {
      this.timeOutId = setTimeout(() => {
        this.setState({
          isOpen: false
        });
      });
    }
  
    // Jika ada anak yang menerima fokus, jangan tutup popover.
    onFocusHandler() {
      clearTimeout(this.timeOutId);
    }
  
    render() {
      // React membantu kita dengan melakukan bubbling 
      // pada event blur dan fokus ke elemen induk.
      return (
        <div onBlur={this.onBlurHandler}
             onFocus={this.onFocusHandler}>
          <button onClick={this.onClickHandler}
                  aria-haspopup="true"
                  aria-expanded={this.state.isOpen}>
            Pilih salah satu opsi
          </button>
          {this.state.isOpen && (
            <ul>
              <li>Opsi 1</li>
              <li>Opsi 2</li>
              <li>Opsi 3</li>
            </ul>
          )}
        </div>
      );
    }
  }


  const Home = lazy(() => import('./home'));
  const About = lazy(() => import('./about'));

  const AppRouter = () => (
    <Router>
      <Suspense fallback={<div>Sedang memuat...</div>}>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Suspense>
    </Router>
  );

// Context memungkinkan kita untuk oper nilai ke dalam diagram komponen
// tanpa secara ekplisit memasukannya ke dalam setiap komponen.
// Buat *context* untuk tema saat ini (dengan "light" sebagai default).
const ThemeContext = React.createContext('light');

class AppContext extends React.Component {

static contextType = ThemeContext;

  render() {
    console.log(this.context)
    // Gunakan Provider untuk oper tema saat ini ke diagram di bawah ini.
    // Komponen apa pun dapat membacanya, tidak peduli seberapa dalam diagram tersebut.
    // Dalam contoh ini, kita mengoper "dark" sebagai nilai saat ini.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

//AppContext.contextType = ThemeContext;

// Komponen di tengah tidak harus 
// oper temanya secara ekplisit lagi.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Tetapkan contextType untuk membaca *context theme* saat ini.
  // React akan menemukan Provider *theme* terdekat di atas dan menggunakan nilainya.
  // Dalam contoh ini, *theme* saat ini adalah "dark".
  static contextType = ThemeContext;
  render() {
    console.log(this.context)
    return <button />;
  }
}

function ExampleHook() {
  const [count, setCount] = useState(0);

  // Sama seperti componentDidMount dan componentDidUpdate:
  useEffect(() => {
    // Memperbarui judul dokumen menggunakan API browser
    console.log("TEST");
    document.title = `Anda klik sebanyak ${count} kali`;
  });

  return (
    <div>
      <p>Anda klik sebanyak {count} kali</p>
      <button onClick={() => setCount(count + 1)}>
        Klik saya
      </button>
    </div>
  );
}

var createReactClass = require('create-react-class');
var GreetingES6 = createReactClass({
  render: function() {
    return <h1>Halo {this.props.name}</h1>;
  }
});

class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    console.log("MOUNT")
  }
  componentWillUnmount() {
    console.log("UNMOUNT")
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}

function Form() {
  // 1. Menggunakan state variabel name
  const [name, setName] = useState('Mary');

  // 2. Menggunakan sebuah effect untuk mengukuhkan form
  useEffect(function persistForm() {
    console.log("PERSIST FORM")
    localStorage.setItem('formData', name);
  });

  // 3. Menggunakan state variabel surname
  const [surname, setSurname] = useState('Poppins');

  // 4. Menggunakan sebuah effect untuk meng-update title
  useEffect(function updateTitle() {
    console.log("UPDATE TITLE")
    document.title = name + ' ' + surname;
  });

  return <button onClick={() => setName(name + 1)}>Klik!</button>
}
  ReactDOM.render(<Form/>, document.getElementById('root'))