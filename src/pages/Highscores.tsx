import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { addDocument, getDocuments } from "../utilities/fireStore";
import { formatNumber } from "../utilities/formatter";
import { highscore } from "../utilities/types";
import "./../css/highscores.css";

export default function Highscores() {
  
  const highScoresListRef = useRef<HTMLUListElement>(null);
  let highScoresList: HTMLUListElement | null;

  let highscores: DocumentData[] | null;
  
  useEffect(() => {
    highScoresList = highScoresListRef.current;
    const func = async () => {
      highscores = await getDocuments("highscores", "desc");
      console.log(highscores);
      highscores?.forEach((highscore: DocumentData) => {
          const highscoreRow = document.createElement("li");
          highscoreRow.className = "high-score-row";
          highscoreRow.innerText = `${highscore.username} - ${formatNumber(highscore.highscore)} - ${highscore.date}`;
          highScoresList?.appendChild(highscoreRow);
        });
    }
    func();
  }, []);

  return (
    <div className="container">
        <div id="highscores" className="flex-center flex-column">
            <h1 id="finalScore">Leaderboard</h1>
            <ul id="highScoresList" ref={highScoresListRef}>
              <li className="high-score-row">Username - Highscore - Date</li>
            </ul>
            <a href="/" className="btn">Go Home<i className="fas fa-home"></i></a>
        </div>
    </div>
  );
}