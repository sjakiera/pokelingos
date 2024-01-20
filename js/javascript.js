var pokemons = ['Poochyena', 'Malamar', 'Pikachu', 'Camerupt', 'Groudon', 'Mewtwo', 'Pokey', 'Chikorita', 'Squirtle'];
var hints = ['vampire teeth', 'elvis coupe', 'very known', 'bobbels', 'spikey', 'looks like robot', 'snake', 'plant ponytail', 'he can hide in his shell'];
var secretPokemon = '';
var chosenPokemons = [];
var chances = 4;
var selectedPokemon = '';

function selectRandomPokemon() {
  var randomIndex = Math.floor(Math.random() * pokemons.length);
  secretPokemon = pokemons[randomIndex];
  console.log('De computer heeft de volgende pokémon gekozen:', secretPokemon);
}

function updateChancesDisplay() {
  var chancesElement = document.getElementById('chances');
  chancesElement.textContent = chances;
}

function getHint() {
  var secretPokemonIndex = pokemons.indexOf(secretPokemon);
  var hint = hints[secretPokemonIndex];
  return hint;
}

function choosePokemon(pokemon) {
  selectedPokemon = pokemon;
  updateSelectedPokemonsDisplay();
}

function checkPokemons() {
  if (selectedPokemon === secretPokemon) {
    showResult('Gefeliciteerd! Je hebt de juiste pokemon geraden.');
    endGame();
    var checkButton = document.getElementById('checkButton');
    checkButton.disabled = true;
  } else {
    chances--;
    if (chances > 0) {
      showResult('Fout! Probeer het nog eens. Je hebt nog ' + chances + ' kansen over.');
    } else {
      showResult('Helaas, je hebt verloren. De geheime pokémon was ' + secretPokemon + '.');
      endGame();
      var checkButton = document.getElementById('checkButton');
      checkButton.disabled = true;
    }

    updateChancesDisplay();

    if (chances === 1) {
      var hint = getHint();
      showResult('Helaas niet goed, je krijgt een hint: ' + hint);
    }
  }
}

function showResult(message) {
  var resultElement = document.getElementById('result');
  resultElement.textContent = message;
}

function enableCheckButton() {
  var checkButton = document.getElementById('checkButton');
  checkButton.disabled = false;
}

function resetGame() {
  chosenPokemons = [];
  chances = 4;
  selectRandomPokemon();
  updateChancesDisplay();
  var chosenPokemonsList = document.getElementById('chosenPokemons');
  chosenPokemonsList.innerHTML = '';
  var newGameButton = document.getElementById('newGameButton');
  newGameButton.style.display = 'none';

  enableCheckButton();
}

function startNewGame() {
  resetGame();
  var resultElement = document.getElementById('result');
  resultElement.textContent = '';
  var newGameButton = document.getElementById('newGameButton');
  newGameButton.style.display = 'none';
}

function endGame() {
  var newGameButton = document.getElementById('newGameButton');
  newGameButton.style.display = 'block';
}

//Bron selecteren van pokemon naar choosepokemon: Chatgbt

function initializeGame() {
  var pokemonImages = document.getElementsByTagName('img');

  for (var i = 0; i < pokemonImages.length; i++) {
    pokemonImages[i].addEventListener('click', function (event) {
      var clickedPokemon = event.target.id;
      choosePokemon(clickedPokemon);
    });
  }

  var checkButton = document.getElementById('checkButton');
  checkButton.addEventListener('click', checkPokemons);

  var newGameButton = document.getElementById('newGameButton');
  newGameButton.addEventListener('click', startNewGame);

  selectRandomPokemon();
  updateChancesDisplay();
}

//bron if else pause: https://stackoverflow.com/questions/67441556/is-there-a-way-to-pause-an-audio-after-being-played

document.addEventListener('DOMContentLoaded', function () {
  var playSoundButton = document.getElementById('playSoundButton');
  var sound = document.getElementById('sound');

  playSoundButton.addEventListener('click', function () {
    if (sound.paused) {
      sound.play();
    } else {
      sound.pause();
    }
  });

  initializeGame();
});

//Bron chosenpokemonselement: chagbt

function updateSelectedPokemonsDisplay() {
  var chosenPokemonsElement = document.getElementById('chosenPokemons');
  chosenPokemonsElement.innerHTML = '';

  if (selectedPokemon) {
    var selectedPokemonName = capitalizeFirstLetter(selectedPokemon);
    var pokemonListItem = document.createElement('li');
    pokemonListItem.textContent = selectedPokemonName;
    chosenPokemonsElement.appendChild(pokemonListItem);
  }
}

//bron: Chatgbt
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
