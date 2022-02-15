export const fetchStory = (db, story, content, fetchSuffix) => {
    fetch(`${db}${story}/0/${content}${fetchSuffix}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const storyToFill = document.querySelector(".app__story");
      storyToFill.innerHTML = resp;
    })
    .catch((error) => {
      console.log("The content of the story cannot be downloaded.");
    });
}