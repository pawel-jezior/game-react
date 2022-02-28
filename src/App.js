import { useEffect, useState } from "react";
import { fetchWrongAnswersToQuestions, fetchCorrectAnswerToQuestions } from "./fetchData/anwersToQuestions";
import { fetchBot } from "./fetchData/bot";
import { fetchQuestions } from "./fetchData/questions";
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
  const numbers = [0,1,2,3,4,5,6,7,8,9,10,11]
  const kindOfOperationBot = ['welcome', 'content', 'end']

  const [wrongAnswers, setWrongAnswers] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState([])

  //current question
  const [currentQuestion, setCurrentQuestion] = useState("x")
  //submit button
  const [submitButtonName, setSubmitButtonName] = useState("START")
  //1-3 wrong, 4 correct
  const [radioButton1Name, setRadioButton1Name] = useState("x")
  const [radioButton2Name, setRadioButton2Name] = useState("x")
  const [radioButton3Name, setRadioButton3Name] = useState("x")
  const [radioButton4Name, setRadioButton4Name] = useState("x")

  //chat bot text
  //zrobic, zeby bylo welcome, nie x
  const [chatBot, setChatBot] = useState("x")

  //teraz zrobic, zeby story sie pobiera, gdy sie dobrze odpowie i zmieniala i ogolnie te odpowiedzi i pytania i wszystko
  const [mainStory, setMainStory] = useState("x")

  //pobieranie tresci bota, numer 10 - welcome
  // fetchBot(db, bot, numbers[10], kindOfOperationBot[0], fetchSuffix);
  //pobieranie tresci pytania
  fetchQuestions(db, questions, numbers[0], content, fetchSuffix);
  //pobieranie odpowiedzi do pytania
  useEffect(() => {
    setWrongAnswers(fetchWrongAnswersToQuestions(db, questions, numbers[0], wrong, fetchSuffix));
    setCorrectAnswer(fetchCorrectAnswerToQuestions(db, questions, numbers[0], correct, fetchSuffix));
  });
  //pobieranie historii
  // fetchStory(db, story, numbers[0], content, fetchSuffix);
  // setMainStory(fetchStory(db, story, numbers[0], content, fetchSuffix))

  const [chatBotNumber,setChatBotNumber] = useState(0)
  useEffect (()=>{
    setChatBot(fetchBot(db, bot, numbers[chatBotNumber], kindOfOperationBot[1], fetchSuffix))
  },[chatBotNumber])

  const [questionNumber, setQuestionNumber] = useState(-1)
  useEffect (() =>{
    setCurrentQuestion(fetchQuestions(db, questions, numbers[0], content, fetchSuffix))
  }, [questionNumber])


  const check = () => {
    if (submitButtonName === "SUBMIT") {
      //funcje podajace pytania i spraawdzajce odpowiedz oraz zmiana story, doklejanie do poprzedniego
      
    } else {
      setSubmitButtonName("SUBMIT")

      setRadioButton1Name(wrongAnswers[0])
      setRadioButton2Name(wrongAnswers[1])
      setRadioButton3Name(wrongAnswers[2])
      setRadioButton4Name(correctAnswer[0])

      // setCurrentQuestion(fetchQuestions(db, questions, numbers[0], content, fetchSuffix))
      setQuestionNumber(0)
      setChatBotNumber(1)
    
      // setChatBot(fetchBot(db, bot, numbers[0], kindOfOperationBot[1], fetchSuffix))


      //===>>>teraz zrobic, zeby z 'welcome' zmienialo sie na pierwszy tekst bota

      // setMainStory(fetchStory(db, story, numbers[0], content, fetchSuffix))
      // console.log("mainStory: " + mainStory)
      //funkcje zmieniajace widocznosc i wyswietlajace pytanie
    }
  }

  // const getCurrentQuestion = () => {return currentQuestion}

  return (
    <div className="app">
      <div className="app__chat">
        <h3>{chatBot}</h3>
      </div>
      <div className="app__question">
        <h3>{currentQuestion}</h3>
      </div>
      <div className="app__chat--buttons">

        <input type="radio" value={radioButton1Name} name="answer" /> {radioButton1Name}
        <input type="radio" value={radioButton2Name} name="answer" /> {radioButton2Name}
        <input type="radio" value={radioButton3Name} name="answer" /> {radioButton3Name}
        <input type="radio" value={radioButton4Name} name="answer" /> {radioButton4Name}
        {/* tutaj zrobic funkcje (onClick), ktora sprawdza, ktory input jest zaznaczony i do tego sie stosuje i zmieni nazwe submit buttona */}
        <button onClick={() => {check()}}>{submitButtonName}</button>

      </div>
      <div className="app__story">
        <h3>{}</h3>
      </div>
    </div>
  );
}

export default App;
