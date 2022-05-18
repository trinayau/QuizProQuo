import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { LeaderBoardScore } from "..";

const LeaderBoardTable = () => {
  const [scores, setScores] = useState();
  const [error, setError] = useState();

  // useEffect(() => {
  //   async function getScores() {
  //     try {
  //       let { data } = await axios.get(
  //         `http://localhost:3001/scoreboard`
  //       );
  //       console.log(data);
  //       data.sort((a, b) => b.score - a.score);
  //       setScores(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }
  //   getScores();
  // }, []);

//Displaying the scores and usernames in leaderboard

/*componenetDidMount = () => {
  this.getScores();
}

getScores = () => {
  axios.get('http://localhost:3001/scoreboard')
  .then((response) => {
    const data = response.data;
    this.setState({ posts: data });
    console.log('Data has been received!');
  })
  .catch(() => {
    alert('Error retrieving data')
  });
}*/

  return (
    <>
      <div className="score-container">
        {scores ? (
          scores.map((score) => (
            <LeaderBoardScore key={score.id} score={score} />
          ))
        ) : (
          <h4 id="loading">Loading Scores...</h4>
        )}
      </div>
    </>
  );
};

/*function createHabitElement(b) {
  if (!b) {
    throw "No data provided";
  }

  const elem = document.createElement("div");
  elem.className = "card"
  const t = document.createElement("div")
  t.className = "card-body"
  t.textContent = b;
  elem.append(t)
  return elem;

}

function collect() {
  fetch(`http://localhost:3001/habits/${localStorage.getItem("username")}`)
    .then((res) => res.json())
    .then((data) => {
      data.habit.habit.forEach((b) => {
        const x = createHabitElement(b);
        
        document.querySelector("#data").appendChild(x);
      });
    })
    .catch((err) => console.log(err));
}
collect();*/





export default LeaderBoardTable;
