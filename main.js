/*
Advices
- Always Check The Console
- Take Your Time To Name The Identifiers
- DRY dont repeat yourself

Steps To Create The Project
[01] Create HTML Markup
[02] Add Styling And Separate From Logic
[03] Create The App Logic
---- [01] Add Levels
---- [02] Show Level And Seconds
---- [03] Add Array Of Words
---- [04] ِAdd Start Game Button
---- [05] Generate Upcoming Words
---- [06] Disable Copy Word And Paste Event + Focus On Input
---- [07] Start Play Function
---- [08] Start The Time And Count Score
---- [09] Add The Error And Success Messages
[04] Your Trainings To Add Features
---- [01] Save Score To Local Storage With Date
---- [02] Choose Levels From Select Box
---- [03] Break The Logic To More Functions
---- [04] Choose Array Of Words For Every Level
---- [05] Write Game Instruction With Dynamic Values
---- [06] Add 3 Seconds For The First Word
*/

//words
// const words = ["Hello", "Code", "Town"];
const words = [
	"Hello",
	"Program",
	"Code",
	"Java",
	"Town",
	"Country",
	"Testing",
	"Youtube",
	"Linkedin",
	"Twitter",
	"Github",
	"Leetcode",
	"Internet",
	"Python",
	"Scala",
	"Hossam",
	"person",
	"Styling",
	"Cascade",
	"Document",
	"Coding",
	"Funny",
	"Working",
	"Egypt",
	"Task",
	"Runner",
	"Roles",
	"Test",
	"Rust",
	"Playing",
];

//levels
const lvls = {
	easy: 5,
	normal: 3,
	hard: 2,
};

// get elements
let levelSelect = document.getElementById("level");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let wordsCount = 0;

//default settings
let defaultLevelName = levelSelect.value;
let defaultLevelSec = lvls[defaultLevelName];

// set the empty values in page
lvlNameSpan.innerHTML = defaultLevelName.toUpperCase();
secondsSpan.innerHTML = defaultLevelSec;
timeLeftSpan.innerHTML = defaultLevelSec;
scoreTotal.innerHTML = words.length;

levelSelect.oninput = () => {
	defaultLevelName = levelSelect.value;
	defaultLevelSec = lvls[defaultLevelName];
	lvlNameSpan.innerHTML = defaultLevelName.toUpperCase();
	secondsSpan.innerHTML = defaultLevelSec;
	timeLeftSpan.innerHTML = defaultLevelSec;
	scoreTotal.innerHTML = words.length;
};

//disable paste event
input.onpaste = () => {
	return false;
};

// starting game
startButton.onclick = () => {
	startButton.remove();
	levelSelect.remove();
	input.focus();

	// generate word function
	genWords();
};

function genWords() {
	let randomWord = words[Math.floor(Math.random() * words.length)];
	let randomWordIndex = words.indexOf(randomWord);
	words.splice(randomWordIndex, 1);
	upcomingWords.innerHTML = "";
	//put the word
	theWord.innerHTML = randomWord;
	if (words.length == 0) {
		upcomingWords.innerHTML = `<div>No More Words</div>`;
	}
	//put up coming
	words.forEach((e) => {
		let word = document.createElement("div");
		word.appendChild(document.createTextNode(e));
		upcomingWords.appendChild(word);
	});
	runtimer();
}

function runtimer() {
	resetTimer();
	let timer = setInterval(() => {
		timeLeftSpan.innerHTML--;
		if (timeLeftSpan.innerHTML == 0) {
			clearInterval(timer);
			answerChecker();
			input.value = "";
		}
	}, 1000);
}

function answerChecker() {
	if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
		scoreGot.innerHTML++;
		if (words.length > 0) {
			genWords();
		} else {
			win()
		}
	} else {
		lost()
	}
}

function resetTimer() {
	if (wordsCount < 1) {
		timeLeftSpan.innerHTML = defaultLevelSec * 2;
		wordsCount++
	} else {
		timeLeftSpan.innerHTML = defaultLevelSec;
	}
}

function win() {
	let result = document.createElement("span");
	result.className = "good";
	result.appendChild(document.createTextNode("Great Work You Won"));
	finishMessage.appendChild(result);
	upcomingWords.remove();
}

function lost() {
	let result = document.createElement("span");
	result.className = "bad";
	result.appendChild(document.createTextNode("Game Over"));
	finishMessage.appendChild(result);
}