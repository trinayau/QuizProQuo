import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello and welcome to Quiz Pro Quo</h1>
      </header>
      <form>
        <label for="players">How many players?</label>
        <input name="players"type="text"></input><br/>
        <label htmlFor="players">Select a topic</label>
        <input name="players"type="text"></input><br/>
        <label for="difficulty">Select difficulty?</label>
        <input name="difficulty"type="text"></input><br/>
      </form>
    </div>
  );
}

export default App;
