import {useState, useEffect} from 'react'
import {LobbyStatus, PlayerBubble} from '../../components'
import {useSelector} from "react-redux"
import "./style.css"
import { socket } from '../../socket'


const Lobby = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState("")
    const room = useSelector((state) => state.user.room)
    const host = useSelector((state) => state.user.user.type);

    useEffect(() => {  
        socket.emit('game-players', room, (res) => {
            const usernames = res.map(el => el.username)
            setPlayers(usernames)
        })
    }, [newPlayer]);

    socket.on('new peon', user => {
        setNewPlayer(user)
    })

    return(
        <div id="Lobby">
            <h2>Lobby</h2>
    
            <LobbyStatus host={host}/> 

            <div id="players">
           
            {players &&
            players.map((player) => <PlayerBubble key={players.indexOf(player)} player={player} />)} 
            
            </div>
           
        </div>
    )
}



export default Lobby
