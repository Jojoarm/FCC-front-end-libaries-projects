import React, { useEffect, useState } from 'react'
import Pad from './Pad';
import './Drum.css'
import { useStateValue } from '../../StateContext';
import { Link } from 'react-router-dom';
//Audio array
const bankOne = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
  const bankTwo = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];

  const activeStyle = {
    backgroundColor: '#9bd5f7',
    boxShadow: '0 3px #9bd5f7',
  };
  
  const inactiveStyle = {
    backgroundColor: 'whitesmoke',
    boxShadow: '3px 3px 5px black'
  };

const Drum = () => {
    const [musicBank, setMusicBank] = useState(bankTwo)
    const [sliderVal, setSliderVal] = useState(0.3)
    const [currentPadBankId, setCurrentPadBankId] = useState('Heater Kit');
    const [{ display}, dispatch] = useStateValue();
    const [power, setPower] = useState(true)

    function powerControl() {
      setPower(!power)
      // setDisplay(String.fromCharCode(160))
    }
  function selectBank() {
      if (power) {
        if (currentPadBankId === 'Heater Kit') {
            setMusicBank(bankTwo);
            dispatch({
              type: 'UPDATE_DISPLAY',
              item: {
                  name: 'Smooth Piano Kit'
              }, 
          })
            setCurrentPadBankId('Smooth Piano Kit')
        } else {
              setMusicBank(bankOne);
              dispatch({
                type: 'UPDATE_DISPLAY',
                item: {
                    name: 'Heater Kit'
                }, 
            })
              setCurrentPadBankId('Heater Kit')
        }
      }
    }
    function adjustVolume(e) {
      if (power) {
          setSliderVal(e.target.value)
          dispatch({
            type: 'UPDATE_DISPLAY',
            item: {
                name: 'Volume: ' + Math.round(e.target.value * 100)
            }, 
        })
          setTimeout(() => clearDisplay(), 1000);
      }
    }
  function clearDisplay() {
      dispatch({
        type: 'UPDATE_DISPLAY',
        item: {
            name: String.fromCharCode(160)
        }, 
    })
    }
    
    const powerSlider = power
              ? {
                  float: 'right'
                }
              : {
                  float: 'left',
                  background:'red'
                };
            const bankSlider =
                musicBank === bankOne
                ? {
                    float: 'left'
                  }
                : {
                    float: 'right'
                  };
            

    return (
      <div className="drum__machine">
        <Link to="/" style={{textDecoration: 'underline', color: 'black', alignSelf: 'flex-start', position: 'fixed', left:'30px', top: '30px', padding: '20px'}}>
                Back to Projects
            </Link>
        <div className="drum__container" id="drum-machine">
            <div className="drum__box">
              <header>
                    <h1>Music By Jojo</h1>
                    <p>Make music with only one tap</p>
                </header>
              <div className="pads__container">
                  {musicBank.map(bank => (
                      <Pad bank={bank} activeStyle={activeStyle} sliderVal={sliderVal} inactiveStyle={inactiveStyle} power={power} />
                  ))}
              </div>
            </div>
            <div className='controls-container'>
                <div className='control'>
                    <p>Power</p>
                    <div className='select' onClick={powerControl}>
                    <div className='inner' style={powerSlider} />
                    </div>
                </div>
                <p id='display'>{display}</p>
                <div className='volume-slider'>
                    <input
                    max='1'
                    min='0'
                    onChange={adjustVolume}
                    step='0.01'
                    type='range'
                    value={sliderVal}
                    className="slider__display"
                    />
                </div>
                <div className='control'>
                    <p>Bank</p>
                    <div className='select' onClick={selectBank}>
                        <div className='inner' style={bankSlider} />
                    </div>
                </div>
            </div>
            </div>
      </div>
    )
}

export default Drum
