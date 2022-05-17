import "./homepage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Logo from "../../images/logov1.png";
import { useDispatch } from "react-redux";
import { setHost, setPlayer, setID } from "../../actions/userType";
const socket = io.connect("http://localhost:5001");

const HomePage = () => {
  // const [categoryList, setCategoryList] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //no of users online, default is 0
  const [playerCount, setPlayerCount] = useState(0);
  const [error, setError] = useState("");
  const [usrInput, setUsrInput] = useState(undefined);
  const [room, setRoom] = useState(undefined);

  //On load, socket will listen for number of users being emitted from socket server
  useEffect(() => {
    socket.on("users", (users) => setPlayerCount(users));
  }, []);

  const handleInput = (e) => {
    setError("");
    setUsrInput(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const player = usrInput;
    if (player === undefined) {
      setError("Don't be rude, introduce yourself!");
    } else if (room === undefined) {
      setError("You need to create a room or give an existing name");
    } else {
      socket.emit("check-room", room, (res) => {
        console.log("socket response", res);

        if (res.code === "success") {
          setRoom(room);
          dispatch(setHost(player, room));
          navigate("/game");
        } else {
          setRoom(undefined);
          console.warn(error);
          setError(res.message);
        }
      });
    }
  };
  
  const handleRoomInput = (e) => {
    setError("");
    setRoom(e.target.value);
  };

  const renderJoin = () => {
    let tags = null;

    if (playerCount < 1) {
      tags = "disabled";
    }

    return (
      <>
        <input
          type="submit"
          className={tags}
          name="joinQuiz"
          value="Join"
        //   onClick={handleJoin}
        />
      </>
    );
  };

  return (
    <div id="welcome">
      <img src={Logo} alt="logo: Let's Get Quizzical" />
      <form role="form" autoComplete="off">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="PLAYER NAME"
          value={usrInput || ""}
          onChange={handleInput}
        />

        <label htmlFor="roomName">Room Name</label>
        <input
          type="text"
          id="roomName"
          name="roomName"
          placeholder="ROOM NAME"
          value={room || ""}
          onChange={handleRoomInput}
        />
        <input
          type="submit"
          name="newQuiz"
          value="NEW GAME"
          onClick={handleCreate}
        />
        {renderJoin()}
      </form>

      {/* Shows number of clients online */}
      <p>
        {playerCount <= 0
          ? "No Quizzers Online"
          : `Quizzers Online: ${playerCount}`}
        {error && <div className="error">{error}</div>}
      </p>
    </div>
  );
};

export default HomePage;
