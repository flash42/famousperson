import React from "react";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import { HowToPlayModalOpenContext } from "./contextProviders/HowToPlayModalOpenProvider";
import { GamePhaseContext } from "./contextProviders/GamePhaseProvider";
import { GameContext } from "./contextProviders/GameProvider";
import HowToPlay from "./HowToPlay";
import { gamePhases } from "../gamePhasesObject";
import { appFirebase } from "../database.js";

const Styles = styled.div`
    .navbar {
        background-color: rgba(255, 255, 255, 0.3);
    }
    #collapsible-nav-dropdown {
        color: darkgrey;
    }

    .nav-link {
        color: darkgrey;
    }
`;

export default function Header() {
    const setGamePhase = useContext(GamePhaseContext)[1];
    const [game, setGame] = useContext(GameContext);

    const setHowToPlayModalOpen = useContext(HowToPlayModalOpenContext)[1];

    const goToHome = () => {
        setGamePhase(null);
    };

    const clickOpenHowToPlayModal = () => {
        setHowToPlayModalOpen(true);
    };

    const startGameAsMaster = () => {
        setGamePhase(gamePhases.startGame);
    };

    const joinGame = () => {
        setGamePhase(gamePhases.joinGame);
    };

    const handleGamePhaseResult = async (snapshot) => {
        const DBGamePhase = snapshot.val();

        if (DBGamePhase !== game.gamePhase) {
            setGamePhase(gamePhases[DBGamePhase]);
        }
    };

    const joinDummyGameAsGameMaster = async () => {
        let gameIsSet = await setMasterGame();

        if (gameIsSet) {
            console.log(game);
            setGamePhase(gamePhases.playGame);
            appFirebase.databaseApi.readOn(`games/${game.gameId}/gamePhase`, handleGamePhaseResult);
        }
    };

    const setMasterGame = async () => {
        console.log("in setMasterGame");
        setGame({
            ownName: "Master",
            gameId: 8795,
            ownTeam: "greenTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
        });

        if (game) {
            console.log("game exists");
            return true;
        }
    };

    const joinDummyGameAsPlayer1 = async () => {
        let gameIsSet = await setPlayer1Game();

        if (gameIsSet) {
            console.log(game);
            setGamePhase(gamePhases.playGame);
            appFirebase.databaseApi.readOn(`games/${game.gameId}/gamePhase`, handleGamePhaseResult);
        }
    };

    const setPlayer1Game = async () => {
        setGame({
            ownName: "Player1",
            gameId: 8795,
            ownTeam: "blueTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
        });

        if (game) {
            console.log("game exists");
            return true;
        }
    };

    const joinDummyGameAsPlayer2 = async () => {
        let gameIsSet = await setPlayer2Game();

        if (gameIsSet) {
            console.log(game);
            setGamePhase(gamePhases.playGame);
            appFirebase.databaseApi.readOn(`games/${game.gameId}/gamePhase`, handleGamePhaseResult);
        }
    };

    const setPlayer2Game = async () => {
        console.log("in setMasterGame");
        setGame({
            ownName: "Player2",
            gameId: 8795,
            ownTeam: "greenTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
        });

        if (game) {
            console.log("game exists");
            return true;
        }
    };

    const joinDummyGameAsPlayer3 = async () => {
        let gameIsSet = await setPlayer3Game();

        if (gameIsSet) {
            console.log(game);
            setGamePhase(gamePhases.playGame);
            appFirebase.databaseApi.readOn(`games/${game.gameId}/gamePhase`, handleGamePhaseResult);
        }
    };

    const setPlayer3Game = async () => {
        console.log("in setMasterGame");
        setGame({
            ownName: "Player3",
            gameId: 8795,
            ownTeam: "blueTeam",
            gameMaster: "Master",
            teams: { blueTeam: ["Player3", "Player1"], greenTeam: ["Player2", "Master"] },
        });

        if (game) {
            console.log("game exists");
            return true;
        }
    };

    return (
        <Styles>
            <Navbar expand="lg">
                <Nav.Link onClick={goToHome}>Famous person guessing game</Nav.Link>
                <Nav.Link onClick={clickOpenHowToPlayModal}>How to play</Nav.Link>
                <NavDropdown title="Play" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={startGameAsMaster}>Start a new game as a game master</NavDropdown.Item>
                    <NavDropdown.Item onClick={joinGame}>Join a game</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="For development" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={joinDummyGameAsGameMaster}>
                        Join a dummy game as game master
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={joinDummyGameAsPlayer1}>Join a dummy game as 1</NavDropdown.Item>
                    <NavDropdown.Item onClick={joinDummyGameAsPlayer2}>Join a dummy game as 2</NavDropdown.Item>
                    <NavDropdown.Item onClick={joinDummyGameAsPlayer3}>Join a dummy game as 3</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
            <HowToPlay />
        </Styles>
    );
}
