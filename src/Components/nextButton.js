export default function NextButton({
  dispatch,
  activeQuestion,
  numQuestions,
  status,
}) {
  if (activeQuestion < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  } else {
    return (
      <>
        {status !== "finished" && activeQuestion && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "goToFinishScreen" })}
          >
            Finish
          </button>
        )}
      </>
    );
  }
}
