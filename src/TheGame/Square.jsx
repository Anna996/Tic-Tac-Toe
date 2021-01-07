const Square = ({ onButtonClicked, square }) => {
  return (
    <div>
      <button
        className="btn btn-outline-dark square"
        style={{ fontSize: 40 }}
        onClick={() => onButtonClicked(square.id)}
        disabled={square.disabled}
      >
        {square.value == null ? null : square.value}
      </button>
    </div>
  );
};

export default Square;
