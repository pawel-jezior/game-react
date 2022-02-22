export const fetchBot = (db, bot, number, fetchSuffix) => {
    fetch(`${db}${bot}/${number}/welcome${fetchSuffix}`)
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