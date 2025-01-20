let divTag = document.querySelector(".anime__wrapper");
// Select the input and button elements
let emailInput = document.querySelector(".emailbox");
let emailButton = document.querySelector(".email__button");
let resultDiv = document.querySelector(".anime__results");
let loading = document.querySelector(".spinner");

let loadingShown = true;
let count = 0;
async function hello(category) {
  loading.classList.add("spinner__wrapper");

  let promise = await fetch(
    `https://kitsu.io/api/edge/anime?filter[categories]=${category}`
  );
  let result = await promise.json();
  console.log(result);

  // Extract the array of anime data
  let animeList = result.data.slice(0, 6);
  if (count == 0) {
    animeList = result.data;
    count++;
  }

  // Generate HTML for each anime
  let html = animeList
    .map(
      (anime) =>
        `<div class="anime__wrapper--items">
      <div class="anime__wrapper--item">
        <img src='${anime.attributes.posterImage.small}' alt='${
          anime.attributes.titles.en || "Anime"
        }'  class="image__vals">
        <div class="anime__description">
        <h3>Title: ${anime.attributes.canonicalTitle} (${
          anime.attributes.ageRating
        })</h3>
        <h4>Rating: ${anime.attributes.averageRating}%</h4>
        <h4>Number of Episodes: ${anime.attributes.episodeCount}</h4>
        <h4>Popularity: ${anime.attributes.popularityRank}</h4>
        </div>
        </div>
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

hello();

// Add an event listener to the button
emailButton.addEventListener("click", () => {
  // Get the value of the input field
  let query = emailInput.value.trim();
  resultDiv.innerHTML = `Search Results: <strong>${query}</strong>`;

  // Example: Show additional content dynamically (hardcoded for demo)
  if (query) {
    // Hide the div immediately to prevent old content flash
    divTag.classList.add("hidden");

    // Fetch and display the new data after delay
    hello(query.toLowerCase()).then(() => {
      // Once the data is loaded, show the div
      divTag.classList.remove("hidden");
    });
  } else {
    resultDiv.innerHTML = `Sorry, no results found.`;
    divTag.classList.add("hidden");
  }
});
