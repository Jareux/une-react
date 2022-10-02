
import './home.css'
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



export default function Home() {
  const [gridSize, setGridSize] = useState(5)
  const navigate = useNavigate()

  let selectGridSize = (e:any) => {
    setGridSize(e.target.value);
  }

  return (
    <div className="home">
    <div>Home</div>
    <div >
     <label>Choose a Board Size:</label>
    <select onChange={selectGridSize} >      
        <option >5</option>
        <option >6</option>
        <option >7</option>
        <option >8</option>
        <option >9</option>
        <option >10</option>
        <option >11</option>
        <option >12</option>
        <option >13</option>
        <option >14</option>
        <option >15</option>
        <option >16</option>
        <option >17</option>
        <option >18</option>
        <option >19</option>
        <option >20</option>  
    </select> 
    </div>

    <button onClick={() => navigate(`game/${gridSize}`)}>Start Game</button>


    </div>
  );
}