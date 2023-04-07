import React, { useState, useContext, useEffect } from "react";
// import Card from "./Card";
// import PlayerInfo from "./PlayerInfo";
import { drawFromDeck, queryHand, hasCompleteSet } from "../hooks/DeckProps";
import { CardContext, GameContext } from "../App";
import { Ranks, numberToString } from "../data";

const botDelay = 1000; // = 1s

const PlayerArea = () => {
  // const { cards, setCards } = useContext(CardContext);
  const { game, setGame, deck } = useContext(GameContext);
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(game[0].name);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [rankChoice, setRankChoice] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [turnMessage, setTurnMessage] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);

  useEffect(() => {
    const nextPlayer = game.find((player) => {
      return player.index === turn % 4;
    }).name;
    setCurrentPlayer(nextPlayer);
    // if (nextPlayer.includes("bot")) {
    //   setTimeout(() => {
    //     drawDeckEvent(true);
    //     setTurn(turn + 1);
    //   }, botDelay);
    // }
  }, [turn]);

  const checkCompletedSets = () => {
    const completeSets = hasCompleteSet(
      game.find((player) => {
        return player.name === currentPlayer;
      }).cards
    );
    if (completeSets.length) {
      console.log(
        `${currentPlayer} completed sets of ${completeSets.join(", ")}`
      );
      setGame([
        ...game.map((player) => {
          if (player.name == currentPlayer) {
            completeSets.map((completedRank) => {
              player.cards = player.cards.filter((card) => {
                return !card.includes(completedRank);
              });
            });
            player.score += completeSets.length;
            return player;
          } else {
            return player;
          }
        }),
      ]);
    }
  };

  const drawDeckEvent = (endTurn) => {
    const card = drawFromDeck(deck);
    if (card) {
      console.log(turn, card);
      // alert(`You drawn ${card}`);
      setGame(
        game.map((player) => {
          if (player.index === turn % 4) {
            player.cards = [...player.cards, card];
          }
          return player;
        })
      );
      if (endTurn) {
        setRankChoice([]);
        setOtherPlayers([]);
        checkCompletedSets();
        setTurn(turn + 1);
      }
    } else {
      console.log("Deck has no more cards.");
    }
  };

  const drawPlayerEvent = (rank) => {
    console.log("drawing from", selectedPlayer, rank);
    const queryResult = queryHand(
      game.find((player) => {
        return player.name === selectedPlayer;
      }).cards,
      rank
    );
    if (queryResult.length) {
      setGame([
        ...game.map((player) => {
          if (player.name == selectedPlayer) {
            player.cards = player.cards.filter((card) => {
              return !queryResult.includes(card);
            });
            return player;
          } else if (player.name == currentPlayer) {
            player.cards.push(...queryResult);
            return player;
          } else {
            return player;
          }
        }),
      ]);
      setTurnMessage(
        `${currentPlayer} drew ${
          numberToString[queryResult.length]
        } ${rank}'s from ${selectedPlayer}`
      );
      // setMoveHistory([...moveHistory, []]);
    } else {
      drawDeckEvent();
      setTurnMessage(`${currentPlayer} drew from deck`);
    }
    setRankChoice([]);
    checkCompletedSets();
    setTurn(turn + 1);
  };

  const choosePlayerEvent = (thisPlayer) => {
    const otherPlayers = game.filter((player) => {
      return player.name !== thisPlayer;
    });
    setOtherPlayers(otherPlayers);
    setRankChoice([]);
  };

  const chooseRankEvent = (playerName) => {
    setSelectedPlayer(playerName);
    setRankChoice(Ranks);
    setOtherPlayers([]);
  };

  const drawEvent = (target) => {
    if (["deck", "player"].includes(target)) {
      if (target == "deck") {
        drawDeckEvent(true);
        setTurnMessage(`${currentPlayer} drew from deck`);
        return;
      }
      if (target == "player") {
        choosePlayerEvent(currentPlayer);
        return;
      }
    }
    console.log("Button click wrong");
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    navigate("/products");
  };

  return (
    <div className="play-area-wrapper">
      <div className="player-turn">{currentPlayer}'s turn</div>
      <div className="action-container-1">
        <div className="action-info">
          <span>Choose action</span>
        </div>
        <button className="button-action" onClick={() => drawEvent("deck")}>
          Draw from Deck
        </button>
        <button className="button-action" onClick={() => drawEvent("player")}>
          Draw from Player
        </button>
      </div>
      <div className="action-container-2">
        {otherPlayers.length > 0 &&
          otherPlayers.map((player, index) => {
            return (
              <button
                className="button-action"
                key={index}
                onClick={() => chooseRankEvent(player.name)}
              >
                Draw from {player.name}
              </button>
            );
          })}
        {rankChoice.length > 0 && (
          <div className="button-rank-container">
            {rankChoice.map((rank, index) => {
              return (
                <button
                  className="button-rank"
                  key={index}
                  onClick={() => drawPlayerEvent(rank)}
                >
                  {rank}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {turnMessage && (
        <div className="message-container">
          <div>{turnMessage}</div>
        </div>
      )}
    </div>
  );
};

export default PlayerArea;
