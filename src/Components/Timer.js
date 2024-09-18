import { useEffect } from "react"

export default function Timer({dispatch, totalSeconds}) {
    let minutes = Math.floor(totalSeconds/60);
    let seconds = (totalSeconds%60);
    useEffect(()=>{
        const myTimer = 
        setInterval(() => {
          dispatch({type:"tick"});
        }, 1000);
        return()=>clearInterval(myTimer)
    },[dispatch,totalSeconds])
    return(
        <div className="timer">
            {minutes}:{seconds<10?"0"+String(seconds):seconds}
        </div>  
    )
}