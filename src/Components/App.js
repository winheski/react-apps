import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Questions from "./Questions";
import NextButton from "./nextButton";

const initialState = {
  questions: [],
  status: "loading",
  activeQuestion: null,
  answered: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "start", activeQuestion: 0 };
    case "answered":
      return { ...state, answered: action.payload };
    case "nextQuestion":
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
        answered: null,
      };
    default:
      throw new Error("Action unknown");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.questions.length;
  useEffect(() => {
    fetch("http://localhost:9000/questions")
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
            <Progress />
            <Questions
              questions={state.questions}
              activeQuestion={state.activeQuestion}
              dispatch={dispatch}
              answer={state.answered}
            />
          </>
        )}
        <footer>{state.answered && <NextButton dispatch={dispatch} />}</footer>
      </Main>
    </div>
  );
}
