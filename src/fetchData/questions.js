let question = ""
export const fetchQuestions = (db, questions, number, content, fetchSuffix) => {
    fetch(`${db}${questions}/${number}/${content}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      // const questionsToFill = document.querySelector(".app__question");
      // questionsToFill.innerHTML = resp;
      question = resp
    })
    .catch((error) => {
      console.log("The content of the questions cannot be downloaded.", error);
    });
    // console.log('fetch question')
    // console.log("question: " + question)
    return question
}