const wrongAnswers = []
const correctAnswer = []
export const fetchWrongAnswersToQuestions = (
  db,
  questions,
  number,
  wrong,
  fetchSuffix
) => {
  for (let i = 1; i < 4; i++) {
    fetch(`${db}${questions}/${number}/${wrong}${i}${fetchSuffix}`)
      .then((resp) => resp.json())
      .then((resp) => {
        wrongAnswers.push(resp);
      })
      .catch((error) => {
        console.log(
          "The content of the wrong answers to questions cannot be downloaded.",  error
        );
      });
  }
  // console.log("fetch wrong answers to questions");
  return wrongAnswers
};

export const fetchCorrectAnswerToQuestions = (
  db,
  questions,
  number,
  correct,
  fetchSuffix
) => {
  fetch(`${db}${questions}/${number}/${correct}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      correctAnswer.push(resp);
    })
    .catch((error) => {
      console.log(
        "The content of the correct answer to questions cannot be downloaded.", error
      );
    });
  // console.log("fetch correct answer to questions");
  return correctAnswer
};
