
//naprawic blad zapisywania , nie dziala const i nie dziala useState, let tez nie dziala
const partOfStory = []
// console.log(partOfStory)
export const fetchStory = (db, story, number, content, fetchSuffix) => {
    fetch(`${db}${story}/${number}/${content}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      partOfStory.push(resp);
    })
    .catch((error) => {
      console.log("The content of the story cannot be downloaded.", error);
    });
    console.log(partOfStory)
    return partOfStory
}