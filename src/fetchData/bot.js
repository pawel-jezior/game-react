let chatBotText = ""
export const fetchBot = (db, bot, number, kindOfOperation, fetchSuffix) => {
    //welcome(10), content(0-9), end(11)
    fetch(`${db}${bot}/${number}/${kindOfOperation}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      chatBotText = resp
    })
    .catch((error) => {
      console.log("The content of the chat cannot be downloaded.", error);
    });
    return chatBotText
}