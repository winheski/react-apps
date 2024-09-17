export default function FinishScreen({sumPoints, totalPoints}) {
  let percent = Math.floor((sumPoints/totalPoints)*100)
  return (
    <>
      <p className="result">
        <span>(emoji goes here)</span> You Scored <strong>{sumPoints}</strong> out of {totalPoints} ({percent}%)
      </p>
      <p className="highscore">(Highscore: X points)</p>
    </>
  );
}
