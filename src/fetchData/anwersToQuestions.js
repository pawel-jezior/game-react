export const wrongAnswers = [];
export const correctAnswer = [];
export const fetchAnswersToQuestions = (
  db,
  questions,
  wrong,
  correct,
  fetchSuffix
) => {
  for (let i = 1; i < 4; i++) {
    fetch(`${db}${questions}/2/${wrong}${i}${fetchSuffix}`)
      .then((resp) => resp.json())
      .then((resp) => {
        wrongAnswers.push(resp);
      })
      .catch((error) => {
        console.log(
          "The content of the wrong answers to questions cannot be downloaded."
        );
      });
  }
  fetch(`${db}${questions}/2/${correct}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      correctAnswer.push(resp);
    })
    .catch((error) => {
      console.log(
        "The content of the correct answer to questions cannot be downloaded."
      );
    });
  console.log(wrongAnswers);
  console.log(correctAnswer);
};
