import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import Game from "./routes/game";
import Games from "./routes/games";
import GameLog from "./routes/gamelog";
import Login from "./routes/login";

const root = ReactDOM.createRoot(
  document.getElementById("root")!
);
root.render(

  <>
  
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="game/:size" {...Game} element={<Game />} />
      <Route path="games"  element={<Games />} />
      <Route path="gamelog/:id" element={<GameLog />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
    
  </BrowserRouter>
  
  </>
  );