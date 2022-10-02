import React, { useEffect, useState } from "react";


    
    // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`


function Gomoku(props: any) {

    const final=[];        
    for (var i = 0; i < props.gridSize * props.gridSize; i++) {
        //props.gameState.push("")
        final.push(<div 
        id={i.toString()}
        key={i}
        className='cell'
        style={{backgroundColor : ''}}
        onClick={props.handleClick}
        >       
            {i}
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

export default Gomoku;