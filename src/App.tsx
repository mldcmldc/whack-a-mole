import { useEffect, useState } from "react";
import "./App.css";

const GAME_DURATION = 30; // in seconds
const GAME_HOLES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [hitCount, setHitCount] = useState(0);
  const [holes, setHoles] = useState(GAME_HOLES);
  const [gameOver, setGameOver] = useState(false);

  function getRandomSingleDigitNumber(limit = 9, min = 0) {
    return Math.floor(Math.random() * (limit - min) + min);
  }

  function addMole() {
    const position = getRandomSingleDigitNumber(18);

    if (position > 8) {
      setHoles(GAME_HOLES);
      return;
    }

    const copy = [...holes];
    copy[position] = -1;

    setHoles(copy);
  }

  useEffect(() => {
    let time = 0;

    const interval = setInterval(() => {
      time++;

      addMole();

      if (time === GAME_DURATION) {
        clearInterval(interval);
        setGameOver(true);
      }
    }, 500);
  }, []);

  return gameOver ? (
    <>
      <p>GAME OVER</p>
      <p>Score : {hitCount}</p>
    </>
  ) : (
    <>
      <p className="text-3xl mb-5">Count : {hitCount}</p>
      <div className="h-[500px] w-[500px] border border-white/50 grid grid-cols-3 items-center g">
        {holes.map((hole) => (
          <div
            className="rounded-full border border-white/50 flex items-center justify-center h-full relative grow-0"
            key={hole}
          >
            {hole == -1 ? (
              <button
                className="absolute"
                onClick={() => setHitCount((prevState) => prevState + 1)}
              >
                <img className="scale-75" src="mole.svg" />
              </button>
            ) : (
              hole + 1
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
