import axios from "axios";

export const fetchQuiz = (numberOfQs, subject, difficulty) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=${numberOfQs}&category=${subject}&difficulty=${difficulty}&type=multiple&encode=url3986`
      );

      function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

      let quizData = data.results.map((element, i) => ({
        id: i + 1,
        question: element.question,
        correct_answer: element.correct_answer,
        answers: shuffle([...element.incorrect_answers, element.correct_answer])
      }));

      dispatch({
        type: "LOAD_QUESTIONS",
        payload: quizData,
      });
    } catch (err) {
      console.warn(err.message);
      dispatch({
        type: "SET_ERROR",
        payload: err.message,
      });
    }
  };
};

export const changeQuestion = (answer) => ({
  type: "CHANGE_QUESTION",
  payload: answer,
});

export const endQuestions = (finalAnswer) => ({
  type: "END_QUESTIONS",
  payload: finalAnswer,
});

export const getScore = () => ({ type: "GET_SCORE" });

export const getLeaderboardData = async () => {
  try{
      const response = await axios.get('https://localhost:3001/users')
      const data = response.data;
      const sort= data.sort((a, b) => {
          return b.score - a.score;
      })
      return sort;

  }catch(err){
      console.warn(err)
  }
}
