let divTag = document.querySelector(".anime__wrapper");
// Select the input and button elements
let emailInput = document.querySelector(".emailbox");
let emailButton = document.querySelector(".email__button");
let resultDiv = document.querySelector(".anime__results");
let loading = document.querySelector(".spinner");

let loadingShown = true;
async function hello(category) {
  loading.classList.add("spinner__wrapper");

  let promise = await fetch(
    `https://kitsu.io/api/edge/anime?filter[categories]=${category}`
  );
  let result = await promise.json();

  // Extract the array of anime data
  let animeList = result.data.slice(0, 6);

  // Generate HTML for each anime
  let html = animeList
    .map(
      (anime) =>
        `<div class="anime__wrapper--item">
        <img src='${anime.attributes.posterImage.small}' alt='${
          anime.attributes.titles.en || "Anime"
        }'  class="image__vals">
    </div>`
    )
    .join(""); // Join all generated HTML into a single string

  // Update the innerHTML of divTag
  if (loadingShown) {
    setTimeout(() => {
      divTag.innerHTML = html;
      loading.classList.remove("spinner__wrapper");
      loadingShown = false;
    }, 1000);
  } else {
    divTag.innerHTML = html;
    loading.classList.remove("spinner__wrapper");
  }
}

// Add an event listener to the button
emailButton.addEventListener("click", () => {
  // Get the value of the input field
  let query = emailInput.value.trim();
  resultDiv.innerHTML = `Search Results: <strong>${query}</strong>`;

  // Example: Show additional content dynamically (hardcoded for demo)
  if (query) {
    hello(query.toLowerCase());
  } else {
    resultDiv.innerHTML += `<p>Sorry, no results found for "${query}".</p>`;
  }
});
