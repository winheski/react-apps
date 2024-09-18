import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Questions from "./Questions";
import NextButton from "./nextButton";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
const initialState = {
  questions: [],
  status: "loading",
  activeQuestion: null,
  answered: null,
  sumPoints: 0,
  totalSeconds: 300,
  highscore:0,
};

const URL = "http://localhost:7000/questions"

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "start", activeQuestion: 0 };
    case "answered":
      let correctQuestion = state.questions[state.activeQuestion];
      let isCorrect = correctQuestion.correctOption === action.payload - 1;
      return {
        ...state,
        answered: action.payload,
        sumPoints: isCorrect
          ? state.sumPoints + correctQuestion.points
          : state.sumPoints,
      };
    case "nextQuestion":
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
        answered: null,
      };
    case "goToFinishScreen":
      return {
        ...state,
        status: "finished",
      };
    case "tick":
       if(state.totalSeconds === 1) {
        return{...state, status: "finished"}
      } else{
      return {...state, totalSeconds: state.totalSeconds-1};
    };
    case "restart":
      return{...initialState, questions: state.questions, status: "ready", highscore: state.highscore};
    case "setHighscore":
      return{...state, highscore: state.sumPoints > state.highscore ? state.sumPoints : state.highscore};
    default:
      throw new Error("Action unknown");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce(
    (accumulator, question) => accumulator + question.points,
    0
  );
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((e) => {
        console.log(e.name);
        dispatch({ type: "dataFailed" });
      });
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numquestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "start" && (
          <>
            <Progress
              numQuestions={numQuestions}
              activeQuestion={state.activeQuestion}
              maxPoints={maxPoints}
              currentPoints={state.sumPoints}
              answered={state.answered}
            />
            <Questions
              questions={state.questions}
              activeQuestion={state.activeQuestion}
              dispatch={dispatch}
              answer={state.answered}
            />
          </>
        )}
        {state.status === "finished" && <FinishScreen sumPoints={state.sumPoints} totalPoints={maxPoints} dispatch={dispatch} highscore={state.highscore}/>}
        <footer>
          {state.answered && (
            
            <NextButton
              dispatch={dispatch}
              activeQuestion={state.activeQuestion}
              numQuestions={numQuestions}
              status={state.status}
            />
            
            
          )}
          {state.status === "start" && (<Timer dispatch={dispatch} totalSeconds={state.totalSeconds}/>)}
        </footer>
      </Main>
    </div>
  );
}
