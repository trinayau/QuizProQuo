import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Logo from "../../images/logov1.png";
import { useDispatch } from "react-redux";
import { setHost, setPlayer, setID } from "../../actions/userType";
import { socket } from '../../socket/index.js';

const HomePage = () => {
  // const [categoryList, setCategoryList] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //no of users online, default is 0
  const [playerCount, setPlayerCount] = useState(0);
  const [error, setError] = useState("");
  //username form
  const [usrInput, setUsrInput] = useState(undefined);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(undefined);
  //To show all connected users
  const [allUsers, setAllUsers] = useState([]);

  //On load, socket will listen for number of users being emitted from socket server
  useEffect(() => {
    socket.on("users", (users) => setPlayerCount(users));
    socket.on('new user', allUsers=>{setAllUsers(allUsers)});
  }, []);

  useEffect(()=> {

    socket.on('assign-id', id => dispatch(setID(id)))
    //Emits to server the set username when username changes
    socket.emit('join server', username);
  },[username])

  const renderUser = (user) => {
    return (
      <p key={user.id}>
        {user.username}
      </p>
    )
  }

  const handleInput = (e) => {
    setError("");
    setUsrInput(e.target.value);
  };

  //Handles creating room from form
  const handleCreate = (e) => {
    e.preventDefault();
    const player = usrInput;
    setUsername(player)
    //Error handling for form
    if (player === undefined) {
      setError("Please enter a username to become a Quizzer");
    } else if (room === undefined) {
      setError("To create a room or join a game, please set a room name");
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

  const handleJoin = (e) => {
    e.preventDefault();
    const player = usrInput;
    setUsername(player);
    if (player === undefined) {
        setError("Don't be rude, introduce yourself!");
    } else if (room === undefined) {
        setError("You need to create room or give an existing name");
    } else {
        const config = {
            room: room,
            username: player
        }
        socket.emit("join-room", config, (res) => {

            console.log("socket response", res);

            if (res.code === "success") {
                setRoom(room);


                dispatch(setPlayer(player, room));
                navigate("/waitingroom");
            } else {
                setRoom(undefined);
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
    let toggle = "join";
    let joinText = "Join Room"
    if (playerCount < 2) {
      toggle = "disabled";
      joinText = "No rooms to join"
    }
    return (
      <>
        <input
          type="submit"
          className={toggle}
          name="joinQuiz"
          value={joinText}
          onClick={handleJoin}
        />
      </>
    );
  };


  return (
    <div id="welcome">
      <img src={Logo} alt="Quiz Pro Quo logo" />
      <form>
      <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="PLAYER NAME"
          value={usrInput || ""}
          onChange={handleInput}
        />
        </form>
      <form role="form" autoComplete="off">
    
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
          value="New Game"
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
      <p>
        {allUsers.length <= 0 ? "No Quizzers Online :(" : `Quizzers Online: ${playerCount}` && allUsers.map(renderUser)}
      </p>
    </div>
  );
};

export default HomePage;
