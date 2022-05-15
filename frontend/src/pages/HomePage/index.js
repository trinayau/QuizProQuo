import "./homepage.css";
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
const HomePage = () => {
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
    return ( <>
    <form onSubmit={createGame}>
        <label htmlFor="players">How many players?</label>
        <input name="players"type="text"></input><br/>
        <label htmlFor="categoryId">Select a topic</label>
        <select className="categoryId" name="categoryId">
          {fullCategory}
        </select>
        <br/>
        <label htmlFor="difficulty">Select a difficulty</label>
        <select className="difficulty" name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select><br/>

        <input type="submit"/>
      </form>
      </> );
}
 
export default HomePage;
