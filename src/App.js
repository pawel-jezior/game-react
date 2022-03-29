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
  const wrongAnswer1 = "wrongAnswer1"
  const wrongAnswer2 = "wrongAnswer2"
  const wrongAnswer3 = "wrongAnswer3"
  const correctAnswer = "correctAnswer"

  const questionSection = document.querySelector(".app__question")
  const answersSection = document.querySelector(".app__radioButtons")
  const submitButtonSection = document.querySelector(".app__submitButton")

  const [botData, setBotData] = useState();
  const [currentBot, setCurrentBot] = useState();
  const [botNumber, setBotNumber] = useState();

  const [questionsData, setQuestionsData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [questionNumber, setQuestionNumber] = useState();

  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);
  const [answers, setAsnwers] = useState([["a","wrongAnswer1"],["b","wrongAnswer2"],["c","wrongAnswer3"],["d","correctAnswer"]])

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
    if (botNumber > 9){slideUpAllUnnecessarySections();}
  }, [botNumber]);

  useEffect(() => {

    if (questionNumber >= 0) {

      setCurrentQuestion(questionsData[questionNumber].content);

      let tempArray = [[questionsData[questionNumber].wrong1, wrongAnswer1],
      [questionsData[questionNumber].wrong2, wrongAnswer2],
      [questionsData[questionNumber].wrong3, wrongAnswer3],
      [questionsData[questionNumber].correct, correctAnswer]]

      shuffleArray(tempArray)

      setAsnwers(tempArray)
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

  const slideDown = (element, height, padding) => {
    element.style.transition = "all 1s ease-in-out"
    element.style.height = height;
    element.style.padding = padding;
    element.style.opacity = 1;

  }

  const slideUp = (element) => {
    element.style.transition = "all 1s ease-in-out"
    element.style.height = 0;
    element.style.padding = 0;
    element.style.opacity = 0;
  }

  const slideUpAllUnnecessarySections = () => {
    slideUp(questionSection);
    slideUp(answersSection);
    slideUp(submitButtonSection)
  }

  const check = () => {
    if (submitButtonName !== "SUBMIT") {

      setSubmitButtonName("SUBMIT");
      setBotNumber(0);
      setQuestionNumber(0);
      showRadioButtons();

      slideDown(questionSection, "128px", "16px")
      slideDown(answersSection, "200px", "10px 30px")

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

    if (currentBot !== wrongAnswerBot
      && botNumber < 10
      && wrongAnswerCounter < 1) {

      setCurrentBot(wrongAnswerBot);

    }

  };

  const incrementWrongAnswerCounter = () => {setWrongAnswerCounter(wrongAnswerCounter + 1);};

const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      } return array
};

  return (
    <div className="app">
      <div className="app__chat">
        <h3>{currentBot}</h3>
      </div>
      <div className="app__question">
        <h3>{currentQuestion}</h3>
      </div>
      <div className="app__radioButtons">

          <label htmlFor="wrongAnswer1">
          <input className="app__radioButtons--button"
          type="radio"
          value={answers[0][0]}
          name="answer"
          id={answers[0][1]}/>
          {answers[0][0]}<br /></label>
          
          <label htmlFor="wrongAnswer2">
          <input className="app__radioButtons--button"
          type="radio"
          value={answers[1][0]}
          name="answer"
          id={answers[1][1]}/>
          {answers[1][0]}<br /></label>
          
          <label htmlFor="wrongAnswer3">
          <input className="app__radioButtons--button"
          type="radio"
          value={answers[2][0]}
          name="answer"
          id={answers[2][1]}/>
          {answers[2][0]}<br /></label>
          
          <label htmlFor="correctAnswer">
          <input className="app__radioButtons--button"
          type="radio"
          value={answers[3][0]}
          name="answer"
          id={answers[3][1]}/>
          {answers[3][0]}<br /></label>
          
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
