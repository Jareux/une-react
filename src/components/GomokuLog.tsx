import React, { useEffect, useState } from "react";

function opposite(color:any) {
    if (color === 'white') {
        return 'black'
    } else {
        return 'white'
    }
} 


function GomokuLog(props:any) {
   
    const final=[];        
    for (var i = 0; i < props.gridSize * props.gridSize; i++) {        
        final.push(<div 
        id={i.toString()}
        key={i}
        className='cell'
        style={{backgroundColor : props.gameState[i], color : opposite(props.gameState[i])}}
        onClick={props.handleClick}
        
        >       
            {props.playOrderData[i]}
        </div>);
    }
    const player = (<p>It's {props.currentPlayer}'s turn</p>)


    return  (          
        <div>
           
        <div
            className="gomoku-board"
            id="gomoku-board"
            style={{ gridTemplateColumns: `repeat(${props.gridSize}, auto)` }}>
            {final}            
        </div>
        </div>
    );
}

export default GomokuLog;