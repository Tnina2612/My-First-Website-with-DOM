console.log(`Hello world!`)

// window.alert(`This is an alert!`)

document.getElementById("firsth1").textContent = "Some simple projects to acquaint with HTML, CSS and DOM JavaScript";
document.getElementById("firstp").textContent = "This is my first website with DOM.";

let x = 5;
console.log(x**3);  
// x = window.prompt("Enter a value:");
// console.log(x**3);
let username;
document.getElementById("submit").onclick = function(){
    username = document.getElementById("textbox").value;
    document.getElementById("greeting").textContent = `Hello ${username}. Hope you enjoy this website!`;
}

let count = 0;
document.getElementById("increase").onclick = function(){
    count++;
    document.getElementById("count").textContent = count;
}
document.getElementById("decrease").onclick = function(){
    count--;
    document.getElementById("count").textContent = count;
}
document.getElementById("reset").onclick = function(){
    count = 0;
    document.getElementById("count").textContent = count;
}

const toFah = document.getElementById("toFah");
const toCel = document.getElementById("toCel");
const result = document.getElementById("result");

function convert() {
    let temp = Number(document.getElementById("textBox").value);
    if (toFah.checked) {
        temp = (temp * 9/5 + 32).toFixed(1);
        result.textContent = `${temp} Fahrenheit degree`;
    } else if (toCel.checked) {
        temp = ((temp - 32)*5/9).toFixed(1);
        result.textContent = `${temp} Celcius degree`;
    } else {
        result.textContent = "Select an unit";
    }
}



const diceImages = document.getElementById("diceImages");
function roll() {
    const numDice = document.getElementById("numDice").value;
    // numDice = Number(numDice.value);
    const randArr = [], htmlLinks = [];

    for (let i = 0; i < Number(numDice); i++) {
        const randNum = Math.ceil(Math.random() * 6);
        randArr.push(randNum);
        htmlLinks.push(`<img src="assets/dice${randNum}.png" alt="Dice ${randNum}">`);
    }

    diceResult.textContent = `You got ${randArr.join(', ')}.`;
    diceImages.innerHTML = htmlLinks.join(' ');
}

function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const meridiem = now.getHours() < 12 ? "AM" : "PM";
    clock.textContent = hours + ":" + minutes + ":" + seconds + " " + meridiem;
}
setInterval(updateClock, 1000);

const stopwatch = document.getElementById("stopwatch");
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
function startClock() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timeIntervalId = setInterval(updateStopwatch, 10);
    }
}

function stopClock() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timeIntervalId);
    }
}   

function resetClock() {
    stopClock();
    startTime = 0;  
    elapsedTime = 0;
    stopwatch.textContent = `00:00:00:00`;
}

function updateStopwatch() {   
    elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime/3600000).toString().padStart(2, 0);
    const minutes = Math.floor((elapsedTime - hours*3600000)/60000).toString().padStart(2, 0);
    const seconds = Math.floor((elapsedTime - hours*3600000 - minutes*60000)/1000).toString().padStart(2, 0);
    const milliseconds = Math.floor((elapsedTime - hours*3600000 - minutes*60000 - seconds*1000)/10).toString().padStart(2, 0);

    stopwatch.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}



let display = document.getElementById("calculatorTextbox");
let res = "";
function appendDisplay(input) {
    if (display.value == "Error") {
        display.value = "";
    }
    display.value += input;
    if (input === '×') {
        res += '*';
    } else if (input === '÷') {
        res += '/';
    } else { 
        res += input;
    }
}

function del() {
    display.value = display.value.slice(0, -1);
    res = res.slice(0, -1);
}

function clearDisplay() {
    display.value = "";
    res = "";
}

function calculate() {
    try {
        // display.textContent = eval(res);
        const result = Function('"use strict"; return (' + res + ')')();

        if (Number.isFinite(result) && result % 1 !== 0) {
            display.value = parseFloat(result.toFixed(3));
        } else {
            display.value = result;
        }

        res = display.value;
    } catch(error) {
        display.value = "Error";
        res = "";
    }
}



const choices = ['rock', 'paper', 'scissors'];
const resultDisplay = document.getElementById("resultDisplay");
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay"); 
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");

function playHand(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    if (playerChoice == computerChoice) {
        resultDisplay.textContent = "IT'S A TIE!";
    } else {
        switch(computerChoice) {
            case 'rock':
                resultDisplay.textContent = (playerChoice == 'scissors') ? "YOU LOSE!" : "YOU WIN!";
                break;
            case 'scissors':
                resultDisplay.textContent = (playerChoice == 'paper') ? "YOU LOSE!" : "YOU WIN!";
                break;
            case 'paper':
                resultDisplay.textContent = (playerChoice == 'rock') ? "YOU LOSE!" : "YOU WIN!";
                break;
        }
    }

    playerDisplay.textContent = `Player: ${playerChoice[0].toUpperCase() + playerChoice.slice(1)}`;
    computerDisplay.textContent = `Computer: ${computerChoice[0].toUpperCase() + computerChoice.slice(1)}`;

    resultDisplay.style.color = "black";
    if (resultDisplay.textContent == "YOU WIN!") {
        resultDisplay.style.color = "lightgreen";
        playerScore.textContent = Number(playerScore.textContent) + 1;
    } else if (resultDisplay.textContent == "YOU LOSE!") {
        resultDisplay.style.color = "red";
        computerScore.textContent = Number(computerScore.textContent) + 1;
    } 
}



async function fetchPokemon() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Fetching this Pokemon failed!");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const pokemonImg = document.querySelector(".pokemonDisplay img");

        pokemonImg.src = pokemonSprite;
        pokemonImg.style.display = "block";
    } catch(error) {
        console.error(error);
    }
}



// WEATHER APP
const apiKey = `347c4f4b86d1977931050e720a2fdee8`;
const weatherForm = document.querySelector(".weatherForm");
const weatherCard = document.querySelector(".weatherCard");
const weatherInfo = document.querySelectorAll(".weatherInfo");
const errorInput = document.getElementById("errorInput");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = document.getElementById("city").value;

    if (city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!response.ok) {
                weatherCard.style.display = "block";
                weatherInfo.forEach(info => {
                    info.style.display = "none";
                });
                errorInput.style.display = "block";
                throw new Error("Fetching weather data failed!");
            }

            console.clear();
            const weatherData = await response.json();
            console.log(weatherData);

            const {name: cityName,
                   main: {temp, humidity},
                   weather: [{description, id}]
            } = weatherData;

            weatherInfo[0].textContent = cityName;
            weatherInfo[1].textContent = `Temperature: ${(temp - 273.15).toFixed(2)}°C`;
            weatherInfo[2].textContent = `Humidity: ${humidity}%`;
            weatherInfo[3].textContent = description[0].toUpperCase() + description.slice(1);
            weatherInfo[4].textContent = getWeatherEmoji(id);

            weatherCard.style.display = "block";
            weatherInfo.forEach(info => {
                info.style.display = "block";
            });
            errorInput.style.display = "none";
        } catch(error) {
            console.error(error);
            weatherCard.style.display = "block";
            weatherInfo.forEach(info => {
                    info.style.display = "none";
            });
            errorInput.style.display = "block";
        }
    }
});

function getWeatherEmoji(id) {
    switch (true) {
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 600):
            return "🌧️";
        case (id >= 600 && id < 700):
            return "❄️";
        case (id >= 700 && id < 800):
            return "🌫️";
        case (id == 800):
            return "☀️";
        case (id >= 800 && id < 900):
            return "🌥️";
    }
}