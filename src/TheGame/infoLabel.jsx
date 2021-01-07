const InfoLabel = ({ name, gameOver, isATie }) => {
  return (
    <div className="infoLabel">
      {gameOver
        ? isATie
          ? "Its A TIE !"
          : "The Winner Is: "
        : "Now Playing: "}
      <span
        className="playingNowText"
        style={{ visibility: isATie ? "collapse" : "visible" }}
      >
        {name}
      </span>
    </div>
  );
};

export default InfoLabel;
