import React, { useState, useContext, useEffect } from "react";
// import Card from "./Card";
// import PlayerInfo from "./PlayerInfo";
import {
  drawFromDeck,
  queryHand,
  hasCompleteSet,
  availableRanks,
} from "../hooks/DeckProps";
import { randomAvailableRank, randomFromArray } from "../hooks/BotLogic";
import { CardContext, GameContext } from "../App";
import { Ranks, numberToString, players } from "../data";

const botDelay = 2000; // = 1s

const PlayerArea = () => {
  // const { cards, setCards } = useContext(CardContext);
  const { game, setGame, deck, turn, setTurn, moveHistory, setMoveHistory } =
    useContext(GameContext);
  // const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(game[0].name);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [rankChoice, setRankChoice] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [turnMessage, setTurnMessage] = useState("");
  const [gameMessage, setGameMessage] = useState("");
  const [gameInProgress, setGameInProgress] = useState(true);
  const [canDrawDeck, setCanDrawDeck] = useState(false);
  const [botChoice, setBotChoice] = useState("");
  const [selectedAction, setSelectedAction] = useState();

  useEffect(() => {
    checkCompletedSets();
  }, []);

  useEffect(() => {
    if (gameInProgress) {
      const nextPlayer = game.find((player) => {
        return player.index === turn % players.length;
      });
      setCurrentPlayer(nextPlayer.name);
    }
  }, [turn]);

  useEffect(() => {
    if (currentPlayer.includes("bot")) {
      const nextPlayer = game.find((player) => {
        return player.index === turn % players.length;
      });
      setTimeout(() => {
        if (nextPlayer.cards.length) {
          const randomRank = randomAvailableRank(
            availableRanks(nextPlayer.cards)
          );
          setBotChoice(randomRank);
          const randomPlayer = randomFromArray(
            game.filter((player) => {
              return player.name !== nextPlayer.name && player.cards.length;
            })
          );
          setSelectedPlayer(randomPlayer.name);
        } else {
          drawDeckEvent();
        }
        // setTurn(turn + 1);
      }, botDelay);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (gameInProgress && currentPlayer.includes("bot") && selectedPlayer) {
      // console.log(currentPlayer, selectedPlayer, botChoice);
      drawPlayerEvent(botChoice);
    }
  }, [selectedPlayer]);

  useEffect(() => {
    if (currentPlayer.includes("bot")) {
      if (turnMessage && !turnMessage.includes("deck")) {
        console.log(currentPlayer, "taking turn again");
        const nextPlayer = game.find((player) => {
          return player.index === turn % players.length;
        });
        setTimeout(() => {
          if (nextPlayer.cards.length) {
            const randomRank = randomAvailableRank(
              availableRanks(nextPlayer.cards)
            );
            setBotChoice(randomRank);
            const randomPlayer = randomFromArray(
              game.filter((player) => {
                return player.name !== nextPlayer.name && player.cards.length;
              })
            );
            setSelectedPlayer(randomPlayer.name);
          } else {
            drawDeckEvent();
          }
          // setTurn(turn + 1);
        }, botDelay);
      }
    }
    // else {
    //   console.log("useEffect", turnMessage);
    // }
  }, [turnMessage]);

  const checkGameEnd = () => {
    const gameEnded =
      game.every((player) => {
        return player.cards.length === 0;
      }) && deck.length === 0;
    if (gameEnded) {
      const highScore = game
        .map((player) => {
          return player.score;
        })
        .sort()
        .pop();
      const winner = game
        .filter((player) => {
          return player.score === highScore;
        })
        .map((player) => {
          return player.name;
        });
      console.log(`Winner: ${winner.join(", ")}`);
      setGameMessage(`Winner: ${winner.join(", ")}`);
      setGameInProgress(false);
      return true;
    }
    return false;
  };

  const checkCompletedSets = (message) => {
    let continueTurn = true;
    const completeSets = hasCompleteSet(
      game.find((player) => {
        return player.name === currentPlayer;
      }).cards
    );
    if (completeSets.length) {
      // const newMessage =
      //   turn == 0
      //     ? `${currentPlayer} completed sets of ${completeSets.join(", ")}`
      //     : message
      //     ? `${message}, completed sets of ${completeSets.join(", ")}`
      //     : `${currentPlayer} drew from deck`;
      // setTurnMessage(`${newMessage}`);
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
            if (!player.cards.length) continueTurn = false;
            return player;
          } else {
            return player;
          }
        }),
      ]);
      return continueTurn;
    } else {
      if (checkGameEnd()) {
        return false;
      }
      return true;
    }
  };

  const drawDeckEvent = () => {
    const card = drawFromDeck(deck);
    if (card) {
      console.log(turn, card);
      // alert(`You drawn ${card}`);
      setGame(
        game.map((player) => {
          if (player.index === turn % players.length) {
            player.cards = [...player.cards, card];
          }
          return player;
        })
      );
      checkCompletedSets();
      const continueGame = checkCompletedSets();
      continueGame && setTurn(turn + 1);
    } else {
      console.log("Deck has no more cards.");
      const continueGame = checkCompletedSets();
      continueGame && setTurn(turn + 1);
    }
    setRankChoice([]);
    setOtherPlayers([]);
  };

  const drawPlayerEvent = (rank) => {
    const target = rank ?? "deck";
    if (target == "deck") {
      console.log("drawing from deck");
      setCanDrawDeck(false);
    } else {
      const message = `${currentPlayer} tried drawing ${rank} from ${selectedPlayer}`;
      setSelectedAction(message);
      setMoveHistory([message, ...moveHistory]);
      console.log("drawing from", selectedPlayer, rank);
    }
    const queryResult = canDrawDeck
      ? []
      : queryHand(
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
              return !card.includes(rank);
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
      const message = `${currentPlayer} drew ${
        numberToString[queryResult.length]
      } ${rank}'s from ${selectedPlayer}`;
      setTurnMessage(message);
      setSelectedAction(message);
      setMoveHistory([message, ...moveHistory]);
      setRankChoice([]);
      const continueTurn = checkCompletedSets(message);
      if (!continueTurn) {
        if (deck.length !== 0) {
          setTurnMessage(`${message}, drew from deck`);
        }
        drawDeckEvent();
      }
      // setMoveHistory([...moveHistory, []]);
    } else {
      setTurnMessage(`${currentPlayer} drew from deck`);
      drawDeckEvent();
    }
    setSelectedPlayer("");
  };

  const choosePlayerEvent = (thisPlayer) => {
    const otherPlayers = game.filter((player) => {
      return player.name !== thisPlayer;
    });
    const drawFromDeck =
      otherPlayers.every((player) => {
        return player.cards.length === 0;
      }) ||
      game.find((player) => {
        return player.name === thisPlayer;
      }).cards.length === 0;
    if (drawFromDeck) {
      setCanDrawDeck(true);
    } else {
      setOtherPlayers(otherPlayers);
      setRankChoice([]);
    }
  };

  const chooseRankEvent = (playerName) => {
    setSelectedPlayer(playerName);
    const rankChoices = availableRanks(
      game.find((player) => {
        return player.name === currentPlayer;
      }).cards
    );
    setRankChoice(rankChoices);
    setOtherPlayers([]);
  };

  const drawEvent = (target) => {
    if (["deck", "player"].includes(target)) {
      setSelectedPlayer("");
      setSelectedAction("");
      if (target == "deck") {
        drawPlayerEvent();
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

  const playerMove = currentPlayer.includes("bot") ? false : true;
  return (
    <div className="play-area-wrapper">
      <div className="player-turn">{currentPlayer}'s turn</div>
      <div className="action-container-1">
        <div className="action-info">
          <span>Choose action</span>
        </div>
        {gameInProgress && playerMove ? (
          <button className="button-action" onClick={() => drawEvent("player")}>
            Draw
          </button>
        ) : (
          <button className="button-action invalid">Draw</button>
        )}
        <span className="action-show">
          {selectedPlayer
            ? `Drawing from ${selectedPlayer}`
            : selectedAction
            ? selectedAction
            : ""}
        </span>
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
        {canDrawDeck && (
          <button className="button-action" onClick={() => drawEvent("deck")}>
            Draw from Deck
          </button>
        )}
        {rankChoice.length > 0 && (
          <div className="button-rank-container">
            {rankChoice.map((rank, index) => {
              return rank[1] ? (
                <button
                  className="button-rank"
                  key={index}
                  onClick={() => drawPlayerEvent(rank[0])}
                >
                  {rank[0]}
                </button>
              ) : (
                <button className="button-rank invalid" key={index}>
                  {rank[0]}
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
      {!gameInProgress && (
        <div className="message-container winner">
          <div>{gameMessage}</div>
        </div>
      )}
    </div>
  );
};

export default PlayerArea;
