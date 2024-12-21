import React from "react";
import '../styles/navbar.css'

const Navbar = (props) => {
    return(
        <nav className="flex justify-between h-12 py-2 bg-violet-500 text-white">
            <div className="flex">
                <span className="font-bold text-xl mx-8">{props.name}</span>
            </div>
            <ul className="flex gap-6 mx-9">
                <li className="cursor-pointer hover:font-bold transition-all duration-9">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar