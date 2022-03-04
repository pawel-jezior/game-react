import { useEffect, useState } from "react";
// import {
//   fetchWrongAnswersToQuestions,
//   fetchCorrectAnswerToQuestions,
// } from "./fetchData/anwersToQuestions";
import { fetchBot } from "./fetchData/bot";
import { fetchQuestionsWithAnswers } from "./fetchData/questions";
import { fetchStory } from "./fetchData/story";

function App() {
  const db =
    "https://game-react-2e9ab-default-rtdb.europe-west1.firebasedatabase.app/";
  const fetchSuffix = ".json";
  const bot = "bot";
  const questions = "questions";
  const story = "story";
  const content = "content";
  const correct = "correct";
  const wrong = "wrong";
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const kindOfOperationBot = ["welcome", "content", "end"];

  const [botData, setBotData] = useState()
  const [currentBot, setCurrentBot] = useState()
  const [botNumber, setBotNumber] = useState()

  const [questionsData, setQuestionsData] = useState()
  const [currentQuestion, setCurrentQuestion] = useState()
  const [questionNumber, setQuestionNumber] = useState()

  const [storyData, setStoryData] = useState()
  const [currentStory, setCurrentStory] = useState()
  const [storyNumber, setStoryNumber] = useState()


  //==============================================================================
  const getBotData = async () => {
    await fetch(db + bot + fetchSuffix)
    .then((response) => response.json())
    .then((response) => {
      setBotData(response)
    })
    .catch((error) => {
      console.log("The content of the BOT cannot be downloaded.", error);
    });
  }
  //==============================================================================
  const getQuestionsData = async () => {
    await fetch(db + questions + fetchSuffix)
    .then((response) => response.json())
    .then((response) => {
      setQuestionsData(response)
    })
    .catch((error) => {
      console.log("The content of the QUESTIONS cannot be downloaded.", error);
    });
  }
  //==============================================================================
  const getStoryData = async () => {
    await fetch(db + story + fetchSuffix)
    .then((response) => response.json())
    .then((response) => {
      setStoryData(response)
    })
    .catch((error) => {
      console.log("The content of the STORY cannot be downloaded.", error);
    });
  }
  //==============================================================================
  useEffect(() => {
    getBotData()
    getQuestionsData()
    getStoryData()
  },[])

  useEffect(() => {
    if(botNumber >= 0) {
      setCurrentBot(botData[botNumber].content)
    } else {
      setCurrentBot("Press START")
    }
    
  },[botNumber])


  const check = () => {
    // console.log(botData)
    // console.log(questionsData)
    // console.log(storyData)
    console.log(botData[10].content)
    console.log(botData[0].content)
    setBotNumber(0)
  }

  return (
    <div className="app">
      <div className="app__chat">
        <h3>{currentBot}</h3>
      </div>
      <div className="app__question">
        <h3>{currentQuestion}</h3>
      </div>
       <div className="app__chat--buttons">
        {/* <input type="radio" value={radioButton1Name} name="answer" id="wrongAnswer1"/>{radioButton1Name}
        <input type="radio" value={radioButton2Name} name="answer" id="wrongAnswer2"/>{radioButton2Name}
        <input type="radio" value={radioButton3Name} name="answer" id="wrongAnswer3"/>{radioButton3Name}
        <input type="radio" value={radioButton4Name} name="answer" id="correctAnswer"/>{radioButton4Name} */}

        <button onClick={() => {check();}}>abc</button>
      </div>
      <div className="app__story">
        <h3>{currentStory}</h3>
      </div>
    </div>
  );
}

export default App;
