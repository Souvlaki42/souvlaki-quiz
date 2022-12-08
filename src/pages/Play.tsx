import { useEffect, useRef } from "react";
import decodeHtml from "../utilities/decodeHtml";
import randomUniqueItem from "../utilities/randomUniqueItem";
import { question, rawQuestion } from "../utilities/types";
import "./../css/play.css";

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20;
const API = "https://opentdb.com/api.php?amount=1&type=multiple";

let questionDiv: HTMLDivElement | null;
let choices: HTMLParagraphElement[] | null;
let progressText: HTMLParagraphElement | null;
let progressBarFull: HTMLDivElement | null;
let scoreText: HTMLHeadingElement | null;

export default function Play() {

	const questionRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLParagraphElement>(null);
	const progressBarRef = useRef<HTMLDivElement>(null);
	const scoreRef = useRef<HTMLHeadingElement>(null);

	const choiceRef1 = useRef<HTMLParagraphElement>(null);
	const choiceRef2= useRef<HTMLParagraphElement>(null);
	const choiceRef3 = useRef<HTMLParagraphElement>(null);
	const choiceRef4 = useRef<HTMLParagraphElement>(null);

	let questionList: question[] = [];
	let questionCounter: number = 0;
	let acceptingAnswers: boolean = true;
	let currentQuestion: question = {question: "", choice1: "", choice2: "", choice3: "", choice4: "", answer: 0};
	let score: number = 0;

	const fetchQuestion = async () => {
		if (questionCounter >= MAX_QUESTIONS) return window.location.assign(`/end?score=${score}`);
		return await fetch(API).then((res) => {
			return res.json();
		  }).then(async (data) => { return data.results[0] }
		  ).catch((error) => console.error(error));
	}

	const incrementScore = () => {
		score += SCORE_POINTS;
		if (!scoreText) return console.error("No Score Text!");
		scoreText.innerText = score.toString();
	}

	const getNewQuestion = async () => {
		questionCounter++;
		if (!progressText) return console.error("No Progress Text!");
		progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
		if (!progressBarFull) return console.error("No Progress Bar Full!");
		progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
		currentQuestion = formatQuestion(await fetchQuestion());
		if (!questionDiv) return console.error("No Question Div!");
		questionDiv.innerText = currentQuestion.question;
		acceptingAnswers = true;
		choices?.forEach((choice) => {
			const number = choice.dataset["number"];
			choice.innerHTML = currentQuestion[`choice${number}` as keyof typeof currentQuestion].toString();
			choice.style.cursor = "pointer";
			choice.addEventListener("click", (event) => {
				if (!acceptingAnswers) return;
				acceptingAnswers = false;
				choice.style.cursor = "not-allowed";
				const selectedChoice = event.target as HTMLParagraphElement;
				const selectedAnswer = selectedChoice?.dataset["number"];
				const correctAnswer = document.querySelector(`[data-number="${currentQuestion.answer}"]`);

				const classToApply = selectedAnswer == currentQuestion.answer.toString() ? "correct" : "incorrect";

				if (classToApply === "correct") incrementScore()
				else correctAnswer?.parentElement?.classList.add("correct");

				selectedChoice.parentElement?.classList.add(classToApply);

				setTimeout(() => {
					selectedChoice.parentElement?.classList.remove(classToApply);
					correctAnswer?.parentElement?.classList.remove("correct");
					getNewQuestion();
				}, 1000);
			});
		});
	}

	const formatQuestion = (raw_question: rawQuestion) => {
			let newQuestion: question = {question: "", choice1: "", choice2: "", choice3: "", choice4: "", answer: 0};
			let answers: string[] = [];
			let correctId = 0;
			answers.push(raw_question.correct_answer);
			answers.push(raw_question.incorrect_answers[0]);
			answers.push(raw_question.incorrect_answers[1]);
			answers.push(raw_question.incorrect_answers[2]);
			let correct = answers[0];
			newQuestion.question = decodeHtml(raw_question.question);
			
			newQuestion.choice1 = randomUniqueItem(answers);
			if (newQuestion.choice1 === correct) correctId = 1;
			newQuestion.choice1 = decodeHtml(newQuestion.choice1);

			newQuestion.choice2 = randomUniqueItem(answers);
			if (newQuestion.choice2 === correct) correctId = 2;
			newQuestion.choice2 = decodeHtml(newQuestion.choice2);

			newQuestion.choice3 = randomUniqueItem(answers);
			if (newQuestion.choice3 === correct) correctId = 3;
			newQuestion.choice3 = decodeHtml(newQuestion.choice3);

			newQuestion.choice4 = randomUniqueItem(answers);
			if (newQuestion.choice4 === correct) correctId = 4;
			newQuestion.choice4 = decodeHtml(newQuestion.choice4);

			newQuestion.answer = correctId;

		return newQuestion;
	}
	
	const startGame = async () => {
		questionCounter = 0;
		score = 0;
		await getNewQuestion();
	}

	useEffect(() => {
		questionDiv = questionRef.current;
		choices = [choiceRef1.current!, choiceRef2.current!, choiceRef3.current!, choiceRef4.current!];
		progressText = progressRef.current;
		progressBarFull = progressBarRef.current;
		scoreText = scoreRef.current;
		startGame();
	}, []);

	return (
		<div className="container">
				<div id="game" className="justify-center flex-column">
						<div id="hud">
								<div className="hud-item">
										<p id="progressText" className="hud-prefix" ref={progressRef}>
												Question
										</p>
										<div id="progressBar">
												<div id="progressBarFull" ref={progressBarRef}></div>
										</div>
								</div>
								<div className="hud-item">
										<p className="hud-prefix">
												Score
										</p>
										<h1 className="hud-main-text" id="score" ref={scoreRef}>
												0
										</h1>
								</div>
						</div>
						<h1 id="question" ref={questionRef}>What is the answer to this question</h1>
						<div className="choice-container">
								<p className="choice-prefix">A</p>
								<p className="choice-text" data-number="1" ref={choiceRef1}>Choice</p>
						</div>
						<div className="choice-container">
								<p className="choice-prefix">B</p>
								<p className="choice-text" data-number="2" ref={choiceRef2}>Choice 2</p>
						</div>
						<div className="choice-container">
								<p className="choice-prefix">C</p>
								<p className="choice-text" data-number="3" ref={choiceRef3}>Choice 3</p>
						</div>
						<div className="choice-container">
								<p className="choice-prefix">D</p>
								<p className="choice-text" data-number="4" ref={choiceRef4}>Choice 4</p>
						</div>
				</div>
		</div>
	);
}