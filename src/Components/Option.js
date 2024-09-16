export default function Option({
  optionText,
  dispatch,
  index,
  Answer,
  correctAnswer,
}) {
  return (
    <button
      className={`btn btn-option ${Answer === index + 1 ? "answer" : ""} ${
        Answer ? (correctAnswer === index ? "correct" : "wrong") : ""
      }`}
      onClick={() => dispatch({ type: "answered", payload: index + 1 })}
      disabled={Answer}
    >
      {optionText}
    </button>
  );
}
