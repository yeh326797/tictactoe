import React, { Component } from "react";
import style from "./Game.module.css";

const toSymbol = (n) => {
  switch (n) {
    case 0:
      return "";
    case 1:
      return "O";
    case -1:
    default:
      return "X";
  }
};

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Game extends Component {
  state = {
    grids: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    player: 1,
    winner: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.grids !== this.state.grids) {
      this.setState({
        winner: this.getWinner(),
      });
    }
  }

  handleClick = (idx) => {
    if (this.state.winner !== 0) return;

    const grids = [...this.state.grids];
    if (grids[idx] !== 0) return;

    grids[idx] = this.state.player;

    this.setState({
      grids,
      player: -this.state.player,
    });
  };

  reset = () => {
    this.setState({
      grids: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      player: 1,
    });
  };

  getWinner = () => {
    const { grids } = this.state;
    for (const line of lines) {
      const [i, j, k] = line;
      if (grids[i] !== 0 && grids[i] === grids[j] && grids[j] === grids[k]) {
        return grids[i];
      }
    }
    return 0;
  };

  render() {
    const { grids, player, winner } = this.state;
    return (
      <div>
        <div className={style.board}>
          {grids.map((elm, idx) => (
            <div className={style.grid} onClick={() => this.handleClick(idx)}>
              {toSymbol(elm)}
            </div>
          ))}
        </div>
        <div>Player:{toSymbol(player)}</div>
        <div>Winner:{toSymbol(winner)}</div>
        <br />
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Game;
