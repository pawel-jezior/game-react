import { useState } from "react";
import ChatButton from "./components/ChatButton";
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

  // const [answersToQuestion, setAnswersToQuestion] = useState([])

  //pobieranie tresci bota
  fetchBot(db, bot, fetchSuffix);
  //---
  //pobieranie tresci pytania
  fetchQuestions(db, questions, fetchSuffix);
  //pobieranie odpowiedzi do pytania
  // const fillAnswersToQuestion = () => {
  //   let answersToQuestionTemp = []
  //     for (let i = 0; i < 3; i++) {
  //   fetch(`${db}${questions}/2/${wrong}1${fetchSuffix}`)

  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       answersToQuestionTemp.push(resp)
  //       setAnswersToQuestion(answersToQuestionTemp)
  //     })
  //     .catch((error) => {
  //       console.log("nie mozna pobrac odpowiedzi do pytania")
  //     });
  // }
  // }
  // fillAnswersToQuestion()
  // console.log(answersToQuestion)

  //--
  //pobieranie historii
  fetchStory(db, story, content, fetchSuffix);

  //teraz zrobic, zeby wartosci z bazy danych sie pobieraly,
  //kazda do odpowiedniego zadania

  //rozwiazac czerwony problem, trzeba zrobic, zeby wartosc z tablicy sie wyswietala na przycisku

  return (
    <div className="app">
      <h2 className="attempt"></h2>
      <div className="app__chat">
        <h3>Lorem ipsum</h3>
      </div>
      <div className="app__chat--buttons">
        <ChatButton name="A" value="correct" />
        <ChatButton name="B" value="correct" />
        <ChatButton name="C" value="correct" />
        <ChatButton name="D" value="correct" />
      </div>

      <div className="app__story">
        <h3>Lorem ipsum</h3>
      </div>
    </div>
  );
}

export default App;
