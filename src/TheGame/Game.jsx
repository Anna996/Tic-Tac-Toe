import React, { Component } from "react";
import InfoLabel from "./infoLabel";
import Board from "./Board";
import "./TicTacToe.css";

class Game extends Component {
  state = {
    isFirstPlayerTurn: true,
    gameOver: false,
    isATie: false,
  };

  constructor() {
    super();

    const squares = [];
    for (let i = 0; i < 9; i++) {
      squares.push({ id: i, value: null, disabled: false });
    }
    this.state.squares = squares;
  }

  render() {
    return (
      <div className="Game__div">
        <InfoLabel
          name={this.getCurrentPlayer()}
          gameOver={this.state.gameOver}
          isATie={this.state.isATie}
        />
        <Board
          onButtonClicked={this.handleClick}
          squares={this.state.squares}
        />
        <div className="container Game__divPlayAgainBtn">
          <button
            className="btn btn-outline-danger font-weight-bold text-monospace"
            onClick={() => this.handlePlayAgainBtn()}
            style={{
              fontSize: 25,
              visibility: this.state.gameOver ? "visible" : "collapse",
            }}
          >
            play again
          </button>
        </div>
      </div>
    );
  }

  getCurrentPlayer = () => {
    return this.state.isFirstPlayerTurn ? "X" : "O";
  };

  handleClick = (squareId) => {
    const squares = this.state.squares.slice();
    squares[squareId] = Object.assign({}, squares[squareId]); //   { ...squares[squareId] };
    squares[squareId].value = this.getCurrentPlayer();
    squares[squareId].disabled = true;
    this.setState({ squares });

    const gameOver = this.isEndGame(squareId);
    if (gameOver) {
      this.setState({ gameOver });
      if (!this.state.isATie) {
        const squares2 = squares.map((s) => {
          s.disabled = true;
          return s;
        });
        this.setState({ squares2 });
      }
    } else {
      this.setState({ isFirstPlayerTurn: !this.state.isFirstPlayerTurn });
    }
  };

  isEndGame = (squareId) => {
    const row = this.getRow(squareId);
    if (this.isFull(row.length)) return true;
    const col = this.getCol(squareId);
    if (this.isFull(col.length)) return true;
    if (this.isDiagonalWin(squareId)) return true;
    const isATie = this.state.squares.filter((s) => !s.disabled).length == 1;
    if (isATie) this.setState({ isATie });
    return isATie;
  };

  getRow = (squareId) => {
    if (squareId < 3) return this.filterRow(0, 3);
    if (squareId >= 3 && squareId < 6) return this.filterRow(3, 6);
    return this.filterRow(6, 9);
  };

  filterRow = (minId, maxId) => {
    return this.state.squares.filter(
      (s) => s.id >= minId && s.id < maxId && s.value == this.getCurrentPlayer()
    );
  };

  getCol = (squareId) => {
    const mod3 = squareId % 3;
    const col = this.state.squares.filter(
      (s) => s.id % 3 == mod3 && s.value == this.getCurrentPlayer()
    );
    return col;
  };

  isDiagonalWin = (squareId) => {
    if (squareId % 2 != 0) return false;
    const squares = this.state.squares;
    const c = this.getCurrentPlayer();

    if (squareId != 4 && squares[4].value != c) return false;

    switch (squareId) {
      case 0:
        return squares[8].value == c;
      case 2:
        return squares[6].value == c;
      case 6:
        return squares[2].value == c;
      case 8:
        return squares[0].value == c;
      case 4:
        return (
          (squares[2].value == c && squares[6].value == c) ||
          (squares[0].value == c && squares[8].value == c)
        );
    }
    return false;
  };

  isFull = (length) => {
    return length == 2;
  };

  handlePlayAgainBtn = () => {
    this.initState();
  };

  initState = () => {
    const squares = this.state.squares.map((s) => {
      s.value = null;
      s.disabled = false;
      return s;
    });
    this.setState({
      isFirstPlayerTurn: true,
      gameOver: false,
      isATie: false,
      squares,
    });
  };
}

export default Game;
