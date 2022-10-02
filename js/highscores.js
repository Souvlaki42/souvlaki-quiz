const highScoresList = document.querySelector("#highScoresList");
const highScoreBtn = document.querySelector("#highscore-btn");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("");

highScoreBtn.addEventListener("click", e => {
    localStorage.clear();
});