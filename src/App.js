import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HighScores from './pages/HighScores';
import Home from './pages/Home';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import Navbar from './components/Navbar';
import { Container } from './styled/Container';
import  { Main } from './styled/Main';
import Global from './styled/Global';
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styled/Themes";
import useTheme from './hooks/useTheme';

function App() {
    const { loading } = useAuth0();

    const [theme, toggleTheme] = useTheme();
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;
    return (
        //Using React Router to switch between pages 
        <Router>
        <ThemeProvider theme={currentTheme}>
            <Global />
            <Main>  
            {loading && <p>Loading...</p>}
            {!loading && (
                <Container>
                    <Navbar toggleTheme={toggleTheme}/>
                    <Switch>
                        //Project pages HomePage, GamePage, HighScorePage, & GameOverPage
                        <Route path="/game" component={Game} />
                        <Route path="/highScores" component={HighScores} />
                        <Route path="/gameOver" component={GameOver} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Container>
            )}
            </Main>
            </ThemeProvider>
        </Router>
    );
}

export default App;
