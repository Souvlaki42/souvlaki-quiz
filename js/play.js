const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20;

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let questionsUrl = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&type=multiple`;

getRandomUniqueArrayItem = (array) => {
	let options = Math.floor(Math.random() * array.length);
	let removed = array.splice(options, 1);
	return removed[0];
}

decodeHTMLEntities = (rawText) => {
	let textArea = document.createElement("textarea");
	textArea.innerHTML = rawText;
	return textArea.value;
}

getQuestions = () => {
	const data = fetch(questionsUrl).then((res) => {return res.json();}).then((data) => {return data}).catch((err) => console.error(err));
	return data;
};

formatQuestions = async () => {
	const questions = await getQuestions();
	const results = questions.results;
	let newQuestions = [];
	results.forEach(rawQuestion => {
		let question = [];
		let answers = [];
		let correctId = 0;
		answers.push(rawQuestion.correct_answer);
		answers.push(rawQuestion.incorrect_answers[0]);
		answers.push(rawQuestion.incorrect_answers[1]);
		answers.push(rawQuestion.incorrect_answers[2]);
		let correct = answers[0];
		question.question = decodeHTMLEntities(rawQuestion.question);
		
		question.choice1 = getRandomUniqueArrayItem(answers);
		if (question.choice1 === correct) correctId = 1;
		question.choice1 = decodeHTMLEntities(question.choice1);
		
		question.choice2 = getRandomUniqueArrayItem(answers);
		if (question.choice2 === correct) correctId = 2;
		question.choice2 = decodeHTMLEntities(question.choice2);
		
		question.choice3 = getRandomUniqueArrayItem(answers);
		if (question.choice3 === correct) correctId = 3;
		question.choice3 = decodeHTMLEntities(question.choice3);
		
		question.choice4 = getRandomUniqueArrayItem(answers);
		if (question.choice4 === correct) correctId = 4;
		question.choice4 = decodeHTMLEntities(question.choice4);

		question.answer = correctId;
		newQuestions.push(question);
	});
	return newQuestions;
};

startGame = async () => {
	questions = await formatQuestions();
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
}

printQuestions = () => {
	cheated = true;
	const answer = prompt("Password: ");
	if (!answer === "Souvlaki123") return;
	console.log(questions);
}

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem("mostRecentScore", score);
		return window.location.assign("/end.html");
	}
	
	questionCounter++;
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
	
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;
	
	choices.forEach((choice) => {
		const number = choice.dataset["number"];
		choice.innerHTML = currentQuestion[`choice${number}`];
		choice.style.cursor = "pointer";
	});

	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;
}

choices.forEach((choice) => {
	choice.addEventListener("click", (event) => {
		if (!acceptingAnswers) return;
		
		acceptingAnswers = false;
		choice.style.cursor = "not-allowed";
		const selectedChoice = event.target;
		const selectedAnswer = selectedChoice.dataset["number"];
		const correctAnswer = document.querySelector(`[data-number="${currentQuestion.answer}"]`);
		
		let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		
		if (classToApply == "correct") {
			incrementScore(SCORE_POINTS);
		} else {
			correctAnswer.parentElement.classList.add("correct");
		}
		
		selectedChoice.parentElement.classList.add(classToApply);
		
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			correctAnswer.parentElement.classList.remove("correct");
			getNewQuestion();
		}, 1000);
	});
});

incrementScore = num => {
	score += num;
	scoreText.innerText = score;
}

startGame();

console.log("%c Don't cheat!! I can see you...", "font-weight: bold; font-size: 50px;color: red;");