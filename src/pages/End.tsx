import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { addDocument } from "../utilities/fireStore";
import "./../css/end.css";

export default function End() {

  const usernameRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const finalScoreRef = useRef<HTMLHeadingElement>(null);

  let username: HTMLInputElement | null;
  let button: HTMLAnchorElement | null;
  let finalScore: HTMLHeadingElement | null;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    username = usernameRef.current;
    button = buttonRef.current;
    finalScore = finalScoreRef.current;
    if (!finalScore) return console.error("No capable of rendering final score!");
    finalScore.innerText = searchParams.get("score")?.toString() as string;
    button?.addEventListener("click", (event) => {
      event.preventDefault();
      if (!username || !username?.value || !finalScore?.innerText) return console.error("No capable of saving highscore!");
      addDocument("highscores", {
        username: username?.value,
        highscore: parseInt(finalScore?.innerText as string),
        date: new Date().toLocaleDateString()
      });
      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    });
  }, []);

  return (
    <div className="container">
        <div id="end" className="flex-center flex-column">
            <h1 id="finalScore" ref={finalScoreRef}>0</h1>
            <h2 id="end-text">Enter your username below to save your highscore!</h2>
            <input type="text" name="name" id="username" placeholder="Enter your username" maxLength={8} ref={usernameRef} />
            <a className="btn" id="saveScoreBtn" ref={buttonRef}>Save</a>
            <a href="/play" className="btn">Play Again</a>
            <a href="/" className="btn">Go Home<i className="fas fa-home"></i></a>
        </div>
    </div>
  );
}