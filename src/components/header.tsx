import './header.css';
import { Link } from "react-router-dom";
export default function Header() {

    return (
    <div className="header">
        <Link className='gomoku_title' to="/">Gomoku</Link>
        <Link className='login_links' to="/login">Login</Link>    
        <div></div>    
        <Link className='login_links' to="/games">Previous Games</Link>
    </div>
    )
}