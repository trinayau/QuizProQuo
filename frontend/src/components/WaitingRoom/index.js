import {useState, useEffect} from 'react'
import {LobbyStatus, PlayerBubble} from '../../components'
import {useSelector} from "react-redux"
import "./style.css"
import { socket } from '../../socket'


const Lobby = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState("");
    const username = useSelector((state) => state.user.user.username);
    const room = useSelector((state) => state.user.room)
    const host = useSelector((state) => state.user.user.type);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    //Server emits 'new peon' when new player joins
    //Sets new player with username of new user
    socket.on('new peon', user => {
      setNewPlayer(user)
  })

  //Client emits room to server and receives list of users
  //Sets player array
    useEffect(() => {  
        socket.emit('game-players', room, (res) => {
            const usernames = res.map(resp => resp.username)
            setPlayers(usernames)
        })
    }, [newPlayer]);

  //When newMessage array updates with new message, add to message array
    useEffect(()=>{
        if(newMessage!==""){
        setMessage((prevState) => [
            newMessage,
            ...prevState,
          ]);
        }
    },[newMessage])

 

    socket.on('receive message', (nicknameChosen, message)=>{
        setNewMessage({nickname: nicknameChosen, message: message})
    })


    const sendMessage = (e) => {
        e.preventDefault();
        let message = e.target.message.value;
        socket.emit("message sent", {
          nicknameChosen: username,
          message,
          room: room
        });
        setMessage((prevState) => [
          { nickname: username, message: message, me: true },
          ...prevState,
        ]);
        e.target.message.value = "";
      };

      //list of messages
     
    //   const messageList = message.map((message, i) => {
    //     return (
    //       <div key={i}>
    //         <li className={message.me ? "my-message" : ""}>
    //           <b>{message.nickname}</b>: {message.message}
    //         </li>
    //       </div>
    //     );
    //   });
     

    return(
        <div role="lobby" id="Lobby">
            <h2>Lobby</h2>

            <LobbyStatus host={host}/> 

            <div className='chatroom'>
          <main id="message-list">
             {message.map((message, i) => {
        return (
          <div key={i}>
            <li>
              <b>{message.nickname}</b> : {message.message}
            </li>  
          </div>
        );
      })}
          </main>

          <form id="message-form" 
          onSubmit={sendMessage} 
          role="sendMessage">
            <input
              name="message"
              required
              minLength="1"
              maxLength="100"
              placeholder="Write a message..."
            />
            <input type="submit" className='submitBtn'/>
          </form>
        </div>
            <div id="players">
           
            {players.map((player) => <PlayerBubble key={players.indexOf(player)} player={player} />)} 
            
            </div>
           
        </div>
    )
}



export default Lobby
