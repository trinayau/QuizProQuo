import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage, SetGame, Lobby } from "./pages";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/game" element={<SetGame />} />
        <Route path="/waitingroom" element={<Lobby />} />
      </Routes>
    </div>
  );

}

export default App;
