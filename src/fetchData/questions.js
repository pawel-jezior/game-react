export const fetchQuestions = (db, questions, content, fetchSuffix) => {
    fetch(`${db}${questions}/0/${content}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const questionsToFill = document.querySelector(".app__question");
      questionsToFill.innerHTML = resp;
    })
    .catch((error) => {
      console.log("The content of the questions cannot be downloaded.", error);
    });
    // console.log('fetch question')
}