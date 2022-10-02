import { useNavigate } from 'react-router-dom'


type GameItemProps = {
  id: string
  winner: string
}

export default function GameItem(props: GameItemProps) {
  const { id, winner} = props
  const navigate = useNavigate()

  return (
    <div>
      <span>Game ID: {id}  {winner}</span>
      <span>
          <button onClick={() => navigate(`/gamelog/${id}`)}>View Game Log</button>
      </span>
          
    </div>
  )
}


