import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {
    return (
        <div>
            <img src="https://www.pngmart.com/files/22/Pokemon-Yellow-Logo-PNG-Pic.png" className="img" />
            <h1>WELCOME TO POKEMON SEARCH</h1>
            <Link to="/search">Search a Pokemon</Link>
        </div>
    );
}