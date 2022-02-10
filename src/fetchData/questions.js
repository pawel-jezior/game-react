export const fetchQuestions = (db, questions, fetchSuffix) => {
    fetch(`${db}${questions}/0/content${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const h2dowypelnienia = document.querySelector(".attempt");
      h2dowypelnienia.innerHTML = resp;
    })
    .catch((error) => {
      console.log("nie mozna pobrac pytania");
    });
}