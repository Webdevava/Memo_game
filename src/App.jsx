import React, { useState } from "react";
import Images from "./images";
import "./App.css";
import { shuffle } from "lodash";

const App = () => {
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [activeCards, setActiveCards] = useState([]);
  const [foundMatch, setFoundMatch] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);

  const resetGame = () => {
    setCards(shuffle([...Images, ...Images]));
    setActiveCards([]);
    setFoundMatch([]);
    setClicks(0);
    setWon(false);
  };

  function flipCard(index) {
    if (activeCards.includes(index)) {
      return;
    }

    if (activeCards.length === 0) {
      setActiveCards([index]);
    } else if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;

      if (cards[firstIndex] === cards[secondIndex]) {
        setFoundMatch([...foundMatch, firstIndex, secondIndex]);

        if (foundMatch.length + 2 === cards.length) {
          setWon(true);
        }
      }

      setActiveCards([...activeCards, index]);
    } else if (activeCards.length === 2) {
      setActiveCards([index]);
    }

    setClicks(clicks + 1);
  }

  return (
    <div>
      {won && (
        <div className="won">
          <h1>You found all cards in {clicks} clicks</h1>
          <button onClick={resetGame}>REPLAY</button>
        </div>
      )}
      <div className="board">
      {cards.map((card, index) => {
        const flippedToFront =
          activeCards.indexOf(index) !== -1 ||
          foundMatch.indexOf(index) !== -1;
        return (
          <div
            key={index}  // Add a unique key prop here
            className={"card_outer " + (flippedToFront ? "flipped" : "")}
            onClick={() => flipCard(index)}
          >
            <div className="card">
              <div className="front">
                <img src={card} alt="" className="memeImg" />
              </div>
              <div className="back"></div>
            </div>
          </div>
        );
      })}
      
      </div>

      <div className="stats">
        <span>CLICKS: {clicks}</span>
        <br />
        <span>FOUND PAIRS: {foundMatch.length / 2}</span>
      </div>
    </div>
  );
};

export default App;
