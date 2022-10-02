import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./game.css"
import { API_HOST } from '../constants'
import { get } from '../utils/http'
import  GameItem from '../components/GameItem'
import type { Game } from '../types/game'

export default function Games() {

  const [games, setGames] = useState<Game[]>([])
  
  

    const fetchGames = async () => {
    const fetchedGames = await get<Game[]>(`${API_HOST}/games`)
    //console.log(fetchedGames)
    setGames(fetchedGames)
    
  }

  
  useEffect(() => {
    fetchGames()
  }, [])

/*
  const gamesList = [];
    console.log(gamedata)
    for (var i = 0; i < gamedata.length-1; i++) {
        let tempJSON = JSON.parse(gamedata(${i})!);        
        gamesList.push(<div>
          <span>Game ID: {tempJSON.id}  {tempJSON.winner}</span>
          <span>
            <button onClick={() => navigate(`/gamelog/${tempJSON.id}`)}>View Game Log</button>
            </span>
          
          </div>);
    }
*/
/*
  return (
    <div className="game_screen">
    <div>Games</div>

    {gamesList}
    </div>

  );
}
*/

return (
    <div className="game_screen">
      {games.length === 0 && <p>Fetching games...</p>}
      {games.map(({ _id, winner}) => (
        <GameItem key={_id} id={_id} winner={winner}/>
      ))}
    </div>
  )
}