import { Link } from "react-router-dom";
import "./Home.css"

export const Home = () => {

    function ImageContainer(props) {
        return (
            <img src={props.src} className="object-contain h-80 w-96 lg:w-5/12"/>
        )
    }
    return (
        <div className="w-screen h-screen flex flex-col">
            
            <div className="flex justify-center bg-white">
            <ImageContainer
            src="https://www.pngmart.com/files/22/Pokemon-Yellow-Logo-PNG-Pic.png"
            />
            </div>
            {/* <h1 className="text-4xl">WELCOME TO POKEMON SEARCH</h1> */}
            
            <div className="md:w-80 my-20 mx-auto ">
            <Link to="/search" >
                <div className="px-6 py-4 rounded-xl drop-shadow-lg text-md md:text-lg text-white text-center
                transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 cursor-pointer">
                    Search a Pokemon Now!
                </div>
            </Link>
            </div>
        </div>
    );
}