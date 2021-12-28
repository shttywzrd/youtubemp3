import React from "react";
import Converter from "./components/Converter/Converter";
import ExtensionButton from "./components/ExtensionButton/ExtensionButton";
import Logo from "./components/Logo/Logo";
import "./styles/styles.scss";

import firefoxLogo from "./images/browser-firefox.svg";
import chromeLogo from "./images/browser-chrome.svg";

function App() {
    return (
        <div className="App">
            <header className="header">
                <ExtensionButton imgSrc={firefoxLogo}>Firefox Add-on</ExtensionButton>
                <h1 className="title title--xl">YouTubeMP3</h1>
                <ExtensionButton imgSrc={chromeLogo}>Chrome Add-on</ExtensionButton>
            </header>

            <Logo>YouTubeMP3</Logo>

            <Converter/>


            <footer className="footer">
                <p className="copyright">© shttywzrd | 2021</p>
            </footer>
        </div>
    );
}

export default App;