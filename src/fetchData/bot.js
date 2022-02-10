export const fetchBot = (db, bot, fetchSuffix) => {
    fetch(`${db}${bot}/10/welcome${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const h3dowypelnienia = document.querySelector(".app__chat");
      h3dowypelnienia.innerHTML = resp;
    })
    .catch((error) => {
      console.log("nie mozna pobrac tresci czatu");
    });
}