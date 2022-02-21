export const fetchBot = (db, bot, fetchSuffix) => {
    fetch(`${db}${bot}/10/welcome${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const botToFill = document.querySelector(".app__chat");
      botToFill.innerHTML = resp;
    })
    .catch((error) => {
      console.log("The content of the chat cannot be downloaded.", error);
    });
    // console.log('fetch bot')
}