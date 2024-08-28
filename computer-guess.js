window.addEventListener("load", startComputerGuessing);

let computerGuess;

function startComputerGuessing() {
    console.log("Computer Gæt Spillet Kører!");
    generateRandomGuess();

    document.getElementById("too-low").addEventListener("click", handleTooLow);
    document.getElementById("correct").addEventListener("click", handleCorrect);
    document.getElementById("too-high").addEventListener("click", handleTooHigh);
    document.getElementById("reset-button").addEventListener("click", resetGame);
}

function generateRandomGuess() {
    computerGuess = Math.floor(Math.random() * 100) + 1;
    document.getElementById("current-guess").textContent = computerGuess;
    document.getElementById("computer-guess-output"); 
}

function handleTooLow() {
    console.log(`Bruger siger, ${computerGuess} er for lavt.`);
    generateRandomGuess();
}

function handleCorrect() {
    console.log(`Bruger siger, ${computerGuess} er korrekt!`);
    document.getElementById("computer-guess-output").textContent = `Computeren gættede korrekt! Dit tal var ${computerGuess}.`;
    document.getElementById("reset-button").style.display = "inline";
    document.getElementById("too-low").disabled = true;
    document.getElementById("correct").disabled = true;
    document.getElementById("too-high").disabled = true;
}

function handleTooHigh() {
    console.log(`Bruger siger, ${computerGuess} er for højt.`);
    generateRandomGuess();
}

function resetGame() {
    console.log("Spillet er startet forfra.");
    const outputElement = document.getElementById("computer-guess-output");
    outputElement.innerHTML = `Computeren gætter på: <span id="current-guess"></span>`;
    document.getElementById("reset-button").style.display = "none";
    document.getElementById("too-low").disabled = false;
    document.getElementById("correct").disabled = false;
    document.getElementById("too-high").disabled = false;
    generateRandomGuess();
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

