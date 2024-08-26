window.addEventListener("load", start);

let secret;

function start() {
    console.log("Javascript kører!");

    secret = randomNumber();
    
    document.getElementById("guesser").addEventListener("submit", receiveInput);
    document.getElementById("clear-button").addEventListener("click", clearGame);
}

function randomNumber() {
    return Math.floor(Math.random() * 100) + 1; 
}

function compare(guess, secret) {
    if (guess < secret) return -1;
    if (guess === secret) return 0;
    if (guess > secret) return 1;
}

function receiveInput(event) {
    event.preventDefault(); 

    const guess = document.getElementById("guess").valueAsNumber;
    const comparison = compare(guess, secret);

    if (comparison < 0) {
        outputAnswer(`Du gættede på ${guess} - det var for lavt`);
    } else if (comparison > 0) {
        outputAnswer(`Du gættede på ${guess} - det var for højt`);
    } else {
        outputAnswer(`Du gættede på ${guess} - det var korrekt!`);
    }
}

function outputAnswer(text) {
    const guessList = document.getElementById("guesses");
    const listItem = document.createElement("li");
    listItem.textContent = text;
    guessList.appendChild(listItem);
}

function clearGame() {
    const guessList = document.getElementById("guesses");
    guessList.innerHTML = '';

    document.getElementById("guess").value = '';

    secret = randomNumber();
}
