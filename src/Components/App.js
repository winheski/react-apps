import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"

const initialState = {
  questions: [],
  status: "loading"
};

const reducer = (state, action) => {
  switch(action.type){
    case "dataReceived":
      console.log(action.payload)
      return {...state, questions: action.payload, status: "ready"};
    case "dataFailed" :
      return {...state, status:"error"};
    default:
      throw new Error("Action unknown")
  };
     
}

export default function App (){
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(()=>{
      fetch("http://localhost:9000/questions")
      .then((res)=>res.json()).then((data)=> { dispatch({type: "dataReceived", payload: data})}).catch((e)=>{console.log(e.name); dispatch({type:"dataFailed"})})
       }, [])
  return(
    <div className="app">
      <Header />


      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && <StartScreen />}
      </Main>
    </div>
  )
    
}