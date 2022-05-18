import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchQuiz } from "../../actions";
import { socket } from '../../socket';
import "./style.css"

const LobbyStatus = ({host}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ready, setReady] = useState(false)
    const [subject, setSubject] = useState("") 
    const [difficulty, setDifficulty] = useState("")
    const [numberOfQs, setNo] = useState("")
    useSelector((state) => state.config.config.numberOfQs ) 
    const room = useSelector((state) => state.user.room)

    const usertype = host//useSelector((state) => state.user.user.type)
    // const usertype = "PLAYER"

    useEffect(() => {
        // const socket = io(serverEndpoint);
        // dispatch(addSocket({ socket }))
        // socket.emit("create", id);
        // socket.on("players-in-room", (list) => {
        //   dispatch(addPlayer(list))
        // });
        // socket.on("player-ready", (socket) => {
        //   dispatch(playerReady(socket))
        // })
        socket.emit('get-questions', room, (res) => {
            console.log(res)
            setSubject(res.subject);
            setDifficulty(res.difficulty);
            setNo(res.count)
        })
        socket.on('game-start', val =>  setReady(val))
        
    }, [ready]);

    const handleClick = (e) => {
        e.preventDefault();
        socket.emit('game-start', room)
        navigate('/quiz');
    }

    
    const join = (e) => {
        e.preventDefault();
        dispatch(fetchQuiz(numberOfQs, subject, difficulty));
        navigate('/quiz');
    }
       //changing subject from number to word
       let subjectWord;

       switch(subject){
            case "9":
               subjectWord = 'General Knowledge';
               break;
            case "10":
               subjectWord = 'Books';
               break;
            case "11":
                subjectWord = 'Film'
            case "12":
                subjectWord = 'Music';
               break;
           case "13":
               subjectWord = 'Musicals & Theatre';
               break;
           case "14":
               subjectWord = 'Television';
               break;
           case "15":
               subjectWord = 'Video Games';
               break;
           case "16":
               subjectWord = 'Board Games';
               break;
            case "17":
               subjectWord = 'Science & Nature';
               break;
            case "18":
               subjectWord = 'Computers';
               break;
            case "19":
               subjectWord = 'Mathematics';
               break;
            case "20":
                subjectWord = 'Mythology';
                break;
            case "21":
                subjectWord = 'Sports';
                break;
            case "22":
                subjectWord = 'Geography';
                break;
            case "23":
                subjectWord = 'History';
                break;
            case "24":
                subjectWord = 'Politics';
                break;
            case "25":
                subjectWord = 'Art';
                break;
            case "26":
                subjectWord = 'Celebrities';
                break;
            case "27":
                subjectWord = 'Animals';
                break;
            case "28":
                subjectWord = 'Vehicles';
                break;
            case "29":
                subjectWord = 'Comics';
                break;
            case "30":
                subjectWord = 'Science: Gadgets';
                break;
            case "31":
                subjectWord = 'Anime & Manga';
                break;
            case "32":
                subjectWord = 'Cartoon & Animations';
                break;
           default:
               subjectWord = 'Surprise Me'
               break;
               
       }



    if (usertype === "HOST"){
        return (
            <button id="start-game" onClick={handleClick}>Start Game</button> 
            // onclick fetch questions and go to quiz page
        )

    }
    else{
        return(
            <>
        {ready ? <button id="play-now" onClick={join}>Play Now!</button> : <p>Waiting for host to start the game...</p>}
        
        <p>You will be answering 
            <span style={{ color: "pink" }}> {numberOfQs} </span> 
            questions about 
            <span style={{ color: "pink" }}> {subjectWord} </span> 
            at difficulty level
            <span style={{ color: "pink" }}> {difficulty} </span> 
        </p>
        </>
        )
    }
}

export default LobbyStatus
