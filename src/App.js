import './App.css';
import React, {useEffect} from 'react';
import { useState } from 'react';


function Button(props){
  return(
    <div className="drum-pad" id={keyCodeChar[props.keyCode].key + "-pad"} 
    onClick={()=>playSound(keyCodeChar[props.keyCode].key, props.changeDisplay, props.keyCode)} >
      {keyCodeChar[props.keyCode].key}<audio className="clip" 
      id={keyCodeChar[props.keyCode].key } src={keyCodeChar[props.keyCode].src}/></div>
  )
}

function Display(props){
  return(
    <div id="display"><p>{props.name}</p></div>
  )
}
const keyCodeChar={
  "81":{key:"Q",sound:"Heater 1",src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
  "87":{key:"W",sound:"Heater 2", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
  "69":{key:"E",sound:"Heater 3", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
  "65":{key:"A",sound:"Heater 4", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
  "83":{key:"S",sound:"Clap", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
  "68":{key:"D",sound:"Open-Hi-Hat", src:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
  "90":{key:"Z",sound:"Kick-n'-Hat", src:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
  "88":{key:"X",sound:"Kick", src:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
  "67":{key:"C",sound:"Closed-Hi-Hat", src:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
}

function playSound(id, changeDisplay, keyCode){
  changeDisplay(keyCodeChar[keyCode].sound);
  let playback = document.getElementById(id);
  playback.play();
  changeButtonStyle(id);
}
function changeButtonStyle(id){
  let but = document.getElementById(id+"-pad")
  but.className = but.className += " drum-pad2"
  setTimeout(()=>{but.className = "drum-pad"}, 300)
}
function handleKeyPress(e,changeDisplay){
  const objeto = keyCodeChar[e.keyCode]
  playSound(objeto.key, changeDisplay,e.keyCode);
}

function App() {
  useEffect(()=>{
    document.addEventListener("keydown", function(e){handleKeyPress(e,changeDisplay)}, false);
  })
  const [display, setDisplay] = useState("")

  const changeDisplay = (value) =>{
    setDisplay(value)
    setTimeout(()=>setDisplay(""),300)
  }
  return (
    <div className="App">
      <div id="drum-machine">
        <div id="drums" >
          <span><Button keyCode="81" changeDisplay={changeDisplay}/> <Button keyCode="87" changeDisplay={changeDisplay}/><Button keyCode="69" changeDisplay={changeDisplay}/></span>
          <span><Button keyCode="65" changeDisplay={changeDisplay}/><Button keyCode="83" changeDisplay={changeDisplay}/><Button keyCode="68"  changeDisplay={changeDisplay}/></span>
          <span><Button keyCode="90" changeDisplay={changeDisplay}/><Button keyCode="88"  changeDisplay={changeDisplay}/><Button keyCode="67" changeDisplay={changeDisplay}/></span>
        </div>
        <Display name = {display}/>
      </div>
    </div>
  );
}

export default App;
