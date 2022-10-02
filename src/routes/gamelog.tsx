import { useParams } from "react-router-dom";
import GomokuLog from "../components/GomokuLog";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./game.css"

  function handleClick(e:any) {    
    
  }



export default function GameLog() {
  const { id } = useParams() as any;
  let gameData = JSON.parse(localStorage.getItem(`gameData${id-1}`)!);


  return (
    <div className="game_screen">
    <div>Gamelog</div>
    <div>{gameData.gameState}</div>
        <GomokuLog
          gridSize = {Math.sqrt(gameData.gameStateData.length)}         
          handleClick = {handleClick}
          currentPlayer = {"white"}
          gameState = {gameData.gameStateData}
          playOrderData = {gameData.playOrderData}
        
        />
        <Link to="/games">
          <button type="button">
            Back
          </button>
        </Link>
        </div>
  );
}