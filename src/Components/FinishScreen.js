import { useEffect } from "react";
import RestartButton from "./RestartButton";
export default function FinishScreen({sumPoints, totalPoints, dispatch, highscore}) {
  useEffect(()=>  dispatch({type: "setHighscore"}),[dispatch]);
  let percentage = Math.floor((sumPoints/totalPoints)*100)
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <strong>{sumPoints}</strong> out of {totalPoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <RestartButton dispatch={dispatch} />
    </>
  );
}
