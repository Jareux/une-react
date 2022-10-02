import { Link } from "react-router-dom";
import Header from "./components/header";
import Home from "./routes/home"
import React, { useEffect, useState } from "react";

export default function App() {
  const [col_val, setColVal] = useState(15);
const [row_val, setRowVal] = useState(15);

  var gameState:any = [];
  var [currentPlayer, setCurrentPlayer] = useState('white')

  function handleClick(e:any) {    
    const temp_index = e.target.getAttribute('id');
      if(gameState[temp_index] == ""){
        gameState[temp_index]=currentPlayer;
        e.target.style.backgroundColor = currentPlayer;
      if (currentPlayer == 'white'){
          setCurrentPlayer('black')
        } else {
          setCurrentPlayer('white')
        }
      }

  }

    function removeStyle() {
        
        for (var i = 0; i < col_val * row_val; i++){
        document.getElementById(i.toString())!.style.backgroundColor = ""
        }
        
    }

  function resetGame() {
    gameState = []
      for (var i = 0; i < col_val * row_val; i++) {
        document.getElementById(i.toString())!.style.backgroundColor = ""
        gameState.push("")
      }
      currentPlayer='white'


  }


  return (
    <div>
      <Header />    

    </div>
  );
}