import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket/index.js";
import { useSelector, useDispatch } from "react-redux";
import { roomConfig } from "../../actions/roomConfig";
import { fetchQuiz } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/fontawesome-free-solid";

const Form = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQs, setNumberOfQs] = useState("5");
  const [subject, setSubject] = useState(9);
  const [categoryList, setCategoryList] = useState({});

  const roomName = useSelector((state) => state.user.room);
  const id = useSelector((state) => state.user.id);
  const username = useSelector((state) => state.user.user.username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //gets all catergories from opentrivia
  const fetchCategories = async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    data.trivia_categories.forEach((data) => {
      setCategoryList((prevState) => ({ ...prevState, [data.id]: data.name }));
    });
  };
  //fetches categories once when page loads
  useEffect(() => {
    fetchCategories();
  }, []);

  //drop down with all categories
  const fullCategory = Object.keys(categoryList).map((category) => {
    return (
      <option key={category} value={category}>
        {categoryList[category]}
      </option>
    );
  });

  const handleChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const handleChangeNumberQs = (e) => {
    setNumberOfQs(e.target.value);
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchQuiz(numberOfQs, subject, difficulty));

    const config = {
      host: id,
      room: roomName,
      difficulty: difficulty,
      count: numberOfQs,
      subject: subject,
      username: username,
    };
    //sends to redux store
    dispatch(roomConfig(numberOfQs, subject, difficulty));

    //sends to socket server which creates a room
    socket.emit("add-config", config, (res) => {
      console.log(res);
    });

    navigate("/waitingroom");
  };

  const backBtn = () => {
    navigate(-1);
  };

  return (
    <>
      <button id="backBtn" onClick={backBtn}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} bounce /> BACK
      </button>
      <form aria-label="game-selection" onSubmit={handleSubmit}>
        <h1 id="game-heading"> GAME SETUP </h1>
        <p> PICK A CATEGORY </p>
        <label htmlFor="pick a category">
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
        <p> NUMBER OF QUESTIONS </p>
        <label htmlFor="number of questionss">
          <input
            role="number-of-questions"
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
        <p> DIFFICULTY </p>
        <label htmlFor="difficulty">
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
        <button
          onClick={handleSubmit}
          type="submit"
          value="PLAY"
          id="play-button"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          PLAY
        </button>
      </form>
    </>
  );
};

export default Form;
