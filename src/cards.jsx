import { useEffect, useState } from "react";
import "./cards.css";

function shuffle(
  pokemons,
  setPokemons,
  index,
  clicked,
  setClicked,
  score,
  setScore,
  bestscore,
  setBestscore,
  name,
  setDifficultyLevel,
) {
  if (clicked.includes(name)) {
    setBestscore(score);
    setScore(0);
    setClicked([]);
    setDifficultyLevel(0);
    setPokemons([]);
    return;
  }
  setClicked([...clicked, name]);
  console.log(clicked);
  let array = [...pokemons];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  setPokemons(array);
  setScore((prev) => prev + 1);
}

function Cards({
  pokemons,
  setPokemons,
  score,
  setScore,
  bestscore,
  setBestscore,
  setDifficultyLevel,
}) {
  const [clicked, setClicked] = useState([]);
  return (
    <>
      <div id="cardsDiv">
        {pokemons.map((obj, index) => (
          <img
            className="cards"
            key={index}
            src={obj[1]}
            alt={obj[0]}
            onClick={() =>
              shuffle(
                pokemons,
                setPokemons,
                index,
                clicked,
                setClicked,
                score,
                setScore,
                bestscore,
                setBestscore,
                obj[0],
                setDifficultyLevel,
              )
            }
          ></img>
        ))}
      </div>
    </>
  );
}
export default Cards;
