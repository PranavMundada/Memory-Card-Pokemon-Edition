import "./App.css";
import { useState } from "react";
import Cards from "./cards";

async function fetchData(link) {
  const response = await fetch(link);
  const data = await response.json();
  return data;
}

async function getimg(link, pokemons, setpokemons) {
  const result = await fetchData(link);
  setpokemons((prevpokemons) => [
    ...prevpokemons,
    [result.name, result.sprites.other.dream_world.front_default, 0],
  ]);
}

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const [pokemons, setpokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestscore, setBestscore] = useState(0);

  async function difficultyChoose(level) {
    let promises = [];
    let x = Math.ceil(Math.random() * 100);
    for (let i = 0; i < level * 5; i++) {
      promises.push(
        getimg(
          `https://pokeapi.co/api/v2/pokemon/${x + i * 10}`,
          pokemons,
          setpokemons,
        ),
      );
    }
    await Promise.all(promises);
    setDifficultyLevel(level);
  }

  if (difficultyLevel == 0) {
    return (
      <>
        <header>
          <h1 id="heading">Memory Mania : Pokemon Edition</h1>
        </header>
        <div id="scores">
          <h2 id="score">Score : {score}</h2>
          <h2 id="bestScore">Best Score : {bestscore}</h2>
        </div>
        <div id="rules">
          Get points by clicking on an image but don't click on any more than
          once!
        </div>
        <div id="mainPage">
          <h3 id="selectDifficulty">Select Difficulty :</h3>
          <div id="difficultyOptions">
            <button
              type="button"
              id="diff1"
              onClick={() => {
                difficultyChoose(1);
              }}
            >
              Begginer Trainer
            </button>
            <button
              type="button"
              id="diff2"
              onClick={() => {
                difficultyChoose(2);
              }}
            >
              Gym Challenger
            </button>
            <button
              type="button"
              id="diff3"
              onClick={() => {
                difficultyChoose(3);
              }}
            >
              Elite Four Contender
            </button>
            <button
              type="button"
              id="diff4"
              onClick={() => {
                difficultyChoose(4);
              }}
            >
              Champion Rank
            </button>
            <button
              type="button"
              id="diff5"
              onClick={() => {
                difficultyChoose(5);
              }}
            >
              Legendary Master
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <header>
          <h1 id="heading">Memory Mania : Pokemon Edition</h1>
        </header>
        <div id="scores">
          <h2 id="score">Score : {score}</h2>
          <h2 id="bestScore">Best Score : {bestscore}</h2>
        </div>
        <div id="rules">
          Get points by clicking on an image but don't click on any more than
          once!
        </div>
        <Cards
          pokemons={pokemons}
          setPokemons={setpokemons}
          score={score}
          setScore={setScore}
          bestscore={bestscore}
          setBestscore={setBestscore}
          setDifficultyLevel={setDifficultyLevel}
        />
      </>
    );
  }
}

export default App;
