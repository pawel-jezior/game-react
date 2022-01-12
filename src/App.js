
function App() {

  const fetchSuffix = ".json"
  const db = "https://game-react-2e9ab-default-rtdb.europe-west1.firebasedatabase.app/"

  fetch(
    `${db}questions/2/content${fetchSuffix}`
  )
    .then((resp) => resp.json())
    .then((resp) => {
      const h2dowypelnienia = document.querySelector(".attempt");
      h2dowypelnienia.innerHTML = resp;
    })
    .catch((error) => {
      console.log("nie mazna tego pobrac");
    });

  return (
    <div className="app">
      <h2 className="attempt"></h2>
      <div className="app__chat">
        <h3>Lorem ipsum</h3>
      </div>
      <div className="app__story">
      <h3>Lorem ipsum</h3>
      </div>
    </div>
  );
}

export default App;
