import Option from "./Option";

export default function Questions({
  questions,
  activeQuestion,
  dispatch,
  answer,
}) {
  let currentquestion = questions.find(
    (question, index) => index === activeQuestion
  );
  let Answer = answer;
  return (
    <>
      <h4>{currentquestion.question}</h4>
      <div className="options">
        {currentquestion.options.map((option, index) => {
          return (
            <Option
              optionText={option}
              key={option}
              index={index}
              dispatch={dispatch}
              Answer={Answer}
              correctAnswer={currentquestion.correctOption}
            />
          );
        })}
      </div>
    </>
  );
}
