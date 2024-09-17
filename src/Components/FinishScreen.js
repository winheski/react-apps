export default function FinishScreen() {
  return (
    <>
      <p className="result">
        <span>(emoji goes here)</span> You Scored <strong>X</strong> out of Y
        (Z%)
      </p>
      <p className="highscore">(Highscore: X points)</p>
    </>
  );
}
