window.addEventListener("load", startComputerGuessing);

let minValue = 1;
let maxValue = 100;
let computerGuess;
let guessHistory = [];
let guessCount = 0;
let bestGuessCount = localStorage.getItem("bestGuessCount") || Infinity; 

function startComputerGuessing() {
    console.log("Computer Gæt Spillet Kører!");
    resetGame();
    document.getElementById("too-low").addEventListener("click", handleTooLow);
    document.getElementById("correct").addEventListener("click", handleCorrect);
    document.getElementById("too-high").addEventListener("click", handleTooHigh);
    document.getElementById("reset-button").addEventListener("click", resetGame);
}

function generateGuess() {
    if (minValue <= maxValue) {
        computerGuess = Math.floor((minValue + maxValue) / 2);
    } else {
        console.log("Fejl: Ingen mulige gæt tilbage.");
        return;
    }
    document.getElementById("current-guess").textContent = computerGuess;
    console.log(`Nyt gæt genereret: ${computerGuess}`);
}

function handleTooLow() {
    console.log(`Bruger siger, ${computerGuess} er for lavt.`);
    if (computerGuess >= minValue) {
        minValue = computerGuess + 1;
    }
    guessHistory.push(`Gæt: ${computerGuess} - for lavt`);
    updateGuessList();
    guessCount++;
    updateGuessCount();
    checkIfOnlyOneOptionLeft();
}

function handleCorrect() {
    console.log(`Bruger siger, ${computerGuess} er korrekt!`);
    guessHistory.push(`Gæt: ${computerGuess} - korrekt`);
    updateGuessList();
    displayVictoryMessage();
    document.getElementById("reset-button").style.display = "inline";
    disableGuessButtons();
}

function handleTooHigh() {
    console.log(`Bruger siger, ${computerGuess} er for højt.`);
    if (computerGuess <= maxValue) {
        maxValue = computerGuess - 1;
    }
    guessHistory.push(`Gæt: ${computerGuess} - for højt`);
    updateGuessList();
    guessCount++;
    updateGuessCount();
    checkIfOnlyOneOptionLeft();
}

function checkIfOnlyOneOptionLeft() {
    if (minValue > maxValue) {
        document.getElementById("computer-guess-output").textContent = `Der er ingen mulige gæt tilbage! Noget gik galt.`;
        disableGuessButtons();
        document.getElementById("reset-button").style.display = "inline";
    } else if (minValue === maxValue) {
        computerGuess = minValue;
        document.getElementById("current-guess").textContent = computerGuess;
        document.getElementById("computer-guess-output").textContent = `Det kan kun være ${computerGuess}! Ingen flere muligheder.`;
        guessHistory.push(`Gæt: ${computerGuess} - korrekt`);
        updateGuessList();
        disableGuessButtons();
        document.getElementById("reset-button").style.display = "inline";
    } else {
        generateGuess();
    }
}

function resetGame() {
    console.log("Spillet er startet forfra.");
    guessHistory = [];
    guessCount = 0;
    minValue = 1;
    maxValue = 100;
    updateGuessList();
    document.getElementById("computer-guess-output").innerHTML = `Computeren gætter på: <span id="current-guess"></span>`;
    document.getElementById("reset-button").style.display = "none";
    enableGuessButtons();
    updateGuessCount();
    generateGuess();
}

function displayVictoryMessage() {
    const output = document.getElementById("computer-guess-output");
    let message = `Computeren gættede korrekt! Dit tal var ${computerGuess}. Det tog ${guessCount} forsøg.`;

    if (guessCount < bestGuessCount) {
        message += ` Fantastisk! Dette er din hurtigste runde nogensinde! 🎉`;
        bestGuessCount = guessCount;
        localStorage.setItem("bestGuessCount", bestGuessCount);
    }

    output.textContent = message;
}

function openTab(tabName) {
    const tabs = document.getElementsByClassName("tab-content");
    for (let tab of tabs) {
        tab.style.display = "none";
    }

    const tabLinks = document.getElementsByClassName("tab-link");
    for (let link of tabLinks) {
        link.classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    document.querySelector(`.tab-link[onclick="openTab('${tabName}')"]`).classList.add("active");
}

function updateGuessList() {
    const guessList = document.getElementById("computer-guesses");
    guessList.innerHTML = '';
    guessHistory.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = entry;
        guessList.appendChild(listItem);
    });
}

function updateGuessCount() {
    document.getElementById("guess-count").textContent = `Antal gæt: ${guessCount}`;
}

function disableGuessButtons() {
    document.getElementById("too-low").disabled = true;
    document.getElementById("correct").disabled = true;
    document.getElementById("too-high").disabled = true;
}

function enableGuessButtons() {
    document.getElementById("too-low").disabled = false;
    document.getElementById("correct").disabled = false;
    document.getElementById("too-high").disabled = false;
}
