import { Routes, Route } from "react-router-dom";
import './App.css';
import {
  HomePage
} from "./pages";

function App() {
 
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
      
    </div>
  );
}

export default App;
