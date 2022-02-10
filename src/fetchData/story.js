export const fetchStory = (db, story, content, fetchSuffix) => {
    fetch(`${db}${story}/0/${content}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const h3dowypelnienia = document.querySelector(".app__story");
      h3dowypelnienia.innerHTML = resp;
    })
    .catch((error) => {
      console.log("nie mozna pobrac opowiadania");
    });
}