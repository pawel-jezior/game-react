import { useEffect, useState } from "react";

function App() {
  const db =
    "https://game-react-2e9ab-default-rtdb.europe-west1.firebasedatabase.app/";
  const fetchSuffix = ".json";
  const bot = "bot";
  const questions = "questions";
  const story = "story";
  const wrongAnswerBot = "Zła odpowiedź! Spróbuj ponownie. Masz OSTATNIĄ szansę!";
  const youHaveLostBot = "Przegrana. Spróbuj ponownie za "

  const [botData, setBotData] = useState();
  const [currentBot, setCurrentBot] = useState();
  const [botNumber, setBotNumber] = useState();

  const [questionsData, setQuestionsData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [questionNumber, setQuestionNumber] = useState();

  const [currentWrongAnswer1, setCurrentWrongAnswer1] = useState();
  const [currentWrongAnswer2, setCurrentWrongAnswer2] = useState();
  const [currentWrongAnswer3, setCurrentWrongAnswer3] = useState();
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState();
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);

  const [storyData, setStoryData] = useState();
  const [currentStory, setCurrentStory] = useState("");
  const [storyNumber, setStoryNumber] = useState();

  const [submitButtonName, setSubmitButtonName] = useState("START");

  //==============================================================================
  const getBotData = async () => {
    await fetch(db + bot + fetchSuffix)
      .then((response) => response.json())
      .then((response) => {
        setBotData(response);
      })
      .catch((error) => {
        console.log("The content of the BOT cannot be downloaded.", error);
      });
  };
  //==============================================================================
  const getQuestionsData = async () => {
    await fetch(db + questions + fetchSuffix)
      .then((response) => response.json())
      .then((response) => {
        setQuestionsData(response);
      })
      .catch((error) => {
        console.log("The content of the QUESTIONS cannot be downloaded.", error);
      });
  };
  //==============================================================================
  const getStoryData = async () => {
    await fetch(db + story + fetchSuffix)
      .then((response) => response.json())
      .then((response) => {
        setStoryData(response);
      })
      .catch((error) => {
        console.log("The content of the STORY cannot be downloaded.", error);
      });
  };
  //==============================================================================
  useEffect(() => {

    getBotData();

    getQuestionsData();

    getStoryData();

  }, []);

  useEffect(() => {
    botNumber >= 0 ? setCurrentBot(botData[botNumber].content) : setCurrentBot("Naciśnij START");
  }, [botNumber]);

  useEffect(() => {

    if (questionNumber >= 0) {

      setCurrentQuestion(questionsData[questionNumber].content);

      setCurrentWrongAnswer1(questionsData[questionNumber].wrong1);
      setCurrentWrongAnswer2(questionsData[questionNumber].wrong2);
      setCurrentWrongAnswer3(questionsData[questionNumber].wrong3);

      setCurrentCorrectAnswer(questionsData[questionNumber].correct);
    }

  }, [questionNumber]);

  useEffect(() => {
    if (storyNumber >= 0) setCurrentStory(currentStory + " " + storyData[storyNumber].content);
  }, [storyNumber]);

  useEffect(() => {
    if (wrongAnswerCounter >= 2) { countdownAndRefresh();}
  }, [wrongAnswerCounter]);

  const refreshWebPage = () => {window.location.reload();};

  const countdownAndRefresh = () => {

    let timeLeft = 5;
    let downloadTimer = setInterval(() => {
      if (timeLeft < 1) {
        clearInterval(downloadTimer);
        refreshWebPage();
      }
      setCurrentBot(youHaveLostBot + timeLeft);
      timeLeft -= 1;
    }, 1000);

  };

  const check = () => {
    if (submitButtonName !== "SUBMIT") {

      setSubmitButtonName("SUBMIT");
      setBotNumber(0);
      setQuestionNumber(0);
      showRadioButtons();

    }
    if (document.querySelector("#correctAnswer").checked) {

      setStoryNumber(questionNumber);
      incrementBotNumber();
      incrementQuestionNumber();
      incrementStoryNumber();

    } else if (
      document.querySelector("#wrongAnswer1").checked ||
      document.querySelector("#wrongAnswer2").checked ||
      document.querySelector("#wrongAnswer3").checked
    ) {

      
      incrementWrongAnswerCounter();
      displayBotWithWrongAnswerText();
    }
    uncheckRadioButtons();
  };

  const showRadioButtons = () => {
    Array.from(document.querySelectorAll('input[name="answer"]'),(input) => (input.style.display = "inline-block"));
  };

  const incrementBotNumber = () => {if (botNumber < 10) setBotNumber(botNumber + 1);};

  const incrementQuestionNumber = () => {if (questionNumber < 9) setQuestionNumber(questionNumber + 1);};

  const incrementStoryNumber = () => {if (storyNumber < 9) setStoryNumber(storyNumber + 1);};

  const uncheckRadioButtons = () => {
    Array.from(document.querySelectorAll('input[name="answer"]:checked'),(input) => (input.checked = false));
  };

  const displayBotWithWrongAnswerText = () => {

    if (currentBot != wrongAnswerBot
      && botNumber < 10
      && wrongAnswerCounter < 1) {

      setCurrentBot(wrongAnswerBot);

    }

  };

  const incrementWrongAnswerCounter = () => {setWrongAnswerCounter(wrongAnswerCounter + 1);};

  return (
    <div className="app">
      <div className="app__chat">
        <h3>{currentBot}</h3>
      </div>
      <div className="app__question">
        <h3>{currentQuestion}</h3>
      </div>
      <div className="app__radioButtons">
          <input className="app__radioButtons--button"
          type="radio"
          value={currentWrongAnswer1}
          name="answer"
          id="wrongAnswer1"/>
          {currentWrongAnswer1}
          <br />
          <input className="app__radioButtons--button"
          type="radio"
          value={currentWrongAnswer2}
          name="answer"
          id="wrongAnswer2"/>{currentWrongAnswer2}
          <br />
          <input className="app__radioButtons--button"
          type="radio"
          value={currentWrongAnswer3}
          name="answer"
          id="wrongAnswer3"/>{currentWrongAnswer3}
          <br />
          <input className="app__radioButtons--button"
          type="radio"
          value={currentCorrectAnswer}
          name="answer"
          id="correctAnswer"/>{currentCorrectAnswer}
          <br />
      </div>
      <div className="app__submitButton">
      <button className="app__submitButton--button" onClick={() => { check(); }}> {submitButtonName}</button>
      </div>
      <div className="app__story">
        <h3>{currentStory}</h3>
      </div>
    </div>
  );
}

export default App;
