import Gomoku from "../components/Gomoku";
import React, { useEffect, useState } from "react";
import "./game.css"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


//Since local storage will only contain the past games and the userValidation entry I am using the length to determine the count of games

export default function Game() {
 
    const { size } = useParams() as any;
    const [gameActive, setGameActive] = useState(true);
    const [gameWon, setGameWon] = useState(false);  
    const [currentPlayer, setCurrentPlayer] = useState('white')
    const [winnerMessage, setWinnerMessage] = useState("")
    const [gameState, setGameState] = useState(Array(size*size).fill(""))
    const [playOrder, setPlayOrder] = useState(Array(size*size).fill(""))
    const [playOrderCount, setPlayOrderCount] = useState(1)
    const [gameID, setGameID] = useState(localStorage.length)
    

  function handleClick(e:any) {    
    const temp_index = e.target.getAttribute('id');      
      handleResultValidation(temp_index);
      
      if(gameState[temp_index] === "" && !gameWon){        
        gameState[temp_index]=currentPlayer;
        e.target.style.backgroundColor = currentPlayer;
        playOrder[temp_index] = playOrderCount;
        


      if (currentPlayer === 'white'){
          setCurrentPlayer('black')
        } else {
          setCurrentPlayer('white')
        }
        setPlayOrderCount(playOrderCount + 1);      
      }
      if(gameWon){   
        
        gameState[temp_index]=currentPlayer;
      }      
  }


  function resetGame() {
    setGameState([])
    setPlayOrder([])
    setPlayOrderCount(1)
    setWinnerMessage("")
      for (var i = 0; i < size * size; i++) {
        document.getElementById(i.toString())!.style.backgroundColor = ""     

      }
      setGameState(Array(size*size).fill(""))
      setPlayOrder(Array(size*size).fill(""))
      setGameWon(false)
      setCurrentPlayer('white')
      var winnerMessage=[];


  }

  //
  //
  //
  //
  function checkHorizontal(index:any, player:any) {
    /*
  Functions test to see if there are 5 tiles of the same row horizontally. get the current row it is in 
  by dividing by size and then moves along it.
  */ 

  
  var row_index = (Math.floor(parseInt(index) / size));
  var counter = 0;
  var i = 0;
  for (i = row_index * size; i < (row_index + 1) * size; i++) {    
    if (gameState[i] === player) {
      counter++; 
          
      if (counter >= 4) {
        return true;
      }
    }
    if (gameState[i + 1] != player) {
      counter = 0;
    }
  }
  return false;
}

function checkVertical(index:any, player:any) {
  /*
  Functions test to see if there are 5 tiles of the same row vertically. get the current column it is in 
  with the mod operator and simple adds the size
  */  
  var col_index = index % size;
  var counter = 0;
  var i = 0;
  
  for (i = Number(col_index); i < size * size; i += Number(size)) {
    
    if (gameState[i] === player) {
      counter++;
      
      if (counter >= 4) {
        return true;
      }
    }
  }
  return false;
}

function checkDiagonal(index:any, player:any) {
  var col_index = Math.floor(index % size);
  var row_index = Math.floor(index / size);

  var current_position = Number(index);
  var i = 0;  

  //This code detects streaks from top right to bottom left diagonal

  //The first loop will get us the cell most bottom left from the cell clicked
  while (col_index >= 0 && row_index < size - 1) {
    current_position += (Number((size) - 1));
    //console.log("current position: " + current_position)
    if (current_position > Number((size * size) - 1)) {
      break;
    }
    col_index = Math.floor(current_position % size);
    row_index = Math.floor(current_position / size);
  }
  var counter = 0;
  //The second loop will move up by each top right tile counting the streak as we go
 // console.log("Counting Math check: " + Number((size * size) - 1))
  //console.log("current position: " + current_position)
  for (i = current_position; i > 0; i = i - (size-1)) {
    //console.log("i: " + i)
    if (gameState[i] === player) {
      counter++;
      //console.log("counter: " + counter) 
      if (counter >= 4) {
        return true;
      }
    }
    if (gameState[i - (size - 1)] !== player) {
      counter = 0;
    }
  }

  //This code detects streaks from top left to bottom right diagonal

  //The first loop will get us the cell most top left from the cell clicked
  
  current_position = Number(index);  
  col_index = Math.floor(index % size);
  row_index = Math.floor(index / size);
  while (col_index >= 0 && row_index > 0) {
    
    
    current_position -= (Number(size) + 1);  

    if (current_position < 0) {
      break;
    }
    col_index = Math.floor(current_position % size);
    row_index = Math.floor(current_position / size);
  }


  var counter = 0;
  //The second loop will move down by each bottom right tile counting the streak as we go

  for (i = Number(current_position); i < (size * size)+1; i += Number(size) + 1) {
    if (gameState[i] === player) {
      counter++; 
      if (counter >= 4) {
        return true;
      }
    }
    if (gameState[i + Number(size) + 1] !== player) {
      counter = 0;
    }
  }
  return false;
}


function handleResultValidation(index:any) {
  /*
    function will test for the horizontal, vertical and diagonal streaks. if any are true then a winner is declared
    if the gamestate array has no "" left and the roundWon variable is still flase then a draw is called.
    */

  if (
    checkDiagonal(index, currentPlayer) ||
    checkHorizontal(index, currentPlayer) ||
    checkVertical(index, currentPlayer)
  ) {
         setWinnerMessage(currentPlayer + " has won!")

    setGameWon(true);
     gameState[index]=currentPlayer;
     playOrder[index]=playOrderCount;
     document.getElementById(index)!.style.backgroundColor = currentPlayer
    saveGameData()
    setGameID(gameID +1)

  }


  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    //statusDisplay!.innerHTML = declareDraw();
    var gameActive = false;
    setWinnerMessage("It's a draw!")
    setGameWon(true);
    setCurrentPlayer("draw")
    saveGameData()
    setGameID(gameID +1)
    return;
  }
}

function saveGameData() { 
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const tempData = {id: gameID, winner: currentPlayer, gameDate: date, gameStateData: gameState, playOrderData: playOrder}
  localStorage.setItem(`gameData${gameID-1}`, JSON.stringify(tempData));
}

  //
  //
  //
  //
  return (
    <div className="game_screen">
    <div >Game</div>
    <div>{winnerMessage}</div>
    <p>It's {currentPlayer}'s turn</p>
    <Gomoku
          gridSize = {size}          
          handleClick = {handleClick}
          currentPlayer = {currentPlayer}
          gameState = {gameState}
        
        />
        <span>         
          <span>
            <button onClick={resetGame}>Restart</button>
          </span>
          <Link to="/">
            <button type="button">
              Leave
            </button>
          </Link>
        </span>
        <div>The grid size is: {size}</div>
        </div>           
  );
}