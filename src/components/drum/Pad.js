import React, { useEffect, useRef, useState } from 'react'
import { useStateValue } from '../../StateContext';

const Pad = ({bank, activeStyle, inactiveStyle, power}) => {
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
        // setPadStyle(activeStyle)
        if (!power) {
          if (padStyle.backgroundColor === 'orange') {
              setPadStyle(inactiveStyle)
          } else {
            setPadStyle(activeStyle)
          }
        } else if (padStyle.marginTop === 13) {
            setPadStyle(inactiveStyle)
        } else {
            setPadStyle({
                height: 77,
                marginTop: 13,
                backgroundColor: 'grey',
                boxShadow: '0 3px grey'
              })
            }
        }

    function playSound(){
        if (audioBeep.current !== null) {
            // audioBeep.currentTime = 0
            audioBeep.current.play()
        }
        setTimeout(() => activatePad(), 100);
        // activatePad();
        dispatch({
            type: 'UPDATE_DISPLAY',
            item: {
                name: bank.id.replace(/-/g, ' ')
            }, 
        })
    }

    return (
        <div onClick={playSound} style={padStyle} className="drum-pad" id={bank.id}>
            <p>{bank.keyTrigger}</p>
            <audio className="clip" id={bank.keyTrigger} ref={audioBeep} src={bank.url}></audio>
        </div>
    )
}

export default Pad
