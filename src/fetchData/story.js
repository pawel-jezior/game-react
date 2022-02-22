export const fetchStory = (db, story, number, content, fetchSuffix) => {
    fetch(`${db}${story}/${number}/${content}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const storyToFill = document.querySelector(".app__story");
      storyToFill.innerHTML = resp;
    })
    .catch((error) => {
      console.log("The content of the story cannot be downloaded.", error);
    });
    // console.log('fetch story')
}