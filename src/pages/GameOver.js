import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';
import { StyledChar } from '../styled/Game';
import { useAuth0 } from "@auth0/auth0-react";

export default function GameOver({ history }) {
    const [score] = useScore();
    const [scoreMessage, setScoreMessage] = useState('');
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    if (score === -1) {
        history.push('/');
    }

    useEffect(() => {
        const saveHighScore = async () => {
            
            try {
                const token = await getAccessTokenSilently();
                
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ name: 'asdasfsd', score }),
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    }
                };
                const res = await fetch(
                    '/.netlify/functions/saveHighScore',
                    options
                );
                const data = await res.json();
                if (data.id) {
                    setScoreMessage('Congrats! You got a high score!!');
                } else {
                    setScoreMessage('Sorry, not a high score. Keep trying!');
                }
            } catch (err) {
                console.error(err);
            }
        };
        if(isAuthenticated) 
        {
        saveHighScore();
        }
    }, [score, isAuthenticated, getAccessTokenSilently]);
    return (
        <div>
            <h1>Game Over</h1>
            <h2>{scoreMessage}</h2>
            <StyledChar>{score}</StyledChar>
            
            {!isAuthenticated && (
                <h2>Login or Signup to track your high scores!</h2>
            ) }

            <div>
                <StyledLink to="/">Go Home</StyledLink>
            </div>
            <div>
                <StyledLink to="/game">Play Again</StyledLink>
            </div>
        </div>
    );
}