import React, { Component } from "react";
import Square from "./Square";

const createRow = (onButtonClicked, squares, minId, maxId) => {
  return squares
    .filter((s) => s.id >= minId && s.id < maxId)
    .map((s) => (
      <Square key={s.id} onButtonClicked={onButtonClicked} square={s} />
    ));
};

const Board = ({ onButtonClicked, squares }) => {
  return (
    <div className="container board">
      <div className="row">{createRow(onButtonClicked, squares, 0, 3)}</div>
      <div className="row">{createRow(onButtonClicked, squares, 3, 6)}</div>
      <div className="row">{createRow(onButtonClicked, squares, 6, 9)}</div>
    </div>
  );
};

export default Board;
