import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header.jsx";
import { HowToPlayModalOpenProvider } from "./components/contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseProvider } from "./components/contextProviders/GamePhaseProvider";
import { GameProvider } from "./components/contextProviders/GameProvider";
import GamePhases from "./components/GamePhases.jsx";

const GlobalStyle = createGlobalStyle`
    .main-tile {
        margin: 3em auto;
        width: 40%;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 2em;
        border-radius: 10px;} 
    .team-data{
        margin: 3em auto;
        width: 80%;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 2em;
        border-radius: 10px;
    }
    .team-table-container {
        display: inline-block;
        padding: 10px;
        min-width: 150px
    }
    .team-tables-container {
        text-align: center;
    }
`;

function App() {
    return (
        <div className="App">
            <GameProvider>
                <GamePhaseProvider>
                    <HowToPlayModalOpenProvider>
                        <Header />
                    </HowToPlayModalOpenProvider>
                    <GamePhases />
                    <GlobalStyle />
                </GamePhaseProvider>
            </GameProvider>
        </div>
    );
}

export default App;
