// Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const historyList = document.getElementById('history-list');
const favoritesList = document.getElementById('favorites-list');

// Dictionary API
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
//global variables to store favorites and current search results
let favorites = [];
let currentResultsData = null;
let currentSearchedWord = '';

// Run search on form submit
searchForm.addEventListener('submit', handleSearch);

// Fetch and display dictionary data
async function handleSearch(e) {
  e.preventDefault();
  const word = searchInput.value.trim();
//empty search
  if (!word) {
    resultsContainer.innerHTML = '<p>Please enter a word to search.</p>';
    return;
  }

  try {
    //Gives instant visual feedback while the API processes the request.
    resultsContainer.innerHTML = '<p>Loading...</p>';
    // the encodeURIComponent converts spaces into URL-friendly format, ensuring the API request is valid even if the word contains spaces or special characters.
    const response = await fetch(API_URL + encodeURIComponent(word));
//word not found
    if (!response.ok) {
      resultsContainer.innerHTML = '<p>Word not found. Please try another word.</p>';
      return;
    }

    const data = await response.json();
    displayResults(data, word);
    addToHistory(word);
    searchInput.value = '';
    //invalid URL or network issues
  } catch (error) {
resultsContainer.innerHTML = '<p>Error fetching word. Please try again.</p>';
  }
}

// Extract and display data on the screen
function displayResults(data, searchedWord) {
  const wordData = data[0];
  if (!wordData) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }
//save the current results
  currentResultsData = data;
  currentSearchedWord = searchedWord;

  const word = wordData.word || searchedWord;
  const pronunciation = wordData.phonetic || wordData.phonetics?.[0]?.text || 'N/A';
  const definition = wordData.meanings?.[0]?.definitions?.[0]?.definition || 'No definition available.';

  const audioEntry = wordData.phonetics?.find(p => p.audio && p.audio.length > 0);
  const audioUrl = audioEntry ? audioEntry.audio : null;

  
  // build a HTML button if audio exists, or a short text message if it doesn't.
  const audioHtml = audioUrl
    //if true
    ? `<button type="button" onclick="playAudio('${audioUrl}')">🔊 Listen</button>`
    //if false
    : '<p><em>No audio available</em></p>';
 const isFav = favorites.includes(word);
 resultsContainer.innerHTML = `
    <article>
      <h3>${word}</h3>
      <p><strong>Pronunciation:</strong> ${pronunciation}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      ${audioHtml}
      <button type="button" onclick="toggleFavorite('${word}')">${isFav ? '★ Favorited' : '☆ Add to Favorites'}</button>
    </article>
  `;
}
//history section
function addToHistory(word) {
  const existing = historyList.querySelectorAll('li');
  //check if word is already in history to prevent duplicates
  const alreadyInHistory = Array.from(existing).some(item => item.textContent === word);
if (!alreadyInHistory) {
    const li = document.createElement('li');
    li.textContent = word;
    li.onclick = function () {
      searchInput.value = word;
      handleSearch(new Event('submit'));
    };
    //new search word appear at the top of history list
    historyList.prepend(li);
  }
}
function toggleFavorite(word) {
  if (favorites.includes(word)) {
    favorites = favorites.filter(item => item !== word);
  } else {
    favorites.push(word);
  }
  updateFavoritesUI();
if (currentResultsData) {
    // Refresh the results display to update the favorite button state
    displayResults(currentResultsData, currentSearchedWord);
  }
}
// Play audio
function playAudio(audioUrl) {
  const sound = new Audio(audioUrl);
  //captures errors
  sound.play().catch(() => alert('Could not play audio.'));
}
function updateFavoritesUI() {
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<li>No favorites yet</li>';
    return;
  }
favorites.forEach(word => {
    const li = document.createElement('li');
    li.textContent = '★ ' + word;

    li.onclick = function () {
      searchInput.value = word;
      handleSearch(new Event('submit'));
    };
 favoritesList.appendChild(li);
  });
}


  
