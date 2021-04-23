import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Timer.css'

const Timer = () => {
    const [displayTime, setDisplayTime] = useState(25*60)
    const [breakTime, setBreakTime] = useState(5*60)
    const [sessionTime, setSessionTime] = useState(25*60)
    const [timerOn, setTimerOn] = useState(false)
    const [onBreak, setOnBreak] = useState(false)
    // const [breakAudio, setBreakAudio] = useState(new Audio("./beep-04.mp3"))

    const audioBeep = useRef(0);

   const playBreakSound = () => {
    if (audioBeep.current !== null) {
        // audioBeep.currentTime = 0
        audioBeep.current.play()
      }
   }

    // const playBreakSound = () => {
    //     // audioBeep.currentTime = 0;
    //     // audioBeep.play();
    // }

    const formatTime = (time) => {
        let min = Math.floor(time/60);
        let sec = time%60;
        return ((min<10 ? "0" + min : min) + ':' + (sec<10 ? "0" + sec : sec))
    }

    const showTime = (time) => {
        let min = Math.floor(time/60);
        return (min)
    }

    const changeTime = (amount, type) => {
        switch(type){
            case "session":
                if((sessionTime<=0 && amount < 0)||(sessionTime>=3600 && amount > 0)){
                    return;
                }
                setSessionTime((prev) => prev + amount)
                if(!timerOn){
                    setDisplayTime(sessionTime + amount)
                }
                break;
            case "break":
                if((breakTime<=0 && amount < 0)||(breakTime>=3600 && amount > 0)){
                    return;
                }
                setBreakTime((prev) => prev + amount);
                break;
        }
    }
    const controlTime = () => {
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        let onBreakVariable = onBreak;
        if(!timerOn){
            let interval = setInterval(() => {
                date = new Date().getTime();
                if(date> nextDate){
                    setDisplayTime(prev =>{
                        if(prev <=0 && !onBreakVariable){
                            playBreakSound();
                            onBreakVariable = true;
                            setOnBreak(true)
                            return breakTime;
                        } else if (prev <=0 && onBreakVariable){
                            playBreakSound();
                            onBreakVariable = false;
                            setOnBreak(false)
                            return sessionTime;
                        }
                        return prev - 1;
                    })
                    nextDate += second;
                }
                localStorage.clear();
                localStorage.setItem('interval-id', interval)
            }, 30)
        }
        if(timerOn){
            clearInterval(localStorage.getItem('interval-id'))
        }
        setTimerOn(!timerOn)
    }

    const resetTime = () => {
        controlTime()
        setDisplayTime(25*60)
        setBreakTime(5*60)
        setSessionTime(25*60)
        audioBeep.current.time = 0
        audioBeep.current.pause()
        // if (audioBeep.current !== null) {
        //     audioBeep.currentTime = 0
        //     audioBeep.current.pause()
        //   }
        
    }

    return (
        <div className="timer">
            <Link to="/" style={{textDecoration: 'underline', color: 'black', alignSelf: 'flex-start', position: 'fixed', left:'30px', top: '30px', padding: '20px'}}>
                Back to Projects
            </Link>
            <div className="timer__container">
                <h1>25+5 Clock by JoJo</h1>
                <div className="length__container">
                    <Length 
                        id={'break-label'}
                        title={'break length'} 
                        changeTime={changeTime} 
                        type={'break'} 
                        time={breakTime} 
                        formatTime={formatTime} 
                        showTime={showTime}
                    />
                    <Length 
                        id={'session-label'}
                        title={'session length'} 
                        changeTime={changeTime} 
                        type={'session'} 
                        time={sessionTime} 
                        formatTime={formatTime} 
                        showTime={showTime}
                    />
                </div>
                <h3 id="timer-label">{onBreak ? "Break" : "Session"}</h3>
                <h1 id="time-left">{formatTime(displayTime)}</h1>
                <div className="control__buttons">
                    <button id="start_stop" className="btn-large deep-purple lighten-2" onClick={controlTime}>
                        {timerOn ? (
                            <i className="material-icons">pause_circle_filled</i>
                        ) : (
                            <i className="material-icons">play_circle_filled</i>
                        )
                    }
                    </button>
                    <button id="reset" className="btn-large deep-purple lighten-2" onClick={resetTime}>
                        <i className="material-icons">autorenew</i>
                    </button>
                </div>
                <audio
                    id="beep"
                    preload="auto"
                    ref={audioBeep}
                    type='audio'
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
            </div>
        </div>
    )
}

function Length({ id, title, changeTime, type, time, formatTime, showTime }){
    return(
        <div className="length__box">
            <h3 id={id}>{title}</h3>
            <div className="time__sets">
                <button id={`${type ==='break' ? 'break-decrement' : 'session-decrement'}`} className="btn-small deep-purple lighten-2" onClick={() => changeTime(-60, type)}>
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3 id={`${type==='break' ? 'break-length' : 'session-length'}`}>{showTime(time)}</h3>
                <button id={`${type==='break' ? 'break-increment' : 'session-increment'}`} className="btn-small deep-purple lighten-2" onClick={() => changeTime(+60, type)}>
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    )
}

export default Timer
