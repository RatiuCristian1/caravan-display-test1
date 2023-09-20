import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [animateButton, setAnimateButton] = useState(false);

    useEffect(() => {
        // Add the animation class after a delay (e.g., 1000 milliseconds = 1 second)
        const timer = setTimeout(() => {
            setAnimateButton(true);
        }, 500);

        // Clear the timer if the component unmounts before the delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home--container">
            <h1 className="home--welcome">Welcome to my webpage</h1>
            <Link className={`home--caravan--button ${animateButton ? 'animate-slide-up' : ''}`} to="caravans">
                Find your caravan
            </Link>
        </div>
    )
}