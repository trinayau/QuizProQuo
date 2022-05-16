import "./homepage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:5001");

const HomePage = () => {
  // const [categoryList, setCategoryList] = useState({});
  // const navigate = useNavigate();
  // //gets all catergories from opentrivia
  // const fetchCategories = async () => {
  //   const response = await fetch("https://opentdb.com/api_category.php");
  //   const data = await response.json();
  //   data.trivia_categories.forEach((data) => {
  //     setCategoryList((prevState) => ({ ...prevState, [data.id]: data.name }));
  //   });
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // const fullCategory = Object.keys(categoryList).map((category) => {
  //   return (
  //     <option key={category} value={category}>
  //       {categoryList[category]}
  //     </option>
  //   );
  // });


  //On load, socket will listen for number of users being emitted from socket server
  useEffect(() => {

    socket.on('users', users => setPlayerCount(users))

}, []);
//no of users online, default is 0
  const [playerCount, setPlayerCount] = useState(0);
  const [error, setError] = useState("");
  const [usrInput, setUsrInput] = useState(undefined);
  const [room, setRoom] = useState(undefined);

  const handleInput = (e) => {
    setError("");
    setUsrInput(e.target.value);
  };
  

  const handleRoomInput = (e) => {
    setError("");
    setRoom(e.target.value);
  };

  const renderJoin = () => {
    let tags = null;

    if (playerCount < 2) {
      tags = "disabled";
    }

    return (
      <>
        <input
          type="submit"
          className={tags}
          name="joinQuiz"
          value="Join"
          // onClick={handleJoin}
        />
      </>
    );
  };

  return (
    <div id="welcome">
      {/* <img src={logo} alt="logo: Let's Get Quizzical" /> */}
      <form role="form" autoComplete="off">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="PLAYER NAME"
          // value={usrInput}
          onChange={handleInput}
        />

        <label htmlFor="roomName">Room Name</label>
        <input
          type="text"
          id="roomName"
          name="roomName"
          placeholder="ROOM NAME"
          value={room}
          onChange={handleRoomInput}
        />
å
        <input
          type="submit"
          name="newQuiz"
          value="NEW GAME"
          // onClick={handleCreate}
        />
        {renderJoin()}
      </form>
      
{/* Shows number of clients online */}
      <p>
        {playerCount <= 0
          ? "No Players Online"
          : `Players ready: ${playerCount}`}
        {error && <div className="error">{error}</div>}
      </p>
    </div>
  );
};

export default HomePage;
