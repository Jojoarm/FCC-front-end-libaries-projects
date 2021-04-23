import React, { useEffect, useRef, useState } from 'react'
import { useStateValue } from '../../StateContext';

const Pad = ({bank, activeStyle, inactiveStyle, power, sliderVal}) => {
    const audioBeep = useRef(0);
    const [{ display}, dispatch] = useStateValue();
    const [padStyle, setPadStyle] = useState(inactiveStyle);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
      }, [])

      function handleKeyPress(e) {
        if (e.keyCode === bank.keyCode) {
          playSound();
        }
      }

    function activatePad() {
        if (power) {
          if (padStyle.backgroundColor === 'whitesmoke') {
              setPadStyle(activeStyle)
          } else {
            setPadStyle(inactiveStyle)
          }
        } else {
            setPadStyle(inactiveStyle)
          } 
        }

    function playSound(){
        const sound = document.getElementById(bank.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        activatePad();
        setTimeout(() => activatePad(), 100);
        dispatch({
            type: 'UPDATE_DISPLAY',
            item: {
                name: bank.id.replace(/-/g, ' ')
            }, 
        })
    }

    {
      const clips = [].slice.call(document.getElementsByClassName('clip'));
      clips.forEach(sound => {
        sound.volume = sliderVal;
      });
    }

    if(power) { return (
        <div onClick={playSound} style={padStyle} className="drum-pad" id={bank.id}>
            <p>{bank.keyTrigger}</p>
            <audio className="clip" id={bank.keyTrigger} src={bank.url}></audio>
        </div>
    )} else return (
      <div onClick={playSound} style={padStyle} className="drum-pad" id={bank.id}>
            <p>{bank.keyTrigger}</p>
            <audio className="clip" id={bank.keyTrigger} src="#"></audio>
        </div>
    )
}

export default Pad
