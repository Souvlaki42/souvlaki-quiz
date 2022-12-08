export default function Home() {
  return (
    <div className="container">
        <div id="home" className="flex-column flex-center">
            <h1>Are you Ready?</h1>
            <a href="/play" className="btn">Play</a>
            <a href="/highscores" id="highscore-btn" className="btn">High Scores<i className="fas fa-crown"></i></a>
        </div>
    </div>
  );
}