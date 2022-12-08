import { Route, Routes } from "react-router-dom";
import Highscores from "./pages/Highscores";
import Home from "./pages/Home";
import Play from "./pages/Play";
import End from "./pages/End";
import "./css/index.css";

export default function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home></Home>}></Route>
      <Route path={"/play"} element={<Play></Play>}></Route>
      <Route path={"/highscores"} element={<Highscores></Highscores>}></Route>
      <Route path={"/end"} element={<End></End>}></Route>
    </Routes>
  );
}