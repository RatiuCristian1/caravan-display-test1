import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home--container">
            <h1 className="home--welcome">Welcome to my webpage</h1>
            <Link className="home--caravan--button" to="caravans">Find your caravan</Link>
        </div>
    )
}