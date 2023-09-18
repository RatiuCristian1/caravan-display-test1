import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
        <Link className="site--logo" to="/" >Caravans World</Link>
            <nav>
                <Link to="/about">About</Link>
                <Link to="/caravans">Caravans</Link>
            </nav>
        </header>
    )
}