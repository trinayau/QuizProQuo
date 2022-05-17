import React, { useState, useEffect } from "react";
import { getLeaderboardData } from "../../actions";
import { useNavigate } from "react-router-dom";
import { LeaderboardMessage } from "../../components";

const LeaderBoard = () => {
  const navigate = useNavigate();

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getLeaderboardData();
      setLeaderboardData(data);
    }
    getData();
  }, []);

  useEffect(() => {
    const isThereData = () => {
      if (leaderboardData.length) {
        setData(true);
      }
    };
    isThereData();
  }, [leaderboardData]);

  const winner = leaderboardData[0];
  const secondPlace = leaderboardData[1];
  const thirdPlace = leaderboardData[2];
  const otherPlayers = leaderboardData.slice(3);

  otherPlayers.map((player) => {
    let index = leaderboardData.findIndex(
      (user) => user.username == `${player.username}`
    );
    player.place = index + 1;
  });

  const handleClick = () => {
    navigate("./");
  };

  return (
    <div id="leaderboard">
      <h3 id="leaderboard-heading"> LEADERBOARD </h3>
      {!data ? (
        <p>Loading data ...</p>
      ) : (
        <>
          <LeaderboardMessage
            winner={winner}
            secondPlace={secondPlace}
            thirdPlace={thirdPlace}
          />
          <table id="leaderboard">
            <tbody>
              <tr id="firstPlace">
                <td>
                  1
                  <span>
                    <img src=""></img>
                  </span>
                </td>
                <td>{winner.username}</td>
                <td>{winner.score}</td>
              </tr>
              <tr id="secondPlace">
                <td>
                  2
                  <span>
                    <img src=""></img>
                  </span>
                </td>
                <td>{secondPlace.username}</td>
                <td>{secondPlace.score}</td>
              </tr>
              <tr id="thirdPlace">
                <td>
                  3
                  <span>
                    <img src=""></img>
                  </span>
                </td>
                <td>{thirdPlace.username}</td>
                <td>{thirdPlace.score}</td>
              </tr>
              {otherPlayers.map((player) => (
                <tr key={player.username}>
                  <td>{player.place}</td>
                  <td>{player.username}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button id="start-again" onClick={handleClick}>
        PLAY AGAIN
      </button>
    </div>
  );
};

export default LeaderBoard;
