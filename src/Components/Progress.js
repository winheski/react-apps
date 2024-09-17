export default function Progress({
  numQuestions,
  activeQuestion,
  maxPoints,
  currentPoints,
  answered,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={activeQuestion + Number(Boolean(answered))}
      />
      <p>
        Question <strong>{activeQuestion + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{currentPoints}</strong>/{maxPoints}
      </p>
    </header>
  );
}
