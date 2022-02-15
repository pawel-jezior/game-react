import { useEffect, useState } from "react";
import ChatButton from "./components/ChatButton";
import { fetchAnswersToQuestions } from "./fetchData/anwersToQuestions";
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
  // const answers = []

  //pobieranie tresci bota
  fetchBot(db, bot, fetchSuffix);
  //pobieranie tresci pytania
  fetchQuestions(db, questions, fetchSuffix);
  //pobieranie odpowiedzi do pytania
  useEffect(() => {
    fetchAnswersToQuestions(db, questions, wrong, correct, fetchSuffix);
  }, []);
  //pobieranie historii
  fetchStory(db, story, content, fetchSuffix);

  //teraz zrobic, zeby wartosci z bazy danych sie pobieraly,
  //kazda do odpowiedniego zadania

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
