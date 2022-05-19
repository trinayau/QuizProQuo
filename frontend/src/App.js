import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  HomePage,
  SetGame,
  Lobby,
  Quiz,
  ScorePage,
  LeaderBoard,
  NotFound
} from "./pages";

const App = () => {

  
  
  return (
    <div role="App" className="App">
      <header className="App-header"></header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/game" element={<SetGame />} />
        <Route path="/waitingroom" element={<Lobby />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
