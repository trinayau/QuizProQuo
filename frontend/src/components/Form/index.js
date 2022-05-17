import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {socket} from '../../socket/index.js';

const HomePage = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQs, setNumberOfQs] = useState("1");
  const [subject, setSubject] = useState();
  const [categoryList, setCategoryList] = useState({});
  const navigate = useNavigate();

  //gets all catergories from opentrivia
  const fetchCategories = async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    data.trivia_categories.forEach((data) => {
      setCategoryList((prevState) => ({ ...prevState, [data.id]: data.name }));
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fullCategory = Object.keys(categoryList).map((category) => {
    return (
      <option key={category} value={category}>
        {categoryList[category]}
      </option>
    );
  });

  const createGame = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const r = await fetch(
        `http://localhost:3001/game/${form.categoryId.value}/${form.difficulty.value}/${form.range.value}`,
        options
      );
      const gameId = await r.json();

      navigate(`/room/${gameId}`, { replace: true });

      if (gameId.err) {
        throw Error(gameId.err);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const handleChangeNumberQs = (e) => {
    setNumberOfQs(e.target.value);
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
    console.log("check:", setSubject);
    subject(setSubject);
  };

  return (
    <>
      <form aria-label="game-selection" onSubmit={createGame}>
        <h1 id="game-heading"> GAME SETUP </h1>
        <label htmlFor="pick a category">
          Pick a category:
          <select
            onChange={handleChangeSubject}
            aria-label="category"
            className="categoryId"
            name="categoryId"
            id="category"
          >
            {fullCategory}
          </select>
        </label>
        <br />
        <label htmlFor="number of questionss">
          Number of questions:
          <input
            value={numberOfQs}
            name="numberOfQs"
            id="number-of-questions"
            type="number"
            min="1"
            max="10"
            onChange={handleChangeNumberQs}
          />
        </label>
        <br />
        <label htmlFor="difficulty">
          Difficulty:
          <select
            name="difficulty"
            onChange={handleChangeDifficulty}
            aria-label="number of questions"
            id="difficulty"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard </option>
          </select>
        </label>
        <br />
        <input type="submit" value="PLAY" id="play-button" />
      </form>
    </>
  );
};

export default HomePage;
